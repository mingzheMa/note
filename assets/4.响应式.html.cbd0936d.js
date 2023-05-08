import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.002a81c8.js";const t="/note/assets/vue2defineProperty.257f068c.png",p="/note/assets/reactive.0937635b.png",o={},c=e('<h1 id="响应式" tabindex="-1"><a class="header-anchor" href="#响应式" aria-hidden="true">#</a> 响应式</h1><p>响应式是vue的一大核心思想，在数据更新的时候自动更新视图，先回顾一下vue2.x的响应式是如何实现的</p><p><img src="'+t+`" alt=""></p><p>在init阶段对data配置进行初始化，将data转化为可观察对象（Observer），在可观察对象的getter函数中使用dep收集依赖watcher，在setter函数中通知dep中的watcher更新。之后再mount阶段创建watcher的时候对data中的对象进行手动访问，从而触发依赖收集</p><p>其中dep就是一个依赖收集器，用来收集依赖也就是监听者watcher，而watcher就是用来通知更新的，实际上watcher上记录着当前的vue实例，触发更新也是vue实例的更新</p><p>可观察对象的内部是使用 <code>Object.defineProperty</code> 实现的，通过数据劫持实现收集和更新数据时使用dep通知依赖watcher更新视图，<code>Object.defineProperty</code> 也有一些缺点，因为是对象属性的监听，所以无法监听到对象的增加和删除，初始化递归全部data数据也有一些性能提升的空间</p><p>vue3为了解决 <code>Object.defineProperty</code> 这些问题，选用 <code>Proxy</code> 重写了响应式的部分，并将响应式的代码都放在reactivity库下</p><h2 id="reactive-api" tabindex="-1"><a class="header-anchor" href="#reactive-api" aria-hidden="true">#</a> Reactive API</h2><p>vue2.x响应式的前提是需要将数据定义在data中，如果直接向vue实例添加属性是不会有响应式的，前面也说到响应式是在init阶段对data进行的处理，之所以可以直接通过实例访问data的数据，是因为vue2.x将data的属性都代理到了vue实例上</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">test1</span><span class="token operator">:</span> <span class="token string">&quot;test1&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>test2 <span class="token operator">=</span> <span class="token string">&quot;test2&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">setTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>test1 <span class="token operator">=</span> <span class="token string">&quot;test111&quot;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>test2 <span class="token operator">=</span> <span class="token string">&quot;test222&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>test2</code> 因为直接定义在vue实例上，所以在 <code>setTest</code> 函数中修改是不会有响应式的。响应式会牺牲性能，如果有些数据为常量，并不希望有响应式，那么可以这么做</p><p>vue3通过Reactive API实现响应式</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token string">&#39;test&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token keyword">function</span> <span class="token function">setDataTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        data<span class="token punctuation">.</span>test <span class="token operator">=</span> <span class="token string">&quot;new test&quot;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        setDataTest<span class="token punctuation">,</span>
        data
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vue3通过 <code>setup</code> 和 <code>reactive</code> 函数实现了和vue2.x同样的效果。我们之前分析过setup的流程，在mount阶段设置组件实例的时候会触发setup函数，并将返回值挂载到组件实例上，因此响应式的功能是由reactive函数完成的，我们直接分析reactive函数源码</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 代理缓存</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> reactiveMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap<span class="token operator">&lt;</span>Target<span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">reactive</span><span class="token punctuation">(</span>target<span class="token operator">:</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果是只读则直接返回</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isReadonly</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>
  <span class="token comment">// 创建响应式对象</span>
  <span class="token keyword">return</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>
    target<span class="token punctuation">,</span>
    <span class="token boolean">false</span><span class="token punctuation">,</span>
    mutableHandlers<span class="token punctuation">,</span>
    mutableCollectionHandlers<span class="token punctuation">,</span>
    reactiveMap
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>
  target<span class="token operator">:</span> Target<span class="token punctuation">,</span>
  isReadonly<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
  baseHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  collectionHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  proxyMap<span class="token operator">:</span> WeakMap<span class="token operator">&lt;</span>Target<span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// reactive方法必须接受一个对象或数组类型即 typeof target === &#39;object&#39;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    target<span class="token punctuation">[</span>ReactiveFlags<span class="token punctuation">.</span><span class="token constant">RAW</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token punctuation">(</span>isReadonly <span class="token operator">&amp;&amp;</span> target<span class="token punctuation">[</span>ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_REACTIVE</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果已经是一个响应式对象直接返回，除了该响应式对象是只读的，因为只读需要对getter做处理</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>

  <span class="token comment">// 判断传入对象是否在代理缓存中，如果存在直接返回  </span>
  <span class="token keyword">const</span> existingProxy <span class="token operator">=</span> proxyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>existingProxy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> existingProxy
  <span class="token punctuation">}</span>
  <span class="token comment">// 获取传入对象类型，INVALID表示数据不可拓展（不能添加新属性），COLLECTION表示数据为Map、Set类型</span>
  <span class="token keyword">const</span> targetType <span class="token operator">=</span> <span class="token function">getTargetType</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>targetType <span class="token operator">===</span> TargetType<span class="token punctuation">.</span><span class="token constant">INVALID</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里如果传入数据是不可拓展的类型则直接返回</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>
  <span class="token comment">// 创建传入对象的代理，根据传入对象的类型选用不同的配置</span>
  <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>
    target<span class="token punctuation">,</span>
    targetType <span class="token operator">===</span> TargetType<span class="token punctuation">.</span><span class="token constant">COLLECTION</span> <span class="token operator">?</span> collectionHandlers <span class="token operator">:</span> baseHandlers
  <span class="token punctuation">)</span>
  <span class="token comment">// 记入缓存</span>
  proxyMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> proxy<span class="token punctuation">)</span>
  <span class="token keyword">return</span> proxy
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>reactive</code> 函数是对只读数据进行了判断，响应式的核心是 <code>createReactiveObject</code> 函数处理的，该函数有几个重要逻辑</p><ul><li>判断一些不需要进行代理的分支情况，直接返回传入数据。或是命中缓存，返回缓存的数据代理</li><li>创建数据的代理，根据数据类型选用配置</li><li>记入缓存</li></ul><p>当传入数据类型是(Weak)Map或(Weak)Set时会使用 <code>collectionHandlers</code> 配置，我们暂时不考虑该情况，如果传入一个普通的数组或对象则使用 <code>baseHandlers</code> 配置，也就是 <code>mutableHandlers</code>，接下来就分析其配置</p><h2 id="mutablehandlers配置" tabindex="-1"><a class="header-anchor" href="#mutablehandlers配置" aria-hidden="true">#</a> mutableHandlers配置</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> mutableHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span>object<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  get<span class="token punctuation">,</span>
  set<span class="token punctuation">,</span>
  deleteProperty<span class="token punctuation">,</span>
  has<span class="token punctuation">,</span>
  ownKeys
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>mutableHandlers</code> 配置了很多属性，对获取（get）、设置（set）、删除（deleteProperty）、in操作符（has）、Object.getOwnPropertyNames（ownKeys）行为进行了代理，在触发这些行为时无非做了收集依赖、派发更新、清除依赖这三个事的其中一种，我们需要重点分析get、set</p><h2 id="在get函数中实现依赖收集" tabindex="-1"><a class="header-anchor" href="#在get函数中实现依赖收集" aria-hidden="true">#</a> 在get函数中实现依赖收集</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> get <span class="token operator">=</span> <span class="token comment">/*#__PURE__*/</span> <span class="token function">createGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">createGetter</span><span class="token punctuation">(</span>isReadonly <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> shallow <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token operator">:</span> Target<span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">,</span> receiver<span class="token operator">:</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理该数据的描述属性</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_REACTIVE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 是否是响应式</span>
      <span class="token keyword">return</span> <span class="token operator">!</span>isReadonly
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_READONLY</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 是否是只读，这里的只读和响应式是互斥的</span>
      <span class="token keyword">return</span> isReadonly
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_SHALLOW</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 是否是浅响应式</span>
      <span class="token keyword">return</span> shallow
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
      key <span class="token operator">===</span> ReactiveFlags<span class="token punctuation">.</span><span class="token constant">RAW</span> <span class="token operator">&amp;&amp;</span>
      receiver <span class="token operator">===</span>
        <span class="token punctuation">(</span>isReadonly
          <span class="token operator">?</span> shallow
            <span class="token operator">?</span> shallowReadonlyMap
            <span class="token operator">:</span> readonlyMap
          <span class="token operator">:</span> shallow
          <span class="token operator">?</span> shallowReactiveMap
          <span class="token operator">:</span> reactiveMap
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 是否是原生数据（就是被代理的数据）</span>
      <span class="token keyword">return</span> target
    <span class="token punctuation">}</span>

    <span class="token comment">// 判断是否为数组</span>
    <span class="token keyword">const</span> targetIsArray <span class="token operator">=</span> <span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isReadonly<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>targetIsArray <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>arrayInstrumentations<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果访问的属性是非只读且是部分数组方法时直接返回该方法</span>
        <span class="token comment">// &#39;includes&#39;, &#39;indexOf&#39;, &#39;lastIndexOf&#39;, &#39;push&#39;, &#39;pop&#39;, &#39;shift&#39;, &#39;unshift&#39;, &#39;splice&#39;</span>
        <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>arrayInstrumentations<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 处理数组方法后改写hasOwnProperty方法，因为hasOwn内部是使用hasOwnProperty方法实现</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">&#39;hasOwnProperty&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 该数据是非只读且访问hasOwnProperty方法时返回封装后的该方法</span>
        <span class="token keyword">return</span> hasOwnProperty
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取访问属性的值</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span>
    
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSymbol</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">?</span> builtInSymbols<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">isNonTrackableKeys</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果访问的是内置的symbol key 或是 __proto__、__v_isRef、__isVue属性则直接返回</span>
      <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isReadonly<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果不是只读属性则进行依赖收集</span>
      <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> TrackOpTypes<span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>shallow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果是浅响应式在收集依赖后直接返回</span>
      <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRef</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果访问的值是ref有两种处理情况，如果值是数组返回值，如果值非数组返回</span>
      <span class="token keyword">return</span> targetIsArray <span class="token operator">&amp;&amp;</span> <span class="token function">isIntegerKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">?</span> res <span class="token operator">:</span> res<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果是对象有两个处理情况，如果是只读则走只读逻辑，否则递归访问属性的值进行依赖收集</span>
      <span class="token keyword">return</span> isReadonly <span class="token operator">?</span> <span class="token keyword">readonly</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">reactive</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> res
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>get</code> 是通过 <code>createGetter</code> 函数获得，因为readonly、shallowReactive等API也需要get函数</p><p><code>get</code> 函数的几个主要逻辑</p><ul><li>处理内置的一些对数据描述的属性</li><li>处理数组方法直接返回，之后重写hasOwnProperty方法</li><li>收集依赖</li><li>判断是否是浅响应或ref，直接返回对应值，其中ref结构返回</li><li>如果是对象、数组、map、set递归子属性</li></ul><p>至此整个get函数就分析完了，本质就是递归子属性进行依赖收集，当代理数据被访问的时候才会递归收集子属性依赖，这里对比vue2.x的在初始化中递归所有属性收集依赖的性能有所提升。其中一些数组方法放置在 <code>arrayInstrumentations</code> 中进行处理，而收集依赖在函数 <code>track</code> 中，我们依次分析</p><h3 id="arrayinstrumentations-封装数组方法" tabindex="-1"><a class="header-anchor" href="#arrayinstrumentations-封装数组方法" aria-hidden="true">#</a> arrayInstrumentations 封装数组方法</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> arrayInstrumentations <span class="token operator">=</span> <span class="token comment">/*#__PURE__*/</span> <span class="token function">createArrayInstrumentations</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">createArrayInstrumentations</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> instrumentations<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">Function</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  
  <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;includes&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;indexOf&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;lastIndexOf&#39;</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>key <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 对&#39;includes&#39;, &#39;indexOf&#39;, &#39;lastIndexOf&#39;三个方法进行封装</span>
    instrumentations<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 获取代理前的数据</span>
      <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">any</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 遍历数组收集依赖</span>
        <span class="token function">track</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> TrackOpTypes<span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span> i <span class="token operator">+</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 调用数组原生方法将参数透传获得结果</span>
      <span class="token keyword">const</span> res <span class="token operator">=</span> arr<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>res <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">||</span> res <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 因为调用数组方法传入的可能是一个值的代理，如果没有找到该值则使用toRaw获取代理前的值重新调用方法</span>
        <span class="token keyword">return</span> arr<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>toRaw<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> res
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token comment">// 对&#39;push&#39;, &#39;pop&#39;, &#39;shift&#39;, &#39;unshift&#39;, &#39;splice&#39;方法进行封装，在调用期间暂停跟踪</span>
  <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;push&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;pop&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;shift&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;unshift&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;splice&#39;</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>key <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    instrumentations<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">pauseTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token function">toRaw</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
      <span class="token function">resetTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> instrumentations
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>arrayInstrumentations</code> 是调用 <code>createArrayInstrumentations</code> 函数返回的结果，函数内部对一些数组方法进行封装，如果修改了数组中某个元素，includes、indexOf、lastIndexOf方法的结果可能会发生变化，这里需要对数组每一项进行依赖收集。后面的push等方法重写是为了防止修改数组长度产生的问题，这里不研究</p><h3 id="track-依赖收集" tabindex="-1"><a class="header-anchor" href="#track-依赖收集" aria-hidden="true">#</a> track 依赖收集</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 是否追踪依赖</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> shouldTrack <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token comment">// 当前副作用函数</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> activeEffect<span class="token operator">:</span> ReactiveEffect <span class="token operator">|</span> <span class="token keyword">undefined</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token operator">:</span> object<span class="token punctuation">,</span> type<span class="token operator">:</span> TrackOpTypes<span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldTrack <span class="token operator">&amp;&amp;</span> activeEffect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 从targetMap表中取出依赖收集器表depsMap，如果没有则创建一个</span>
    <span class="token keyword">let</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      targetMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 获取收集器表depsMap中对应key的收集器，如果没有则创建一个</span>
    <span class="token keyword">let</span> dep <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>dep <span class="token operator">=</span> <span class="token function">createDep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">trackEffects</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trackEffects</span><span class="token punctuation">(</span>
  dep<span class="token operator">:</span> Dep
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dep<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>activeEffect<span class="token operator">!</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 收集器中不存在当前副作用后添加该副作用</span>
    dep<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token operator">!</span><span class="token punctuation">)</span>
    <span class="token comment">// 副作用也记录依赖收集器</span>
    activeEffect<span class="token operator">!</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>shouldTrack</code> 是某些场景下不进行依赖收集，<code>activeEffect</code> 就是当前副作用函数，这里建立了一个 数据（target）=&gt; 数据属性（key） =&gt; 收集器（dep）的依赖关系，之后调用 <code>trackEffects</code> 函数添加依赖，将当前副作用添加至收集器中，并且当前副作用也添加了收集器，此时targetMap的结构如下</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token punctuation">{</span>
  target<span class="token operator">:</span> <span class="token punctuation">{</span>
    key<span class="token operator">:</span> <span class="token punctuation">[</span> 
      effect <span class="token keyword">as</span> ReactiveEffect
    <span class="token punctuation">]</span> <span class="token keyword">as</span> dep
  <span class="token punctuation">}</span> <span class="token keyword">as</span> depsMap
<span class="token punctuation">}</span> <span class="token keyword">as</span> targetMap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在set函数中实现派发更新" tabindex="-1"><a class="header-anchor" href="#在set函数中实现派发更新" aria-hidden="true">#</a> 在set函数中实现派发更新</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> set <span class="token operator">=</span> <span class="token comment">/*#__PURE__*/</span> <span class="token function">createSetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">createSetter</span><span class="token punctuation">(</span>shallow <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">set</span><span class="token punctuation">(</span>
    target<span class="token operator">:</span> object<span class="token punctuation">,</span>
    key<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span>
    receiver<span class="token operator">:</span> object
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
    <span class="token comment">// 取出旧值</span>
    <span class="token keyword">let</span> oldValue <span class="token operator">=</span> <span class="token punctuation">(</span>target <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isReadonly</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isRef</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isRef</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 当旧值是只读且是ref，并且新值不是ref不能赋值</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>shallow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 非浅代理</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isShallow</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isReadonly</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 新值非浅代理且非只读，取出新旧值代理前的原值</span>
        oldValue <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">)</span>
        value <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isRef</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isRef</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 代理数据为非数组，且旧值是ref，且新值不是ref，将新值赋值旧值</span>
        oldValue<span class="token punctuation">.</span>value <span class="token operator">=</span> value
        <span class="token keyword">return</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// in shallow mode, objects are set as-is regardless of reactive or not</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 判断这个key是否存在，这里分target是数组或对象两种情况</span>
    <span class="token keyword">const</span> hadKey <span class="token operator">=</span>
      <span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isIntegerKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
        <span class="token operator">?</span> <span class="token function">Number</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">&lt;</span> target<span class="token punctuation">.</span>length
        <span class="token operator">:</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token comment">// 设置数据属性</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">===</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// receiver是最初被调用的对象，如果数据原型链上有一个proxy，那么数据在赋值时该proxy也会触发set</span>
      <span class="token comment">// 这里是过滤掉数据原型链上的proxy</span>

      <span class="token comment">// 根据key是否存在调用派发更新函数传入不同参数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hadKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> TriggerOpTypes<span class="token punctuation">.</span><span class="token constant">ADD</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasChanged</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> TriggerOpTypes<span class="token punctuation">.</span><span class="token constant">SET</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>set</code> 函数主要是处理赋值，其中有两个重要逻辑</p><ul><li>判断不能赋值的情况。之后标准化新旧值后进行赋值</li><li>派发更新逻辑，根据key是否存在走不同逻辑的派发更新</li></ul><p>派发更新的逻辑在 <code>trigger</code> 函数中</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span>
  target<span class="token operator">:</span> object<span class="token punctuation">,</span>
  type<span class="token operator">:</span> TriggerOpTypes<span class="token punctuation">,</span>
  key<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span>
  newValue<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span>
  oldValue<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span>
  oldTarget<span class="token operator">?</span><span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">unknown</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">&gt;</span> <span class="token operator">|</span> Set<span class="token operator">&lt;</span><span class="token builtin">unknown</span><span class="token operator">&gt;</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 在get中已经将数据缓存在targetMap上，这里将对应的收集器map取出来</span>
  <span class="token keyword">const</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 没有依赖，结束</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 需要更新的依赖队列</span>
  <span class="token keyword">let</span> deps<span class="token operator">:</span> <span class="token punctuation">(</span>Dep <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> TriggerOpTypes<span class="token punctuation">.</span><span class="token constant">CLEAR</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 清除收集，将所有依赖放入更新队列</span>
    deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>depsMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">&#39;length&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果通过下标修改数组类型的数据</span>
    <span class="token keyword">const</span> newLength <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span>
    <span class="token comment">// 将设置下标之后所有数据的依赖放入更新队列，还有length</span>
    <span class="token comment">// 例如：[1, 2, 更新下标放入更新队列, 后续的数据放入更新队列]</span>
    depsMap<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>dep<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">&#39;length&#39;</span> <span class="token operator">||</span> key <span class="token operator">&gt;=</span> newLength<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// type 只有这三种情况 SET | ADD | DELETE</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">!==</span> <span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果key有值，取出key对应的依赖[effect, effect, ...]</span>
      deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 将deps队列拍平</span>
  <span class="token keyword">const</span> effects<span class="token operator">:</span> ReactiveEffect<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> dep <span class="token keyword">of</span> deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      effects<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>dep<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 派发更新</span>
  <span class="token function">triggerEffects</span><span class="token punctuation">(</span><span class="token function">createDep</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>trigger</code> 函数的主要处理副作用函数，最终目的将副作用函数收集到一个列表中等待执行</p><ul><li>取出数据对应的依赖地图（key =&gt; effect），如果找不到对应的depsMap则认为没有依赖直接结束</li><li>根据数据的类型将key命中的依赖都收集到更新队列中</li><li>调用 <code>triggerEffects</code> 函数执行队列</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">triggerEffects</span><span class="token punctuation">(</span>
  dep<span class="token operator">:</span> Dep <span class="token operator">|</span> ReactiveEffect<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  debuggerEventExtraInfo<span class="token operator">?</span><span class="token operator">:</span> DebuggerEventExtraInfo
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// spread into array for stabilization</span>
  <span class="token keyword">const</span> effects <span class="token operator">=</span> <span class="token function">isArray</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span> <span class="token operator">?</span> dep <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span>dep<span class="token punctuation">]</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> effect <span class="token keyword">of</span> effects<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">triggerEffect</span><span class="token punctuation">(</span>effect<span class="token punctuation">,</span> debuggerEventExtraInfo<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">triggerEffect</span><span class="token punctuation">(</span>
  effect<span class="token operator">:</span> ReactiveEffect<span class="token punctuation">,</span>
  debuggerEventExtraInfo<span class="token operator">?</span><span class="token operator">:</span> DebuggerEventExtraInfo
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>effect <span class="token operator">!==</span> activeEffect <span class="token operator">||</span> effect<span class="token punctuation">.</span>allowRecurse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终遍历更新队列，调用每个副作用函数的 <code>run</code> 方法实现更新</p><h2 id="副作用函数" tabindex="-1"><a class="header-anchor" href="#副作用函数" aria-hidden="true">#</a> 副作用函数</h2><p><code>patch</code> 函数的组件挂载流程中设置了副作用函数，在 <code>setupRenderEffect</code> 函数中</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> setupRenderEffect<span class="token operator">:</span> <span class="token function-variable function">SetupRenderEffectFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    instance<span class="token punctuation">,</span>
    initialVNode<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    anchor<span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    optimized
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">componentUpdateFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 副作用函数</span>
    <span class="token keyword">const</span> effect <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>
      componentUpdateFn<span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">queueJob</span><span class="token punctuation">(</span>update<span class="token punctuation">)</span><span class="token punctuation">,</span>
      instance<span class="token punctuation">.</span>scope <span class="token comment">// track it in component&#39;s effect scope</span>
    <span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> update<span class="token operator">:</span> SchedulerJob <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function-variable function">update</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可见副作用函数就是 <code>ReactiveEffect</code> 类的实例，该实例中有一个run方法</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ReactiveEffect<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> parent<span class="token operator">:</span> ReactiveEffect <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> activeEffect
    <span class="token keyword">let</span> lastShouldTrack <span class="token operator">=</span> shouldTrack
    <span class="token keyword">while</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>parent <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>parent
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">// 缓存之前的副作用实例</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> activeEffect
      <span class="token comment">// 缓存当前副作用实例</span>
      activeEffect <span class="token operator">=</span> <span class="token keyword">this</span>
      shouldTrack <span class="token operator">=</span> <span class="token boolean">true</span>

      <span class="token comment">// 记录递归深度</span>
      trackOpBit <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token operator">++</span>effectTrackDepth

      <span class="token comment">// 在渲染更新前需要对旧的依赖做处理，例如：旧视图中引用数据a，新视图中引用的数据a变为b，那么需要删除a的依赖，重新添加b的依赖，防止数据a更新后产生额外的渲染开销</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>effectTrackDepth <span class="token operator">&lt;=</span> maxMarkerBits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果组件嵌套层数嵌套少于30层，设置deps每个dep.w为已收集</span>
        <span class="token function">initDepMarkers</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 清除该副作用中的依赖（dep）</span>
        <span class="token function">cleanupEffect</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 执行副作用函数，如果组件中嵌套组件</span>
      <span class="token comment">// 如果组件嵌套情况则会再次出发run方法进行递归</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>effectTrackDepth <span class="token operator">&lt;=</span> maxMarkerBits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断当前副作用的dep中的依赖如果已经收集但是新依赖没有则进行删除</span>
        <span class="token function">finalizeDepMarkers</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 递归完成回到上级</span>
      trackOpBit <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token operator">--</span>effectTrackDepth

      <span class="token comment">// 递归完成将状态回退到上一次递归的状态</span>
      activeEffect <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parent
      shouldTrack <span class="token operator">=</span> lastShouldTrack
      <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> <span class="token keyword">undefined</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deferStop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>run</code> 方法会调用真正的副作用函数，但是在这之前需要处理一些依赖情况</p><ul><li>记录当前副作用实例</li><li>清空依赖（当视图更新依赖变更时，如果不清空依赖可能会造成额外的渲染开销）</li><li>调用副作用函数（其中会触发render从而触发响应式数据的getter从而收集依赖）走patch流程</li><li>当副作用函数调用完毕将当前的副作用函数恢复之前的状态</li></ul><p>副作用函数在组件嵌套的情况下会递归调用 <code>run</code> 方法，因此需要每一次递归都要记录当前的副作用实例，在递归完成后将当前的副作用实例回退</p><p><code>initDepMarkers</code> 和 <code>finalizeDepMarkers</code> 这里的逻辑是对清空依赖的逻辑进行优化，每次更新视图都需要清空依赖，后再副作用函数中在添加依赖，如果更新视图没有依赖变化，这样就有很多额外的开销，因此 <code>initDepMarkers</code> 函数将现有的依赖收集器（dep）进行标记，然后执行副作用函数进行依赖收集（标记的收集器跳过收集），之后通过 <code>finalizeDepMarkers</code> 函数删除更新后没有的依赖，并删除收集器的标记</p><p><code>effectTrackDepth</code> 是记录组件嵌套层数，<code>maxMarkerBits</code> 是组件最大嵌套层数，如果组件层数大于这个最大嵌套层数则直接清空依赖，如果组件嵌套过深则清空依赖反而性能更好，默认为30</p><p>在调用 <code>trackEffects</code> 函数收集依赖的时候也会对标记的依赖不进行收集</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trackEffects</span><span class="token punctuation">(</span>
  dep<span class="token operator">:</span> Dep<span class="token punctuation">,</span>
  debuggerEventExtraInfo<span class="token operator">?</span><span class="token operator">:</span> DebuggerEventExtraInfo
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> shouldTrack <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>effectTrackDepth <span class="token operator">&lt;=</span> maxMarkerBits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">newTracked</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果该收集器是一个旧收集器，也就是被标记的</span>
      dep<span class="token punctuation">.</span>n <span class="token operator">|=</span> trackOpBit <span class="token comment">// set newly tracked</span>
      <span class="token comment">// 判断该依赖是否需要被收集</span>
      shouldTrack <span class="token operator">=</span> <span class="token operator">!</span><span class="token function">wasTracked</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// Full cleanup mode.</span>
    shouldTrack <span class="token operator">=</span> <span class="token operator">!</span>dep<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>activeEffect<span class="token operator">!</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldTrack<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dep<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token operator">!</span><span class="token punctuation">)</span>
    activeEffect<span class="token operator">!</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>trackEffects</code> 函数对收集器做了是否需要收集的判断</p><h2 id="readonly-api" tabindex="-1"><a class="header-anchor" href="#readonly-api" aria-hidden="true">#</a> Readonly API</h2><p>使用 <code>readonly</code> 函数传入一个对象或响应式对象，会给传入对象增加只读限制。我们从入口分析其实现</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token keyword">readonly</span><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name">object</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  target<span class="token operator">:</span> <span class="token constant">T</span>
<span class="token punctuation">)</span><span class="token operator">:</span> DeepReadonly<span class="token operator">&lt;</span>UnwrapNestedRefs<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> readonlyHandlers<span class="token punctuation">,</span> readonlyCollectionHandlers<span class="token punctuation">,</span> readonlyMap<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>
  target<span class="token operator">:</span> Target<span class="token punctuation">,</span>
  isReadonly<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
  baseHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  collectionHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  proxyMap<span class="token operator">:</span> WeakMap<span class="token operator">&lt;</span>Target<span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// reactive方法必须接受一个对象或数组类型即 typeof target === &#39;object&#39;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    target<span class="token punctuation">[</span>ReactiveFlags<span class="token punctuation">.</span><span class="token constant">RAW</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token punctuation">(</span>isReadonly <span class="token operator">&amp;&amp;</span> target<span class="token punctuation">[</span>ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_REACTIVE</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果已经是一个响应式对象直接返回，除了该响应式对象是只读的，因为只读需要对getter做处理</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>
  <span class="token comment">// 判断传入对象是否在代理缓存中，如果存在直接返回  </span>
  <span class="token keyword">const</span> existingProxy <span class="token operator">=</span> proxyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>existingProxy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> existingProxy
  <span class="token punctuation">}</span>
  <span class="token comment">// 获取传入对象类型，INVALID表示数据不可拓展（不能添加新属性），COLLECTION表示数据为Map、Set类型</span>
  <span class="token keyword">const</span> targetType <span class="token operator">=</span> <span class="token function">getTargetType</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>targetType <span class="token operator">===</span> TargetType<span class="token punctuation">.</span><span class="token constant">INVALID</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里如果传入数据是不可拓展的类型则直接返回</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>
  <span class="token comment">// 创建传入对象的代理，根据传入对象的类型选用不同的配置</span>
  <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>
    target<span class="token punctuation">,</span>
    targetType <span class="token operator">===</span> TargetType<span class="token punctuation">.</span><span class="token constant">COLLECTION</span> <span class="token operator">?</span> collectionHandlers <span class="token operator">:</span> baseHandlers
  <span class="token punctuation">)</span>
  <span class="token comment">// 记入缓存</span>
  proxyMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> proxy<span class="token punctuation">)</span>
  <span class="token keyword">return</span> proxy
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>createReactiveObject</code> 函数的 <code>isReadonly</code> 参数只是在传入响应式对象且需要配置只读的时候走代理逻辑</p><p>和 <code>Reactive API</code> 不同的是传入的代理配置不一样，我们只分析普通对象数组的配置，也就是 <code>baseHandlers</code> 参数，<code>Reactive API</code> 传入的是 <code>mutableHandlers</code> 配置，而 <code>Readonly API</code> 传入的是 <code>readonlyHandlers</code> 配置</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> readonlyHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span>object<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// readonly不需要收集依赖，所以只有get、set、deleteProerty设置</span>
  <span class="token comment">// 其中set、deleteProerty并没有操作对象</span>
  get<span class="token operator">:</span> readonlyGet<span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">deleteProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为 <code>readonly</code> 是只读的无法赋值，所以不需要收集依赖，也就不需要重写 <code>has</code>、<code>ownkeys</code> 配置</p><p>因为无法赋值这里 <code>set</code>、<code>deleteProperty</code> 并没有操作 <code>target</code></p><p><code>get</code> 配置是从 <code>readonlyGet</code> 变量获得，我们重点分析</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> readonlyGet <span class="token operator">=</span> <span class="token function">createGetter</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">createGetter</span><span class="token punctuation">(</span>isReadonly <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> shallow <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token operator">:</span> Target<span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">,</span> receiver<span class="token operator">:</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理该数据的描述属性</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_REACTIVE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 是否是响应式</span>
      <span class="token keyword">return</span> <span class="token operator">!</span>isReadonly
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_READONLY</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 是否是只读，这里的只读和响应式是互斥的</span>
      <span class="token keyword">return</span> isReadonly
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_SHALLOW</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 是否是浅响应式</span>
      <span class="token keyword">return</span> shallow
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
      key <span class="token operator">===</span> ReactiveFlags<span class="token punctuation">.</span><span class="token constant">RAW</span> <span class="token operator">&amp;&amp;</span>
      receiver <span class="token operator">===</span>
        <span class="token punctuation">(</span>isReadonly
          <span class="token operator">?</span> shallow
            <span class="token operator">?</span> shallowReadonlyMap
            <span class="token operator">:</span> readonlyMap
          <span class="token operator">:</span> shallow
          <span class="token operator">?</span> shallowReactiveMap
          <span class="token operator">:</span> reactiveMap
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 是否是原生数据（就是被代理的数据）</span>
      <span class="token keyword">return</span> target
    <span class="token punctuation">}</span>

    <span class="token comment">// 判断是否为数组</span>
    <span class="token keyword">const</span> targetIsArray <span class="token operator">=</span> <span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isReadonly<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 重写一些数组相关方法，用于收集依赖</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取访问属性的值</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSymbol</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">?</span> builtInSymbols<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">isNonTrackableKeys</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果访问的是内置的symbol key 或是 __proto__、__v_isRef、__isVue属性则直接返回</span>
      <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isReadonly<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果不是只读属性则进行依赖收集</span>
      <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> TrackOpTypes<span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果是对象有两个处理情况，如果是只读则走只读逻辑，否则递归访问属性的值进行依赖收集</span>
      <span class="token keyword">return</span> isReadonly <span class="token operator">?</span> <span class="token keyword">readonly</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">reactive</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> res
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之前在 <code>Reactive API</code> 分析了 <code>createGetter</code> 函数，<code>Readonly API</code> 不同的是传入函数参数 <code>isReadonly</code> 为true，省略一些不相关逻辑可以看到，获取一些内置属性的逻辑和 <code>Reactive API</code> 一致，readonly避开了所有依赖收集的逻辑，最后如果 <code>isReadonly</code> 为true则递归将子属性也变成只读</p><blockquote><p>readonly的属性不会发生变化，因此不需要收集依赖触发视图更新</p></blockquote><h2 id="ref-api" tabindex="-1"><a class="header-anchor" href="#ref-api" aria-hidden="true">#</a> Ref API</h2><p>通过 <code>Reactive API</code> 获取响应式对象时只能传入一个Object类型，如果需要一些基本数据类型则需要将基本数据通过对象包裹，这样非常麻烦，vue3提供了 <code>Ref API</code> 在reactive的基础上兼容基本数据类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">ref</span><span class="token punctuation">(</span>value<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createRef</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">createRef</span><span class="token punctuation">(</span>rawValue<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span> shallow<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRef</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> rawValue
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RefImpl</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">,</span> shallow<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code>ref</code> 函数传入了一个ref对象则直接返回，最后返回 <code>RefImpl</code> 实例</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">RefImpl<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> _value<span class="token operator">:</span> <span class="token constant">T</span> <span class="token comment">// 传入数据</span>
  <span class="token keyword">private</span> _rawValue<span class="token operator">:</span> <span class="token constant">T</span> <span class="token comment">// 传入数据的原始值，因为可能传入一个reactive或readonly对象</span>

  <span class="token keyword">public</span> dep<span class="token operator">?</span><span class="token operator">:</span> Dep <span class="token operator">=</span> <span class="token keyword">undefined</span> <span class="token comment">// 依赖收集器</span>
  <span class="token keyword">public</span> <span class="token keyword">readonly</span> __v_isRef <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// ref标识</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token keyword">public</span> <span class="token keyword">readonly</span> __v_isShallow<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 浅代理则直接赋值</span>
    <span class="token comment">// toRaw 数据原始值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue <span class="token operator">=</span> __v_isShallow <span class="token operator">?</span> value <span class="token operator">:</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token comment">// toReactive 如果传入对象则返回reactive对象</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> __v_isShallow <span class="token operator">?</span> value <span class="token operator">:</span> <span class="token function">toReactive</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 收集依赖</span>
    <span class="token function">trackRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value
  <span class="token punctuation">}</span>

  <span class="token keyword">set</span> <span class="token function">value</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断赋值对象是否为浅代理或只读</span>
    <span class="token keyword">const</span> useDirectValue <span class="token operator">=</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>__v_isShallow <span class="token operator">||</span> <span class="token function">isShallow</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isReadonly</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
    <span class="token comment">// 如果是浅代理或只读则直接返回，否则获取原数据，可能赋值一个reactive对象</span>
    newVal <span class="token operator">=</span> useDirectValue <span class="token operator">?</span> newVal <span class="token operator">:</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasChanged</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果新旧两个值不相等 newVal !== this._rawValue</span>
      <span class="token comment">// 更新原数据</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue <span class="token operator">=</span> newVal
      <span class="token comment">// 更新数据，如果是浅代理、只读、非对象则直接赋值，否则返回一个reactive对象</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> useDirectValue <span class="token operator">?</span> newVal <span class="token operator">:</span> <span class="token function">toReactive</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
      <span class="token comment">// 派发更新</span>
      <span class="token function">triggerRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> newVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> toReactive <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">unknown</span></span><span class="token operator">&gt;</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token operator">=&gt;</span>
  <span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">reactive</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">:</span> value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>RefImpl</code> 定义了数据处理（_value、_rawValue）、依赖收集（dep）、标识（__v_isRef）属性</p><p>初始化阶段可以看到如果传入的数据 <code>value</code> 是一个Object类型则将该数据转化为reactive对象，否则直接赋值原数据。依赖收集更新逻辑和reactive类似，但是进行了封装，我们具体关注下 <code>trackRefValue</code> 和 <code>triggerRefValue</code> 的函数封装</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trackRefValue</span><span class="token punctuation">(</span>ref<span class="token operator">:</span> RefBase<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldTrack <span class="token operator">&amp;&amp;</span> activeEffect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取原始数据，其实还是ref本身</span>
    ref <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>ref<span class="token punctuation">)</span>
    <span class="token comment">// 传入ref.dep属性进行依赖收集</span>
    <span class="token function">trackEffects</span><span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep <span class="token operator">||</span> <span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token function">createDep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">triggerRefValue</span><span class="token punctuation">(</span>ref<span class="token operator">:</span> RefBase<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> newVal<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取原始数据，其实还是ref本身</span>
  ref <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>ref<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 更新ref.dep上的依赖</span>
    <span class="token function">triggerEffects</span><span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 <code>trackRefValue</code> 和 <code>triggerRefValue</code> 函数只是针对 <code>RefImpl</code> 实例的特性进行封装，和reactive不同的是reactive是维护一个全局的 <code>targetMap</code> 表，而ref是将依赖挂载到实例上，实际上都是通过调用 <code>trackEffects</code> 和 <code>triggerEffects</code> 函数进行依赖收集更新</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>这章了解了响应式的原理，依赖收集、派发更新、副作用函数以及针对响应式的一些API，这些API分别有对应的使用场景，通过下面的图更好的理解响应式的流程</p><p><img src="`+p+'" alt=""></p><p>这和vue2.x的响应式类似，主要是将Object.defineProperty替换成Proxy实现响应式，以及将Watcher实例替换成副作用实例</p>',82),l=[c];function i(u,r){return s(),a("div",null,l)}const v=n(o,[["render",i],["__file","4.响应式.html.vue"]]);export{v as default};
