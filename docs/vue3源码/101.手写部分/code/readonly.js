const { createReactive } = require('./reactive');

// 计算属性
function readonly(obj) {
    return createReactive(obj, {
        readonly: true
    });
}

// 浅计算属性
function shallowReadonly(obj) {
    return createReactive(obj, {
        readonly: true,
        shallow: true
    });
}

module.exports.readonly = readonly;
module.exports.shallowReadonly = shallowReadonly;
