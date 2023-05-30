const { reactive, shallowReactive, effect } = require('../index');

// const obj = reactive({
//     a: {
//         b: 1
//     }
// });

const obj = shallowReactive({
    a: {
        b: 1
    }
});

effect(() => {
    console.log(obj.a.b);
});

obj.a.b++;
