import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.9ac9284b.js";const t="/assets/vue2defineProperty.257f068c.png",p={},o=e('<h1 id="响应式" tabindex="-1"><a class="header-anchor" href="#响应式" aria-hidden="true">#</a> 响应式</h1><p>响应式是vue的一大核心思想，在数据更新的时候自动更新视图，先回顾一下vue2.x的响应式是如何实现的</p><p><img src="'+t+`" alt=""></p><p>在init阶段对data配置进行初始化，将data转化为可观察对象（Observer），在可观察对象的getter函数中使用dep收集依赖watcher，在setter函数中通知dep中的watcher更新。之后再mount阶段创建watcher的时候对data中的对象进行手动访问，从而触发依赖收集</p><p>其中dep就是一个依赖收集器，用来收集依赖也就是监听者watcher，而watcher就是用来通知更新的，实际上watcher上记录着当前的vue实例，触发更新也是vue实例的更新</p><p>可观察对象的内部是使用 <code>Object.defineProperty</code> 实现的，通过数据劫持实现收集和更新数据时使用dep通知依赖watcher更新视图，<code>Object.defineProperty</code> 也有一些缺点，因为是对象属性的监听，所以无法监听到对象的增加和删除，初始化递归全部data数据也有一些性能提升的空间</p><p>vue3为了解决 <code>Object.defineProperty</code> 这些问题，选用 <code>Proxy</code> 重写了响应式的部分，并将响应式的代码都放在reactivity库下</p><h2 id="reactive-api" tabindex="-1"><a class="header-anchor" href="#reactive-api" aria-hidden="true">#</a> Reactive API</h2><p>vue2.x响应式的前提是需要将数据定义在data中，如果直接向vue实例添加属性是不会有响应式的，前面也说到响应式是在init阶段对data进行的处理，之所以可以直接通过实例访问data的数据，是因为vue2.x将data的属性都代理到了vue实例上</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>reactive</code> 函数是对只读数据进行了判断，响应式的核心是 <code>createReactiveObject</code> 函数处理的，该函数有几个重要逻辑</p><ul><li>判断一些不需要进行代理的分支情（），直接返回传入数据。或是命中缓存，返回缓存的数据代理</li><li>创建数据的代理，根据数据类型选用配置</li><li>记入缓存</li></ul><p>当传入数据类型是(Weak)Map或(Weak)Set时会使用 <code>collectionHandlers</code> 配置，我们暂时不考虑该情况，如果传入一个普通的数组或对象则使用 <code>baseHandlers</code> 配置，也就是 <code>mutableHandlers</code>，接下来就分析其配置</p><h2 id="mutablehandlers配置" tabindex="-1"><a class="header-anchor" href="#mutablehandlers配置" aria-hidden="true">#</a> mutableHandlers配置</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> mutableHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span>object<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  get<span class="token punctuation">,</span>
  set<span class="token punctuation">,</span>
  deleteProperty<span class="token punctuation">,</span>
  has<span class="token punctuation">,</span>
  ownKeys
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>mutableHandlers</code> 配置了很多属性，对获取（get）、设置（set）、删除（deleteProperty）、in操作符（has）、Object.getOwnPropertyNames（ownKeys）行为进行了代理，在触发这些行为时无非做了收集依赖、派发更新、清除依赖这三个事的其中一种，我们需要重点分析get、set</p><h3 id="在get函数中实现依赖收集" tabindex="-1"><a class="header-anchor" href="#在get函数中实现依赖收集" aria-hidden="true">#</a> 在get函数中实现依赖收集</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> get <span class="token operator">=</span> <span class="token comment">/*#__PURE__*/</span> <span class="token function">createGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

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
        <span class="token comment">// 该数据是非只读且是数组的情况直接取值</span>
        <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>arrayInstrumentations<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 处理数组后改写hasOwnProperty方法，因为hasOwn内部是使用hasOwnProperty方法实现</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>get</code> 是通过 <code>createGetter</code> 函数获得，因为readonly、shallowReactive等API也需要get函数</p><p><code>get</code> 函数的几个主要逻辑</p><ul><li>处理内置的一些对数据描述的属性</li><li>处理数组直接返回值，之后重写hasOwnProperty方法</li><li>收集依赖</li><li>判断是否是浅响应或ref，直接返回对应值，其中ref结构返回</li><li>如果是对象递归子属性</li></ul>`,26),c=[o];function i(l,u){return s(),a("div",null,c)}const k=n(p,[["render",i],["__file","4.响应式.html.vue"]]);export{k as default};
