# 如何处理let、const为var的

我们知道在es5的时候只有全局作用域和函数作用域

```js
// 全局作用域
var a = 1

function fn(){
    // 函数作用域
    var b = 2
}
```

在es6引入了块级作用域的概念

```js
{
    let a = 1
}

console.log(a) // Uncaught ReferenceError: a is not defined
```

注意：只有let和const才有块级作用域，这里可以理解为if和for中也是块级作用域

那么，我们在使用webpack配置es6代码转化成es5的时候是怎么实现的呢

首先我们配置babel-loader

```js
      {
        test: /.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      }
```

之后我们打包几种情况来看看结果

## 例子1

```js
// 转化前
let a = 1;
console.log(a);

// 转化后
var a = 1;
console.log(a);
```

可以看出如果在没有任何影响下是直接吧let转化成var

## 例子2

```js
// 转化前
{
    let a = 1
}
console.log(a) // Uncaught ReferenceError: a is not defined

// 转化后
{
    var _a = a
}
console.log(a) // Uncaught ReferenceError: a is not defined
```

可以看到在使用块级作用域的转化结果。将声明的变量前加了一个"_"，这样打印的时候就找不到a变量了

## 例子3

```js
// 转化前
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  });
}

// 转化后
var _loop = function _loop(i) {
  setTimeout(function () {
    console.log(i);
  });
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}
```

我们写了一个let处理闭包来看下webpack是如何处理的，这里可以看到直接在循环里加了一个函数，通过函数作用域来代替块级作用域