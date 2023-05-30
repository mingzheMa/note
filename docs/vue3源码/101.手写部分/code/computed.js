const { track, trigger, effect } = require('./effect');

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

    return {
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
}

module.exports.computed = computed;
