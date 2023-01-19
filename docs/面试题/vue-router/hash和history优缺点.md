# hash和history优缺点

hash 是使用 url 锚点的机制实现，修改锚点浏览器不会发起请求，通过 <code>hashChange</code> 事件监听锚点变化，通过 <code>location.hash</code> 修改锚点

优点：

- 兼容 IE8+
- 不需要服务端进行特殊设置（只会请求.html文件）

缺点：

- 请求不会带上锚点，服务端无法得到页面路由信息
- 遇到需要锚点的业务会有冲突

history 是通过浏览器 history api 实现，通过 <code>popState</code> 事件监听路由变化，通过 <code>history.pushState</code> 修改路由

优点：

- 请求时会带路径，服务端可以获得页面路由信息
  
缺点：

- 兼容性不如 hash，只兼容 IE10+
- 需要服务端对页面请求进行适配，因为请求携带页面路径

