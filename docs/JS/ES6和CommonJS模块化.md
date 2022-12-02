# ES6和CommonJS模块化

## script标签

首先浏览器在解析HTML的时候，加载到script标签时就会停下解析HTML，去运行script，等当前script内容执行完毕在继续解析HTML，如果是外部连接，则需要等待请求结束在加载script标签。如果script内容足够大那么页面就会明显卡死（渲染停止）

script标签中支持<code>defer</code>和<code>async</code>，则会在异步处理script中的逻辑，<code>defer</code>和<code>async</code>属性的异步逻辑是有却别的
- 配置<code>defer</code>属性，会在时会当主队列（指编译HTML）执行完毕后在加载，如果有多个<code>defer</code>属性的script则根据加入异步队列顺序等到朱队列执行完毕后依次加载
- 配置<code>async</code>属性，会在异步执行完毕后加载（此时暂停HTML的解析），如果有多个<code>async</code>属性的script标签则哪个先执行完毕先加载哪个模块，所以无法保证加载顺序

当然我们还知道script可以配置<code>type="module"</code>属性，这就是ES6模块化，当解析到这个script标签时也会异步执行，相当于在标签上配置了<code>defer</code>属性，当然你也可以手动配置<code>async</code>

## ES6

es6是在模块编译阶段递归执行模块，导出结果只读，从下面例子可以看出

```js
// a.js
console.log('a.js')
import { foo } from './b';

// b.js
export let foo = 1;
console.log('b.js 先执行');

// 执行结果:
// b.js 先执行
// a.js
```

## CommonJS循环引用

commonjs在代码执行时导入，并且导入结果是值的浅拷贝

```js
// a.js
console.log('a starting');
exports.done = false;
const b = require('./b');
console.log('in a, b.done =', b.done);
exports.done = true;
console.log('a done');

// b.js
console.log('b starting');
exports.done = false;
const a = require('./a');
console.log('in b, a.done =', a.done);
exports.done = true;
console.log('b done');

// node a.js
// 执行结果：
// a starting
// b starting
// in b, a.done = false
// b done
// in a, b.done = true
// a done
```

a.js
- 执行a，a打印"a starting"
- 导出done赋值false
b.js
- 执行b，b打印"b starting"
- 导出done赋值false
- 引入a，这时a已经执行完毕，直接读取导出结果done为false，并打印"in b, a.done = false"
- 导出done赋值true
- b执行完毕，打印"b done"
a.js
- a继续向后执行，得到b导出的done（最后导出done为false），打印"in a, b.done = true"
- 导出done赋值true
- a执行完毕，打印"a done"

## ES6循环导入

因为ES6是编译时递归执行模块，且导出一个只读值（可以动态修改导出的引用值中的元素，导出的值会同步修改）

```js
// a.js
console.log('a starting')
import {foo} from './b';
console.log('in b, foo:', foo);
export const bar = 2;
console.log('a done');

// b.js
console.log('b starting');
import {bar} from './a';
export const foo = 'foo';
console.log('in a, bar:', bar);
setTimeout(() => {
  console.log('in a, setTimeout bar:', bar);
})
console.log('b done');

// babel-node a.js
// 执行结果：
// b starting
// in a, bar: undefined
// b done
// a starting
// in b, foo: foo
// a done
// in a, setTimeout bar: 2
```

- 代码执行之前先编译模块a，发现导入了模块b
b.js
- 先执行模块b，打印"b starting"
- 编译模块b时发现导入了模块a，但此时模块a并未编译结束，所以什么也没有导出
- 因为模块a没有编译结束，所以输出"in a, bar: undefined"
- 接着将定时器丢入宏任务队列，打印"b done"
a.js
- 模块b的导出结束，开始执行模块a，打印"a starting"
- 