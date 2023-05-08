import{_ as h}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as o,d as i}from"./app.002a81c8.js";const t={},l=i('<h1 id="hash和history优缺点" tabindex="-1"><a class="header-anchor" href="#hash和history优缺点" aria-hidden="true">#</a> hash和history优缺点</h1><p>hash 是使用 url 锚点的机制实现，修改锚点浏览器不会发起请求，通过 <code>hashChange</code> 事件监听锚点变化，通过 <code>location.hash</code> 修改锚点</p><p>优点：</p><ul><li>兼容 IE8+</li><li>不需要服务端进行特殊设置（只会请求.html文件）</li></ul><p>缺点：</p><ul><li>请求不会带上锚点，服务端无法得到页面路由信息</li><li>遇到需要锚点的业务会有冲突</li></ul><p>history 是通过浏览器 history api 实现，通过 <code>popState</code> 事件监听路由变化，通过 <code>history.pushState</code> 修改路由</p><p>优点：</p><ul><li>请求时会带路径，服务端可以获得页面路由信息</li></ul><p>缺点：</p><ul><li>兼容性不如 hash，只兼容 IE10+</li><li>需要服务端对页面请求进行适配，因为请求携带页面路径</li></ul>',11),s=[l];function a(c,r){return e(),o("div",null,s)}const _=h(t,[["render",a],["__file","hash和history优缺点.html.vue"]]);export{_ as default};
