const { reactive, effect } = require('../index');

const arr = reactive([1, 2, 3]);

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

effect(() => {
    for (const key of arr) {
        console.log(key);
    }
});

arr[3] = 4;

effect(() => {
    arr.forEach(console.log);
});

arr[3] = 4;
