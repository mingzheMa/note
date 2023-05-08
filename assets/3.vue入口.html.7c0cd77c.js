import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c,e as t,w as e,a as s,b as n,d as p,r as l}from"./app.002a81c8.js";const u={},r=s("h1",{id:"vue-入口",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#vue-入口","aria-hidden":"true"},"#"),n(" vue 入口")],-1),d=s("p",null,[n("本次研究“web-full-cjs-dev”的打包配置（commonJS 风格、开发环境），根据配置找到源码位置，我们简化代码对核心部分进行分析（删除开发环境一些特殊处理），这里主要是对"),s("code",null,"Vue.prototype.$mount"),n("方法针对 web 环境进行二次封装，可以看出 Vue 函数是从./runtime/index 路径引入 "),s("br")],-1),k=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> cached <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;core/util/index&quot;</span>

<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&quot;./runtime/index&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> query <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./util/index&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> compileToFunctions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./compiler/index&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  shouldDecodeNewlines<span class="token punctuation">,</span>
  shouldDecodeNewlinesForHref
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./util/compat&quot;</span>

<span class="token keyword">const</span> idToTemplate <span class="token operator">=</span> <span class="token function">cached</span><span class="token punctuation">(</span><span class="token parameter">id</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
  <span class="token keyword">return</span> el <span class="token operator">&amp;&amp;</span> el<span class="token punctuation">.</span>innerHTML
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> mount <span class="token operator">=</span> <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$mount
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  <span class="token parameter">el<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Element<span class="token punctuation">,</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  el <span class="token operator">=</span> el <span class="token operator">&amp;&amp;</span> <span class="token function">query</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>

  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options
  <span class="token comment">// resolve template/el and convert to render function</span>
  <span class="token comment">// 这里认为是做的容错</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>
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

  <span class="token comment">// 参数透传</span>
  <span class="token keyword">return</span> <span class="token function">mount</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */</span>
<span class="token keyword">function</span> <span class="token function">getOuterHTML</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> Element</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>outerHTML<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> el<span class="token punctuation">.</span>outerHTML
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;div&quot;</span><span class="token punctuation">)</span>
    container<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> container<span class="token punctuation">.</span>innerHTML
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Vue<span class="token punctuation">.</span>compile <span class="token operator">=</span> compileToFunctions

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre><div class="highlight-lines"><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是对 Vue 构造函数添加一些拓展，真正的函数是在 core/index 中 <br></p>`,2),v=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&quot;core/index&quot;</span>
<span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">&quot;core/config&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> extend<span class="token punctuation">,</span> noop <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;shared/util&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mountComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;core/instance/lifecycle&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> devtools<span class="token punctuation">,</span> inBrowser <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;core/util/index&quot;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span>
  query<span class="token punctuation">,</span>
  mustUseProp<span class="token punctuation">,</span>
  isReservedTag<span class="token punctuation">,</span>
  isReservedAttr<span class="token punctuation">,</span>
  getTagNamespace<span class="token punctuation">,</span>
  isUnknownElement
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;web/util/index&quot;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> patch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./patch&quot;</span>
<span class="token keyword">import</span> platformDirectives <span class="token keyword">from</span> <span class="token string">&quot;./directives/index&quot;</span>
<span class="token keyword">import</span> platformComponents <span class="token keyword">from</span> <span class="token string">&quot;./components/index&quot;</span>

<span class="token comment">// install platform specific utils</span>
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>mustUseProp <span class="token operator">=</span> mustUseProp
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>isReservedTag <span class="token operator">=</span> isReservedTag
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>isReservedAttr <span class="token operator">=</span> isReservedAttr
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>getTagNamespace <span class="token operator">=</span> getTagNamespace
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>isUnknownElement <span class="token operator">=</span> isUnknownElement

<span class="token comment">// install platform runtime directives &amp; components</span>
<span class="token function">extend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>directives<span class="token punctuation">,</span> platformDirectives<span class="token punctuation">)</span>
<span class="token function">extend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>components<span class="token punctuation">,</span> platformComponents<span class="token punctuation">)</span>

<span class="token comment">// install platform patch function</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__patch__ <span class="token operator">=</span> inBrowser <span class="token operator">?</span> patch <span class="token operator">:</span> noop

<span class="token comment">// public mount method</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  <span class="token parameter">el<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Element<span class="token punctuation">,</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  el <span class="token operator">=</span> el <span class="token operator">&amp;&amp;</span> inBrowser <span class="token operator">?</span> <span class="token function">query</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">undefined</span>
  <span class="token keyword">return</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 这里是初始化vue-devtools的</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>inBrowser<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>devtools<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>devtools<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        devtools<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;init&quot;</span><span class="token punctuation">,</span> Vue<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里<code>initGlobalAPI()</code>是初始化全局 api，但还不是 Vue 构造函数声明的地方，接下来看./instance/index <br></p>`,2),m=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&quot;./instance/index&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initGlobalAPI <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./global-api/index&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> isServerRendering <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;core/util/env&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> FunctionalRenderContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;core/vdom/create-functional-component&quot;</span>

<span class="token function">initGlobalAPI</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&quot;$isServer&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">get</span><span class="token operator">:</span> isServerRendering
<span class="token punctuation">}</span><span class="token punctuation">)</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&quot;$ssrContext&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* istanbul ignore next */</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$vnode <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$vnode<span class="token punctuation">.</span>ssrContext
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// expose FunctionalRenderContext for ssr runtime helper installation</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>Vue<span class="token punctuation">,</span> <span class="token string">&quot;FunctionalRenderContext&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> FunctionalRenderContext
<span class="token punctuation">}</span><span class="token punctuation">)</span>

Vue<span class="token punctuation">.</span>version <span class="token operator">=</span> <span class="token string">&quot;__VERSION__&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-定义" tabindex="-1"><a class="header-anchor" href="#vue-定义" aria-hidden="true">#</a> vue 定义</h2><p>这里才是真正的万恶之源，Vue 构造函数声明的地方，并使用<code>xxxMixin</code>向构造函数的原型上挂载了一些方法（之后会逐个分析），这么做能提高代码灵活性并且条理清晰 <br></p>`,3),b=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> initMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./init&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stateMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./state&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./render&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> eventsMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./events&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> lifecycleMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./lifecycle&quot;</span>

<span class="token keyword">function</span> <span class="token function">Vue</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">stateMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">eventsMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">lifecycleMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">renderMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="initglobalapi" tabindex="-1"><a class="header-anchor" href="#initglobalapi" aria-hidden="true">#</a> initGlobalAPI</h2><p>initGlobalAPI 为挂载全局 api 的函数，官方文档中的<a href="https://cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80-API" target="view_window">全局 API</a>基本都在这个地方初始化，除了<a href="https://cn.vuejs.org/v2/api/#Vue-compile" target="view_window">Vue.compile</a>（是在重构mount函数的地方挂载src/platforms/web/entry-runtime-with-compiler.js）和<a href="https://cn.vuejs.org/v2/api/#Vue-version" target="view_window">Vue.version</a>（是在注册全局api的时候挂载src/core/index.js） <br><br> 此外官方代码中还提到<code>Vue.util</code>全局属性并不是公共api的一部分，可能回发生变化，是不稳定的</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">&quot;../config&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initUse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./use&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./mixin&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initExtend <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./extend&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initAssetRegisters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./assets&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> set<span class="token punctuation">,</span> del <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;../observer/index&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">ASSET_TYPES</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;shared/constants&quot;</span>
<span class="token keyword">import</span> builtInComponents <span class="token keyword">from</span> <span class="token string">&quot;../components/index&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> observe <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;core/observer/index&quot;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span>
  warn<span class="token punctuation">,</span>
  extend<span class="token punctuation">,</span>
  nextTick<span class="token punctuation">,</span>
  mergeOptions<span class="token punctuation">,</span>
  defineReactive
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;../util/index&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initGlobalAPI</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">Vue</span><span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// config</span>
  <span class="token keyword">const</span> configDef <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  configDef<span class="token punctuation">.</span><span class="token function-variable function">get</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> config
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>Vue<span class="token punctuation">,</span> <span class="token string">&quot;config&quot;</span><span class="token punctuation">,</span> configDef<span class="token punctuation">)</span>

  <span class="token comment">// exposed util methods.</span>
  <span class="token comment">// NOTE: these are not considered part of the public API - avoid relying on</span>
  <span class="token comment">// them unless you are aware of the risk.</span>
  Vue<span class="token punctuation">.</span>util <span class="token operator">=</span> <span class="token punctuation">{</span>
    warn<span class="token punctuation">,</span>
    extend<span class="token punctuation">,</span>
    mergeOptions<span class="token punctuation">,</span>
    defineReactive
  <span class="token punctuation">}</span>

  Vue<span class="token punctuation">.</span>set <span class="token operator">=</span> <span class="token keyword">set</span>
  Vue<span class="token punctuation">.</span>delete <span class="token operator">=</span> del
  Vue<span class="token punctuation">.</span>nextTick <span class="token operator">=</span> nextTick

  <span class="token comment">// 2.6 explicit observable API</span>
  Vue<span class="token punctuation">.</span><span class="token function-variable function">observable</span> <span class="token operator">=</span> <span class="token parameter">obj</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">observe</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
    <span class="token keyword">return</span> obj
  <span class="token punctuation">}</span>

  Vue<span class="token punctuation">.</span>options <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token constant">ASSET_TYPES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    Vue<span class="token punctuation">.</span>options<span class="token punctuation">[</span>type <span class="token operator">+</span> <span class="token string">&quot;s&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">// this is used to identify the &quot;base&quot; constructor to extend all plain-object</span>
  <span class="token comment">// components with in Weex&#39;s multi-instance scenarios.</span>
  Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>_base <span class="token operator">=</span> Vue

  <span class="token function">extend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>components<span class="token punctuation">,</span> builtInComponents<span class="token punctuation">)</span>

  <span class="token function">initUse</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
  <span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
  <span class="token function">initExtend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
  <span class="token function">initAssetRegisters</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function f(y,w){const a=l("font");return i(),c("div",null,[r,d,t(a,{color:"#999"},{default:e(()=>[n("文件路径: src/platforms/web/entry-runtime-with-compiler.js")]),_:1}),k,t(a,{color:"#999"},{default:e(()=>[n("文件路径: src/platforms/web/runtime/index.js")]),_:1}),v,t(a,{color:"#999"},{default:e(()=>[n("文件路径: src/core/index.js")]),_:1}),m,t(a,{color:"#999"},{default:e(()=>[n("文件路径: src/core/instance/index.js")]),_:1}),b])}const h=o(u,[["render",f],["__file","3.vue入口.html.vue"]]);export{h as default};
