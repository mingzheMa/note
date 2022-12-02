# optimization

<code>optimization</code>是打包优化配置

例如我这里有两个模块，之后的配置如果没有特殊说明都使用该例子

```js
// utils.js
export function a() {
    return "a"
}

export function b() {
    return "b"
}

```

```js
// index.js
import * as utils from "./utils"
const res = utils.a()
console.log(res)
```

## tree shaking

tree shaking会删除模块中导出未使用代码以及永远不会运行的代码，是webpack内部机制

在打包模式配置成<code>mode = production</code>（生产模式）的时候会自动触发tree shaking机制

我们这里通过webpack配置触发tree shaking

```js
const { Configuration } = require("webpack")

/**
 * @type {Configuration}
*/
module.exports = {
    mode: "none",
    entry: "./src/index.js",
    
    // 优化配置
    optimization: {
        // 标记导出未使用变量
        usedExports: true
    }
}
```

可以看到这里在<code>optimization</code>配置中配置了<code>usedExports</code>，该配置的作用是如果导出变量未使用则会在打包结果上标记<code>/* unused harmony export 变量名称 */</code>

可以看到在index.js模块中并没有使用导出的函数b，我们先看下没有配置<code>optimization.usedExports</code>的打包结果（这里只保留utils.js模块的函数）

```js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return b; });
function a() {
    return "a"
}

function b() {
    return "b"
}
/***/ })
```

可以看出如果不配置<code>optimization.usedExports</code>时会将a、b两个函数全部导出，接下来我们看下配置了<code>optimization.usedExports</code>的打包结果

```js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return a; });
/* unused harmony export b */
function a() {
    return "a"
    console.log("a")
}

function b() {
    return "b"
}

/***/ })
```

可以看出函数b并没有被导出，并且会增加一个<code>/* unused harmony export b */</code>的标记，但是函数b仍然在打包结果中

我们增加一个配置<code>optimization.minimize</code>

```js
const { Configuration } = require("webpack")

/**
 * @type {Configuration}
*/
module.exports = {
    mode: "none",
    entry: "./src/index.js",
    
    // 优化配置
    optimization: {
        // 标记导出未使用变量
        usedExports: true,
        // js代码压缩
        minimize: true
    }
}
```

```js
!function(e){
  // ...
}([
	function(e,t,n){"use strict";n.r(t);const r=n(1).a();console.log(r)},
	function(e,t,n){"use strict";function r(){return"a"}n.d(t,"a",(function(){return r})),console.log("我是该文件副作用")}]
);
```

可以看出打包结果中并没有函数b中<code>return "b"</code>的代码，函数b的代码被移除了

<code>usedExports</code>配置标记出导出未使用代码，而<code>minimize</code>配置则删除标记代码

<code>tree shaking</code>翻译为摇树，意思为将树上的枯树枝摇下来，这里就相当于先使用<code>usedExports</code>找到枯树枝，在使用<code>minimize</code>将枯树枝摇下来

#### 配置babel-loader导致tree shaking失效问题

webpack文档中明确提出tree shaking的前提是ESModules规范

当我们为了提高代码兼容性配置了babel-loader的时候则会导致代码最终转化成了commonJS（最新版babel-loader已经默认输出ESmodules规范，所以不存在这个问题）

我们配置babel-loader观察一下打包结果，这里故意将modules配置成"commonjs"来观察导出未使用的代码是否会被标记

```js
const { Configuration } = require("webpack")

/**
 * @type {Configuration}
*/
module.exports = {
    mode: "none",
    entry: "./src/index.js",
    
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    modules: "commonjs"
                                }]
                            ],
                        },
                    }
                ]
            }
        ]
    },

    // 优化配置
    optimization: {
        // 标记导出未使用变量
        usedExports: true,
    }
}
```

```js
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a = a;
exports.b = b;

function a() {
  return "a";
}

function b() {
  return "b";
}

/***/ })
```

在commonJS规范下是不会有导出未使用标记的，因此在压缩阶段也就不会删除函数b

我们把modules配置改为"auto"从新打包试下

```js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return a; });
/* unused harmony export b */
function a() {
  return "a";
  console.log("a");
}
function b() {
  return "b";
}

/***/ })
```

可以看出如果babel-loader输出commonJS规范时是不会有导出未使用标记的，tree shaking也就失效了

## sideEffects

<code>sideEffects</code>是和<code>tree shaking</code>一样的优化机制

我们单独为<code>sideEffects</code>创建一写例子

```js
// index.js
import { button } from "./components"

button()
```

```js
// components.js
export {default as button} from "./button"
export {default as input} from "./input"
```

```js
// button.js，input.js雷同
export default function () {
    return "button"
}

console.log("我是button的副作用")
```

可以看到我们创建了<code>button</code>和<code>input</code>两个组件，组件分别有副作用，通过<code>components</code>模块统一导出，并在<code>index</code>模块中使用其中的<code>button</code>模块

我们打包时配置上<code>optimization.usedExports</code>查看打包结果

```js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _button__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function () {
    return "button"
});

console.log("我是button的副作用")


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function () {
    return "input"
});

console.log("我是input的副作用")


/***/ })
```

可以看出在<code>input</code>模块（模块3）中并没有导出结果，但是我们配置了tree shaking，所以将这个模块打包进来了，实时上我们并不需要这个<code>input</code>模块，因为它没有被使用

我们配置上sideEffects在打包看看

```js
// webpack.config
module.exports = {
    mode: "none",
    entry: "./src/index.js",    
    optimization: {
        usedExports: true,
        sideEffects: true,
    }
}
```

```js
// package.json
"sideEffects": false
```

webpack.config中的sideEffects为打开副作用优化，而package.json中的则为配置哪些模块存在副作用，可以是路径数组，配置false为所有模块都没有副作用

```js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


Object(_components__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])()

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function () {
    return "button"
});

console.log("我是button的副作用")


/***/ })
```

可以看到在打包结果里就没有<code>input</code>模块了

当某个模块中的副作用函数只是服务于这个模块的时候我们可以配置sideEffects优化打包体积，但是如果某个模块中的副作用修改了全局属性，则不能配置sideEffects，否则这段修改全局的副作用代码将会失效！（比如某个模块的副作用：window.a = "哈哈哈"），所以我们尽量在模块中减少影响全局的副所用

## 模块合并

我们知道webpack打包结果是一个立即执行函数，并将所有模块当做参数传入函数，模块越多参数越多则创建的函数越多（参数为函数），我们是不是可以将模块和被引用模块合并

```js
const { Configuration } = require("webpack")

/**
 * @type {Configuration}
*/
module.exports = {
    mode: "none",
    entry: "./src/index.js",
    
    // 优化配置
    optimization: {
        // 合并模块
        concatenateModules: true
    }
}
```

```js
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/utils.js
function a() {
    return "a"
    console.log("a")
}

function b() {
    return "b"
}

console.log("我是该文件副作用")
// CONCATENATED MODULE: ./src/index.js

const res = a()
console.log(res)

/***/ })
```

可以看到打包结果将<code>index.js</code>和<code>utils.js</code>两个模块合并为一个模块