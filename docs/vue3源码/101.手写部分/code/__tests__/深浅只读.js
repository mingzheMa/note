const { readonly, shallowReadonly, effect } = require('../index');


// const obj = readonly({
//     a: {
//         b: 1
//     }
// });

// effect(() => {
//     console.log(obj.a.b);
// });

// obj.a.b++;

const obj = shallowReadonly({
    a: {
        b: 1
    }
});

effect(() => {
    console.log(obj.a.b);
});

obj.a = [];