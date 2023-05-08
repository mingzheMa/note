import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as t}from"./app.002a81c8.js";const p={},e=t(`<h1 id="响应式" tabindex="-1"><a class="header-anchor" href="#响应式" aria-hidden="true">#</a> 响应式</h1><p>手写 vue 响应式</p><h2 id="创建一个响应式数据" tabindex="-1"><a class="header-anchor" href="#创建一个响应式数据" aria-hidden="true">#</a> 创建一个响应式数据</h2><p>首先我们有一个副作用函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> rawObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;hellow&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> rawObj<span class="token punctuation">.</span>text<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数会更新视图，我们期望在 <code>rawObj</code> 更新时重新触发该函数，这里用 <code>Proxy</code> 实现</p><p><code>Proxy</code> 可以监听到对象的读写，可以在触发读的过程中将副作用函数收集起来，放入一个桶内。在写的时候将桶内的副作用函数取出来执行</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> rawObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;hellow&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 桶</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> proxyObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>rawObj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将副作用放入桶</span>
        bucket<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
        <span class="token comment">// 将桶内副作用执行</span>
        bucket<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token function">e</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>proxyObj<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">&#39;word&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通用副作用函数" tabindex="-1"><a class="header-anchor" href="#通用副作用函数" aria-hidden="true">#</a> 通用副作用函数</h2><p>上面代码中，副作用函数和代理对象是绑定的，导致每一个代理对象都需要一个副作用函数，我们将这个副作用函数赋给一个统一的变量</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> rawObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;hellow&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 桶</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 正在执行的副作用</span>
<span class="token keyword">let</span> activeEffect <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> proxyObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>rawObj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将副作用放入桶</span>
        activeEffect <span class="token operator">&amp;&amp;</span> bucket<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
        <span class="token comment">// 将桶内副作用执行</span>
        bucket<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token function">e</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 保存副作用函数并执行</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    activeEffect <span class="token operator">=</span> fn<span class="token punctuation">;</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    activeEffect <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行副作用</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>proxyObj<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">&#39;word&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们改造副作用函数，函数会保存传入的副作用并执行它，这样每次代理对象就可以将统一的副作用变量存入桶</p><h2 id="装副作用的桶" tabindex="-1"><a class="header-anchor" href="#装副作用的桶" aria-hidden="true">#</a> 装副作用的桶</h2><p>副作用函数中可能会使用多个对象数据，一个对象数据也可能被多个副作用使用，它们是多对多的关系。我们将所有的副作用都放在一个桶里会导致一个数据更新所有副作用函数都将执行，因此我们需要对这个桶进行修改</p><p>期望使用这种依赖关系</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>（WeakMap）
target
└───（Map）
    key
    └───（Set）
        effect
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要对代理对象的 <code>get</code>、<code>set</code> 配置进一步改动</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> rawObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;hellow&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">boolean</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 桶</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 正在执行的副作用</span>
<span class="token keyword">let</span> activeEffect <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> proxyObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>rawObj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
        <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 将副作用函数添加到桶中</span>
<span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果没有当前副作用则返回</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    <span class="token comment">// 在桶中获取key对应的副作用集合</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bucket<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> keyMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>keyMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        keyMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> effects <span class="token operator">=</span> keyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 将副作用放入桶</span>
    effects<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 将桶中的副作用取出来执行</span>
<span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bucket
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effect</span> <span class="token operator">=&gt;</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 保存副作用函数并执行</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    activeEffect <span class="token operator">=</span> fn<span class="token punctuation">;</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    activeEffect <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>proxyObj<span class="token punctuation">.</span>text<span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>boolean<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">&#39;word&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提取出 <code>track</code>、<code>trigger</code> 两个函数，分别用于将副作用添加到桶中、将桶中的副作用取出来执行</p><h2 id="分支情况" tabindex="-1"><a class="header-anchor" href="#分支情况" aria-hidden="true">#</a> 分支情况</h2><p>副作用函数内可以写 <code>if</code> 语句，当条件判断则一些情况不会触发更新，因此上面代码有个缺陷，我们假设一种情况</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 执行副作用</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>proxyObj<span class="token punctuation">.</span>boolean <span class="token operator">?</span> proxyObj<span class="token punctuation">.</span>text <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行副作用，当 <code>proxyObj.boolean === true</code> 时，桶内的结构为</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>（WeakMap）
proxyObj
│
├─── boolean
│    └─── effect
│
└─── text
     └─── effect
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果此时 <code>proxyObj.boolean === false</code> 时，无论 <code>proxyObj.text</code> 如何变化，将不会影响副作用的执行结果，这会造成额外的性能开销</p><p>我们只有在副作用函数执行的时候才能知道，哪些变量是不需要触发副作用更新的，因此需要再副作用函数执行之前，清除相关数据的依赖，也就是清除桶内先关数据的依赖</p><p>旧流程：副作用执行 =&gt; 收集依赖 =&gt; 数据变更 =&gt; 副作用执行 =&gt; 收集依赖 新流程：副作用执行 =&gt; 清除依赖 =&gt; 收集依赖 =&gt; 数据变更 =&gt; 副作用执行 =&gt; 清除依赖 =&gt; 收集依赖</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> rawObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;hellow&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">boolean</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 桶</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 正在执行的副作用</span>
<span class="token keyword">let</span> activeEffect <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> proxyObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>rawObj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
        <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 将副作用函数添加到桶中</span>
<span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果没有当前副作用则返回</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    <span class="token comment">// 在桶中获取key对应的副作用集合</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bucket<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> keyMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>keyMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        keyMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> effects <span class="token operator">=</span> keyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 将副作用放入桶</span>
    effects<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 将数据所依赖的副作用集合收集起来，可以从副作用函数中找到该数据所依赖的副作用列表</span>
    activeEffect<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 将桶中的副作用取出来执行</span>
<span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> effects <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effect</span> <span class="token operator">=&gt;</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 保存副作用函数并执行</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 副作用函数</span>
    <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        activeEffect <span class="token operator">=</span> effectFn<span class="token punctuation">;</span>
        <span class="token comment">// 从deps中剔除此副作用</span>
        <span class="token function">cleanup</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        activeEffect <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// deps收集依赖此副作用数据的副作用列表，用于更新时将此副作用剔除</span>
    effectFn<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 从依赖此effect数据的副作用列表中剔除effect</span>
<span class="token keyword">function</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token parameter">effect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    effect<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effects</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        effects<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>proxyObj<span class="token punctuation">.</span>boolean <span class="token operator">?</span> proxyObj<span class="token punctuation">.</span>text <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>boolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
proxyObj<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">&#39;word&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>首先我们改动副作用函数 <code>effectFn</code>，挂载 <code>deps</code> 属性，用于收集依赖当前副作用数据的副作用集合。<code>cleanup</code> 函数将当前副作用函数，从依赖中剔除</li><li>在收集依赖过程中，将该数据对应的副作用集合存入 <code>activeEffect.deps</code></li><li>更新依赖时需要将 <code>bucket.get(target).get(key)</code> 重新赋值，否则这里会无线循环</li></ol><br><blockquote><p>副作用函数 effectFn 的 deps 属性记录：[proxyObj.boolean 的副作用集合, proxyObj.text 的副作用集合]，更新前将 proxyObj.boolean 和 proxyObj.text 的副作用集合中剔除当前副作用</p></blockquote><br><blockquote><p>trigger 函数中执行副作用会导致无线循环，是因为使用 forEach 的原因 在执行副作用时需要清除桶内对应副作用，接着 track 会在将副作用收集到桶中，由于 trigger 中和执行副作用前清除操作的是同一个副作用列表，就会导致 forEach 不停的进行迭代 也就是说 trigger 会：执行副作用 1 =&gt; 清除副作用 1 =&gt; 重新添加副作用 2 =&gt; 执行副作用 2 =&gt; 清除副作用 2 =&gt; 重新添加副作用 3 =&gt; ...</p></blockquote><h2 id="effect-嵌套" tabindex="-1"><a class="header-anchor" href="#effect-嵌套" aria-hidden="true">#</a> effect 嵌套</h2><p>副作用函数内可能会嵌套若干副作用函数，就像组件内使用组件，如：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect2&#39;</span><span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect1&#39;</span><span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>boolean<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>boolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果代码不做修改，那么在更新 <code>proxyObj.boolean</code> 的时结果如下：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>effect2 hellow
effect1 true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>只打印了初始化的结果，更新 <code>proxyObj.boolean</code> 时却不触发副作用了</p><p>我们看下副作用函数执行规则：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 副作用函数</span>
<span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    activeEffect <span class="token operator">=</span> effectFn<span class="token punctuation">;</span>
    <span class="token comment">// 从deps中剔除此副作用</span>
    <span class="token function">cleanup</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 执行真正的副作用</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    activeEffect <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于使用 activeEffect 只能存储一个副作用，每次副作用执行完毕都赋值为 null，这就导致了 effect2 在执行完毕后将 activeEffect 置为 null，接着执行 effect1 时就判断了没有副作用</p><p>应该使用栈结构存储当前副作用，我们重构 activeEffect 为 effectStack</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 正在执行的副作用</span>
<span class="token keyword">let</span> effectStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 保存副作用函数并执行</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 副作用函数</span>
    <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 入栈</span>
        effectStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 从deps中剔除此副作用</span>
        <span class="token function">cleanup</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 执行真正的副作用</span>
        <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 出栈</span>
        effectStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// deps收集依赖此副作用数据的副作用列表，用于更新时将此副作用剔除</span>
    effectFn<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 将副作用函数添加到桶中</span>
<span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果没有当前副作用则返回</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>effectStack<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    <span class="token comment">// 在桶中获取key对应的副作用集合</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bucket<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> keyMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>keyMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        keyMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> effects <span class="token operator">=</span> keyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 将副作用放入桶</span>
    <span class="token keyword">const</span> activeEffect <span class="token operator">=</span> effectStack<span class="token punctuation">[</span>effectStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    effects<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 将数据所依赖的副作用集合收集起来，可以从副作用函数中找到该数据所依赖的副作用列表</span>
    activeEffect<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>对 effect 函数进行改造，执行副作用前将当前副作用入栈，执行后出栈</li><li>对 track 函数收集副作用的部分改造，取栈末尾的副作用函数，就是当前副作用</li></ol><p>继续使用上面的例子执行，修改 <code>proxyObj.boolean</code> 就会重新触发副作用函数</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>effect2 hellow
effect1 true
effect2 hellow
effect1 false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="避免无限循环" tabindex="-1"><a class="header-anchor" href="#避免无限循环" aria-hidden="true">#</a> 避免无限循环</h2><p>如果在副作用函数中读取一个数据，同时又操作它，那么会出现无限递归的情况</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect&#39;</span><span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码会报错栈溢出，我们来分析下 <code>proxyObj.num++</code> 这段代码相当于 <code>proxyObj.num = proxyObj.num + 1</code>（不考虑增量运算符在数据前后的问题</p><p>当副作用执行，会先通过 <code>track</code> 将副作用收集到桶中，紧接着触发数据更新调用 <code>trigger</code> 函数更新当前副作用，这样又回到开始的逻辑以此类推</p><p>此情况出现的原因是 <code>trigger</code> 中执行的副作用和当前副作用为同一个函数，我们只需要避免这种情况即可</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 将桶中的副作用取出来执行</span>
<span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> effects <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effect</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果即将执行的副作用为当前副作用，则跳过</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>effect <span class="token operator">===</span> effectStack<span class="token punctuation">[</span>effectStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="调度器-scheduler" tabindex="-1"><a class="header-anchor" href="#调度器-scheduler" aria-hidden="true">#</a> 调度器 scheduler</h2><p>可调度性是响应式系统重要的特性，指的是在 <code>trigger</code> 触发副作用时，可以选择触发的时机、次数、方式</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect&#39;</span><span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;同步代码执行完毕&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如这段代码执行时机为：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>effect 0 // 初始化副作用打印
effect 1 // 更新proxyObj.num时打印
同步代码执行完毕 // 代码执行完毕打印
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有需求要将触发 <code>proxyObj.num</code> 更新时的副作用改为异步触发，则打印结果为：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>effect 0 // 初始化副作用打印
同步代码执行完毕 // 代码执行完毕打印
effect 1 // 更新proxyObj.num时打印
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么我们就需要让副作用函数支持调度</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect&#39;</span><span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 调度器</span>
        <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">effect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先在函数 <code>effect</code> 增加第二个参数为 options</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 保存副作用函数并执行</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 副作用函数</span>
    <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 入栈</span>
        effectStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 从deps中剔除此副作用</span>
        <span class="token function">cleanup</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 执行真正的副作用</span>
        <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 出栈</span>
        effectStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// deps收集依赖此副作用数据的副作用列表，用于更新时将此副作用剔除</span>
    effectFn<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 挂载副作用配置</span>
    effectFn<span class="token punctuation">.</span>options <span class="token operator">=</span> options<span class="token punctuation">;</span>

    <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着将 options 参数挂载到，副作用函数 <code>effectFn</code> 上</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 将桶中的副作用取出来执行</span>
<span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> effects <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effect</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果即将执行的副作用为当前副作用，则跳过</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>effect <span class="token operator">===</span> effectStack<span class="token punctuation">[</span>effectStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>effect<span class="token punctuation">.</span>options<span class="token punctuation">.</span>scheduler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果有调度器配置，则调用调度器</span>
            effect<span class="token punctuation">.</span>options<span class="token punctuation">.</span><span class="token function">scheduler</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 否则直接执行副作用</span>
            <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后在 <code>trigger</code> 执行副作用函数之前判断是否配置了调度器，并将副作用函数传入。到这里副作用函数就支持调度了，我们使用调度器来完成最开始的例子</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect&#39;</span><span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 调度器</span>
        <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">effect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;同步代码执行完毕&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就通过调度器实现了异步执行副作用函数</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>effect 0
同步代码执行完毕
effect 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="无效更新" tabindex="-1"><a class="header-anchor" href="#无效更新" aria-hidden="true">#</a> 无效更新</h2><p>在修改数据时可能会出现以下情况</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect&#39;</span><span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>text<span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>boolean<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">&#39;word&#39;</span><span class="token punctuation">;</span>
proxyObj<span class="token punctuation">.</span>boolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时我们看下打印：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>effect hellow true // 首次触发
effect word true // 更新proxyObj.text触发
effect word false // 更新proxyObj.boolean触发
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出我们更新了两个数据，副作用函数触发了两次，实时上更新 <code>proxyObj.text</code> 数据只是中间状态，直到 <code>proxyObj.boolean</code> 更新完毕后才是最终结果，那么就存在第一次更新是无效的</p><p>利用上一节增加的调度器配置，我们在副作用执行的时候塞进任务队列，将队列去重后执行，这样实现了多次修改一次更新，代码上改动如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 任务队列</span>
<span class="token keyword">const</span> jobQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 任务队列正在执行</span>
<span class="token keyword">let</span> isFlushing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

<span class="token comment">// 执行jobQueue队列</span>
<span class="token keyword">function</span> <span class="token function">flushJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果队列正在执行则返回</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isFlushing<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    isFlushing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 异步微队列中执行任务列表</span>
        jobQueue<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">job</span> <span class="token operator">=&gt;</span> <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 执行完毕后将任务列表清空</span>
        jobQueue<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        isFlushing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先创建一个任务队列 <code>jobQueue</code>，用来存放即将被执行的副作用函数</p><p>后在 <code>flushJob</code> 函数中执行该队列，判断任务队列执行标识 <code>isFlushing</code>，防止任务队列反复执行，最后在异步中执行任务队列</p><p>这样代码改动就完成了，我们看下调度器中如何使用：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;effect&#39;</span><span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>text<span class="token punctuation">,</span> proxyObj<span class="token punctuation">.</span>boolean<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 调度器</span>
        <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">effect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 加入任务队列</span>
            jobQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 执行任务队列</span>
            <span class="token function">flushJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">&#39;word&#39;</span><span class="token punctuation">;</span>
proxyObj<span class="token punctuation">.</span>boolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只需要在调度器中将副作用函数加入任务队列，紧接着执行即可</p><p>由于加入的行为是同步逻辑，而执行队列则是异步逻辑，所以会将所有的副作用都加入任务队列后进入异步执行任务队列</p><h2 id="lazy-和计算属性-computed" tabindex="-1"><a class="header-anchor" href="#lazy-和计算属性-computed" aria-hidden="true">#</a> lazy 和计算属性 computed</h2><p>计算属性是在访问的时候执行的，因此我们需要实现副作用函数延迟执行</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 保存副作用函数并执行</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 副作用函数</span>
    <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 入栈</span>
        effectStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 从deps中剔除此副作用</span>
        <span class="token function">cleanup</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 新增：执行真正的副作用，将结果记录返回</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 出栈</span>
        effectStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 新增</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// deps收集依赖此副作用数据的副作用列表，用于更新时将此副作用剔除</span>
    effectFn<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 挂载副作用配置</span>
    effectFn<span class="token punctuation">.</span>options <span class="token operator">=</span> options<span class="token punctuation">;</span>

    <span class="token comment">// 新增：非懒执行</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 新增</span>
    <span class="token keyword">return</span> effectFn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> myEffectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>proxyObj<span class="token punctuation">.</span>num<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">myEffectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增加 effect 函数第二个参数配置 lazy，在函数内部进行判断 effectFn 是否执行，并最后将 effectFn 函数返回，这样就实现了副作用函数延迟执行</p><p>effectFn 函数内将真正副作用函数返回值返回，为计算属性做准备</p><p>只做了懒加载还远远不够，我们希望计算属性的调用方式如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> computedNum <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> proxyObj<span class="token punctuation">.</span>num <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>computedNum<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>computedNum<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>computedNum<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此我们需要对 effect 函数进行二次封装</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 计算属性</span>
<span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样使用计算属性是没有缓存的，也就是说每次访问 <code>computedNum.value</code> 的时候都会触发副作用函数，即使 <code>computedNum.value</code> 没有改变。我们可以增加缓存机制进一步提高性能</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 计算属性</span>
<span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 数据变化开关</span>
    <span class="token keyword">let</span> isChanged <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            isChanged <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 缓存</span>
    <span class="token keyword">let</span> cache <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>isChanged<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                isChanged <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                cache <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">return</span> cache<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先使用 isChanged 判断是否需要更新，更新后存入缓存 cache，并将开关 isChanged 关闭。当 getter 函数内的数据变化会触发 effect，我们利用调度器 scheduler 重新把开关 isChanged 打开，这样下次访问计算属性就可以重新计算了</p><p>我们来测试一下计算属性：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> computedNum <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> proxyObj<span class="token punctuation">.</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;computedNum.value更新了&#39;</span><span class="token punctuation">,</span> computedNum<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现只有副作用函数初始化的时候执行了，当 <code>proxyObj.num</code> 数据更新时却没有执行。这是因为副作用内的计算属性并没有调用 track 函数收集依赖，更新时也没有调用 trigger 函数更新依赖</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 计算属性</span>
<span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 数据变化开关</span>
    <span class="token keyword">let</span> isChanged <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            isChanged <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token comment">// 新增，在计算属性更新后立即触发依赖</span>
            <span class="token function">trigger</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 缓存</span>
    <span class="token keyword">let</span> cache <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>isChanged<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                isChanged <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                cache <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 新增，在访问时收集计算属性依赖</span>
            <span class="token function">track</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> cache<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在计算属性的访问和更新处分别加上了 track 和 trigger 用于收集依赖以及更新依赖，这样在调用刚才的例子就是期望的效果</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>computedNum.value更新了 0
computedNum.value更新了 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="监听属性-watch" tabindex="-1"><a class="header-anchor" href="#监听属性-watch" aria-hidden="true">#</a> 监听属性 watch</h2><p>我们期望使用监听属性的方式如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> proxyObj<span class="token punctuation">.</span>num<span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">newValue<span class="token punctuation">,</span> oldValue</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;proxyObj.num更新了&#39;</span><span class="token punctuation">,</span> oldValue<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span>
proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span>
proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建 watch 函数来实现监听功能</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 监听属性</span>
<span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> oldValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> newValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">// 监听副作用函数</span>
    <span class="token keyword">function</span> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 监听数据</span>
        <span class="token keyword">let</span> watchData <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> <span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> source<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> watchData<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>watchEffect<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            oldValue <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
            newValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">callback</span><span class="token punctuation">(</span>newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 首次手动调用收集依赖</span>
    <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建一个监听属性副作用函数，watchEffect 函数会访问需要监听的属性从而收集依赖 watchEffect。在数据更新时获取新旧数据并调用 callback 函数将其传入。这样就完成了监听属性的雏形，调用上面的例子看下结果：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>proxyObj.num更新了 null 1
proxyObj.num更新了 1 2
proxyObj.num更新了 2 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="深度监听-deep" tabindex="-1"><a class="header-anchor" href="#深度监听-deep" aria-hidden="true">#</a> 深度监听 deep</h3><p>我们知道监听属性可以进行深度监听，如果我们传入的 getter 返回一个对象则监听属性就会失效。我们需要对 watchEffect 函数进行改动，使监听属性可以深度监听对象</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 监听属性</span>
<span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> oldValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> newValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">// 监听副作用函数</span>
    <span class="token keyword">function</span> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 监听数据</span>
        <span class="token keyword">let</span> watchData <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> <span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> source<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 新增：访问对象中所有属性</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">traverse</span><span class="token punctuation">(</span>watchData<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> watchData<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">effect</span><span class="token punctuation">(</span>watchEffect<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token parameter">effect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            oldValue <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
            newValue <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">callback</span><span class="token punctuation">(</span>newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 新增：递归获取对象每一个属性</span>
<span class="token keyword">function</span> <span class="token function">traverse</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> seen <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> type <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;[object Array]&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;[object Object]&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>seen<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        seen<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">traverse</span><span class="token punctuation">(</span>node<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> seen<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在监听属性 watch 方法中增加第三个参数 options，判断 options.deep 属性是否需要深度监听该属性，如果需要则使用 traverse 方法来访问监听对象中每一个属性值，其中 seen 参数用来判断某个属性是否已经读取，避免循环引用。</p><blockquote><p>调用 traverse 方法访问属性值是在副作用函数中进行的，因此该对象内所有的方法都已经收集了该副作用做为依赖，在触发更新时就会执行该副作用</p></blockquote><h3 id="立即触发-immediate" tabindex="-1"><a class="header-anchor" href="#立即触发-immediate" aria-hidden="true">#</a> 立即触发 immediate</h3><p>监听属性可以增加 immediate 配置来使监听属性在初始化的时触发，我们需要对 watch 方法做修改</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 监听属性</span>
<span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> oldValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> newValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">// 监听副作用函数</span>
    <span class="token keyword">function</span> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 监听数据</span>
        <span class="token keyword">let</span> watchData <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> <span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> source<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">traverse</span><span class="token punctuation">(</span>watchData<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> watchData<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 新增：触发回调任务</span>
    <span class="token keyword">function</span> <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        oldValue <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
        newValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>watchEffect<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">scheduler</span><span class="token operator">:</span> job
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 新增：初始化是否触发回调</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 触发回调</span>
        <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 首次手动调用收集依赖</span>
        <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将 scheduler 提取出名为 job 的函数，该函数用于触发回调，在判断 options.immediate 即是否配置了首次触发回调，来判断直接触发回调 job 还是触发 effectFn 收集依赖</p><blockquote><p>job 函数中使用了 effectFn 副作用来获取最新的值，因此首次触发回调不需要在调用 effectFn 函数来收集依赖</p></blockquote><h3 id="执行时机-flush" tabindex="-1"><a class="header-anchor" href="#执行时机-flush" aria-hidden="true">#</a> 执行时机 flush</h3><p>vue3 中增加了 options.flush 配置，可以在异步中触发监听属性更新的回调，可以用于 DOM 更新结束后触发回调</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 监听属性</span>
<span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> oldValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> newValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">// 监听副作用函数</span>
    <span class="token keyword">function</span> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 监听数据</span>
        <span class="token keyword">let</span> watchData <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> <span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> source<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">traverse</span><span class="token punctuation">(</span>watchData<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> watchData<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 触发回调任务</span>
    <span class="token keyword">function</span> <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        oldValue <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
        newValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>watchEffect<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 新增：异步调用job</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>flush <span class="token operator">===</span> <span class="token string">&#39;post&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 触发回调</span>
        <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 首次手动调用收集依赖</span>
        <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 scheduler 中判断 options.flush 配置是否在异步触发 job 函数即可</p><h3 id="过期副作用" tabindex="-1"><a class="header-anchor" href="#过期副作用" aria-hidden="true">#</a> 过期副作用</h3><p>我们在监听属性中肯能会请求接口，如果一个监听属性被调用两次，那么就会有两个异步接口发出，由于接口响应的顺序无法保证，因此可能出现混乱，如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> proxyObj<span class="token punctuation">.</span>num<span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">newValue<span class="token punctuation">,</span> oldValue</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 模拟异步接口请求3s-5s打印</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;proxyObj.num更新了&#39;</span><span class="token punctuation">,</span> oldValue<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">3000</span> <span class="token operator">+</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span><span class="token punctuation">;</span>
proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码模拟异步接口请求，在 3s-5s 后打印值来模拟接口响应，多次执行代码发现打印结果不一样</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>proxyObj<span class="token punctuation">.</span>num更新了 <span class="token keyword">null</span> <span class="token number">1</span>
proxyObj<span class="token punctuation">.</span>num更新了 <span class="token number">1</span> <span class="token number">2</span>
<span class="token comment">// 可能是上面也可能是下面的结果</span>
proxyObj<span class="token punctuation">.</span>num更新了 <span class="token number">1</span> <span class="token number">2</span>
proxyObj<span class="token punctuation">.</span>num更新了 <span class="token keyword">null</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了避免这种情况我们需要一个注册过期副作用的函数，作为监听函数第三个参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">watch</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> proxyObj<span class="token punctuation">.</span>num<span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">,</span> onInvalidate</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> expired <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token function">onInvalidate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            expired <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token comment">// 模拟异步接口请求3s-5s打印</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token operator">!</span>expired <span class="token operator">&amp;&amp;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;proxyObj.num更新了&#39;</span><span class="token punctuation">,</span> oldValue<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">3000</span> <span class="token operator">+</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span><span class="token punctuation">;</span>
proxyObj<span class="token punctuation">.</span>num<span class="token operator">++</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当多次触发监听函数时，通过 onInvalidate 函数注册一个过期函数，当该监听函数过期后，就会触发过期函数，此时就只会打印最后一次更新。我们还需改动 watch 方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 监听属性</span>
<span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> oldValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> newValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 新增：清除监听函数</span>
    <span class="token keyword">let</span> cleanup <span class="token operator">=</span> <span class="token keyword">null</span>

    <span class="token comment">// 监听副作用函数</span>
    <span class="token keyword">function</span> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 监听数据</span>
        <span class="token keyword">let</span> watchData <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> <span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            watchData <span class="token operator">=</span> source<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">traverse</span><span class="token punctuation">(</span>watchData<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> watchData<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 触发回调任务</span>
    <span class="token keyword">function</span> <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 新增：清除函数有值则调用清除函数</span>
        cleanup <span class="token operator">&amp;&amp;</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        oldValue <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
        newValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 新增：赋值cleanup函数</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">,</span> <span class="token parameter">fn</span> <span class="token operator">=&gt;</span> cleanup <span class="token operator">=</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>watchEffect<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>flush <span class="token operator">===</span> <span class="token string">&#39;post&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 触发回调</span>
        <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 首次手动调用收集依赖</span>
        <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法内新增 cleanup 用来缓存过期函数，在执行 job 任务时调用 cleanup 缓存的过期函数，最后在调用 callback 时传入第三个参数为 cleanup 赋值函数</p><p>第一次更新会注册一个过期函数在 cleanup 中，当第二次更新时就会调用第一次注册的过期函数，从而清除第一次更新的监听函数，这样就可以保证多次更新时，保证最后一次是有效的</p>`,135),c=[e];function o(l,i){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","响应式.html.vue"]]);export{d as default};
