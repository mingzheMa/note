import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as t}from"./app.9ac9284b.js";const e={},p=t(`<h1 id="静态类" tabindex="-1"><a class="header-anchor" href="#静态类" aria-hidden="true">#</a> 静态类</h1><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> Utils form <span class="token string">&quot;xxx&quot;</span>

Utils<span class="token punctuation">.</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Utils<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Utils<span class="token punctuation">.</span><span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想实现一个静态类，比如一个工具类，我们是不希望使用者去new这个类的，这时候可以使用类的<code>private</code>修饰符</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Utils</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">new</span> <span class="token class-name">Utils</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 报错：类“Utils”的构造函数是私有的，仅可在类声明中访问。ts(2673)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么我们想到既然<code>private</code>可以装饰<code>constructor</code>，那么<code>protected</code>可以么？</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Father</span> <span class="token punctuation">{</span>
  abc<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>

  <span class="token keyword">protected</span> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Son</span> <span class="token keyword">extends</span> <span class="token class-name">Father</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>abc <span class="token operator">=</span> <span class="token string">&quot;123&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">new</span> <span class="token class-name">Father</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 报错：类“Father”的构造函数是受保护的，仅可在类声明中访问。ts(2674)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然是可以的，只能在派生类使用</p>`,7),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","0.静态类.html.vue"]]);export{r as default};
