import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c,e as a,w as e,d as n,r as i,b as t}from"./app.9ac9284b.js";const l={},r=n('<h1 id="vue-render" tabindex="-1"><a class="header-anchor" href="#vue-render" aria-hidden="true">#</a> Vue._render</h1><p>之前看到<code>Vue.$mount</code>的核心是用<code>Vue._update(Vue._render())</code>的形式进行渲染，<code>Vue._render</code>最终返回 VNode，这里我们研究下<code>Vue._render</code>里到底是怎么实现的</p><h2 id="vue-prototype-render-挂载" tabindex="-1"><a class="header-anchor" href="#vue-prototype-render-挂载" aria-hidden="true">#</a> Vue.prototype._render 挂载</h2><p>Vue 原型上的<code>_render</code>方法是在引入 Vue 时通过<code>renderMixin</code>挂载上的</p><br>',5),u=n(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> initMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./init&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stateMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./state&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./render&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> eventsMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./events&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> lifecycleMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./lifecycle&#39;</span>

<span class="token keyword">function</span> <span class="token function">Vue</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">stateMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">eventsMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">lifecycleMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">renderMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rendermixin" tabindex="-1"><a class="header-anchor" href="#rendermixin" aria-hidden="true">#</a> renderMixin</h2><p>可以看到 renderMixin 做了很多渲染相关的事情：</p><ol><li>挂载一些工具函数<code>installRenderHelpers</code></li><li>挂载<code>$nextTick</code></li><li>挂载<code>_render</code></li></ol><br>`,5),d=n(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">renderMixin</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">Vue</span><span class="token operator">:</span> Class<span class="token operator">&lt;</span>Component<span class="token operator">&gt;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// install runtime convenience helpers</span>
  <span class="token function">installRenderHelpers</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>

  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$nextTick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">fn</span><span class="token operator">:</span> Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">nextTick</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_render</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token literal-property property">vm</span><span class="token operator">:</span> Component <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> _parentVnode <span class="token punctuation">}</span> <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options

    <span class="token keyword">if</span> <span class="token punctuation">(</span>_parentVnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>$scopedSlots <span class="token operator">=</span> <span class="token function">normalizeScopedSlots</span><span class="token punctuation">(</span>
        _parentVnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>scopedSlots<span class="token punctuation">,</span>
        vm<span class="token punctuation">.</span>$slots<span class="token punctuation">,</span>
        vm<span class="token punctuation">.</span>$scopedSlots
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// set parent vnode. this allows render functions to have access</span>
    <span class="token comment">// to the data on the placeholder node.</span>
    vm<span class="token punctuation">.</span>$vnode <span class="token operator">=</span> _parentVnode
    <span class="token comment">// render self</span>
    <span class="token keyword">let</span> vnode
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// There&#39;s no need to maintain a stack because all render fns are called</span>
      <span class="token comment">// separately from one another. Nested component&#39;s render fns are called</span>
      <span class="token comment">// when parent component is patched.</span>
      currentRenderingInstance <span class="token operator">=</span> vm
      vnode <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_renderProxy<span class="token punctuation">,</span> vm<span class="token punctuation">.</span>$createElement<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">render</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token comment">// return error render result,</span>
      <span class="token comment">// or previous vnode to prevent render error causing blank component</span>
      vnode <span class="token operator">=</span> vm<span class="token punctuation">.</span>_vnode
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      currentRenderingInstance <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// if the returned array contains only a single node, allow it</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> vnode<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vnode <span class="token operator">=</span> vnode<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// return empty vnode in case the render function errored out</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>vnode <span class="token keyword">instanceof</span> <span class="token class-name">VNode</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vnode <span class="token operator">=</span> <span class="token function">createEmptyVNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// set parent</span>
    vnode<span class="token punctuation">.</span>parent <span class="token operator">=</span> _parentVnode
    <span class="token keyword">return</span> vnode
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到是通过<code>render.call(vm._renderProxy, vm.$createElement)</code>获取<code>vnode</code>，这个<code>render</code>是通过<code>$options</code>属性获得，如果在组件中使用了<code>render</code>则会优先使用<code>render</code>，如果组件中使用<code>el</code>或者<code>template</code>则会通过<code>compileToFunctions</code>转化成<code>render</code><br></p><p>回忆一下，在最开始获取打包配置的时候通过函数<code>compileToFunctions</code>获取了<code>render</code>并赋值<code>options</code>上，如果组件配置了<code>render</code>，则不会触发以下代码 <br></p><p>配置的优先级 <code>render</code> &gt; <code>template</code> &gt; <code>el</code><br></p>`,4),k=n(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> template <span class="token operator">=</span> options<span class="token punctuation">.</span>template
  <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> template <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&quot;#&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        template <span class="token operator">=</span> <span class="token function">idToTemplate</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">.</span>nodeType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      template <span class="token operator">=</span> template<span class="token punctuation">.</span>innerHTML
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    template <span class="token operator">=</span> <span class="token function">getOuterHTML</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="render-参数" tabindex="-1"><a class="header-anchor" href="#render-参数" aria-hidden="true">#</a> render 参数</h2><p>Vue 官方有<a href="https://cn.vuejs.org/v2/guide/render-function.html?" target="view_window">render</a>函数的使用说明</p><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;div id=&quot;app&quot;&gt;{{ msg }}&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面的<code>render</code>最终会产生上面的效果</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">createElement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createElement</span><span class="token punctuation">(</span>
    <span class="token string">&quot;div&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">attr</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">&quot;app&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>msg
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出<code>render</code>函数触发的时候会传入一个<code>createElement</code>函数 <br></p><p>接下来回到_render 挂载这里，可以看到调用<code>render</code>的时候传入的函数是<code>vm.$createElement</code><br></p>`,8),v=n(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>vnode <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_renderProxy<span class="token punctuation">,</span> vm<span class="token punctuation">.</span>$createElement<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="createelement-是如何挂载到当前-vue-实例上的" tabindex="-1"><a class="header-anchor" href="#createelement-是如何挂载到当前-vue-实例上的" aria-hidden="true">#</a> $createElement 是如何挂载到当前 vue 实例上的</h2><p>我们从头屡<code>$createElement</code>到底是在哪挂载的</p><br>`,4),m=n(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">initRender</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 new Vue 触发<code>_init</code>时通过<code>initRender</code>挂载上的</p><br>`,3),b=n(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initRender</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  vm<span class="token punctuation">.</span>_vnode <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// the root of the child tree</span>
  vm<span class="token punctuation">.</span>_staticTrees <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// v-once cached trees</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">const</span> parentVnode <span class="token operator">=</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$vnode <span class="token operator">=</span> options<span class="token punctuation">.</span>_parentVnode<span class="token punctuation">)</span> <span class="token comment">// the placeholder node in parent tree</span>
  <span class="token keyword">const</span> renderContext <span class="token operator">=</span> parentVnode <span class="token operator">&amp;&amp;</span> parentVnode<span class="token punctuation">.</span>context
  vm<span class="token punctuation">.</span>$slots <span class="token operator">=</span> <span class="token function">resolveSlots</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>_renderChildren<span class="token punctuation">,</span> renderContext<span class="token punctuation">)</span>
  vm<span class="token punctuation">.</span>$scopedSlots <span class="token operator">=</span> emptyObject
  <span class="token comment">// bind the createElement fn to this instance</span>
  <span class="token comment">// so that we get proper render context inside it.</span>
  <span class="token comment">// args order: tag, data, children, normalizationType, alwaysNormalize</span>
  <span class="token comment">// internal version is used by render functions compiled from templates</span>
  vm<span class="token punctuation">.</span><span class="token function-variable function">_c</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token comment">// normalization is always applied for the public version, used in</span>
  <span class="token comment">// user-written render functions.</span>
  vm<span class="token punctuation">.</span><span class="token function-variable function">$createElement</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">createElement</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>

  <span class="token comment">// $attrs &amp; $listeners are exposed for easier HOC creation.</span>
  <span class="token comment">// they need to be reactive so that HOCs using them are always updated</span>
  <span class="token keyword">const</span> parentData <span class="token operator">=</span> parentVnode <span class="token operator">&amp;&amp;</span> parentVnode<span class="token punctuation">.</span>data

  <span class="token function">defineReactive</span><span class="token punctuation">(</span>
    vm<span class="token punctuation">,</span>
    <span class="token string">&quot;$attrs&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span>parentData <span class="token operator">&amp;&amp;</span> parentData<span class="token punctuation">.</span>attrs<span class="token punctuation">)</span> <span class="token operator">||</span> emptyObject<span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token boolean">true</span>
  <span class="token punctuation">)</span>
  <span class="token function">defineReactive</span><span class="token punctuation">(</span>
    vm<span class="token punctuation">,</span>
    <span class="token string">&quot;$listeners&quot;</span><span class="token punctuation">,</span>
    options<span class="token punctuation">.</span>_parentListeners <span class="token operator">||</span> emptyObject<span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token boolean">true</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到还处理了插槽<code>$slots</code>属性，以及将组件属性<code>$attrs</code>、组件事件监听<code>$listeners</code>转化成可观察对象（<code>Object.defineProperty</code>），注意，这里可观察对象是浅克隆，也就是说只有修改<code>$attrs</code>、<code>$listeners</code>的引用才会触发当前 vue 实例的更新。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>简单来向调用<code>Vue._render</code>的时候传入<code>$createElement</code>，最终调用<code>$createElement</code>函数并返回<code>VNode</code>，它是一个虚拟节点，vue通过生成虚拟节点在更新视图的时候进行对比渲染，从而提高性能</p>`,4);function y(f,h){const s=i("font");return o(),c("div",null,[r,a(s,{color:"#999"},{default:e(()=>[t("文件路径: src/core/instance/index.js")]),_:1}),u,a(s,{color:"#999"},{default:e(()=>[t("文件路径: src/core/instance/render.js")]),_:1}),d,a(s,{color:"#999"},{default:e(()=>[t("文件路径: src/platforms/web/entry-runtime-with-compiler.js")]),_:1}),k,a(s,{color:"#999"},{default:e(()=>[t("文件路径: src/core/instance/render.js")]),_:1}),v,a(s,{color:"#999"},{default:e(()=>[t("文件路径: src/core/instance/init.js")]),_:1}),m,a(s,{color:"#999"},{default:e(()=>[t("文件路径: src/core/instance/render.js")]),_:1}),b])}const _=p(l,[["render",y],["__file","4.Vue._render.html.vue"]]);export{_ as default};