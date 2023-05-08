import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.002a81c8.js";const t={},p=e(`<h1 id="type-challenges" tabindex="-1"><a class="header-anchor" href="#type-challenges" aria-hidden="true">#</a> type-challenges</h1><p>题目来自：https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md</p><h2 id="easy" tabindex="-1"><a class="header-anchor" href="#easy" aria-hidden="true">#</a> easy</h2><h3 id="_4-pick" tabindex="-1"><a class="header-anchor" href="#_4-pick" aria-hidden="true">#</a> 4 - pick</h3><p><code>{[Key in 1 | 2 | 3]: Key}</code> 可以根据 <code>Key</code> 的取值情况返回一个对象类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">/*
  4 - 实现 Pick
  -------
  by Anthony Fu (@antfu) #简单 #union #built-in

  ### 题目

  &gt; 欢迎 PR 改进翻译质量。

  实现 TS 内置的 \`Pick&lt;T, K&gt;\`，但不可以使用它。

  **从类型 \`T\` 中选择出属性 \`K\`，构造成一个新的类型**。

  例如：

  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick&lt;Todo, &#39;title&#39; | &#39;completed&#39;&gt;

  const todo: TodoPreview = {
      title: &#39;Clean room&#39;,
      completed: false,
  }

  &gt; 在 Github 上查看：https://tsch.js.org/4/zh-CN
*/</span>

<span class="token comment">/* _____________ 你的代码 _____________ */</span>

<span class="token keyword">type</span> <span class="token class-name">MyPick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Key <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span>Key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">/* _____________ 测试用例 _____________ */</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> Equal<span class="token punctuation">,</span> Expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@type-challenges/utils&#39;</span>

<span class="token keyword">type</span> <span class="token class-name">cases</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>Expected1<span class="token punctuation">,</span> MyPick<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">&#39;title&#39;</span><span class="token operator">&gt;&gt;&gt;</span><span class="token punctuation">,</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>Expected2<span class="token punctuation">,</span> MyPick<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">&#39;title&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;completed&#39;</span><span class="token operator">&gt;&gt;&gt;</span><span class="token punctuation">,</span>
  <span class="token comment">// @ts-expect-error</span>
  MyPick<span class="token operator">&lt;</span>Todo<span class="token punctuation">,</span> <span class="token string">&#39;title&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;completed&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;invalid&#39;</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token keyword">interface</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span>
  completed<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Expected1</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Expected2</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
  completed<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>

<span class="token comment">/* _____________ 下一步 _____________ */</span>
<span class="token comment">/*
  &gt; 分享你的解答：https://tsch.js.org/4/answer/zh-CN
  &gt; 查看解答：https://tsch.js.org/4/solutions
  &gt; 更多题目：https://tsch.js.org/zh-CN
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-readonly" tabindex="-1"><a class="header-anchor" href="#_7-readonly" aria-hidden="true">#</a> 7 - readonly</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">/*
  7 - 实现 Readonly
  -------
  by Anthony Fu (@antfu) #简单 #built-in #readonly #object-keys

  ### 题目

  &gt; 欢迎 PR 改进翻译质量。

  不要使用内置的\`Readonly&lt;T&gt;\`，自己实现一个。

  该 \`Readonly\` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会被 \`readonly\` 所修饰。

  也就是不可以再对该对象的属性赋值。

  例如：

  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly&lt;Todo&gt; = {
    title: &quot;Hey&quot;,
    description: &quot;foobar&quot;
  }

  todo.title = &quot;Hello&quot; // Error: cannot reassign a readonly property
  todo.description = &quot;barFoo&quot; // Error: cannot reassign a readonly property

  &gt; 在 Github 上查看：https://tsch.js.org/7/zh-CN
*/</span>

<span class="token comment">/* _____________ 你的代码 _____________ */</span>

<span class="token keyword">type</span> <span class="token class-name">MyReadonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> <span class="token punctuation">[</span>Key <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span>Key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">/* _____________ 测试用例 _____________ */</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> Equal<span class="token punctuation">,</span> Expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@type-challenges/utils&#39;</span>

<span class="token keyword">type</span> <span class="token class-name">cases</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>MyReadonly<span class="token operator">&lt;</span>Todo1<span class="token operator">&gt;</span><span class="token punctuation">,</span> Readonly<span class="token operator">&lt;</span>Todo1<span class="token operator">&gt;&gt;&gt;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token keyword">interface</span> <span class="token class-name">Todo1</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span>
  completed<span class="token operator">:</span> <span class="token builtin">boolean</span>
  meta<span class="token operator">:</span> <span class="token punctuation">{</span>
    author<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* _____________ 下一步 _____________ */</span>
<span class="token comment">/*
  &gt; 分享你的解答：https://tsch.js.org/7/answer/zh-CN
  &gt; 查看解答：https://tsch.js.org/7/solutions
  &gt; 更多题目：https://tsch.js.org/zh-CN
*/</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-tuple-to-object" tabindex="-1"><a class="header-anchor" href="#_11-tuple-to-object" aria-hidden="true">#</a> 11 - Tuple to Object</h3><p><code>T[number]</code> 可以将元祖中类型提取出来，并以联合类型形式返回</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">/*
  11 - 元组转换为对象
  -------
  by sinoon (@sinoon) #简单 #object-keys

  ### 题目

  &gt; 欢迎 PR 改进翻译质量。

  传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

  例如：

  const tuple = [&#39;tesla&#39;, &#39;model 3&#39;, &#39;model X&#39;, &#39;model Y&#39;] as const

  type result = TupleToObject&lt;typeof tuple&gt; // expected { tesla: &#39;tesla&#39;, &#39;model 3&#39;: &#39;model 3&#39;, &#39;model X&#39;: &#39;model X&#39;, &#39;model Y&#39;: &#39;model Y&#39;}

  &gt; 在 Github 上查看：https://tsch.js.org/11/zh-CN
*/</span>

<span class="token comment">/* _____________ 你的代码 _____________ */</span>
<span class="token keyword">type</span> <span class="token class-name">TupleToObject<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token keyword">readonly</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Key <span class="token keyword">in</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token operator">:</span> Key
<span class="token punctuation">}</span>

<span class="token comment">/* _____________ 测试用例 _____________ */</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> Equal<span class="token punctuation">,</span> Expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@type-challenges/utils&#39;</span>

<span class="token keyword">const</span> tuple <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;tesla&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;model 3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;model X&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;model Y&#39;</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span>
<span class="token keyword">const</span> tupleNumber <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span>
<span class="token keyword">const</span> tupleMix <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;4&#39;</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span>

<span class="token keyword">type</span> <span class="token class-name">cases</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>TupleToObject<span class="token operator">&lt;</span><span class="token keyword">typeof</span> tuple<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> tesla<span class="token operator">:</span> <span class="token string">&#39;tesla&#39;</span><span class="token punctuation">;</span> <span class="token string">&#39;model 3&#39;</span><span class="token operator">:</span> <span class="token string">&#39;model 3&#39;</span><span class="token punctuation">;</span> <span class="token string">&#39;model X&#39;</span><span class="token operator">:</span> <span class="token string">&#39;model X&#39;</span><span class="token punctuation">;</span> <span class="token string">&#39;model Y&#39;</span><span class="token operator">:</span> <span class="token string">&#39;model Y&#39;</span> <span class="token punctuation">}</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>TupleToObject<span class="token operator">&lt;</span><span class="token keyword">typeof</span> tupleNumber<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token number">4</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>TupleToObject<span class="token operator">&lt;</span><span class="token keyword">typeof</span> tupleMix<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token string">&#39;2&#39;</span><span class="token operator">:</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">;</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token string">&#39;4&#39;</span><span class="token operator">:</span> <span class="token string">&#39;4&#39;</span> <span class="token punctuation">}</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token comment">// @ts-expect-error</span>
<span class="token keyword">type</span> <span class="token class-name">error</span> <span class="token operator">=</span> TupleToObject<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>

<span class="token comment">/* _____________ 下一步 _____________ */</span>
<span class="token comment">/*
  &gt; 分享你的解答：https://tsch.js.org/11/answer/zh-CN
  &gt; 查看解答：https://tsch.js.org/11/solutions
  &gt; 更多题目：https://tsch.js.org/zh-CN
*/</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_14-first-of-array" tabindex="-1"><a class="header-anchor" href="#_14-first-of-array" aria-hidden="true">#</a> 14 - First of Array</h3><p>通过 <code>infer</code> 提取数组第一项</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">/*
  14 - 第一个元素
  -------
  by Anthony Fu (@antfu) #简单 #array

  ### 题目

  &gt; 欢迎 PR 改进翻译质量。

  实现一个通用\`First&lt;T&gt;\`，它接受一个数组\`T\`并返回它的第一个元素的类型。

  例如：

  type arr1 = [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;]
  type arr2 = [3, 2, 1]

  type head1 = First&lt;arr1&gt; // expected to be &#39;a&#39;
  type head2 = First&lt;arr2&gt; // expected to be 3

  &gt; 在 Github 上查看：https://tsch.js.org/14/zh-CN
*/</span>

<span class="token comment">/* _____________ 你的代码 _____________ */</span>

<span class="token keyword">type</span> <span class="token class-name">First<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">[</span><span class="token keyword">infer</span> <span class="token constant">L</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">infer</span> <span class="token constant">R</span><span class="token punctuation">]</span> <span class="token operator">?</span> <span class="token constant">L</span> <span class="token operator">:</span> <span class="token builtin">never</span>

<span class="token comment">/* _____________ 测试用例 _____________ */</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> Equal<span class="token punctuation">,</span> Expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@type-challenges/utils&#39;</span>

<span class="token keyword">type</span> <span class="token class-name">cases</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>First<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>First<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">123</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">123</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>First<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token builtin">never</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>First<span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token keyword">undefined</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token keyword">type</span> <span class="token class-name">errors</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token comment">// @ts-expect-error</span>
  First<span class="token operator">&lt;</span><span class="token string">&#39;notArray&#39;</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token comment">// @ts-expect-error</span>
  First<span class="token operator">&lt;</span><span class="token punctuation">{</span> <span class="token number">0</span><span class="token operator">:</span> <span class="token string">&#39;arrayLike&#39;</span> <span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token comment">/* _____________ 下一步 _____________ */</span>
<span class="token comment">/*
  &gt; 分享你的解答：https://tsch.js.org/14/answer/zh-CN
  &gt; 查看解答：https://tsch.js.org/14/solutions
  &gt; 更多题目：https://tsch.js.org/zh-CN
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_18-length-of-tuple" tabindex="-1"><a class="header-anchor" href="#_18-length-of-tuple" aria-hidden="true">#</a> 18 - Length of Tuple</h3><p>数组类型可以通过 <code>Arr[&#39;length&#39;]</code> 属性获取长度</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">/*
  18 - 获取元组长度
  -------
  by sinoon (@sinoon) #简单 #tuple

  ### 题目

  &gt; 欢迎 PR 改进翻译质量。

  创建一个通用的\`Length\`，接受一个\`readonly\`的数组，返回这个数组的长度。

  例如：

  type tesla = [&#39;tesla&#39;, &#39;model 3&#39;, &#39;model X&#39;, &#39;model Y&#39;]
  type spaceX = [&#39;FALCON 9&#39;, &#39;FALCON HEAVY&#39;, &#39;DRAGON&#39;, &#39;STARSHIP&#39;, &#39;HUMAN SPACEFLIGHT&#39;]

  type teslaLength = Length&lt;tesla&gt; // expected 4
  type spaceXLength = Length&lt;spaceX&gt; // expected 5

  &gt; 在 Github 上查看：https://tsch.js.org/18/zh-CN
*/</span>

<span class="token comment">/* _____________ 你的代码 _____________ */</span>

<span class="token keyword">type</span> <span class="token class-name">Length<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token keyword">readonly</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token string">&#39;length&#39;</span><span class="token punctuation">]</span>

<span class="token comment">/* _____________ 测试用例 _____________ */</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> Equal<span class="token punctuation">,</span> Expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@type-challenges/utils&#39;</span>

<span class="token keyword">const</span> tesla <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;tesla&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;model 3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;model X&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;model Y&#39;</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span>
<span class="token keyword">const</span> spaceX <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;FALCON 9&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;FALCON HEAVY&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;DRAGON&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;STARSHIP&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;HUMAN SPACEFLIGHT&#39;</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span>

<span class="token keyword">type</span> <span class="token class-name">cases</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>Length<span class="token operator">&lt;</span><span class="token keyword">typeof</span> tesla<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
  Expect<span class="token operator">&lt;</span>Equal<span class="token operator">&lt;</span>Length<span class="token operator">&lt;</span><span class="token keyword">typeof</span> spaceX<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
  <span class="token comment">// @ts-expect-error</span>
  Length<span class="token operator">&lt;</span><span class="token number">5</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token comment">// @ts-expect-error</span>
  Length<span class="token operator">&lt;</span><span class="token string">&#39;hello world&#39;</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token comment">/* _____________ 下一步 _____________ */</span>
<span class="token comment">/*
  &gt; 分享你的解答：https://tsch.js.org/18/answer/zh-CN
  &gt; 查看解答：https://tsch.js.org/18/solutions
  &gt; 更多题目：https://tsch.js.org/zh-CN
*/</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3>`,18),l=[p];function o(i,c){return s(),a("div",null,l)}const u=n(t,[["render",o],["__file","99.type-challenges.html.vue"]]);export{u as default};
