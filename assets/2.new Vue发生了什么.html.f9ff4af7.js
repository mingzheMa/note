import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as o,e as p,w as i,a as n,b as s,d as c,r as l}from"./app.002a81c8.js";const u={},r=n("h1",{id:"new-vue-发生了什么",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#new-vue-发生了什么","aria-hidden":"true"},"#"),s(" new Vue 发生了什么")],-1),d=n("p",null,[s("我们找到 Vue 构造函数创建的地方，发现在 new Vue 的时候只调用了"),n("code",null,"this._init"),s("，函数是通过"),n("code",null,"initMixin(Vue)"),s("方式挂载 "),n("br")],-1),k=c(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> initMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./init&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stateMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./state&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./render&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> eventsMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./events&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> lifecycleMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./lifecycle&quot;</span>

<span class="token keyword">function</span> <span class="token function">Vue</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构建Vue实例时会调用该函数初始化传入配置</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 向Vue构造函数挂载一些方法</span>
<span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">stateMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">eventsMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">lifecycleMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">renderMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-prototype-init" tabindex="-1"><a class="header-anchor" href="#vue-prototype-init" aria-hidden="true">#</a> Vue.prototype._init</h2><p>该函数对当前 Vue 实例挂载一些属性/方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> initProxy <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./proxy&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./state&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initRender <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./render&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initEvents <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./events&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initLifecycle<span class="token punctuation">,</span> callHook <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./lifecycle&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initProvide<span class="token punctuation">,</span> initInjections <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./inject&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> extend<span class="token punctuation">,</span> mergeOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;../util/index&quot;</span>

<span class="token keyword">let</span> uid <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initMixin</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">Vue</span><span class="token operator">:</span> Class<span class="token operator">&lt;</span>Component<span class="token operator">&gt;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构建vue实例时初始化配置</span>
  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">options<span class="token operator">?</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token literal-property property">vm</span><span class="token operator">:</span> Component <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token comment">// vue实例id</span>
    vm<span class="token punctuation">.</span>_uid <span class="token operator">=</span> uid<span class="token operator">++</span>

    <span class="token comment">// 表示Vue根实例</span>
    vm<span class="token punctuation">.</span>_isVue <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// 合并配置</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>_isComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果是组件</span>
      <span class="token function">initInternalComponent</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果不是组件，则为项目初始化 main.js 中 new Vue</span>
      vm<span class="token punctuation">.</span>$options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
        <span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span><span class="token punctuation">,</span>
        options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        vm
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    vm<span class="token punctuation">.</span>_renderProxy <span class="token operator">=</span> vm
    vm<span class="token punctuation">.</span>_self <span class="token operator">=</span> vm
    <span class="token comment">// 初始化生命周期</span>
    <span class="token function">initLifecycle</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token comment">// 初始化事件相关</span>
    <span class="token function">initEvents</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token comment">// 初始化渲染相关</span>
    <span class="token function">initRender</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token comment">// 执行生命周期beforeCreate</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&quot;beforeCreate&quot;</span><span class="token punctuation">)</span>
    <span class="token comment">// 初始化依赖注入的inject部分</span>
    <span class="token function">initInjections</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span> <span class="token comment">// resolve injections before data/props</span>
    <span class="token comment">// 初始化数据相关</span>
    <span class="token function">initState</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token comment">// 初始化依赖注入的provide相关</span>
    <span class="token function">initProvide</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span> <span class="token comment">// resolve provide after data/props</span>
    <span class="token comment">// 执行生命周期created</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">)</span>

    <span class="token comment">// 如果存在el配置，则直接走挂载流程</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>实例配置<code>$options</code>，合并传入配置以及实例特性（比如是组件）</li><li>初始化声明周期属性<code>initLifecycle</code></li><li>初始化监听事件<code>initEvents</code></li><li>初始化插槽、创建 VNode 函数、组件属性、事件监听<code>initRender</code></li><li>触发生命周期函数<code>callHook(vm, &quot;beforeCreate&quot;)</code></li><li>初始化<a href="https://cn.vuejs.org/v2/api/#provide-inject" target="view_window">inject</a><code>initInjections</code></li><li>初始化<a href="https://cn.vuejs.org/v2/api/#props" target="view_window">props</a>、<a href="https://cn.vuejs.org/v2/api/#methods" target="view_window">methods</a>、<a href="https://cn.vuejs.org/v2/api/data" target="view_window">data</a>、<a href="https://cn.vuejs.org/v2/api/#computed" target="view_window">computed</a>、<a href="https://cn.vuejs.org/v2/api/#watch" target="view_window">watch</a><code>initState</code></li><li>初始化<a href="https://cn.vuejs.org/v2/api/#provide-inject" target="view_window">provide</a><code>initProvide</code></li><li>触发生命周期函数<code>callHook(vm, &quot;created&quot;)</code></li><li>如果 new Vue 传入<code>$el</code>配置，则自动调用<code>$mount</code></li></ol>`,5);function v(m,b){const a=l("font");return e(),o("div",null,[r,d,p(a,{color:"#999"},{default:i(()=>[s("文件路径: src/core/instance/index.js")]),_:1}),k])}const y=t(u,[["render",v],["__file","2.new Vue发生了什么.html.vue"]]);export{y as default};
