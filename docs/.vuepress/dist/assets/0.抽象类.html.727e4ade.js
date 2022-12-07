import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.9ac9284b.js";const t={},c=e(`<h1 id="抽象类" tabindex="-1"><a class="header-anchor" href="#抽象类" aria-hidden="true">#</a> 抽象类</h1><p>抽象类表示该类只能用来继承，使用<code>abstract</code>修饰符可以得到ts支持，包括成员</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Father</span><span class="token punctuation">{</span>
    <span class="token keyword">abstract</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
    <span class="token keyword">abstract</span> abc<span class="token operator">:</span> <span class="token builtin">any</span>
    <span class="token keyword">abstract</span> def<span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Son</span> <span class="token keyword">implements</span> <span class="token class-name">Father</span><span class="token punctuation">{</span> <span class="token comment">// 报错：类“Son”错误实现类“Father”。你是想扩展“Father”并将其成员作为子类继承吗? 类型 &quot;Son&quot; 中缺少属性 &quot;def&quot;，但类型 &quot;Father&quot; 中需要该属性。ts(2720)</span>
    abc<span class="token operator">:</span> <span class="token builtin">any</span>
    
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>abc <span class="token operator">=</span> <span class="token string">&quot;123&quot;</span>
    <span class="token punctuation">}</span>

    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">new</span> <span class="token class-name">Father</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 报错：无法创建抽象类的实例。ts(2511)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以<code>implements</code>一个抽象类，需要完全实现抽象类中的属性和方法，对于抽象类他的本质就是描述类的结构</p>`,4),p=[c];function o(l,i){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","0.抽象类.html.vue"]]);export{d as default};
