# vue更新粒度如何控制在组件级别

我们从 vue2 和 vue3 的源码中分析

## vue2

vue2 更新是通过 <code>\__patch__</code> 函数进行更新，函数内部会判断如果是组件则会调用组件的 <code>init</code> 钩子，在 <code>init</code> 中会创建一个 vue  组件实例，并调用其 <code>$mount</code> 方法

```js
const child = createComponentInstanceForVnode(vnode, activeInstance)
child.$mount(hydrating ? vnode.elm : undefined, hydrating)
```

创建 vue  组件实例是通过 <code>Vue.extend</code> 创建一个 vue 组件实例并继承 Vue 根实例

在 <code>\$mount</code> 函数中会创建一个 <code>Watcher</code> 观察者，该观察者需要记录正在挂载的 vue 实例用来触发更新，<code>\$mount</code> 中是使用 <code>this</code> 作为正在挂载的实例，所以这里创建 <code>Watcher</code> 使用的 vue 实例正是这个 vue 组件实例，在更新时就会调用这个 vue 组件实例上的更新方法

## vue3

vue3 更新是通过 <code>patch</code> 函数进行更新，如果是组件类型会走处理组件的函数 <code>processComponent</code>，函数中会分析是挂载阶段还是更新阶段，在组件挂载阶段不仅会创建组件实例 <code>instance</code>，还会创建一个副作用实例 <code>effect</code>，并将其挂载到组件实例上

```ts
// 创建副作用实例并挂在至组件实例
const effect = (instance.effect = new ReactiveEffect(
  componentUpdateFn, // 副作用函数，用于更新视图
  () => queueJob(update), // 将更新函数放置异步队列等待执行
  instance.scope // track it in component's effect scope
))

// 组件更新函数，并挂载至组件实例，本质是调用副作用实例run方法（设置当前副作用实例提供给依赖收集，调用副作用函数）
const update: SchedulerJob = (instance.update = () => effect.run())
```

组件更新时会调用 <code>instance.update</code>，本质是调用实例方法 <code>effect.run</code>，该方法最终调用副作用函数 <code>componentUpdateFn</code> 进行更新视图

## 总结

vue2 是根据 <code>Watcher</code> 维度更新，在创建组件调用 <code>createElement</code> 时会在 <code>VNode</code> 上挂载一个组件实例构造函数 <code>Ctor</code>，该构造函数继承 Vue 构造函数原型。在挂载阶段会调用 <code>Ctor</code> 函数获取组件实例并调用其 <code>\$mount</code> 方法进行挂载，而 <code>$mount</code> 最终会根据实例创建一个观察者 <code>Watcher</code>，这样该观察者更新的就是组件实例

vue3 是根据副作用实例 <code>effect</code> 维度更新，在组件挂载阶段会创建 <code>effect</code>，在更新时就会触发该组件的副作用实例
