import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as o,a as n,b as s,e as c,w as l,d as a,r as i}from"./app.9ac9284b.js";const u="/assets/diff.a0f56560.png",d={},r=a(`<h1 id="diff流程-组件更新" tabindex="-1"><a class="header-anchor" href="#diff流程-组件更新" aria-hidden="true">#</a> diff流程（组件更新）</h1><p>上一章我们梳理了组件渲染的流程（创建vnode =&gt; 渲染vnode），本质就是讲各种类型的vnode转化成真实的dom。组件是由模板、数据、描述对象（组件实例instance）构成，当数据发生变化，需要触发组件更新，我们接下来就开始分析更新流程</p><h2 id="组件更新函数update" tabindex="-1"><a class="header-anchor" href="#组件更新函数update" aria-hidden="true">#</a> 组件更新函数update</h2><p>回顾一下组件渲染vnode阶段，组件在渲染vnode阶段会调用一系列函数<code>render =&gt; patch =&gt; processComponent =&gt; mountComponent</code>，而在挂载函数<code>mountComponent</code>中创建了组件实例，也就是<code>instance</code>，之后调用<code>setupRenderEffect</code>函数设置副作用，该函数会在组件实例<code>instance</code>上挂载一个update函数并立即执行，也就是<code>componentUpdateFn</code>函数，该函数做了两件事，一个是挂载组件，一个是更新组件，我们接下来关注更新组件的逻辑</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">const</span> setupRenderEffect<span class="token operator">:</span> <span class="token function-variable function">SetupRenderEffectFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    instance<span class="token punctuation">,</span>
    initialVNode<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    anchor<span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    optimized
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">componentUpdateFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">.</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 挂载阶段执行</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// updateComponent</span>
        <span class="token comment">// This is triggered by mutation of component&#39;s own state (next: null)</span>
        <span class="token comment">// OR parent calling processComponent (next: VNode)</span>
        <span class="token keyword">let</span> <span class="token punctuation">{</span> next<span class="token punctuation">,</span> bu<span class="token punctuation">,</span> u<span class="token punctuation">,</span> parent<span class="token punctuation">,</span> vnode <span class="token punctuation">}</span> <span class="token operator">=</span> instance
        <span class="token keyword">let</span> originNext <span class="token operator">=</span> next
        <span class="token keyword">let</span> vnodeHook<span class="token operator">:</span> VNodeHook <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span>
        
        <span class="token comment">// next表示更新后的vnode</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          next<span class="token punctuation">.</span>el <span class="token operator">=</span> vnode<span class="token punctuation">.</span>el
          <span class="token comment">// 更新当前组件一些配置：props、slots之类</span>
          <span class="token function">updateComponentPreRender</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> next<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          next <span class="token operator">=</span> vnode
        <span class="token punctuation">}</span>

        <span class="token comment">// 生成更新后vnode子树</span>
        <span class="token keyword">const</span> nextTree <span class="token operator">=</span> <span class="token function">renderComponentRoot</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>
        
        <span class="token comment">// 保存更新前vnode子树</span>
        <span class="token keyword">const</span> prevTree <span class="token operator">=</span> instance<span class="token punctuation">.</span>subTree
        <span class="token comment">// 替换子树</span>
        instance<span class="token punctuation">.</span>subTree <span class="token operator">=</span> nextTree
        <span class="token comment">// 递归新旧子树进行patch</span>
        <span class="token function">patch</span><span class="token punctuation">(</span>
          prevTree<span class="token punctuation">,</span>
          nextTree<span class="token punctuation">,</span>
          <span class="token comment">// parent may have changed if it&#39;s in a teleport</span>
          <span class="token function">hostParentNode</span><span class="token punctuation">(</span>prevTree<span class="token punctuation">.</span>el<span class="token operator">!</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">,</span>
          <span class="token comment">// anchor may have changed if it&#39;s in a fragment</span>
          <span class="token function">getNextHostNode</span><span class="token punctuation">(</span>prevTree<span class="token punctuation">)</span><span class="token punctuation">,</span>
          instance<span class="token punctuation">,</span>
          parentSuspense<span class="token punctuation">,</span>
          isSVG
        <span class="token punctuation">)</span>

        <span class="token comment">// 递归新旧子树进行patch逻辑后更新后子树nextTree的真实dom就会创建，这里进行替换</span>
        next<span class="token punctuation">.</span>el <span class="token operator">=</span> nextTree<span class="token punctuation">.</span>el
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// create reactive effect for rendering</span>
    <span class="token keyword">const</span> effect <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>
      componentUpdateFn<span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">queueJob</span><span class="token punctuation">(</span>update<span class="token punctuation">)</span><span class="token punctuation">,</span>
      instance<span class="token punctuation">.</span>scope <span class="token comment">// track it in component&#39;s effect scope</span>
    <span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> update<span class="token operator">:</span> SchedulerJob <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function-variable function">update</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里主要做了几件事：<strong>更新当前vnode</strong>、<strong>生成新旧vnode子树</strong>、<strong>调用patch逻辑递归更新vnode子树</strong></p><p>更新当前vnode这里有一个<code>next</code>的逻辑判断，这里涉及到后面的逻辑，简单说就是会判断该组件需不需要更新，如果不需要就直接赋值，后续将对子树进行判断</p><p>生成新旧vnode子树并进行pacth逻辑，是因为数据的变化会影响模板渲染的结果，这里需要重新构建变化后的vnode子树，进行diff，并对一些需要更新的vnode用某种方式更新dom</p><h2 id="patch流程" tabindex="-1"><a class="header-anchor" href="#patch流程" aria-hidden="true">#</a> patch流程</h2><p>组件在更新时会触发实例<code>instance</code>上的<code>update</code>函数，生成新旧子树并调用<code>patch</code>函数进行更新，接下来我们开始分析patch流程</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">const</span> patch<span class="token operator">:</span> <span class="token function-variable function">PatchFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    n1<span class="token punctuation">,</span>
    n2<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    anchor <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentComponent <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentSuspense <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    isSVG <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    slotScopeIds <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    optimized <span class="token operator">=</span> __DEV__ <span class="token operator">&amp;&amp;</span> isHmrUpdating <span class="token operator">?</span> <span class="token boolean">false</span> <span class="token operator">:</span> <span class="token operator">!</span><span class="token operator">!</span>n2<span class="token punctuation">.</span>dynamicChildren
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">===</span> n2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// patching &amp; not same type, unmount old tree</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      anchor <span class="token operator">=</span> <span class="token function">getNextHostNode</span><span class="token punctuation">(</span>n1<span class="token punctuation">)</span>
      <span class="token function">unmount</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      n1 <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token punctuation">{</span> type<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> shapeFlag <span class="token punctuation">}</span> <span class="token operator">=</span> n2
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> Text<span class="token operator">:</span>
      <span class="token keyword">case</span> Comment<span class="token operator">:</span>
      <span class="token keyword">case</span> Static<span class="token operator">:</span>
      <span class="token keyword">case</span> Fragment<span class="token operator">:</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ELEMENT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">processElement</span><span class="token punctuation">(</span>
            n1<span class="token punctuation">,</span>
            n2<span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            anchor<span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            isSVG<span class="token punctuation">,</span>
            slotScopeIds<span class="token punctuation">,</span>
            optimized
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">COMPONENT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">processComponent</span><span class="token punctuation">(</span>
            n1<span class="token punctuation">,</span>
            n2<span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            anchor<span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            isSVG<span class="token punctuation">,</span>
            slotScopeIds<span class="token punctuation">,</span>
            optimized
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TELEPORT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__FEATURE_SUSPENSE__ <span class="token operator">&amp;&amp;</span> shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">SUSPENSE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// set ref</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ref <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> parentComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setRef</span><span class="token punctuation">(</span>ref<span class="token punctuation">,</span> n1 <span class="token operator">&amp;&amp;</span> n1<span class="token punctuation">.</span>ref<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> n2 <span class="token operator">||</span> n1<span class="token punctuation">,</span> <span class="token operator">!</span>n2<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>首先进行根节点对比，如果一致则不进行patch</li><li>接着判断<code>n1</code>有值且<code>n1</code>和<code>n2</code>不是一个vnode类型，也就是当前vnode被删除或更新，直接卸载旧vnode，挂载新vnode</li><li>之后就是针对不同的vnode进行不同的处理</li></ul><p>我们分别对处理组件节点和处理真实dom节点进行分析</p><h3 id="处理组件节点" tabindex="-1"><a class="header-anchor" href="#处理组件节点" aria-hidden="true">#</a> 处理组件节点</h3><p>我们举个例子，在父组件<code>App</code>中引入了<code>ShowNum</code>组件，该组件将传入的num属性展示</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- App.vue --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>当前num：{{num}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ShowNum</span> <span class="token attr-name">:num</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>num<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>num++<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>num++<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> ShowNum <span class="token keyword">from</span> <span class="token string">&#39;./components/ShowNum.vue&#39;</span>

<span class="token keyword">const</span> num <span class="token operator">=</span> ref<span class="token operator">&lt;</span>number<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在点击按钮的时候触发<code>num++</code>，触发<code>App</code>组件更新，从而触发子组件<code>ShowNum</code>更新</p><p>我们刚才分析组件触发更新是调用实例上的方法<code>instance.update</code>，并生成新旧子树，<code>App</code>组件的子树根节点是<code>&lt;div class=&quot;app&quot;&gt;</code>，是一个真实dom的vnode，在patch中会调用processElement处理，只有在处理真实dom的vnode的时候才是真正的更新逻辑，我们暂时跳过这里，稍后分析真实dom的vnode</p><p>继续patch流程直到<code>ShowNum</code>组件这里，因为是组件vnode，在patch中会调用processComponent函数来处理组件</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">const</span> <span class="token function-variable function">processComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    n1<span class="token operator">:</span> VNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    n2<span class="token operator">:</span> VNode<span class="token punctuation">,</span>
    container<span class="token operator">:</span> RendererElement<span class="token punctuation">,</span>
    anchor<span class="token operator">:</span> RendererNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentComponent<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentSuspense<span class="token operator">:</span> SuspenseBoundary <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    isSVG<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    slotScopeIds<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    optimized<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    n2<span class="token punctuation">.</span>slotScopeIds <span class="token operator">=</span> slotScopeIds
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 挂载逻辑</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">updateComponent</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之前我们就分析过<code>processComponent</code>函数，一部分是挂载逻辑，一部分是更新逻辑，我们接下来看更新逻辑<code>updateComponent</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">const</span> <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span>n1<span class="token operator">:</span> VNode<span class="token punctuation">,</span> n2<span class="token operator">:</span> VNode<span class="token punctuation">,</span> optimized<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>component <span class="token operator">=</span> n1<span class="token punctuation">.</span>component<span class="token punctuation">)</span><span class="token operator">!</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">shouldUpdateComponent</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// normal update</span>
      instance<span class="token punctuation">.</span>next <span class="token operator">=</span> n2
      <span class="token comment">// in case the child component is also queued, remove it to avoid</span>
      <span class="token comment">// double updating the same child component in the same flush.</span>
      <span class="token function">invalidateJob</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>update<span class="token punctuation">)</span>
      <span class="token comment">// instance.update is the reactive effect.</span>
      instance<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// no update needed. just copy over properties</span>
      n2<span class="token punctuation">.</span>el <span class="token operator">=</span> n1<span class="token punctuation">.</span>el
      instance<span class="token punctuation">.</span>vnode <span class="token operator">=</span> n2
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>updateComponent</code>中有几个重要逻辑</p>`,23),k=n("li",null,[s("将"),n("code",null,"n1"),s("组件实例赋值"),n("code",null,"n2")],-1),v=n("li",null,[s("通过"),n("code",null,"shouldUpdateComponent"),s("函数判断当前组件vnode是否需要更新，如果不需要则直接赋值dom")],-1),m=n("li",null,"如果需要更新则先删除更新队列里的当前vnode（有可能在父组件更新之前当前vnode就进入了更新队列，这里先清除队列中当前vnode，避免重复更新）",-1),b=n("li",null,[s("之后调用当前vnode的更新函数，也就是在组件首次渲染vnode阶段向组件实例中挂载的函数"),n("code",null,"componentUpdateFn")],-1),h=a(`<blockquote><p><code>shouldUpdateComponent</code>函数主要是通过对比组件vnode中props、chidren、dirs、transiton等属性，来判断组件是否需要更新</p></blockquote><h3 id="处理dom" tabindex="-1"><a class="header-anchor" href="#处理dom" aria-hidden="true">#</a> 处理dom</h3><p>我们之前说过只有在patch流程中处理dom才是真正的更新了真实dom，我们之前跳过了处理dom的环节，现在回到我们的例子，我们刚才分析了处理组件流程，这里不需要了就删掉</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- App.vue --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>当前num：{{num}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>num++<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>num++<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">const</span> num <span class="token operator">=</span> ref<span class="token operator">&lt;</span>number<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如点击 <code>button</code> 元素会触发 <code>App</code> 组件更新，走 <code>patch</code> 流程，然后处理 <code>App</code> 组件vnode，构建新旧vnode子树，递归patch流程，由于我们子树的根组件是 <code>&lt;div class=&quot;app&quot;&gt;</code>，所以我们会在patch流程调用 <code>processElement</code> 函数来处理dom</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">const</span> <span class="token function-variable function">processElement</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    n1<span class="token operator">:</span> VNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    n2<span class="token operator">:</span> VNode<span class="token punctuation">,</span>
    container<span class="token operator">:</span> RendererElement<span class="token punctuation">,</span>
    anchor<span class="token operator">:</span> RendererNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentComponent<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentSuspense<span class="token operator">:</span> SuspenseBoundary <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    isSVG<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    slotScopeIds<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    optimized<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    isSVG <span class="token operator">=</span> isSVG <span class="token operator">||</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token class-name"><span class="token keyword">as</span></span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;svg&#39;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 挂载dom</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">patchElement</span><span class="token punctuation">(</span>
        n1<span class="token punctuation">,</span>
        n2<span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        slotScopeIds<span class="token punctuation">,</span>
        optimized
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之前我们也分析过 <code>processElement</code> 函数，这次应该走更新流程，调用 <code>patchElement</code> 函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">const</span> <span class="token function-variable function">patchElement</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    n1<span class="token operator">:</span> VNode<span class="token punctuation">,</span>
    n2<span class="token operator">:</span> VNode<span class="token punctuation">,</span>
    parentComponent<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentSuspense<span class="token operator">:</span> SuspenseBoundary <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    isSVG<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    slotScopeIds<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    optimized<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>el <span class="token operator">=</span> n1<span class="token punctuation">.</span>el<span class="token operator">!</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> oldProps <span class="token operator">=</span> n1<span class="token punctuation">.</span>props <span class="token operator">||</span> <span class="token constant">EMPTY_OBJ</span>
    <span class="token keyword">const</span> newProps <span class="token operator">=</span> n2<span class="token punctuation">.</span>props <span class="token operator">||</span> <span class="token constant">EMPTY_OBJ</span>

    <span class="token function">patchChildren</span><span class="token punctuation">(</span>
      n1<span class="token punctuation">,</span>
      n2<span class="token punctuation">,</span>
      el<span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      parentComponent<span class="token punctuation">,</span>
      parentSuspense<span class="token punctuation">,</span>
      areChildrenSVG<span class="token punctuation">,</span>
      slotScopeIds<span class="token punctuation">,</span>
      <span class="token boolean">false</span>
    <span class="token punctuation">)</span>

    <span class="token function">patchProps</span><span class="token punctuation">(</span>
      el<span class="token punctuation">,</span>
      n2<span class="token punctuation">,</span>
      oldProps<span class="token punctuation">,</span>
      newProps<span class="token punctuation">,</span>
      parentComponent<span class="token punctuation">,</span>
      parentSuspense<span class="token punctuation">,</span>
      isSVG
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>patchElement</code> 函数主要做了两件事</p><ul><li><code>patchChildren</code> 递归更新子vnode</li><li><code>patchProps</code> 更新当前vnode的props属性，stype、class、event等</li></ul><blockquote><p>真实的dom节点由属性和子节点构成，这里对二者都做了处理</p></blockquote><h4 id="更新子节点" tabindex="-1"><a class="header-anchor" href="#更新子节点" aria-hidden="true">#</a> 更新子节点</h4><p>接着我们分析递归子vnode的逻辑</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">const</span> patchChildren<span class="token operator">:</span> <span class="token function-variable function">PatchChildrenFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    n1<span class="token punctuation">,</span>
    n2<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    anchor<span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    slotScopeIds<span class="token punctuation">,</span>
    optimized <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> c1 <span class="token operator">=</span> n1 <span class="token operator">&amp;&amp;</span> n1<span class="token punctuation">.</span>children
    <span class="token keyword">const</span> prevShapeFlag <span class="token operator">=</span> n1 <span class="token operator">?</span> n1<span class="token punctuation">.</span>shapeFlag <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token keyword">const</span> c2 <span class="token operator">=</span> n2<span class="token punctuation">.</span>children

    <span class="token keyword">const</span> <span class="token punctuation">{</span> patchFlag<span class="token punctuation">,</span> shapeFlag <span class="token punctuation">}</span> <span class="token operator">=</span> n2
    

    <span class="token comment">// 真实dom的子节点存在三种情况：文本、数组（也就是单个或多个子节点）、空</span>
    <span class="token comment">// 以下代码分别对应处理</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TEXT_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 新子节点是文本节点</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>prevShapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 数组 =&gt; 文本</span>
        <span class="token function">unmountChildren</span><span class="token punctuation">(</span>c1 <span class="token keyword">as</span> VNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>c2 <span class="token operator">!==</span> c1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 文本 =&gt; 文本</span>
        <span class="token function">hostSetElementText</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> c2 <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 新子节点这里只能是数组或空</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>prevShapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 旧子节点是数组类型</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 数组 =&gt; 数组</span>
          <span class="token function">patchKeyedChildren</span><span class="token punctuation">(</span>
            c1 <span class="token keyword">as</span> VNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            c2 <span class="token keyword">as</span> VNodeArrayChildren<span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            anchor<span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            isSVG<span class="token punctuation">,</span>
            slotScopeIds<span class="token punctuation">,</span>
            optimized
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// 数组 =&gt; 空</span>
          <span class="token function">unmountChildren</span><span class="token punctuation">(</span>c1 <span class="token keyword">as</span> VNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 旧节点为文本或空</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>prevShapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TEXT_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 文本/空 =&gt; 文本</span>
          <span class="token function">hostSetElementText</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 文本/空 =&gt; 数组</span>
          <span class="token function">mountChildren</span><span class="token punctuation">(</span>
            c2 <span class="token keyword">as</span> VNodeArrayChildren<span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            anchor<span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            isSVG<span class="token punctuation">,</span>
            slotScopeIds<span class="token punctuation">,</span>
            optimized
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于新旧vnode有三种情况，那么就是九种组合，我们逐个分析（旧 =&gt; 新）</p><ul><li>文本 =&gt; 文本，替换文本节点</li><li>文本 =&gt; 空，删除旧子节点</li><li>文本 =&gt; 数组，删除旧子节点，添加多个新子节点</li><li>空 =&gt; 文本，添加新子节点</li><li>空 =&gt; 空，啥也不做</li><li>空 =&gt; 数组，添加多个新子节点</li><li>数组 =&gt; 文本，删除多个旧子节点，添加新子节点</li><li>数组 =&gt; 空，删除多个旧子节点</li><li>数组 =&gt; 数组，删除多个旧子节点，添加多个新子节点</li></ul><h4 id="数组子节点的diff" tabindex="-1"><a class="header-anchor" href="#数组子节点的diff" aria-hidden="true">#</a> 数组子节点的diff</h4><p>当新旧子节点都是数组类型，那么会调用 <code>patchKeyedChildren</code> 方法来对比两个数组</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token comment">// can be all-keyed or mixed</span>
  <span class="token keyword">const</span> <span class="token function-variable function">patchKeyedChildren</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    c1<span class="token operator">:</span> VNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    c2<span class="token operator">:</span> VNodeArrayChildren<span class="token punctuation">,</span>
    container<span class="token operator">:</span> RendererElement<span class="token punctuation">,</span>
    parentAnchor<span class="token operator">:</span> RendererNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentComponent<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentSuspense<span class="token operator">:</span> SuspenseBoundary <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    isSVG<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    slotScopeIds<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    optimized<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">const</span> l2 <span class="token operator">=</span> c2<span class="token punctuation">.</span>length
    <span class="token keyword">let</span> e1 <span class="token operator">=</span> c1<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// prev ending index</span>
    <span class="token keyword">let</span> e2 <span class="token operator">=</span> l2 <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// next ending index</span>

    <span class="token comment">// 1. sync from start</span>
    <span class="token comment">// (a b) c</span>
    <span class="token comment">// (a b) d e</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1 <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 2. sync from end</span>
    <span class="token comment">// a (b c)</span>
    <span class="token comment">// d e (b c)</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1 <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 3. common sequence + mount</span>
    <span class="token comment">// (a b)</span>
    <span class="token comment">// (a b) c</span>
    <span class="token comment">// i = 2, e1 = 1, e2 = 2</span>
    <span class="token comment">// (a b)</span>
    <span class="token comment">// c (a b)</span>
    <span class="token comment">// i = 0, e1 = -1, e2 = 0</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> e1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4. common sequence + unmount</span>
    <span class="token comment">// (a b) c</span>
    <span class="token comment">// (a b)</span>
    <span class="token comment">// i = 2, e1 = 2, e2 = 1</span>
    <span class="token comment">// a (b c)</span>
    <span class="token comment">// (b c)</span>
    <span class="token comment">// i = 0, e1 = 0, e2 = -1</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 5. unknown sequence</span>
    <span class="token comment">// [i ... e1 + 1]: a b [c d e] f g</span>
    <span class="token comment">// [i ... e2 + 1]: a b [e d c h] f g</span>
    <span class="token comment">// i = 2, e1 = 4, e2 = 5</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>patchKeyedChildren</code> 函数就是处理数组子节点更新的函数，函数做了几件事</p><ul><li>从头同步节点</li><li>从尾同步节点</li><li>添加新增节点</li><li>删除多余节点</li><li>处理未知子节点序列</li></ul><p>在开始之前先声明了一些变量: <code>i</code>（从头同步下标）、<code>e1</code>（旧子节点列表末尾下标）、<code>e2</code>（新子节点列表末尾下标）、<code>l2</code>（新子节点长度），之后进行子节点列表的处理，我们逐步分析这五个步骤分别做了什么</p><h5 id="从头同步节点" tabindex="-1"><a class="header-anchor" href="#从头同步节点" aria-hidden="true">#</a> 从头同步节点</h5><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">const</span> l2 <span class="token operator">=</span> c2<span class="token punctuation">.</span>length
    <span class="token keyword">let</span> e1 <span class="token operator">=</span> c1<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// prev ending index</span>
    <span class="token keyword">let</span> e2 <span class="token operator">=</span> l2 <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// next ending index</span>

    <span class="token comment">// 1. sync from start</span>
    <span class="token comment">// (a b) c</span>
    <span class="token comment">// (a b) d e</span>
    <span class="token comment">// i = 2</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1 <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> n1 <span class="token operator">=</span> c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">const</span> n2 <span class="token operator">=</span> c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">patch</span><span class="token punctuation">(</span>
          n1<span class="token punctuation">,</span>
          n2<span class="token punctuation">,</span>
          container<span class="token punctuation">,</span>
          <span class="token keyword">null</span><span class="token punctuation">,</span>
          parentComponent<span class="token punctuation">,</span>
          parentSuspense<span class="token punctuation">,</span>
          isSVG<span class="token punctuation">,</span>
          slotScopeIds<span class="token punctuation">,</span>
          optimized
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
      i<span class="token operator">++</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从头遍历两个子节点列表如果两个字节点一样则递归进行 <code>patch</code> 流程，一直找到两个子节点不一样的下标，例如官方注释给的例子 <code>i</code> 就为2</p><h5 id="从尾同步节点" tabindex="-1"><a class="header-anchor" href="#从尾同步节点" aria-hidden="true">#</a> 从尾同步节点</h5><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">const</span> l2 <span class="token operator">=</span> c2<span class="token punctuation">.</span>length
    <span class="token keyword">let</span> e1 <span class="token operator">=</span> c1<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// prev ending index</span>
    <span class="token keyword">let</span> e2 <span class="token operator">=</span> l2 <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// next ending index</span>

    <span class="token comment">// 2. sync from end</span>
    <span class="token comment">// a (b c)</span>
    <span class="token comment">// d e (b c)</span>
    <span class="token comment">// e1 = 0; e2 = 1</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1 <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> n1 <span class="token operator">=</span> c1<span class="token punctuation">[</span>e1<span class="token punctuation">]</span>
      <span class="token keyword">const</span> n2 <span class="token operator">=</span> c2<span class="token punctuation">[</span>e2<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">patch</span><span class="token punctuation">(</span>
          n1<span class="token punctuation">,</span>
          n2<span class="token punctuation">,</span>
          container<span class="token punctuation">,</span>
          <span class="token keyword">null</span><span class="token punctuation">,</span>
          parentComponent<span class="token punctuation">,</span>
          parentSuspense<span class="token punctuation">,</span>
          isSVG<span class="token punctuation">,</span>
          slotScopeIds<span class="token punctuation">,</span>
          optimized
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
      e1<span class="token operator">--</span>
      e2<span class="token operator">--</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从尾同步的逻辑和从头同步类似，但是新旧子节点的列表不一定是一样长的，所以从尾同步的下标是分开计算的，相同节点递归判断，不同的节点记录下标，例如官方注释的例子此时 <code>e1 = 0; e2 = 1</code></p><h5 id="添加新增节点" tabindex="-1"><a class="header-anchor" href="#添加新增节点" aria-hidden="true">#</a> 添加新增节点</h5><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>    <span class="token comment">// 3. common sequence + mount</span>
    <span class="token comment">// (a b)</span>
    <span class="token comment">// (a b) c</span>
    <span class="token comment">// i = 2, e1 = 1, e2 = 2</span>
    <span class="token comment">// (a b)</span>
    <span class="token comment">// c (a b)</span>
    <span class="token comment">// i = 0, e1 = -1, e2 = 0</span>
    <span class="token comment">// (a  b)</span>
    <span class="token comment">// (a) c (b)</span>
    <span class="token comment">// i = 1, e1 = 0, e2 = 1</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> e1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 新节点计算插入位置</span>
        <span class="token keyword">const</span> nextPos <span class="token operator">=</span> e2 <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token keyword">const</span> anchor <span class="token operator">=</span> nextPos <span class="token operator">&lt;</span> l2 <span class="token operator">?</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>nextPos<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span><span class="token punctuation">.</span>el <span class="token operator">:</span> parentAnchor
        <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">patch</span><span class="token punctuation">(</span>
            <span class="token keyword">null</span><span class="token punctuation">,</span>
            c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            anchor<span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            isSVG<span class="token punctuation">,</span>
            slotScopeIds<span class="token punctuation">,</span>
            optimized
          <span class="token punctuation">)</span>
          i<span class="token operator">++</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后的逻辑都需要从头同步和从尾同步的结果，我们从官方注释给出的例子看出，不论新增的 <code>c</code> 节点位置如何，<code>i</code> 是一定比 <code>e1</code> 大，而 <code>i</code> 一定小于等于 <code>e2</code>，这也就意味着新子节点列表是旧子节点列表的超集</p><p>从以上例子得出，在新子节点列表中从下标 <code>i</code> 到 <code>e2</code> 的子节点就是需要新增的子节点，利用 <code>patch</code> 函数新增，</p><h5 id="删除多余节点" tabindex="-1"><a class="header-anchor" href="#删除多余节点" aria-hidden="true">#</a> 删除多余节点</h5><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> e1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 4. common sequence + unmount</span>
    <span class="token comment">// (a b) c</span>
    <span class="token comment">// (a b)</span>
    <span class="token comment">// i = 2, e1 = 2, e2 = 1</span>
    <span class="token comment">// a (b c)</span>
    <span class="token comment">// (b c)</span>
    <span class="token comment">// i = 0, e1 = 0, e2 = -1</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">unmount</span><span class="token punctuation">(</span>c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        i<span class="token operator">++</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们从官方注释给出的例子看出，删除了旧子节点中的哪个节点，<code>i</code> 是一定比 <code>e2</code> 小，而 <code>i</code> 一定小于等于 <code>e1</code>，这也就意味着旧子节点列表是新子节点列表的超集</p><p>那么在旧子节点列表中从下标 <code>i</code> 到 <code>e1</code> 的子节点就是需要删除的节点，利用 <code>unmount</code> 删除多余节点</p><h5 id="处理未知子节点序列" tabindex="-1"><a class="header-anchor" href="#处理未知子节点序列" aria-hidden="true">#</a> 处理未知子节点序列</h5><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>    <span class="token comment">// 5. unknown sequence</span>
    <span class="token comment">// [i ... e1 + 1]: a b [c d e] f g</span>
    <span class="token comment">// [i ... e2 + 1]: a b [e d c h] f g</span>
    <span class="token comment">// i = 2, e1 = 4, e2 = 5</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> s1 <span class="token operator">=</span> i <span class="token comment">// prev starting index</span>
      <span class="token keyword">const</span> s2 <span class="token operator">=</span> i <span class="token comment">// next starting index</span>

      <span class="token comment">// 5.1 build key:index map for newChildren</span>
      <span class="token comment">// ...</span>

      <span class="token comment">// 5.2 loop through old children left to be patched and try to patch</span>
      <span class="token comment">// matching nodes &amp; remove nodes that are no longer present</span>
      <span class="token comment">// ...</span>

      <span class="token comment">// 5.3 move and mount</span>
      <span class="token comment">// generate longest stable subsequence only when nodes have moved</span>
      <span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>处理未知子节点序列的逻辑比较复杂，大致分三步：创建新节点索引、更新和移除旧节点、移动和挂载新节点</p><p>我们先看如恶化创建新节点索引</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>    <span class="token comment">// 5. unknown sequence</span>
    <span class="token comment">// [i ... e1 + 1]: a b [c d e p] f g</span>
    <span class="token comment">// [i ... e2 + 1]: a b [e d c h] f g</span>
    <span class="token comment">// i = 2, e1 = 5, e2 = 5</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> s1 <span class="token operator">=</span> i <span class="token comment">// prev starting index</span>
      <span class="token keyword">const</span> s2 <span class="token operator">=</span> i <span class="token comment">// next starting index</span>

      <span class="token comment">// 5.1 build key:index map for newChildren</span>
      <span class="token keyword">const</span> keyToNewIndexMap<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> s2<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> nextChild <span class="token operator">=</span> c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nextChild<span class="token punctuation">.</span>key <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          keyToNewIndexMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>nextChild<span class="token punctuation">.</span>key<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先对从头同步下标 <code>i</code> 进行缓存，之后创建节点key映射新节点列表下标字典 <code>keyToNewIndexMap</code></p><p>之后进行更新和移除旧节点</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>    <span class="token comment">// 5. unknown sequence</span>
    <span class="token comment">// [i ... e1 + 1]: a b [c d e] f g</span>
    <span class="token comment">// [i ... e2 + 1]: a b [e d c h] f g</span>
    <span class="token comment">// i = 2, e1 = 4, e2 = 5</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> s1 <span class="token operator">=</span> i <span class="token comment">// prev starting index</span>
      <span class="token keyword">const</span> s2 <span class="token operator">=</span> i <span class="token comment">// next starting index</span>

      <span class="token comment">// 5.1 build key:index map for newChildren</span>
      <span class="token comment">// ...</span>

      <span class="token comment">// 5.2 loop through old children left to be patched and try to patch</span>
      <span class="token keyword">let</span> j
      <span class="token comment">// 当前更新节点数</span>
      <span class="token keyword">let</span> patched <span class="token operator">=</span> <span class="token number">0</span>
      <span class="token comment">// 一共需要更新的节点数，例子中也就是 4</span>
      <span class="token keyword">const</span> toBePatched <span class="token operator">=</span> e2 <span class="token operator">-</span> s2 <span class="token operator">+</span> <span class="token number">1</span>
      <span class="token comment">// 是否存在需要移动节点</span>
      <span class="token keyword">let</span> moved <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token comment">// 用于缓存节点引动下标（目前没用处可能是预留）</span>
      <span class="token keyword">let</span> maxNewIndexSoFar <span class="token operator">=</span> <span class="token number">0</span>
      <span class="token comment">// 这个数组用来缓存新子节点列表的元素在旧子节点列表的元素索引，默认都是0，在例子中就是[0, 0, 0, 0]</span>
      <span class="token keyword">const</span> newIndexToOldIndexMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">(</span>toBePatched<span class="token punctuation">)</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> toBePatched<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> newIndexToOldIndexMap<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>

      <span class="token comment">// 遍历旧子元素列表</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> s1<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> e1<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当前旧子节点</span>
        <span class="token keyword">const</span> prevChild <span class="token operator">=</span> c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token comment">// 如果更新节点的数量已经超过了一共需要更新的节点数则表示之后的节点都是需要卸载的，这里直接卸载</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>patched <span class="token operator">&gt;=</span> toBePatched<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">unmount</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
          <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 接下来是更新节点逻辑</span>
        <span class="token keyword">let</span> newIndex
        <span class="token keyword">if</span> <span class="token punctuation">(</span>prevChild<span class="token punctuation">.</span>key <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果旧节点配置了key，则需要再新节点索引中找到这个key的新节点下标，后续用于直接更新</span>
          newIndex <span class="token operator">=</span> keyToNewIndexMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">.</span>key<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果没有配置key，则遍历新节点需要更新的节点列表，在例子上就是 [e d c h]，如果在该列表中找到了相同类型的子节点则缓存该节点下标，用于后续更新</span>
          <span class="token keyword">for</span> <span class="token punctuation">(</span>j <span class="token operator">=</span> s2<span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> e2<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>
              newIndexToOldIndexMap<span class="token punctuation">[</span>j <span class="token operator">-</span> s2<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
              <span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">,</span> c2<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span>
            <span class="token punctuation">)</span> <span class="token punctuation">{</span>
              newIndex <span class="token operator">=</span> j
              <span class="token keyword">break</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 如果当前旧节点的key或相同类型的节点在新节点列表中都没有，则认为该节点已经被移除</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>newIndex <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">unmount</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// 记录在新节点在旧节点列表中的索引，这里加1的偏移量，为了避免i = 0 的特殊情况</span>
          newIndexToOldIndexMap<span class="token punctuation">[</span>newIndex <span class="token operator">-</span> s2<span class="token punctuation">]</span> <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span>
          <span class="token comment">// 判断是节点否出现移动，每次存储旧节点对应新节点的下标，如果新节点下标没有上一次的大说明节点出现了移动</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>newIndex <span class="token operator">&gt;=</span> maxNewIndexSoFar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            maxNewIndexSoFar <span class="token operator">=</span> newIndex
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            moved <span class="token operator">=</span> <span class="token boolean">true</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 旧节点更新成对应的新节点</span>
          <span class="token function">patch</span><span class="token punctuation">(</span>
            prevChild<span class="token punctuation">,</span>
            c2<span class="token punctuation">[</span>newIndex<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            <span class="token keyword">null</span><span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            isSVG<span class="token punctuation">,</span>
            slotScopeIds<span class="token punctuation">,</span>
            optimized
          <span class="token punctuation">)</span>
          patched<span class="token operator">++</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个更新和移除旧节点的逻辑就是，遍历旧节点列表，如果当前旧节点出现在新节点索引字典中 <code>keyToNewIndexMap</code>，或者新节点中存在类型相同节点，则记录下来后续进行旧节点更新操作。否则就删除旧节点</p><p><code>newIndexToOldIndexMap</code> 数组是用来存储新节点列表中与旧节点映射关系（这里的列表都是去掉前后同步的），如果遍历结束该数组中仍有值为0，那么说明该节点是新增的</p><p><code>maxNewIndexSoFar</code> 是用来存放上一次 <code>newIndex</code> ，用来判断节点是否出现了移动，如果本次的 <code>newIndex</code> 值小于上次的 <code>newIndex</code>，那么说当前节点的顺序发生了改变</p><p>经过更新和移除旧节点的逻辑我们看下注释的例子处理后的结果</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>l1: a b [c d e p] f g
l2: a b [e d c h] f g

l1: a b [c(替换成l2.c) d(替换成l2.d) e(替换成l2.e) p(删除)] f g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到c、d、e节点都更新成新节点，此时 <code>moved</code> 为true， p节点被删除</p><p>但是新节点中还有h节点还没有处理，之后还有移动和挂载新节点逻辑</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>    <span class="token comment">// 5. unknown sequence</span>
    <span class="token comment">// [i ... e1 + 1]: a b [c d e] f g</span>
    <span class="token comment">// [i ... e2 + 1]: a b [e d c h] f g</span>
    <span class="token comment">// i = 2, e1 = 4, e2 = 5</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> s1 <span class="token operator">=</span> i <span class="token comment">// prev starting index</span>
      <span class="token keyword">const</span> s2 <span class="token operator">=</span> i <span class="token comment">// next starting index</span>

      <span class="token comment">// 5.1 build key:index map for newChildren</span>
      <span class="token comment">// ...</span>

      <span class="token comment">// 5.2 loop through old children left to be patched and try to patch</span>
      <span class="token comment">// ...</span>

      <span class="token comment">// 5.3 move and mount</span>
      <span class="token comment">// generate longest stable subsequence only when nodes have moved</span>
      <span class="token comment">// 生成最长子序列</span>
      <span class="token keyword">const</span> increasingNewIndexSequence <span class="token operator">=</span> moved
        <span class="token operator">?</span> <span class="token function">getSequence</span><span class="token punctuation">(</span>newIndexToOldIndexMap<span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token constant">EMPTY_ARR</span>
      j <span class="token operator">=</span> increasingNewIndexSequence<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
      <span class="token comment">// 倒序遍历新子节点（更新部分）方便计算锚点</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> toBePatched <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 新节点列表中更新部分对应新节点列表的下标，因为是倒序，这里也是从后往前</span>
        <span class="token keyword">const</span> nextIndex <span class="token operator">=</span> s2 <span class="token operator">+</span> i
        <span class="token comment">// 对应子节点</span>
        <span class="token keyword">const</span> nextChild <span class="token operator">=</span> c2<span class="token punctuation">[</span>nextIndex<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode
        <span class="token comment">// 获取锚点</span>
        <span class="token keyword">const</span> anchor <span class="token operator">=</span>
          nextIndex <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> l2 <span class="token operator">?</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>nextIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span><span class="token punctuation">.</span>el <span class="token operator">:</span> parentAnchor
        <span class="token keyword">if</span> <span class="token punctuation">(</span>newIndexToOldIndexMap<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果newIndexToOldIndexMap中的某项是0则节点为新增节点</span>
          <span class="token function">patch</span><span class="token punctuation">(</span>
            <span class="token keyword">null</span><span class="token punctuation">,</span>
            nextChild<span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            anchor<span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            isSVG<span class="token punctuation">,</span>
            slotScopeIds<span class="token punctuation">,</span>
            optimized
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>moved<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 移动子元素</span>
          <span class="token comment">// move if:</span>
          <span class="token comment">// There is no stable subsequence (e.g. a reverse)</span>
          <span class="token comment">// OR current node is not among the stable sequence</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> i <span class="token operator">!==</span> increasingNewIndexSequence<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">move</span><span class="token punctuation">(</span>nextChild<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> MoveType<span class="token punctuation">.</span><span class="token constant">REORDER</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            j<span class="token operator">--</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个移动和挂载新节点逻辑就是倒序遍历新节点列表的更新部分，倒序可以方便获取锚点节点，也就是上一个更新的节点，之后判断 <code>newIndexToOldIndexMap[i] === 0</code> ，之前说了如果该列表的某项是0则该节点是新增节点，那么就走挂载逻辑，之后判断是否存在并移动节点</p><blockquote><p>这里移动子节点通过<strong>最长递增子序列</strong>的算法实现，也就是函数 <code>getSequence</code> 的实现</p></blockquote><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>vue的更新粒度是组件级别的，如果子组件的属性更新则也会导致重新渲染。普通元素主要是更新其属性和子元素，其中更新子元素又分很多种情况。</p><p><img src="`+u+'" alt="diff"></p>',57);function g(y,w){const e=i("RouterLink");return t(),o("div",null,[r,n("ul",null,[k,v,m,b,n("li",null,[s("之后就是继续走patch流程递归当前组件vnode中的子vnode，我们在一开始"),c(e,{to:"/nav.vue3%E6%BA%90%E7%A0%81/1.%E7%BB%84%E4%BB%B6/2.diff%E6%B5%81%E7%A8%8B.html#%E7%BB%84%E4%BB%B6%E6%9B%B4%E6%96%B0%E5%87%BD%E6%95%B0update"},{default:l(()=>[s("组件更新函数update")]),_:1}),s("中分析过")])]),h])}const S=p(d,[["render",g],["__file","2.diff流程.html.vue"]]);export{S as default};
