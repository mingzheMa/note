const { track, trigger, effect } = require('./effect');

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

module.exports.watch = watch;
