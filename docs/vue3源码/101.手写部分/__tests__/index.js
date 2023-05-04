// 桶
const bucket = new WeakMap();

// 正在执行的副作用栈
const effectStack = [];

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
function trigger(target, key) {
    const effects = bucket.get(target).get(key);
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
        oldValue = newValue;
        newValue = effectFn();
        callback(newValue, oldValue);
    }

    const effectFn = effect(watchEffect, {
        lazy: true,
        scheduler() {
            if (options.flush) {
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

// ___测试代码___
const rawObj = {
    text: 'hellow',
    boolean: true,
    num: 0,
    obj: {
        num: 0,
        boolean: true,
        string: 'string'
    }
};

const proxyObj = new Proxy(rawObj, {
    get(target, key) {
        track(target, key);
        return target[key];
    },
    set(target, key, newValue) {
        target[key] = newValue;
        trigger(target, key);
        return true;
    }
});

watch(
    () => proxyObj.num,
    (newValue, oldValue) => {
        console.log('proxyObj.num更新了', oldValue, newValue);
    },
    {
        deep: true,
        immediate: true,
        flush: 'post'
    }
);

proxyObj.num++;
proxyObj.num++;
proxyObj.num++;

console.log("主线程")