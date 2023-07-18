const arr = [1, 2, 3, 4, 5];

const test = arr.reduce((previousValue, currentValue, currentIndex, array) => {
    previousValue[currentValue] = currentValue;
    return previousValue;
}, {});

console.log(test);

Array.prototype.myReduce = function (callbackfn, initialValue = 0) {
    const arr = this;
    let res = initialValue;
    for (let i = 0; i < arr.length; i++) {
        res = callbackfn(res, arr[i], i, arr);
    }

    return res;
};

const test2 = arr.myReduce((previousValue, currentValue, currentIndex, array) => {
    previousValue[currentValue] = currentValue;
    return previousValue;
}, {});

console.log(test2);