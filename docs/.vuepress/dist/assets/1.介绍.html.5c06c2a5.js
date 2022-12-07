import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.9ac9284b.js";const t={},p=e(`<h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1><p>组件化是vue.js核心思想之一，每一个组件的<code>template</code>、<code>script</code>是独立的，组件之间可以相互引用，嵌套</p><p>接下来我们从源码分析<code>createElement(App)</code>的初始化过程</p><p>main.js</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&quot;./components/App.vue&quot;</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">createElement</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">createElement</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">&quot;#app&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>./components/App.vue</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Test <span class="token keyword">from</span> <span class="token string">&quot;./components/test.vue&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;App&quot;</span><span class="token punctuation">,</span>

    <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        Test
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","1.介绍.html.vue"]]);export{d as default};
