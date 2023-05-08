import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as p}from"./app.002a81c8.js";const t={},e=p(`<h1 id="迭代器-iterator" tabindex="-1"><a class="header-anchor" href="#迭代器-iterator" aria-hidden="true">#</a> 迭代器（iterator）</h1><p>迭代器是一个获取数据的一种方式，js规定迭代器必须有一个可以调用的next方法，每次调用该方法返回一个对象：<code>{ value: 当前值, done: 是否完成}</code>，如果一个数据已经迭代完毕则返回<code>{ value: undefined, done: true}</code>，例如这种结构</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> iterator <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">i</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>i<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>i <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token keyword">undefined</span> <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>i<span class="token punctuation">,</span>
      <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>i <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// { value: 2, done: false }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// { value: 1, done: false }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// { value: 0, done: false }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// { value: undefined, done: true }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="迭代一个数组" tabindex="-1"><a class="header-anchor" href="#迭代一个数组" aria-hidden="true">#</a> 迭代一个数组</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">ArrIterator</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>arr <span class="token operator">=</span> arr<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>index<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">isDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> arrIterator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrIterator</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arrIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 1, done: false }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arrIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 2, done: false }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arrIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 3, done: false }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arrIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 4, done: false }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arrIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 5, done: false }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arrIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: undefined, done: true }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code>ArrIterator</code> 类可以将数据转化成可迭代对象，其实例提供 <code>next</code> 方法，实例初始化时会记录数组和初始下标，每次调用 <code>next</code> 方法返回对应下标值，并将下标加一</p><h2 id="迭代斐波那契数列" tabindex="-1"><a class="header-anchor" href="#迭代斐波那契数列" aria-hidden="true">#</a> 迭代斐波那契数列</h2><blockquote><p>斐波那契数列，数列前两项为1，之后每一项都等于前两项的和</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Fibonacci</span> <span class="token punctuation">{</span>
  prev1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  prev2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> curr <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prev1 <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prev2<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>prev2 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prev1<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>prev1 <span class="token operator">=</span> curr<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> curr<span class="token punctuation">,</span>
      <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> fibonacci <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Fibonacci</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fibonacci<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fibonacci<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fibonacci<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 5</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fibonacci<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 8</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fibonacci<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 13</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先实现一个迭代器 <code>Fibonacci</code>实例，实例上定义了 <code>prev1</code> 和 <code>prev2</code> 表示当前项的前两项，该实例上有一个 <code>next</code> 方法，该方法每次调用都返回前两项的和，并替换 <code>prev1</code> 和 <code>prev2</code>，这样每次调用 <code>next</code> 都能返回前两项的和</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Fibonacci</span> <span class="token punctuation">{</span>
  prev1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  prev2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> curr <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prev1 <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prev2<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>prev2 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prev1<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>prev1 <span class="token operator">=</span> curr<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> curr<span class="token punctuation">,</span>
      <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getFibonacci</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> fibonacci <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Fibonacci</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> num <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res <span class="token operator">=</span> fibonacci<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getFibonacci</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 13</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以封装一个函数用于获取斐波那契数列某个下标的值，就是调用若干次 <code>Fibonacci</code> 实例的 <code>next</code> 方法（需要对前两项做特殊处理）</p><h2 id="可迭代协议" tabindex="-1"><a class="header-anchor" href="#可迭代协议" aria-hidden="true">#</a> 可迭代协议</h2><p>es6中的 <code>for...of</code> 就是用于迭代某个对象，要求就是该对象要满足可迭代协议</p><p>可迭代协议要求对象内部需要有 <code>[Symbol.iterator]</code> 属性，该属性的值是一个迭代器</p><p><code>for...of</code> 在调用的时候会通过 <code>[Symbol.iterator]</code> 属性获得迭代器，并调用迭代器的next方法进行迭代，通过判断done属性停止迭代，例如下面的伪代码</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// for...of 伪代码</span>
<span class="token keyword">const</span> iterator <span class="token operator">=</span> obj<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">.</span>done<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 循环体中的代码</span>
  <span class="token keyword">const</span> item <span class="token operator">=</span> result<span class="token punctuation">.</span>value
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>

  result <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","迭代器.html.vue"]]);export{k as default};
