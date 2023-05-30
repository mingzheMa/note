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

// 从依赖此effect数据的副作用列表中剔除effect
function cleanup(effect) {
    effect.deps.forEach(effects => {
        effects.delete(effect);
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

module.exports.track = track;
module.exports.trigger = trigger;
module.exports.effect = effect;
