const { track, trigger } = require('./effect');

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

            track(target, key);

            const res = Reflect.get(target, key, receiver);

            // 返回值
            if (typeof res === 'object' && !options.shallow) {
                // 如果值是对象/数组 并且 设置了深响应，则返回响应式数据
                return createReactive(res, options);
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

// 响应式
function reactive(obj) {
    return createReactive(obj);
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
