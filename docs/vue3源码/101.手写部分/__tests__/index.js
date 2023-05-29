// 桶
const bucket = new WeakMap();

// 正在执行的副作用栈
const effectStack = [];

// 迭代器的key，用于依赖收集
const ITERATE_KEY = Symbol('ITERATE_KEY');

// 将副作用函数添加到桶中
function track(target, key) {
    // 如果没有当前副作用则返回
    if (!effectStack.length) return;

    // 在桶中获取key对应的副作用集合
    if (!bucket.has(target)) {
        bucket.set(target, new Map());
    }
    const keyMap = bucket.get(target);
    if (!keyMap.has(key)) {
        keyMap.set(key, new Set());
    }
    const effects = keyMap.get(key);

    // 将副作用放入桶
    const activeEffect = effectStack[effectStack.length - 1];
    effects.add(activeEffect);
    // 将数据所依赖的副作用集合收集起来，可以从副作用函数中找到该数据所依赖的副作用列表
    activeEffect.deps.add(effects);
}

// 将桶中的副作用取出来执行
function trigger(target, key, type) {
    // 副作用队列
    const effects = new Set();

    const targetMap = bucket.get(target);

    // 将依赖key的副作用加入队列
    targetMap.has(key) && targetMap.get(key).forEach(effect => effects.add(effect));

    // 将迭代器key的副作用加入队列
    if (type === 'ADD' || type === 'DELETE') {
        // 只有在增加的时候才需要触发遍历相关副作用
        targetMap.has(ITERATE_KEY) && targetMap.get(ITERATE_KEY).forEach(effect => effects.add(effect));
    }

    // 赋值一个新的Set进行遍历，不然forEach会无限循环
    new Set(effects).forEach(effect => {
        // 如果即将执行的副作用为当前副作用，则跳过
        if (effect === effectStack[effectStack.length - 1]) return;

        if (effect.options.scheduler) {
            // 如果有调度器配置，则调用调度器
            effect.options.scheduler(effect);
        } else {
            // 否则直接执行副作用
            effect();
        }
    });
}

// 保存副作用函数并执行
function effect(fn, options = {}) {
    // 副作用函数
    function effectFn() {
        // 入栈
        effectStack.push(effectFn);
        // 从deps中剔除此副作用
        cleanup(effectFn);
        // 执行真正的副作用，将结果记录返回
        const result = fn();
        // 出栈
        effectStack.pop();

        return result;
    }

    // deps收集依赖此副作用数据的副作用列表，用于更新时将此副作用剔除
    effectFn.deps = new Set();
    // 挂载副作用配置
    effectFn.options = options;

    // 非懒执行
    if (!options.lazy) {
        effectFn();
    }

    return effectFn;
}

// 计算属性
function computed(getter) {
    // 数据变化开关
    let isChanged = true;

    const effectFn = effect(getter, {
        lazy: true,
        scheduler() {
            isChanged = true;
            trigger(obj, 'value');
        }
    });

    // 缓存
    let cache = null;

    const obj = {
        get value() {
            if (isChanged) {
                isChanged = false;
                cache = effectFn();
            }

            // 在访问时收集计算属性依赖
            track(obj, 'value');
            return cache;
        }
    };

    return obj;
}

// 监听属性
function watch(source, callback, options = {}) {
    let oldValue = null;
    let newValue = null;
    // 清除监听函数
    let cleanup = null;

    // 监听副作用函数
    function watchEffect() {
        // 监听数据
        let watchData = null;

        if (typeof source === 'function') {
            watchData = source();
        } else {
            watchData = source;
        }

        if (options.deep) {
            traverse(watchData);
        }

        return watchData;
    }

    // 触发回调任务
    function job() {
        // 清除函数有值则调用清除函数
        cleanup && cleanup();
        oldValue = newValue;
        newValue = effectFn();
        callback(newValue, oldValue, fn => (cleanup = fn));
    }

    const effectFn = effect(watchEffect, {
        lazy: true,
        scheduler() {
            if (options.flush === 'post') {
                Promise.resolve().then(job);
            } else {
                job();
            }
        }
    });

    if (options.immediate) {
        // 触发回调
        job();
    } else {
        // 首次手动调用收集依赖
        effectFn();
    }
}

// 递归获取对象每一个属性
function traverse(node, seen = new Set()) {
    const type = Object.prototype.toString.call(node);

    if (['[object Array]', '[object Object]'].includes(type) && !seen.has(node)) {
        seen.add(node);
        for (const key in node) {
            traverse(node[key], seen);
        }
    }
}

// 从依赖此effect数据的副作用列表中剔除effect
function cleanup(effect) {
    effect.deps.forEach(effects => {
        effects.delete(effect);
    });
}

// 任务队列
const jobQueue = new Set();
// 任务队列正在执行
let isFlushing = false;

// 执行jobQueue队列
function flushJob() {
    // 如果队列正在执行则返回
    if (isFlushing) return;
    isFlushing = true;

    const p = Promise.resolve();
    p.then(() => {
        // 异步微队列中执行任务列表
        jobQueue.forEach(job => job());
    }).finally(() => {
        // 执行完毕后将任务列表清空
        jobQueue.clear();
        isFlushing = false;
    });
}

// 响应式数据
const raw = Symbol('raw');
function reactive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            // 获取原生数据
            if (key === raw) {
                return target;
            }

            track(target, key);

            return Reflect.get(target, key, receiver);
        },
        set(target, key, newValue, receiver) {
            // 是否存在该属性
            const hasKey = target.hasOwnProperty(key);
            // 获取旧值
            const oldValue = target[key];
            // 赋值新值
            const res = Reflect.set(target, key, newValue, receiver);

            // 如果新旧值都为NaN，或者新旧值相等则不执行副作用
            if ((isNaN(oldValue) && isNaN(newValue)) || oldValue === newValue) {
                return res;
            }

            // 如果触发set的函数不是原数据的代理则不执行副作用（例如原型继承）
            if (receiver[raw] !== target) {
                return res;
            }

            trigger(target, key, hasKey ? 'SET' : 'ADD');
            return res;
        },
        has(target, key) {
            track(target, key);
            return Reflect.has(target, key);
        },
        ownKeys(target) {
            track(target, ITERATE_KEY);
            return Reflect.ownKeys(target);
        },
        deleteProperty(target, key) {
            // 是否存在该属性
            const hasKey = target.hasOwnProperty(key);
            const res = hasKey && Reflect.deleteProperty(target, key);
            // 删除成功在触发副作用
            if (res) {
                trigger(target, key, 'DELETE');
            }
            return res;
        }
    });
}

// ___测试代码___
// const rawObj = {
//     text: 'hellow',
//     boolean: true,
//     num: 0,
//     obj: {
//         num: 0,
//         boolean: true,
//         string: 'string'
//     }
// };

// const proxyObj = new Proxy(rawObj, {
//     get(target, key) {
//         track(target, key);
//         return target[key];
//     },
//     set(target, key, newValue) {
//         target[key] = newValue;
//         trigger(target, key);
//         return true;
//     }
// });

// watch(
//     () => proxyObj.num,
//     (newValue, oldValue, onInvalidate) => {
//         let expired = false
//         onInvalidate(() => {
//             expired = true
//         })

//         // 模拟异步接口请求3s-5s打印
//         setTimeout(() => {
//             !expired && console.log('proxyObj.num更新了', oldValue, newValue);
//         }, Math.random() * 3000 + 2000);
//     },
//     {
//         // deep: true,
//         // immediate: true,
//         // flush: 'post'
//     }
// );

// proxyObj.num++;
// proxyObj.num++;

// 测试Reflect
// const rawObj = {
//     get foo() {
//         return this.bar;
//     },
//     bar: 1
// };

// const proxyObj = reactive(rawObj);

// effect(() => {
//     console.log('开始遍历');
//     for (const key in proxyObj) {
//         console.log(key, proxyObj[key]);
//     }
//     console.log('结束遍历');
// });

// // proxyObj.a = 1;
// // proxyObj.b = 2;
// // proxyObj.bar++;

// delete proxyObj.bar;
// delete proxyObj.bar;

// 测试继承
// const parentObj = { bar: 1 };
// const childObj = {};

// const parent = reactive(parentObj);
// const child = reactive(childObj);

// Object.setPrototypeOf(child, parent);

// effect(() => {
//     console.log(child.bar);
// });

// child.bar = 2;

const obj = reactive({
    a: {
        b: 1
    }
});

effect(() => {
    console.log(obj.a.b);
});

obj.a.b++;
