const { track, trigger, ITERATE_KEY } = require('./effect');

// 数组原生includes方法
const rawIncludes = Array.prototype.includes;
// 重写includes方法
function includes(...args) {
    // 先从代理数据上使用includes反复噶
    let res = rawIncludes.apply(this, args);

    // 如果代理数据中没有找到该方法，则在原始数据中再查找
    if (!res) {
        res = rawIncludes.apply(this[raw], args);
    }

    return res;
}

// 数组方法重写
const arrayPrototypeMounteds = {
    includes
};

// 响应式数据
const raw = Symbol('raw');
function createReactive(
    obj,
    options = {
        shallow: false,
        readonly: false
    }
) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            // 获取原生数据
            if (key === raw) {
                return target;
            }

            // 访问某些数组方法
            if (Array.isArray(target) && arrayPrototypeMounteds.hasOwnProperty(key)) {
                return Reflect.get(arrayPrototypeMounteds, key, receiver);
            }

            // 只读数据、forEach、Symbol.iterator属性不需要收集副作用
            if (!options.readonly && key !== 'forEach' && key !== Symbol.iterator) {
                track(target, key);
            }

            const res = Reflect.get(target, key, receiver);

            // 返回值
            if (typeof res === 'object' && !options.shallow) {
                // 如果值是对象/数组 并且 设置了深响应，则返回响应式数据
                return reactive(res);
            } else {
                // 否则返回值
                return res;
            }
        },
        set(target, key, newValue, receiver) {
            // options.readonly判断是否为只读
            if (options.readonly) {
                throw new Error(`${key}为只读属性`);
            }

            // 是否存在该属性
            const hasKey = target.hasOwnProperty(key);

            // trigger类型
            let type = hasKey ? 'SET' : 'ADD';

            // 如果是数组需要根据长度判断类型
            if (Array.isArray(target) && key !== 'length') {
                // 当索引大于等于length时，length会改变，因此判断为ADD
                type = target.length <= key ? 'ADD' : 'SET';
            }

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

            trigger(target, key, type, newValue);
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
            // options.readonly判断是否为只读
            if (options.readonly) {
                throw new Error(`${key}为只读属性`);
            }

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

// 原始数据与响应式数据映射表
const reactiveMap = new Map();

// 响应式
function reactive(obj) {
    if (reactiveMap.has(obj)) {
        return reactiveMap.get(obj);
    }

    const res = createReactive(obj);

    reactiveMap.set(obj, res);

    return res;
}

// 浅响应
function shallowReactive(obj) {
    return createReactive(obj, {
        shallow: true
    });
}

module.exports.reactive = reactive;
module.exports.shallowReactive = shallowReactive;
module.exports.createReactive = createReactive;
