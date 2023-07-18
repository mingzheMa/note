const { reactive, effect } = require('../index');

const arr = reactive([]);

// effect(() => {
//     console.log(arr[0]);
// });

// arr[0] = 0;

// effect(() => {
//     console.log(arr.length);
// });

// arr.length = 4

// effect(() => {
//     console.log(arr[0], arr[1], arr[2]);
// });

// arr.length = 2;

// effect(() => {
//     console.log(arr.length);
// });

// arr[3] = 4;

// effect(() => {
//     for (const key in arr) {
//         console.log(key);
//     }
// });

// arr[3] = 4;

// effect(() => {
//     for (const key of arr) {
//         console.log(key);
//     }
// });

// arr[3] = 4;

// effect(() => {
//     arr.forEach(console.log);
// });

// arr[3] = 4;

// (function () {
//     const arr = reactive([{}]);

//     effect(() => {
//         console.log(arr.includes(arr[0]));
//     });

//     arr[0] = 1
// })();

// (function () {
//     const obj = {}
//     const arr = reactive([obj]);

//     effect(() => {
//         console.log(arr.includes(obj));
//     });
// })();

// (function () {
//     const obj = {}
//     const arr = reactive([obj]);

//     effect(() => {
//         console.log(arr.indexOf(123));
//         console.log(arr.indexOf(arr[0]));
//         console.log(arr.indexOf(obj));
//     });
// })();

// (function () {
//     const obj = {};
//     const arr = reactive([obj]);

//     effect(() => {
//         console.log(arr.lastIndexOf(123));
//         console.log(arr.lastIndexOf(arr[0]));
//         console.log(arr.lastIndexOf(obj));
//     });
// })();

(function () {
    effect(() => {
        arr.push(1);
        console.log('effect1', arr);
    });

    effect(() => {
        arr.push(2);
        console.log('effect2', arr);
    });
})();
