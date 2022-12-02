# 手写CommonJS（node环境）

CommonJS是解决js工程化问题，是代码层面实现的，我们先看下使用方法

```js
// 导出模块
module.exports = {
    a: 1,
    b: 2
}

// 导入模块
const moduleRes = require(导入模块路径)
console.log(moduleRes) // { a: 1, b: 2 }
```

导出模块是通过<code>module.exports</code>导出，导入模块通过<code>require</code>方法导入

还有一种导出方式，也能达到上面效果

```js
exports.a = 1
exports.b = 1
```

注意<code>exports</code>和<code>module.exports</code>其实就是一个对象

```js
console.log(module.exports === exports) // true
```

## 初步搭建

我们先梳理下CommonJS的特性：
1. 运行时加载，加载为同步
2. 模块中有module、exports全局变量（module.exports === exports）以及require全局方法
3. 模块导出的module.exports为浅拷贝
4. require加载模块的时候会运行模块代码
5. 模块被引用后会记录缓存，模块代码只会运行一次

第1条得出加载同步说明加载文件的时候需要同步读取

第2、4条得出使用require导入的模块是被立即执行函数包裹，并传入module、exports、require参数

第3、5条得出require方法需要将module.exports浅拷贝返回，并缓存起来

```js
class Module {
  // 缓存
  static cache = {};

  constructor() {
    // 模块id
    this.id = null;
    // 导出数据
    this.exports = {};
    // 是否加载
    this.loaded = false;
  }
}
```

我们创建一个<code>Module</code>类，创建时初始化一些数据，接下来我们从require方法入手

```js
class Module {
  // 缓存
  static cache = {};

  // 文件导入
  static _load(requirePath) {
    const absolutePath = path.resolve(requirePath);

    // 判断缓存
    if (Module._cache[absolutePath]) {
      return Module._cache[absolutePath].exports;
    }

    // 创建模块
    const currModule = new Module();
    // id赋值
    currModule.id = absolutePath;
    // 存入缓存
    Module._cache[currModule.id] = currModule;
    // 加载文件
    currModule.load();

    return currModule.exports;
  }

  constructor() {
    // 模块id
    this.id = null;
    // 导出数据
    this.exports = {};
    // 是否加载
    this.loaded = false;
  }

  // 导入方法
  require(requirePath) {
    return Module._load(requirePath);
  }
}
```

我们创建<code>require</code>实例方法，方法中调用类本身<code>_load</code>方法

<code>_load</code>方法中首先做了缓存判断处理，如果没有缓存则创建模块实例<code>Module</code>，并赋值<code>id</code>（模块id）、<code>_cache</code>（缓存），调用实例<code>load</code>方法去加载模块并赋值<code>exports</code>（模块导出的内容，方法我们之后说），最后将<code>exports</code>导出内容返回

这样我们就完成了初级阶段，总结一下，使用<code>require</code>方法导入模块时，先去缓存中查找是否存在，如果不存在则创建一个模块，存入缓存，加载导入模块，并将导入模块的导出内容返回

## 加载导入模块

上面我们搭建好了一个模块类，并实现了require的简单逻辑，下面我们实现加载模块逻辑

```js
// 加载js模块
function loadJsModule(module) {
  const conent = fs.readFileSync(module.id, "utf-8");
  module._compile(conent);
}

class Module {
    // ...

    // 加载文件类型对应方法
    static _extensions = {
        js: loadJsModule,
    };

    // 加载模块
    load() {
        // 根据文件后缀选择加载方式
        const moduleType = path.extname(this.id);
        if (Module._extensions[moduleType]) {
          Module._extensions[moduleType](this);
        }
    }
}
```

在<code>load</code>实例方法中我们解析文件后缀，根据后缀调用对应加载方法

目前只支持js文件模块，函数<code>loadJsModule</code>接收模块实例，读取模块内容后加载模块阶段就结束了，接下来调用实例上<code>_compile</code>方法进入编译阶段

## 编译模块

我们已经拿到了模块内容，接下来进入模块编译阶段（模块外层包函数、包装函数执行并传入对应参数）

```js
class Module {
    // ...

    // 包装函数
    static _wrapper(content) {
        return `(function (exports, module, require, __filename, __dirname){${content}})`;
    }

    // 编译
    _compile(conent) {
        // 获取包装后函数
        const wrapConent = Module._wrapper(conent);

        // 将字符串当做js执行，调用返回包装函数并传入响应参数
        const func = eval(wrapConent)
        func.call(
            this.exports,
            this.exports,
            this,
            this.require,
            this.id,
            path.dirname(this.id)
        );
    }
}
```

通过类静态方法<code>_wrapper</code>对导入模块内容进行包装，接着通过<code>eval</code>执行包装后的字符串（字符串返回包装函数），最后执行包赚函数传入对应数值

调用包装函数后就执行模块中的代码了，当模块中对exports或module.exports赋值时，Module实例使用的是同一个引用值，接着将实例属性exports返回，这样就完成了导入模块

## 完整代码

```js
const path = require("path");
const fs = require("fs");
const vm = require("vm");

// 加载js模块
function loadJsModule(module) {
  const conent = fs.readFileSync(module.id, "utf-8");
  module._compile(conent);
}

class Module {
  // 缓存
  static _cache = {};

  // 加载文件类型对应方法
  static _extensions = {
    ".js": loadJsModule,
  };

  // 文件导入
  static _load(requirePath) {
    const absolutePath = path.resolve(requirePath);

    // 判断缓存
    if (Module._cache[absolutePath]) {
      return Module._cache[absolutePath].exports;
    }

    // 创建模块
    const currModule = new Module();
    // id赋值
    currModule.id = absolutePath;
    // 存入缓存
    Module._cache[currModule.id] = currModule;
    // 加载文件
    currModule.load();

    return currModule.exports;
  }

  // 包装函数
  static _wrapper(content) {
    return `(function (exports, module, require, __filename, __dirname){${content}})`;
  }

  constructor() {
    // 模块id
    this.id = null;
    // 导出数据
    this.exports = {};
    // 是否加载
    this.loaded = false;
  }

  // 导入方法
  require(requirePath) {
    const moduleType = path.extname(requirePath);
    requirePath = moduleType ? requirePath : `${requirePath}.js`;
    return Module._load(requirePath);
  }

  // 加载模块
  load() {
    // 根据文件后缀选择加载方式
    const moduleType = path.extname(this.id);
    if (Module._extensions[moduleType]) {
      Module._extensions[moduleType](this);
    }
  }

  // 编译
  _compile(conent) {
    // 获取包装后函数
    const wrapConent = Module._wrapper(conent);

    // 将字符串当做js执行，调用返回包装函数并传入响应参数
    const func = eval(wrapConent);

    func.call(
      this.exports,
      this.exports,
      this,
      this.require,
      this.id,
      path.dirname(this.id)
    );
  }
}

module.exports = new Module();
```

测试下

```js
// b.js文件
exports.a = {
  a: 1,
};
console.log("b.js");  
console.log(this);
console.log(exports);
console.log(module);
console.log(module.exports === exports);
console.log(__filename);
console.log(__dirname);

// a.js文件
const myModule = require("./module");
const b = myModule.require("./b.js");
console.log(b)

// b.js
// { a: { a: 1 } }
// { a: { a: 1 } }
// Module {
//   id: '/Users/max/Downloads/马明哲/b.js',
//   exports: { a: { a: 1 } },
//   loaded: true
// }
// true
// /Users/max/Downloads/马明哲/b.js
// /Users/max/Downloads/马明哲
// { a: { a: 1 } }
```