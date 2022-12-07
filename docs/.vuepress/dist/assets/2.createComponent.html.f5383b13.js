import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as u,e as a,w as t,a as s,b as n,d as o,r as c}from"./app.9ac9284b.js";const r={},d=s("h1",{id:"createcomponent",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#createcomponent","aria-hidden":"true"},"#"),n(" createComponent")],-1),k=s("p",null,[n("在之前探讨"),s("code",null,"$createElement"),n("的时候知道，"),s("code",null,"$createElement"),n("最终调用的是"),s("code",null,"_createElement"),n("函数")],-1),v=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">_createElement</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">context</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  tag<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Class<span class="token operator">&lt;</span>Component<span class="token operator">&gt;</span> <span class="token operator">|</span> Function <span class="token operator">|</span> Object<span class="token punctuation">,</span>
  data<span class="token operator">?</span><span class="token operator">:</span> VNodeData<span class="token punctuation">,</span>
  children<span class="token operator">?</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  normalizationType<span class="token operator">?</span><span class="token operator">:</span> number</span>
<span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token operator">|</span> Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> tag <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// direct component options / constructor</span>
    vnode <span class="token operator">=</span> <span class="token function">createComponent</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> data<span class="token punctuation">,</span> context<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
    
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),m=s("code",null,"return createElement(Test)",-1),b=s("code",null,"_createElement",-1),y=s("code",null,"createComponent",-1),h=s("code",null,"vnode",-1),f=s("p",null,[s("code",null,"createComponent"),n("函数做的事情可以分三部分：构建子组件构造函数、安装组件钩子、创建VNode实例")],-1),g=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createComponent</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">Ctor</span><span class="token operator">:</span> Class<span class="token operator">&lt;</span>Component<span class="token operator">&gt;</span> <span class="token operator">|</span> Function <span class="token operator">|</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token operator">?</span>VNodeData<span class="token punctuation">,</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  tag<span class="token operator">?</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token operator">|</span> Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> baseCtor <span class="token operator">=</span> context<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_base

  <span class="token comment">// plain options object: turn it into a constructor</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Ctor <span class="token operator">=</span> baseCtor<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// if at this stage it&#39;s not a constructor or an async component factory,</span>
  <span class="token comment">// reject.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> Ctor <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// async component</span>
  <span class="token keyword">let</span> asyncFactory
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">.</span>cid<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    asyncFactory <span class="token operator">=</span> Ctor
    Ctor <span class="token operator">=</span> <span class="token function">resolveAsyncComponent</span><span class="token punctuation">(</span>asyncFactory<span class="token punctuation">,</span> baseCtor<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Ctor <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// return a placeholder node for async component, which is rendered</span>
      <span class="token comment">// as a comment node but preserves all the raw information for the node.</span>
      <span class="token comment">// the information will be used for async server-rendering and hydration.</span>
      <span class="token keyword">return</span> <span class="token function">createAsyncPlaceholder</span><span class="token punctuation">(</span>
        asyncFactory<span class="token punctuation">,</span>
        data<span class="token punctuation">,</span>
        context<span class="token punctuation">,</span>
        children<span class="token punctuation">,</span>
        tag
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  data <span class="token operator">=</span> data <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token comment">// resolve constructor options in case global mixins are applied after</span>
  <span class="token comment">// component constructor creation</span>
  <span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">)</span>

  <span class="token comment">// transform component v-model data into props &amp; events</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>model<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">transformModel</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">.</span>options<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// extract props</span>
  <span class="token keyword">const</span> propsData <span class="token operator">=</span> <span class="token function">extractPropsFromVNodeData</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> Ctor<span class="token punctuation">,</span> tag<span class="token punctuation">)</span>

  <span class="token comment">// functional component</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">.</span>options<span class="token punctuation">.</span>functional<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">createFunctionalComponent</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> data<span class="token punctuation">,</span> context<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// extract listeners, since these needs to be treated as</span>
  <span class="token comment">// child component listeners instead of DOM listeners</span>
  <span class="token keyword">const</span> listeners <span class="token operator">=</span> data<span class="token punctuation">.</span>on
  <span class="token comment">// replace with listeners with .native modifier</span>
  <span class="token comment">// so it gets processed during parent component patch.</span>
  data<span class="token punctuation">.</span>on <span class="token operator">=</span> data<span class="token punctuation">.</span>nativeOn

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">.</span>options<span class="token punctuation">.</span>abstract<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// abstract components do not keep anything</span>
    <span class="token comment">// other than props &amp; listeners &amp; slot</span>

    <span class="token comment">// work around flow</span>
    <span class="token keyword">const</span> slot <span class="token operator">=</span> data<span class="token punctuation">.</span>slot
    data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>slot <span class="token operator">=</span> slot
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// install component management hooks onto the placeholder node</span>
  <span class="token function">installComponentHooks</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

  <span class="token comment">// return a placeholder vnode</span>
  <span class="token keyword">const</span> name <span class="token operator">=</span> Ctor<span class="token punctuation">.</span>options<span class="token punctuation">.</span>name <span class="token operator">||</span> tag
  <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue-component-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Ctor<span class="token punctuation">.</span>cid<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    data<span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span>
    <span class="token punctuation">{</span> Ctor<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> listeners<span class="token punctuation">,</span> tag<span class="token punctuation">,</span> children <span class="token punctuation">}</span><span class="token punctuation">,</span>
    asyncFactory
  <span class="token punctuation">)</span>

  <span class="token comment">// Weex specific: invoke recycle-list optimized @render function for</span>
  <span class="token comment">// extracting cell-slot template.</span>
  <span class="token comment">// https://github.com/Hanks10100/weex-native-directive/tree/master/component</span>
  <span class="token comment">/* istanbul ignore if */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__WEEX__ <span class="token operator">&amp;&amp;</span> <span class="token function">isRecyclableComponent</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">renderRecyclableComponentTemplate</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> vnode
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建子组件构造函数" tabindex="-1"><a class="header-anchor" href="#构建子组件构造函数" aria-hidden="true">#</a> 构建子组件构造函数</h2>`,2),w=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token keyword">const</span> baseCtor <span class="token operator">=</span> context<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_base

  <span class="token comment">// plain options object: turn it into a constructor</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Ctor <span class="token operator">=</span> baseCtor<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们先看下一般怎么使用组件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Test <span class="token keyword">from</span> <span class="token string">&quot;./components/test.vue&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;App&quot;</span><span class="token punctuation">,</span>

    <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        Test
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在这个<code>App</code>的组件中导出一个配置对象，其中注册了组件<code>Test</code></p><p>这里会使用<code>baseCtor.extend(Ctor)</code>创建出子组件的构造函数</p><p><code>context.$options._base</code>这个值是在项目中<code>import Vue from &quot;vue&quot;</code>的时候挂全局api挂上的</p>`,6),_=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">initGlobalAPI</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1),x=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initGlobalAPI</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">Vue</span><span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>

  <span class="token comment">// this is used to identify the &quot;base&quot; constructor to extend all plain-object</span>
  <span class="token comment">// components with in Weex&#39;s multi-instance scenarios.</span>
  Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>_base <span class="token operator">=</span> Vue
  
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的挂载是<code>Vue.options._base = Vue</code>为什么能在<code>context.$options._base</code>当前vue实例中获取呢</p><p>是因为在new Vue阶段调用的<code>_init</code>函数中将Vue构造函数的api和当前vue实例传入的<code>options</code>混合并赋值给<code>$options</code></p>`,3),C=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>vm<span class="token punctuation">.</span>$options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
    <span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span><span class="token punctuation">,</span>
    options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    vm
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后我们看下<code>extend</code>函数的实现</p>`,2),j=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token doc-comment comment">/**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped &quot;child
   * constructors&quot; for prototypal inheritance and cache them.
   */</span>
  Vue<span class="token punctuation">.</span>cid <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> cid <span class="token operator">=</span> <span class="token number">1</span>

  <span class="token doc-comment comment">/**
   * Class inheritance
   */</span>
  Vue<span class="token punctuation">.</span><span class="token function-variable function">extend</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">extendOptions</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
    extendOptions <span class="token operator">=</span> extendOptions <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">const</span> Super <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">const</span> SuperId <span class="token operator">=</span> Super<span class="token punctuation">.</span>cid
    <span class="token keyword">const</span> cachedCtors <span class="token operator">=</span> extendOptions<span class="token punctuation">.</span>_Ctor <span class="token operator">||</span> <span class="token punctuation">(</span>extendOptions<span class="token punctuation">.</span>_Ctor <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cachedCtors<span class="token punctuation">[</span>SuperId<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> cachedCtors<span class="token punctuation">[</span>SuperId<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> name <span class="token operator">=</span> extendOptions<span class="token punctuation">.</span>name <span class="token operator">||</span> Super<span class="token punctuation">.</span>options<span class="token punctuation">.</span>name

    <span class="token keyword">const</span> <span class="token function-variable function">Sub</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Super</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
    <span class="token class-name">Sub</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> Sub
    Sub<span class="token punctuation">.</span>cid <span class="token operator">=</span> cid<span class="token operator">++</span>
    Sub<span class="token punctuation">.</span>options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
      Super<span class="token punctuation">.</span>options<span class="token punctuation">,</span>
      extendOptions
    <span class="token punctuation">)</span>
    Sub<span class="token punctuation">[</span><span class="token string">&#39;super&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> Super

    <span class="token comment">// For props and computed properties, we define the proxy getters on</span>
    <span class="token comment">// the Vue instances at extension time, on the extended prototype. This</span>
    <span class="token comment">// avoids Object.defineProperty calls for each instance created.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Sub<span class="token punctuation">.</span>options<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">initProps</span><span class="token punctuation">(</span>Sub<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Sub<span class="token punctuation">.</span>options<span class="token punctuation">.</span>computed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">initComputed</span><span class="token punctuation">(</span>Sub<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// allow further extension/mixin/plugin usage</span>
    Sub<span class="token punctuation">.</span>extend <span class="token operator">=</span> Super<span class="token punctuation">.</span>extend
    Sub<span class="token punctuation">.</span>mixin <span class="token operator">=</span> Super<span class="token punctuation">.</span>mixin
    Sub<span class="token punctuation">.</span>use <span class="token operator">=</span> Super<span class="token punctuation">.</span>use

    <span class="token comment">// create asset registers, so extended classes</span>
    <span class="token comment">// can have their private assets too.</span>
    <span class="token constant">ASSET_TYPES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Sub<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> Super<span class="token punctuation">[</span>type<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// enable recursive self-lookup</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Sub<span class="token punctuation">.</span>options<span class="token punctuation">.</span>components<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> Sub
    <span class="token punctuation">}</span>

    <span class="token comment">// keep a reference to the super options at extension time.</span>
    <span class="token comment">// later at instantiation we can check if Super&#39;s options have</span>
    <span class="token comment">// been updated.</span>
    Sub<span class="token punctuation">.</span>superOptions <span class="token operator">=</span> Super<span class="token punctuation">.</span>options
    Sub<span class="token punctuation">.</span>extendOptions <span class="token operator">=</span> extendOptions
    Sub<span class="token punctuation">.</span>sealedOptions <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> Sub<span class="token punctuation">.</span>options<span class="token punctuation">)</span>

    <span class="token comment">// cache constructor</span>
    cachedCtors<span class="token punctuation">[</span>SuperId<span class="token punctuation">]</span> <span class="token operator">=</span> Sub
    <span class="token keyword">return</span> Sub
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Vue.extend</code>做的就是传入一个配置，生成一个继承<code>Vue</code>构造函数的子类构造函数<code>Sub</code>，并返回</p><ol><li>首先判断是否存在缓存<code>cachedCtors[SuperId]</code></li><li>创建一个构造函数<code>Sub</code></li><li>将<code>Sub</code>原型继承<code>Vue</code>的原型</li><li>拓展<code>Sub.options</code>配置</li><li>存入缓存<code>cachedCtors[SuperId] = Sub</code></li></ol><p>当我们实例化<code>Sub</code>的时候，就会调用<code>this._init(options)</code>，去实例化一个子类</p><h2 id="安装组件钩子" tabindex="-1"><a class="header-anchor" href="#安装组件钩子" aria-hidden="true">#</a> 安装组件钩子</h2>`,5),S=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">installComponentHooks</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1),V=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">installComponentHooks</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">data</span><span class="token operator">:</span> VNodeData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> hooks <span class="token operator">=</span> data<span class="token punctuation">.</span>hook <span class="token operator">||</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>hook <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> hooksToMerge<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> hooksToMerge<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">const</span> existing <span class="token operator">=</span> hooks<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">const</span> toMerge <span class="token operator">=</span> componentVNodeHooks<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>existing <span class="token operator">!==</span> toMerge <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span>existing <span class="token operator">&amp;&amp;</span> existing<span class="token punctuation">.</span>_merged<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      hooks<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> existing <span class="token operator">?</span> <span class="token function">mergeHook</span><span class="token punctuation">(</span>toMerge<span class="token punctuation">,</span> existing<span class="token punctuation">)</span> <span class="token operator">:</span> toMerge
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),N=s("code",null,"patch",-1),E=s("p",null,[n("我们之前说过vue.js的虚拟dom的创建、挂载、diff一套逻辑都是参考"),s("a",{href:"https://github.com/snabbdom/snabbdom",target:"view_window"},"snabbdom"),n("的，可以先研究下"),s("a",{href:"https://github.com/snabbdom/snabbdom",target:"view_window"},"snabbdom"),n("源码（省去很多vue的特性，代码简洁很多）")],-1),I=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// inline hooks to be invoked on component VNodes during patch</span>
<span class="token keyword">const</span> componentVNodeHooks <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">init</span> <span class="token punctuation">(</span>vnode<span class="token operator">:</span> VNodeWithData<span class="token punctuation">,</span> <span class="token literal-property property">hydrating</span><span class="token operator">:</span> boolean<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token operator">?</span>boolean <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      vnode<span class="token punctuation">.</span>componentInstance <span class="token operator">&amp;&amp;</span>
      <span class="token operator">!</span>vnode<span class="token punctuation">.</span>componentInstance<span class="token punctuation">.</span>_isDestroyed <span class="token operator">&amp;&amp;</span>
      vnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>keepAlive
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// kept-alive components, treat as a patch</span>
      <span class="token keyword">const</span> <span class="token literal-property property">mountedNode</span><span class="token operator">:</span> any <span class="token operator">=</span> vnode <span class="token comment">// work around flow</span>
      componentVNodeHooks<span class="token punctuation">.</span><span class="token function">prepatch</span><span class="token punctuation">(</span>mountedNode<span class="token punctuation">,</span> mountedNode<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> child <span class="token operator">=</span> vnode<span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> <span class="token function">createComponentInstanceForVnode</span><span class="token punctuation">(</span>
        vnode<span class="token punctuation">,</span>
        activeInstance
      <span class="token punctuation">)</span>
      child<span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span>hydrating <span class="token operator">?</span> vnode<span class="token punctuation">.</span>elm <span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">prepatch</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">oldVnode</span><span class="token operator">:</span> MountedComponentVNode<span class="token punctuation">,</span> <span class="token literal-property property">vnode</span><span class="token operator">:</span> MountedComponentVNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> options <span class="token operator">=</span> vnode<span class="token punctuation">.</span>componentOptions
    <span class="token keyword">const</span> child <span class="token operator">=</span> vnode<span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> oldVnode<span class="token punctuation">.</span>componentInstance
    <span class="token function">updateChildComponent</span><span class="token punctuation">(</span>
      child<span class="token punctuation">,</span>
      options<span class="token punctuation">.</span>propsData<span class="token punctuation">,</span> <span class="token comment">// updated props</span>
      options<span class="token punctuation">.</span>listeners<span class="token punctuation">,</span> <span class="token comment">// updated listeners</span>
      vnode<span class="token punctuation">,</span> <span class="token comment">// new parent vnode</span>
      options<span class="token punctuation">.</span>children <span class="token comment">// new children</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">insert</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vnode</span><span class="token operator">:</span> MountedComponentVNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> context<span class="token punctuation">,</span> componentInstance <span class="token punctuation">}</span> <span class="token operator">=</span> vnode
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>componentInstance<span class="token punctuation">.</span>_isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      componentInstance<span class="token punctuation">.</span>_isMounted <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token function">callHook</span><span class="token punctuation">(</span>componentInstance<span class="token punctuation">,</span> <span class="token string">&#39;mounted&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>keepAlive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>_isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// vue-router#1212</span>
        <span class="token comment">// During updates, a kept-alive component&#39;s child components may</span>
        <span class="token comment">// change, so directly walking the tree here may call activated hooks</span>
        <span class="token comment">// on incorrect children. Instead we push them into a queue which will</span>
        <span class="token comment">// be processed after the whole patch process ended.</span>
        <span class="token function">queueActivatedComponent</span><span class="token punctuation">(</span>componentInstance<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">activateChildComponent</span><span class="token punctuation">(</span>componentInstance<span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* direct */</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">destroy</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vnode</span><span class="token operator">:</span> MountedComponentVNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> componentInstance <span class="token punctuation">}</span> <span class="token operator">=</span> vnode
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>componentInstance<span class="token punctuation">.</span>_isDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>vnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>keepAlive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        componentInstance<span class="token punctuation">.</span><span class="token function">$destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">deactivateChildComponent</span><span class="token punctuation">(</span>componentInstance<span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* direct */</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总的来说<code>installComponentHooks</code>函数就是初始化组件的时候把<code>componentVNodeHooks</code>钩子都挂在组件的<code>data.hook</code>上，这里还有一个逻辑如果已经有相应的<code>hook</code>则通过<code>mergeHook(toMerge, existing)</code>合并<code>hook</code>（只merge一次）</p><p><code>mergeHook</code>的逻辑也很清晰，最终返回一个<code>merged</code>函数，内部就是先后调用两个需要merge的hook</p>`,3),A=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mergeHook</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">f1</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">f2</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">merged</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// flow complains about extra args which is why we use any</span>
    <span class="token function">f1</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
    <span class="token function">f2</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  merged<span class="token punctuation">.</span>_merged <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">return</span> merged
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建vnode实例" tabindex="-1"><a class="header-anchor" href="#创建vnode实例" aria-hidden="true">#</a> 创建VNode实例</h2><p>最后使用new VNode创建vnode实例，这里跟普通组件不同，是没有<code>children</code>（第三个参数）的，我们在之后<code>patch</code>中会说</p>`,3),O=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token comment">// return a placeholder vnode</span>
  <span class="token keyword">const</span> name <span class="token operator">=</span> Ctor<span class="token punctuation">.</span>options<span class="token punctuation">.</span>name <span class="token operator">||</span> tag
  <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VNode</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue-component-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Ctor<span class="token punctuation">.</span>cid<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    data<span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span>
    <span class="token punctuation">{</span> Ctor<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> listeners<span class="token punctuation">,</span> tag<span class="token punctuation">,</span> children <span class="token punctuation">}</span><span class="token punctuation">,</span>
    asyncFactory
  <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p><code>createComponent</code>函数最后返回<code>vnode</code>，之后还是会走<code>_update</code>函数，也就是<code>patch</code>函数更新视图</p>`,3);function B(D,M){const e=c("font"),p=c("RouterLink");return l(),u("div",null,[d,k,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/vdom/create-element.js")]),_:1}),v,s("p",null,[n("我们最开始渲染组件是使用"),a(p,{to:"/nav.1.vue2%E6%BA%90%E7%A0%81/3.%E7%BB%84%E4%BB%B6%E5%8C%96/1.%E4%BB%8B%E7%BB%8D.html"},{default:t(()=>[m]),_:1}),n("这么渲染的，这里"),b,n("函数使用"),y,n("获取组件"),h]),f,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/vdom/create-component.js")]),_:1}),g,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/vdom/create-component.js")]),_:1}),w,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/index.js")]),_:1}),_,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/global-api/index.js")]),_:1}),x,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/instance/init.js")]),_:1}),C,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/global-api/extend.js")]),_:1}),j,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/vdom/create-component.js")]),_:1}),S,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/vdom/create-component.js")]),_:1}),V,s("p",null,[n("在之前研究"),N,n("时知道会生成真实dom树并挂载到指定dom上，并"),a(p,{to:"/nav.1.vue2%E6%BA%90%E7%A0%81/2.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/7.Vue._update.html#%E8%A7%A6%E5%8F%91hook"},{default:t(()=>[n("触发hook")]),_:1}),n("，这里就是组件hook的挂载的地方")]),E,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/vdom/create-component.js")]),_:1}),I,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/vdom/create-component.js")]),_:1}),A,a(e,{color:"#999"},{default:t(()=>[n("文件路径: vue/src/core/vdom/create-component.js")]),_:1}),O])}const T=i(r,[["render",B],["__file","2.createComponent.html.vue"]]);export{T as default};
