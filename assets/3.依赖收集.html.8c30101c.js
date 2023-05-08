import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as c,c as i,e as a,w as e,a as t,b as n,d as p,r as l}from"./app.002a81c8.js";const u={},r=t("h1",{id:"依赖收集",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#依赖收集","aria-hidden":"true"},"#"),n(" 依赖收集")],-1),d=t("p",null,"上一章我们知道Vue在初始化（new Vue）的时候会将我们配置的data属性变成可观察对象，可观察对象的getter就是用来做依赖收集的，我们先回顾下getter中的逻辑",-1),k=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">defineReactive</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">val</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  customSetter<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Function<span class="token punctuation">,</span>
  shallow<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> property <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>configurable <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// cater for pre-defined getter/setters</span>
  <span class="token keyword">const</span> getter <span class="token operator">=</span> property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>get
  <span class="token keyword">const</span> setter <span class="token operator">=</span> property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>set
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">!</span>getter <span class="token operator">||</span> setter<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> arguments<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    val <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 对象值可能也是一个对象，递归创建Observer实例</span>
  <span class="token keyword">let</span> childOb <span class="token operator">=</span> <span class="token operator">!</span>shallow <span class="token operator">&amp;&amp;</span> <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 收集依赖</span>
        dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">// 如果值为对象，则递归收集依赖</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>childOb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          childOb<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">dependArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> value
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveSetter</span> <span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 暂时忽略</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>getter中重要的两个逻辑</p><ul><li>通过之前<code>const dep = new Dep()</code>的实例调用<code>dep.depend()</code>方法收集依赖，这里的dep实例是通过闭包保存</li><li>递归实现子元素依赖收集，这里的逻辑我们之后说</li></ul><h2 id="dep" tabindex="-1"><a class="header-anchor" href="#dep" aria-hidden="true">#</a> Dep</h2><p>Dep的作用就是收集依赖</p>`,5),v=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> uid <span class="token operator">=</span> <span class="token number">0</span>

<span class="token doc-comment comment">/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token operator">?</span>Watcher<span class="token punctuation">;</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
  <span class="token literal-property property">subs</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Watcher<span class="token operator">&gt;</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> uid<span class="token operator">++</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加依赖</span>
  <span class="token function">addSub</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">sub</span><span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 删除依赖</span>
  <span class="token function">removeSub</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">sub</span><span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">,</span> sub<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 收集依赖</span>
  <span class="token function">depend</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Dep.target实时上就是Watcher实例，全局唯一</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 调用实例上的addDep方法在Watcher实例上保存当前Dep（newDeps）</span>
      <span class="token comment">// 并且会调用当前Dep实例的addSub方法添加依赖</span>
      Dep<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">addDep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 更新依赖</span>
  <span class="token function">notify</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// stabilize the subscriber list first</span>
    <span class="token keyword">const</span> subs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>config<span class="token punctuation">.</span>async<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// subs aren&#39;t sorted in scheduler if not running async</span>
      <span class="token comment">// we need to sort them now to make sure they fire in correct</span>
      <span class="token comment">// order</span>
      subs<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>id <span class="token operator">-</span> b<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> subs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      subs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// The current target watcher being evaluated.</span>
<span class="token comment">// This is globally unique because only one watcher</span>
<span class="token comment">// can be evaluated at a time.</span>
Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">const</span> targetStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">pushTarget</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token operator">?</span>Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  targetStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> target
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">popTarget</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  targetStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> targetStack<span class="token punctuation">[</span>targetStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Dep</code>上有一个静态属性<code>target</code>， 这个属性是每个Vue实例唯一的，为观察者<code>Watcher</code>，包括<code>subs</code>也是<code>Watcher</code>数组</p><p><code>Dep</code>是对<code>Watcher</code>的一种管理，会通知<code>Watcher</code>：“数据变化了，该更新视图了”</p><p>我们需要了解<code>Watcher</code>才能知道整个依赖收集过程</p><h2 id="watcher" tabindex="-1"><a class="header-anchor" href="#watcher" aria-hidden="true">#</a> Watcher</h2>`,5),m=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> uid <span class="token operator">=</span> <span class="token number">0</span>

<span class="token doc-comment comment">/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
    <span class="token literal-property property">expOrFn</span><span class="token operator">:</span> string <span class="token operator">|</span> Function<span class="token punctuation">,</span>
    <span class="token literal-property property">cb</span><span class="token operator">:</span> Function<span class="token punctuation">,</span>
    options<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
    isRenderWatcher<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vm <span class="token operator">=</span> vm
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isRenderWatcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>_watcher <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>
    vm<span class="token punctuation">.</span>_watchers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token comment">// options</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>deep
      <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>user
      <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy
      <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>sync
      <span class="token keyword">this</span><span class="token punctuation">.</span>before <span class="token operator">=</span> options<span class="token punctuation">.</span>before
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">=</span> cb
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token operator">++</span>uid <span class="token comment">// uid for batching</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token comment">// for lazy watchers</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>depIds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>expression <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span>
      <span class="token operator">?</span> expOrFn<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
    <span class="token comment">// parse expression for getter</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> expOrFn <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> expOrFn
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> <span class="token function">parsePath</span><span class="token punctuation">(</span>expOrFn<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>getter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> noop
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy
      <span class="token operator">?</span> <span class="token keyword">undefined</span>
      <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Evaluate the getter, and re-collect dependencies.
   */</span>
  <span class="token function">get</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Add a dependency to this directive.
   */</span>
  <span class="token function">addDep</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">dep</span><span class="token operator">:</span> Dep</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Clean up for dependency collection.
   */</span>
  <span class="token function">cleanupDeps</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */</span>
  <span class="token function">update</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */</span>
  <span class="token function">run</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */</span>
  <span class="token function">evaluate</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Depend on all deps collected by this watcher.
   */</span>
  <span class="token function">depend</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Remove self from all dependencies&#39; subscriber list.
   */</span>
  <span class="token function">teardown</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Watcher</code>中定义了一些<code>Dep</code>相关的属性和方法</p><ul><li><code>deps</code>、<code>newDeps</code>、<code>depIds</code>、<code>newDepIds</code>属性就是存放<code>Dep</code>的列表以及id，至于为什么会整两套，我们稍后再说</li><li><code>get</code>、<code>addDep</code>、<code>cleanupDeps</code>是依赖收集的相关方法，我们稍后再说</li></ul><h2 id="收集过程" tabindex="-1"><a class="header-anchor" href="#收集过程" aria-hidden="true">#</a> 收集过程</h2><p>依赖是从触发<code>$mount</code>开始的，我们之前分析过<code>$mount</code>最终会调用<code>mountComponent</code>方法</p>`,5),b=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mountComponent</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token operator">?</span>Element<span class="token punctuation">,</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// we set this to vm._watcher inside the watcher&#39;s constructor</span>
  <span class="token comment">// since the watcher&#39;s initial patch may call $forceUpdate (e.g. inside child</span>
  <span class="token comment">// component&#39;s mounted hook), which relies on vm._watcher being already defined</span>
  <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> updateComponent<span class="token punctuation">,</span> noop<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">before</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_isMounted <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>vm<span class="token punctuation">.</span>_isDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;beforeUpdate&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* isRenderWatcher */</span><span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在挂载过程我们会实例化一个<code>Watcher</code>，我们回到<code>Watcher</code>函数中</p>`,2),h=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
    <span class="token literal-property property">expOrFn</span><span class="token operator">:</span> string <span class="token operator">|</span> Function<span class="token punctuation">,</span>
    <span class="token literal-property property">cb</span><span class="token operator">:</span> Function<span class="token punctuation">,</span>
    options<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
    isRenderWatcher<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy
      <span class="token operator">?</span> <span class="token keyword">undefined</span>
      <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>

  <span class="token doc-comment comment">/**
   * Evaluate the getter, and re-collect dependencies.
   */</span>
  <span class="token function">get</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">pushTarget</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实例化<code>Watcher</code>的过程中会调用<code>get</code>方法，而<code>get</code>中先调用了<code>pushTarget(this)</code></p>`,2),y=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// The current target watcher being evaluated.</span>
<span class="token comment">// This is globally unique because only one watcher</span>
<span class="token comment">// can be evaluated at a time.</span>
Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">const</span> targetStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">pushTarget</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token operator">?</span>Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  targetStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> target
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>pushTarget(this)</code>方法赋值<code>Dep.target</code>，并把<code>Watcher</code>实例压栈</p><p>接着我们继续分析<code>Watcher</code>的<code>get</code>方法</p>`,3),w=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
    <span class="token literal-property property">expOrFn</span><span class="token operator">:</span> string <span class="token operator">|</span> Function<span class="token punctuation">,</span>
    <span class="token literal-property property">cb</span><span class="token operator">:</span> Function<span class="token punctuation">,</span>
    options<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
    isRenderWatcher<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// parse expression for getter</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> expOrFn <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> expOrFn
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> <span class="token function">parsePath</span><span class="token punctuation">(</span>expOrFn<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>getter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> noop
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy
      <span class="token operator">?</span> <span class="token keyword">undefined</span>
      <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">get</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">pushTarget</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> value
    <span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> value
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着调用<code>Watcher</code>的<code>getter</code>属性，其实就是在<code>mountComponent</code>函数中传入的</p>`,2),g=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先执行<code>vm._render()</code>因为之前分析过这个方法会生成 渲染 VNode，并且在这个过程中会对当前vue实例上的数据访问，这个时候就触发了数据对象的<code>getter</code></p><p>每一个对象数据都有一个<code>Dep</code>实例，在触发<code>getter</code>的时候会调用<code>dep.depend()</code>方法</p>`,3),f=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token function">depend</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Dep<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">addDep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上就是调用全实例唯一的<code>Watcher</code>实例的<code>addDep</code>方法</p>`,2),_=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">addDep</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">dep</span><span class="token operator">:</span> Dep</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> id <span class="token operator">=</span> dep<span class="token punctuation">.</span>id
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>depIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      dep<span class="token punctuation">.</span><span class="token function">addSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先<code>Watcher</code>会判断阻止<code>Dep</code>实例被添加多次，后执行<code>dep.addSub(this)</code></p>`,2),D=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token function">addSub</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">sub</span><span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说将<code>Watcher</code>实例添加到<code>Dep</code>实例的<code>subs</code>属性上，目的是后续变化可以通过<code>subs</code>属性去通知<code>Watcher</code>实例数据变化了</p><p>所以在<code>vm._render()</code>的过程中会触发所有数据的<code>getter</code>，这样就完成了大部分依赖收集的工作，接着我们回到<code>Watcher</code>执行<code>get</code>这里接着分析</p>`,3),j=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token function">get</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">pushTarget</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> value
    <span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">getter for watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> e
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      <span class="token comment">// &quot;touch&quot; every property so they are all tracked as</span>
      <span class="token comment">// dependencies for deep watching</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token function">popTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cleanupDeps</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> value
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通过<code>traverse(value)</code>回去递归触发子属性的<code>getter</code>，我们稍后说</li><li>之后运行<code>popTarget()</code>将<code>Watcher</code>出栈</li></ul>`,2),x=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">const</span> targetStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">popTarget</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  targetStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> targetStack<span class="token punctuation">[</span>targetStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上就是<code>Dep.target</code>恢复成上一个状态，因为当前vue实例的数据依赖收集已经完成</p>`,2),W=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cleanupDeps</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着就是清空之前依赖</p>`,2),S=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">cleanupDeps</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length
  <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>dep<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      dep<span class="token punctuation">.</span><span class="token function">removeSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> tmp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>depIds
  <span class="token keyword">this</span><span class="token punctuation">.</span>depIds <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds
  <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds <span class="token operator">=</span> tmp
  <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  tmp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps
  <span class="token keyword">this</span><span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps
  <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps <span class="token operator">=</span> tmp
  <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Vue是数据驱动的，每次数据变化都会触发<code>vm._render()</code>并重新触发数据的<code>getter</code>，所以<code>Watcher</code>会在实例化的时候生成两套用来存放<code>Dep</code>实例和id的数组，<code>newDeps</code>就表示新的，而<code>deps</code>就代表老的</p><p>在执行<code>cleanupDeps</code>时首先会移除<code>dep.subs</code>中的<code>Watcher</code>，然后在将旧的<code>deps</code>赋值新的<code>newDeps</code>列表，并将新的置空</p><p>明明已经在<code>addDep</code>判断重复id了这里在清除有什么作用呢</p><p>例如有一种场景，通过<code>v-if</code>去控制组件<code>A</code>和<code>B</code>的渲染，两个组件分别传有自己的数据</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>A</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShow<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:aData</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>aData<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>B</span> <span class="token attr-name">v-else</span> <span class="token attr-name">:bData</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>bData<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在初始化的时候渲染了组件<code>A</code>，就触发了<code>A</code>中数据的<code>getter</code>，完成了依赖收集，这里用props举例，我们在修改<code>aData</code>的时候会通知数据的观察者。如果我们修改<code>isShow</code>渲染了组件<code>B</code>，那么也会触发<code>B</code>中数据的<code>getter</code>，那么这时候<code>aData</code>变化了会通知<code>A</code>数据对应的观察者触发重新渲染，这显然是没有意义的。</p><p>因此Vue设计了每次收集依赖的时候都会移除旧的依赖，这样就保证了在刚才的场景中不会有额外的渲染开销</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>这章我们分析收集依赖的过程，在触发<code>setter</code>的时候也需要通知相应的依赖更新，下一章我们就分析派发更新的过程</p>`,10);function O(T,F){const s=l("font");return c(),i("div",null,[r,d,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/index.js")]),_:1}),k,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/dep.js")]),_:1}),v,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/watcher.js")]),_:1}),m,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/instance/lifecycle.js")]),_:1}),b,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/watcher.js")]),_:1}),h,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/dep.js")]),_:1}),y,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/watcher.js")]),_:1}),w,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/instance/lifecycle.js")]),_:1}),g,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/dep.js")]),_:1}),f,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/watcher.js")]),_:1}),_,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/dep.js")]),_:1}),D,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/watcher.js")]),_:1}),j,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/dep.js")]),_:1}),x,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/watcher.js")]),_:1}),W,a(s,{color:"#999"},{default:e(()=>[n("文件路径: /vue/src/core/observer/watcher.js")]),_:1}),S])}const I=o(u,[["render",O],["__file","3.依赖收集.html.vue"]]);export{I as default};
