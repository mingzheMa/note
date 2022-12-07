import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as t}from"./app.9ac9284b.js";const e={},p=t(`<h1 id="实现对某个对象部分属性进行修饰" tabindex="-1"><a class="header-anchor" href="#实现对某个对象部分属性进行修饰" aria-hidden="true">#</a> 实现对某个对象部分属性进行修饰</h1><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> obj<span class="token operator">:</span> Obj<span class="token operator">&lt;</span>
  <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    b<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    c<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">&quot;b&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;a&quot;</span>
<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  b<span class="token operator">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
  c<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 这里通过泛型K把对象拆成两部分，一个是包含K，一个是不包含K</span>
<span class="token comment">// 将这两部分组合成交叉类型，这里相当于合成一个</span>
<span class="token comment">// 如果K表示需要对这些属性进行修饰，那么就处理包含K的部分</span>
<span class="token keyword">type</span> <span class="token class-name">Obj<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> Readonly<span class="token operator">&lt;</span>Pick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span><span class="token operator">&gt;&gt;</span> <span class="token operator">&amp;</span>
  Omit<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token comment">// 并没有对c属性进行Readonly修饰，这里不会报错</span>
obj<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将对象属性拆分并拼接就能对部分属性修饰，如果我们需要传入控制属性的操作</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Obj</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  c<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  <span class="token keyword">readonly</span> d<span class="token operator">?</span><span class="token operator">:</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">;</span>
  <span class="token keyword">readonly</span> f<span class="token operator">:</span> <span class="token string">&quot;f&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Portion<span class="token operator">&lt;</span>
  Obj <span class="token keyword">extends</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  FindKey <span class="token keyword">extends</span> <span class="token keyword">keyof</span> Obj<span class="token punctuation">,</span>
  Type <span class="token keyword">extends</span> <span class="token string">&quot;Partial&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;Required&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;Readonly&quot;</span>
<span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span>Type <span class="token keyword">extends</span> <span class="token string">&quot;Partial&quot;</span>
  <span class="token operator">?</span> Partial<span class="token operator">&lt;</span>Pick<span class="token operator">&lt;</span>Obj<span class="token punctuation">,</span> FindKey<span class="token operator">&gt;&gt;</span>
  <span class="token operator">:</span> Type <span class="token keyword">extends</span> <span class="token string">&quot;Required&quot;</span>
  <span class="token operator">?</span> Required<span class="token operator">&lt;</span>Pick<span class="token operator">&lt;</span>Obj<span class="token punctuation">,</span> FindKey<span class="token operator">&gt;&gt;</span>
  <span class="token operator">:</span> Type <span class="token keyword">extends</span> <span class="token string">&quot;Readonly&quot;</span>
  <span class="token operator">?</span> Readonly<span class="token operator">&lt;</span>Pick<span class="token operator">&lt;</span>Obj<span class="token punctuation">,</span> FindKey<span class="token operator">&gt;&gt;</span>
  <span class="token operator">:</span> Pick<span class="token operator">&lt;</span>Obj<span class="token punctuation">,</span> FindKey<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span>
  Omit<span class="token operator">&lt;</span>Obj<span class="token punctuation">,</span> FindKey<span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">See<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token constant">K</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// type test1 = {</span>
<span class="token comment">//     readonly d?: &quot;d&quot; | undefined;</span>
<span class="token comment">//     readonly a: string;</span>
<span class="token comment">//     readonly f: &quot;f&quot;;</span>
<span class="token comment">//     b: number;</span>
<span class="token comment">//     c?: boolean | undefined;</span>
<span class="token comment">// }</span>
<span class="token keyword">type</span> <span class="token class-name">test1</span> <span class="token operator">=</span> See<span class="token operator">&lt;</span>Portion<span class="token operator">&lt;</span>Obj<span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Readonly&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">;</span>

<span class="token comment">// type test2 = {</span>
<span class="token comment">//     readonly d?: &quot;d&quot; | undefined;</span>
<span class="token comment">//     a?: string | undefined;</span>
<span class="token comment">//     readonly f: &quot;f&quot;;</span>
<span class="token comment">//     b: number;</span>
<span class="token comment">//     c?: boolean | undefined;</span>
<span class="token comment">// }</span>
<span class="token keyword">type</span> <span class="token class-name">test2</span> <span class="token operator">=</span> See<span class="token operator">&lt;</span>Portion<span class="token operator">&lt;</span>Obj<span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Partial&quot;</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),o=[p];function l(c,i){return s(),a("div",null,o)}const k=n(e,[["render",l],["__file","100.实现对某个对象部分属性进行修饰.html.vue"]]);export{k as default};
