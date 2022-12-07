import{_ as a}from"./Redux.c93d6605.js";import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as e,d as t}from"./app.9ac9284b.js";const r="/assets/MVC.103493bd.png",o={},p=t('<h1 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念" aria-hidden="true">#</a> 核心概念</h1><p>Redux是一个降低数据复杂度的解决方案</p><h2 id="mvc" tabindex="-1"><a class="header-anchor" href="#mvc" aria-hidden="true">#</a> MVC</h2><p>早期服务器渲染方式：浏览器发起请求 =&gt; 后端将拼好数据的HTML文档相应</p><p>服务器需要获取UI需要的数据，在将数据嵌入模板，最终生成文档返回</p><p>为了降低模板与数据操作的复杂度，诞生了MVC模式</p><p><img src="'+r+`" alt="Alt text"></p><ul><li>服务器在接收客户端请求后分发给对应Controller</li><li>Controller：操作Model和View完成响应体</li><li>Model：提供数据源</li><li>View：组装模板和数据</li></ul><p>后来View部分分离出来，形成前后端分离的开发方式</p><h2 id="前端实现mvc" tabindex="-1"><a class="header-anchor" href="#前端实现mvc" aria-hidden="true">#</a> 前端实现MVC</h2><ul><li>Model层通过接口获取数据</li><li>Vue、React解决了数据到视图的过程，也就是View层</li><li>Controller层的问题比较复杂，因为服务端的Controller关注的是接口，也就是数据操作的方式。而前端操作数据的方式非常多，这取决于用户的操作（例如：点击按钮、拖动鼠标、初始化请求这些可能操作的是同一份数据，但是都是不同的操作方式）</li></ul><h2 id="前端数据解决方案" tabindex="-1"><a class="header-anchor" href="#前端数据解决方案" aria-hidden="true">#</a> 前端数据解决方案</h2><h3 id="flux" tabindex="-1"><a class="header-anchor" href="#flux" aria-hidden="true">#</a> Flux</h3><p>Facebook提出的数据解决方案，引入了action和store的概念</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> loginAction <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;login&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">payload</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">loginId</span><span class="token operator">:</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">loginPwd</span><span class="token operator">:</span><span class="token string">&quot;123123&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> deleteAction <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">payload</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过提交action的方式修改store中的数据，通过store的方法获取数据，这样就将用户繁琐的操作都整理成若干action（比如用户会有很多修改个人信息的方法，但是修改信息的action就一个）</p><p>但是这样操作store的方式会让store变得非常复杂（数据量庞大，所有修改数据的方式都要在store维护）</p><h3 id="redux" tabindex="-1"><a class="header-anchor" href="#redux" aria-hidden="true">#</a> Redux</h3><p>在Flux的基础上引入了reducer的概念</p><p><img src="`+a+'" alt="Alt text"></p><p>使用者在创建store的时候需要将reducer也一并传入，这样store就将修改数据的部分代码分离了出去，变成一个纯粹的数据仓库</p>',21),l=[p];function i(c,d){return s(),e("div",null,l)}const k=n(o,[["render",i],["__file","1.核心概念.html.vue"]]);export{k as default};
