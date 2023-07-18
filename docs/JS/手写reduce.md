# 手写reduce

首先研究下reduce如何使用

```js
const arr = [1, 2, 3, 4, 5];

const test = arr.reduce((previousValue, currentValue, currentIndex, array) => {
    previousValue[currentValue] = currentValue;
    return previousValue;
}, {});

console.log(test);
```

reduce 接收两个参数分别为 callbackfn、initialValue

- callbackfn，回调函数，每次遍历会触发该函数，参数如下
    - previousValue，上次迭代结果，也就是 callbackfn 函数返回值，首次为 initialValue
    - currentValue，当前迭代数组项
    - currentIndex，当前迭代下标
    - array，当前迭代数组
- initialValue，迭代初始值，每次迭代会传入回调函数

reduce 会遍历数组，并数组每一项都传入 callbackfn，并将结果存下来，在遍历结束后返回

```js
const arr = [1, 2, 3, 4, 5];

Array.prototype.myReduce = function (callbackfn, initialValue = 0) {
    const arr = this;
    // 返回结果，首次为initialValue
    let res = initialValue;
    // 遍历数组，每次遍历调用回调函数callbackfn，并将对应参数传入，和返回结果更新
    for (let i = 0; i < arr.length; i++) {
        res = callbackfn(res, arr[i], i, arr);
    }
    // 遍历结束，将结果迭代结果导出
    return res;
};

const test2 = arr.myReduce((previousValue, currentValue, currentIndex, array) => {
    previousValue[currentValue] = currentValue;
    return previousValue;
}, {});

console.log(test2);
```