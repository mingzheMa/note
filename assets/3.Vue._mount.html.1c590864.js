import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as c,c as l,e as a,w as e,a as p,b as n,d as t,r as i}from"./app.002a81c8.js";const u={},r=p("h1",{id:"vue-mount",tabindex:"-1"},[p("a",{class:"header-anchor",href:"#vue-mount","aria-hidden":"true"},"#"),n(" Vue.$mount")],-1),d=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 保存通用的mount方法，对mount方法进行二次封装，当前包为浏览器环境，并且需要编译器，针对这些特性构建mount方法</span>
<span class="token keyword">const</span> mount <span class="token operator">=</span> <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$mount
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  el<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Element<span class="token punctuation">,</span> <span class="token comment">// 挂载容器</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  <span class="token comment">// 获取挂载容器真实dom</span>
  el <span class="token operator">=</span> el <span class="token operator">&amp;&amp;</span> <span class="token function">query</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>

  <span class="token comment">// 获取Vue实例配置</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options
  <span class="token comment">// 如果没有配置render函数，则需要将 template 转化为 render 函数</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取模板配置</span>
    <span class="token keyword">let</span> template <span class="token operator">=</span> options<span class="token punctuation">.</span>template
    <span class="token comment">// 统一模板配置为dom字符串，例如：&quot;&lt;div&gt;&lt;Hellow /&gt;&lt;/div&gt;&quot;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> template <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&quot;#&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果模板是一个id选择器，则获取dom.innerHTML为模板</span>
          template <span class="token operator">=</span> <span class="token function">idToTemplate</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">.</span>nodeType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果模板配置为真实dom，直接提取innerHML</span>
        template <span class="token operator">=</span> template<span class="token punctuation">.</span>innerHTML
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果模板配置不存在，则获取 el 配置的 dom.outerHTML</span>
      template <span class="token operator">=</span> <span class="token function">getOuterHTML</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 将模板转化为render函数</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> staticRenderFns <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">compileToFunctions</span><span class="token punctuation">(</span>
        template<span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">outputSourceRange</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&quot;production&quot;</span><span class="token punctuation">,</span>
          shouldDecodeNewlines<span class="token punctuation">,</span>
          shouldDecodeNewlinesForHref<span class="token punctuation">,</span>
          <span class="token literal-property property">delimiters</span><span class="token operator">:</span> options<span class="token punctuation">.</span>delimiters<span class="token punctuation">,</span>
          <span class="token literal-property property">comments</span><span class="token operator">:</span> options<span class="token punctuation">.</span>comments
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token keyword">this</span>
      <span class="token punctuation">)</span>
      options<span class="token punctuation">.</span>render <span class="token operator">=</span> render
      options<span class="token punctuation">.</span>staticRenderFns <span class="token operator">=</span> staticRenderFns
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token function">mount</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们重新回到 entry-runtime-with-compiler 中观察 mount 方法，可以看见这是对原有<code>Vue.prototype.$mount</code>方法的二次封装（不同平台的挂载方式不同），经过一系列判断将<code>template</code>参数转化为 HTML 字符串，在通过<code>compileToFunctions</code>方法构建<code>render</code>函数</p><p>这是针对编译器做的一层封装，接下来我们来看针对浏览器环境创建的 <code>$mount</code> 函数</p>`,3),k=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  <span class="token parameter">el<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Element<span class="token punctuation">,</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  el <span class="token operator">=</span> el <span class="token operator">&amp;&amp;</span> inBrowser <span class="token operator">?</span> <span class="token function">query</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">undefined</span>
  <span class="token comment">// 调用挂载组件函数进行挂载Vue根实例</span>
  <span class="token keyword">return</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vue 无论根实例还是组件实例，最终都是通过 <code>mountComponent</code> 函数进行挂载，该函数是环境通用的挂载函数</p>`,2),m=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span>
  <span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span> <span class="token comment">// Vue根实例</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token operator">?</span>Element<span class="token punctuation">,</span> <span class="token comment">// 挂载容器dom</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  <span class="token comment">// 容器dom挂载到Vue根实例配置上</span>
  vm<span class="token punctuation">.</span>$el <span class="token operator">=</span> el
  
  <span class="token comment">// 标准化render配置</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果render配置不存在，则赋值一个空函数</span>
    vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>render <span class="token operator">=</span> createEmptyVNode
  <span class="token punctuation">}</span>
  <span class="token comment">// 执行beforeMount生命周期</span>
  <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&quot;beforeMount&quot;</span><span class="token punctuation">)</span>

  <span class="token comment">// Vue根实例更新函数</span>
  <span class="token keyword">const</span> <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 创建一个监听器，用于通知该实例更新视图</span>
  <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>
    vm<span class="token punctuation">,</span> <span class="token comment">// 监听的实例</span>
    updateComponent<span class="token punctuation">,</span> <span class="token comment">// 更新视图时调用的函数</span>
    noop<span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token comment">// 在updateComponent函数触前会触发before配置函数</span>
      <span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_isMounted <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>vm<span class="token punctuation">.</span>_isDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&quot;beforeUpdate&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token boolean">true</span> <span class="token comment">/* isRenderWatcher */</span>
  <span class="token punctuation">)</span>
  hydrating <span class="token operator">=</span> <span class="token boolean">false</span>

  <span class="token comment">// manually mounted instance, call mounted on self</span>
  <span class="token comment">// mounted is called for render-created child components in its inserted hook</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$vnode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>_isMounted <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&quot;mounted&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> vm
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>mountComponent</code>大致做了以下事情</p><ol><li>触发生命周期<code>beforeMount</code></li><li>构建 Watcher 实例，该实例用于更新依赖，如果在构建时没有配置<code>option.lazy = true</code>则会在构建时立即触发<code>getter</code>，也就是传入的<code>updateComponent</code>函数，函数直接调用<code>vm._update</code>来更新DOM</li><li>触发生命周期<code>mounted</code></li></ol><p><code>$mount</code> 函数是在整个库打包环节挂载，因为 vue 可以在很多环境下运行，这些环境有不同的挂载方式，因此在某个环境的打包前，需要将 <code>$mount</code> 函数挂载到 Vue 构造函数上，用来减少代码体积</p>`,4);function v(b,y){const s=i("font");return c(),l("div",null,[r,a(s,{color:"#999"},{default:e(()=>[n("文件路径: src/platforms/web/entry-runtime-with-compiler.js")]),_:1}),d,a(s,{color:"#999"},{default:e(()=>[n("文件路径: src/platforms/web/runtime/index.js")]),_:1}),k,a(s,{color:"#999"},{default:e(()=>[n("文件路径: src/core/instance/lifecycle.ts")]),_:1}),m])}const h=o(u,[["render",v],["__file","3.Vue.$mount.html.vue"]]);export{h as default};
