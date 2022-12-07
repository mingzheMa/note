import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as p}from"./app.9ac9284b.js";const t="/assets/init.2f3098ce.png",e={},o=p(`<h1 id="setup-组件初始化" tabindex="-1"><a class="header-anchor" href="#setup-组件初始化" aria-hidden="true">#</a> setup（组件初始化）</h1><p>vue3新增 <code>setup</code> 配置，是Composition API的入口</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>num++<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{num}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      num
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>js的部分也可以这么写</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>我们暂时不考虑这种写法，不利于我们分析源码</p></blockquote><p>在vue2.x编写组件的时候，是在初始化阶段就已经对props、computed、data进行数据拦截，并手动触发获取数据从而收集依赖。那么在vue3中是如何访问到setup函数的返回值，我们接下来重点研究</p><p>一个组件的渲染流程是</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>创建vnode =&gt; 渲染vnode（转化成Dom） =&gt; 挂载Dom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在组件渲染vnode之前还做了一些处理</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> mountComponent<span class="token operator">:</span> <span class="token function-variable function">MountComponentFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    initialVNode<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    anchor<span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    optimized
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">=</span>
      compatMountInstance <span class="token operator">||</span>
      <span class="token punctuation">(</span>initialVNode<span class="token punctuation">.</span>component <span class="token operator">=</span> <span class="token function">createComponentInstance</span><span class="token punctuation">(</span>
        initialVNode<span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense
      <span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token function">setupComponent</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>

    <span class="token function">setupRenderEffect</span><span class="token punctuation">(</span>
      instance<span class="token punctuation">,</span>
      initialVNode<span class="token punctuation">,</span>
      container<span class="token punctuation">,</span>
      anchor<span class="token punctuation">,</span>
      parentSuspense<span class="token punctuation">,</span>
      isSVG<span class="token punctuation">,</span>
      optimized
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那就是进行了<strong>创建组件实例</strong>、<strong>设置组件实例</strong>、<strong>设置并运行副作用（挂载渲染vnode函数，并运行）</strong></p><h2 id="创建组件实例" tabindex="-1"><a class="header-anchor" href="#创建组件实例" aria-hidden="true">#</a> 创建组件实例</h2><p>我们先来分析创建组件实例 <code>createComponentInstance</code> 函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createComponentInstance</span><span class="token punctuation">(</span>
  vnode<span class="token operator">:</span> VNode<span class="token punctuation">,</span>
  parent<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  suspense<span class="token operator">:</span> SuspenseBoundary <span class="token operator">|</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> type <span class="token operator">=</span> vnode<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token class-name"><span class="token keyword">as</span></span> ConcreteComponent
  <span class="token comment">// inherit parent app context - or - if root, adopt from root vnode</span>
  <span class="token keyword">const</span> appContext <span class="token operator">=</span>
    <span class="token punctuation">(</span>parent <span class="token operator">?</span> parent<span class="token punctuation">.</span>appContext <span class="token operator">:</span> vnode<span class="token punctuation">.</span>appContext<span class="token punctuation">)</span> <span class="token operator">||</span> emptyAppContext

  <span class="token keyword">const</span> instance<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">=</span> <span class="token punctuation">{</span>
    uid<span class="token operator">:</span> uid<span class="token operator">++</span><span class="token punctuation">,</span> <span class="token comment">// 组件id</span>
    vnode<span class="token punctuation">,</span> <span class="token comment">// 组件vnode</span>
    type<span class="token punctuation">,</span> <span class="token comment">// 组件类型</span>
    parent<span class="token punctuation">,</span> <span class="token comment">// 父组件实例</span>
    appContext<span class="token punctuation">,</span> <span class="token comment">// app上下文</span>
    root<span class="token operator">:</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token comment">// 根组件实例</span>
    next<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 新组件vnode用来更新对比</span>
    subTree<span class="token operator">:</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token comment">// 子vnode树</span>
    effect<span class="token operator">:</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token comment">// 响应式相关</span>
    update<span class="token operator">:</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token comment">// 更新函数</span>
    scope<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">EffectScope</span><span class="token punctuation">(</span><span class="token boolean">true</span> <span class="token comment">/* detached */</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    render<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 模板渲染函数</span>
    proxy<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 渲染上下文代理</span>
    exposed<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    exposeProxy<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    withProxy<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 带有with区块的上下文代理</span>
    provides<span class="token operator">:</span> parent <span class="token operator">?</span> parent<span class="token punctuation">.</span>provides <span class="token operator">:</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>appContext<span class="token punctuation">.</span>provides<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 祖辈组件依赖注入</span>
    accessCache<span class="token operator">:</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token comment">// 渲染代理属性缓存</span>
    renderCache<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 渲染缓存</span>

    <span class="token comment">// local resolved assets</span>
    components<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 该组件上注册的组件</span>
    directives<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 该组件上注册的指令</span>

    <span class="token comment">// resolved props and emits options</span>
    propsOptions<span class="token operator">:</span> <span class="token function">normalizePropsOptions</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> appContext<span class="token punctuation">)</span><span class="token punctuation">,</span>
    emitsOptions<span class="token operator">:</span> <span class="token function">normalizeEmitsOptions</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> appContext<span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token comment">// emit</span>
    emit<span class="token operator">:</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">,</span> <span class="token comment">// 触发事件方法</span>
    emitted<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> 

    <span class="token comment">// props default value</span>
    propsDefaults<span class="token operator">:</span> <span class="token constant">EMPTY_OBJ</span><span class="token punctuation">,</span>

    <span class="token comment">// inheritAttrs</span>
    inheritAttrs<span class="token operator">:</span> type<span class="token punctuation">.</span>inheritAttrs<span class="token punctuation">,</span>

    <span class="token comment">// state</span>
    ctx<span class="token operator">:</span> <span class="token constant">EMPTY_OBJ</span><span class="token punctuation">,</span> <span class="token comment">// 渲染上下文</span>
    data<span class="token operator">:</span> <span class="token constant">EMPTY_OBJ</span><span class="token punctuation">,</span> <span class="token comment">// data 数据</span>
    props<span class="token operator">:</span> <span class="token constant">EMPTY_OBJ</span><span class="token punctuation">,</span> <span class="token comment">// props 数据</span>
    attrs<span class="token operator">:</span> <span class="token constant">EMPTY_OBJ</span><span class="token punctuation">,</span> <span class="token comment">// 普通属性</span>
    slots<span class="token operator">:</span> <span class="token constant">EMPTY_OBJ</span><span class="token punctuation">,</span> <span class="token comment">// 插槽</span>
    refs<span class="token operator">:</span> <span class="token constant">EMPTY_OBJ</span><span class="token punctuation">,</span> <span class="token comment">// ref</span>
    setupState<span class="token operator">:</span> <span class="token constant">EMPTY_OBJ</span><span class="token punctuation">,</span> <span class="token comment">// setup函数返回结果</span>
    setupContext<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// setup函数上下文</span>

    <span class="token comment">// suspense related suspense组件相关</span>
    suspense<span class="token punctuation">,</span>
    suspenseId<span class="token operator">:</span> suspense <span class="token operator">?</span> suspense<span class="token punctuation">.</span>pendingId <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    asyncDep<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    asyncResolved<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

    <span class="token comment">// lifecycle hooks</span>
    <span class="token comment">// not using enums here because it results in computed properties</span>
    isMounted<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否已挂载</span>
    isUnmounted<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否已卸载</span>
    isDeactivated<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否失活</span>
    bc<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// beforCreate生命周期</span>
    c<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// created生命周期</span>
    bm<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// beforeMount生命周期</span>
    m<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// mounted生命周期</span>
    bu<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// beforeUpdate生命周期</span>
    u<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// updated生命周期</span>
    um<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// unmounted生命周期</span>
    bum<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// beforUnmount生命周期</span>
    da<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// deactivated生命周期</span>
    a<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// activated生命周期</span>
    rtg<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// renderTriggered生命周期，仅开发</span>
    rtc<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// renderTracked生命周期，仅开发</span>
    ec<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// errorCaptured生命周期</span>
    sp<span class="token operator">:</span> <span class="token keyword">null</span> <span class="token comment">// serverPrefetch生命周期</span>
  <span class="token punctuation">}</span>
 
  instance<span class="token punctuation">.</span>ctx <span class="token operator">=</span> <span class="token punctuation">{</span> _<span class="token operator">:</span> instance <span class="token punctuation">}</span> <span class="token comment">// 初始化渲染上下文</span>
  instance<span class="token punctuation">.</span>root <span class="token operator">=</span> parent <span class="token operator">?</span> parent<span class="token punctuation">.</span>root <span class="token operator">:</span> instance <span class="token comment">// 赋值根组件实例</span>
  instance<span class="token punctuation">.</span>emit <span class="token operator">=</span> <span class="token function">emit</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span> <span class="token comment">// 赋值触发事件函数</span>

  <span class="token keyword">return</span> instance
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组件实例本质就是一个对象，里面有一些组件的方法以及属性。接着就是组件实例的设置流程，通过函数 <code>setupComponent</code> 实现</p><h2 id="设置组件实例" tabindex="-1"><a class="header-anchor" href="#设置组件实例" aria-hidden="true">#</a> 设置组件实例</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">setupComponent</span><span class="token punctuation">(</span>
  instance<span class="token operator">:</span> ComponentInternalInstance<span class="token punctuation">,</span>
  isSSR <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 服务器渲染相关</span>
  isInSSRComponentSetup <span class="token operator">=</span> isSSR

  <span class="token keyword">const</span> <span class="token punctuation">{</span> props<span class="token punctuation">,</span> children <span class="token punctuation">}</span> <span class="token operator">=</span> instance<span class="token punctuation">.</span>vnode
  <span class="token comment">// 判断是否是一个有状态的组件，其实就是组件是否是一个对象</span>
  <span class="token keyword">const</span> isStateful <span class="token operator">=</span> <span class="token function">isStatefulComponent</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>
  <span class="token comment">// 初始化props</span>
  <span class="token function">initProps</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> props<span class="token punctuation">,</span> isStateful<span class="token punctuation">,</span> isSSR<span class="token punctuation">)</span>
  <span class="token comment">// 初始化slots</span>
  <span class="token function">initSlots</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> children<span class="token punctuation">)</span>

  <span class="token comment">// 设置状态组件</span>
  <span class="token keyword">const</span> setupResult <span class="token operator">=</span> isStateful
    <span class="token operator">?</span> <span class="token function">setupStatefulComponent</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> isSSR<span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token keyword">undefined</span>
  isInSSRComponentSetup <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">return</span> setupResult
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>setupComponent</code> 函数中进行初始化props和slots，这部分逻辑在后面分析，接着判断如果有状态的组件，则通过 <code>setupStatefulComponent</code> 函数进行进一步处理</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">setupStatefulComponent</span><span class="token punctuation">(</span>
  instance<span class="token operator">:</span> ComponentInternalInstance<span class="token punctuation">,</span>
  isSSR<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> Component <span class="token operator">=</span> instance<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token class-name"><span class="token keyword">as</span></span> ComponentOptions

  <span class="token comment">// 创建渲染代理属性缓存</span>
  instance<span class="token punctuation">.</span>accessCache <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token comment">// 创建渲染上下文代理</span>
  instance<span class="token punctuation">.</span>proxy <span class="token operator">=</span> <span class="token function">markRaw</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>ctx<span class="token punctuation">,</span> PublicInstanceProxyHandlers<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token comment">// 判断是否存在setup函数</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token operator">=</span> Component
  <span class="token keyword">if</span> <span class="token punctuation">(</span>setup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建setup上下文，前提是setup函数至少有一个参数（也就是使用setup的第一个参数的时候才会创建上下文）</span>
    <span class="token keyword">const</span> setupContext <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>setupContext <span class="token operator">=</span>
      setup<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token function">createSetupContext</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">)</span>

    <span class="token comment">// 调用setup</span>
    <span class="token keyword">const</span> setupResult <span class="token operator">=</span> <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>
      setup<span class="token punctuation">,</span>
      instance<span class="token punctuation">,</span>
      ErrorCodes<span class="token punctuation">.</span><span class="token constant">SETUP_FUNCTION</span><span class="token punctuation">,</span>
      <span class="token punctuation">[</span>instance<span class="token punctuation">.</span>props<span class="token punctuation">,</span> setupContext<span class="token punctuation">]</span>
    <span class="token punctuation">)</span>

    <span class="token comment">// 判断setup返回值</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPromise</span><span class="token punctuation">(</span>setupResult<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      setupResult<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>unsetCurrentInstance<span class="token punctuation">,</span> unsetCurrentInstance<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 处理返回结果</span>
      <span class="token function">handleSetupResult</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> setupResult<span class="token punctuation">,</span> isSSR<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 完成设置组件实例</span>
    <span class="token function">finishComponentSetup</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> isSSR<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>setupStatefulComponent</code> 函数主要做了几件事：创建渲染上下文代理、调用setup函数、处理setup函数返回结果。我们逐个分析</p><h3 id="创建渲染上下文代理" tabindex="-1"><a class="header-anchor" href="#创建渲染上下文代理" aria-hidden="true">#</a> 创建渲染上下文代理</h3><p>首先要弄清楚为什么要创建一个代理</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ msg }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vue2.x每个组件是一个Vue实例，在获取data或props属性的的时候可以直接通过 <code>this.xxx</code> 获取，实际上这些数据是存放在实例的 <code>_data</code> 和 <code>_props</code> 上的，为了方便使用，vue用Object.defineProperty将其中的属性都挂载到实例上，做了一层代理</p><p>同样在vue3的各个类型的数据也是存放在setupState、ctx、data、props中，为了方便使用，所有的访问都在组件实例渲染上下文（ctx）上进行，所以需要对ctx进行代理，将访问的请求分发到各数据存放的位置</p><p>代理的配置是 <code>PublicInstanceProxyHandlers</code>，<code>PublicInstanceProxyHandlers</code>配置了get、set、has、defineProperty（暂不研究），我们逐个分析</p><h4 id="publicinstanceproxyhandlers-get" tabindex="-1"><a class="header-anchor" href="#publicinstanceproxyhandlers-get" aria-hidden="true">#</a> PublicInstanceProxyHandlers.get</h4><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> PublicInstanceProxyHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">{</span> _<span class="token operator">:</span> instance <span class="token punctuation">}</span><span class="token operator">:</span> ComponentRenderContext<span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> ctx<span class="token punctuation">,</span> setupState<span class="token punctuation">,</span> data<span class="token punctuation">,</span> props<span class="token punctuation">,</span> accessCache<span class="token punctuation">,</span> type<span class="token punctuation">,</span> appContext <span class="token punctuation">}</span> <span class="token operator">=</span>
      instance

    <span class="token keyword">let</span> normalizedProps
    <span class="token comment">// 处理非内部属性 $xxx</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token string">&#39;$&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 取缓存数据</span>
      <span class="token keyword">const</span> n <span class="token operator">=</span> accessCache<span class="token operator">!</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断有缓存，直接取数据</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">case</span> AccessTypes<span class="token punctuation">.</span><span class="token constant">SETUP</span><span class="token operator">:</span>
            <span class="token keyword">return</span> setupState<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
          <span class="token keyword">case</span> AccessTypes<span class="token punctuation">.</span><span class="token constant">DATA</span><span class="token operator">:</span>
            <span class="token keyword">return</span> data<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
          <span class="token keyword">case</span> AccessTypes<span class="token punctuation">.</span><span class="token constant">CONTEXT</span><span class="token operator">:</span>
            <span class="token keyword">return</span> ctx<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
          <span class="token keyword">case</span> AccessTypes<span class="token punctuation">.</span><span class="token constant">PROPS</span><span class="token operator">:</span>
            <span class="token keyword">return</span> props<span class="token operator">!</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
          <span class="token comment">// default: just fallthrough</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasSetupBinding</span><span class="token punctuation">(</span>setupState<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断如果是setupState的数据，获取数据，存缓存，返回</span>
        accessCache<span class="token operator">!</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> AccessTypes<span class="token punctuation">.</span><span class="token constant">SETUP</span>
        <span class="token keyword">return</span> setupState<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">!==</span> <span class="token constant">EMPTY_OBJ</span> <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果是data上的数据，获取数据，存缓存，返回</span>
        accessCache<span class="token operator">!</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> AccessTypes<span class="token punctuation">.</span><span class="token constant">DATA</span>
        <span class="token keyword">return</span> data<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token comment">// only cache other properties when instance has declared (thus stable)</span>
        <span class="token comment">// props</span>
        <span class="token punctuation">(</span>normalizedProps <span class="token operator">=</span> instance<span class="token punctuation">.</span>propsOptions<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        <span class="token function">hasOwn</span><span class="token punctuation">(</span>normalizedProps<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果是props上的数据，获取数据，存缓存，返回</span>
        accessCache<span class="token operator">!</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> AccessTypes<span class="token punctuation">.</span><span class="token constant">PROPS</span>
        <span class="token keyword">return</span> props<span class="token operator">!</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ctx <span class="token operator">!==</span> <span class="token constant">EMPTY_OBJ</span> <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果是ctx上的数据，获取数据，存缓存，返回</span>
        accessCache<span class="token operator">!</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> AccessTypes<span class="token punctuation">.</span><span class="token constant">CONTEXT</span>
        <span class="token keyword">return</span> ctx<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> publicGetter <span class="token operator">=</span> publicPropertiesMap<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">let</span> cssModule<span class="token punctuation">,</span> globalProperties
    <span class="token keyword">if</span> <span class="token punctuation">(</span>publicGetter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断如果是内部属性或方法 $xxx</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">&#39;$attrs&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">track</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> TrackOpTypes<span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token function">publicGetter</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token punctuation">(</span>cssModule <span class="token operator">=</span> type<span class="token punctuation">.</span>__cssModules<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token punctuation">(</span>cssModule <span class="token operator">=</span> cssModule<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断是css模块，通过vue-loader注入</span>
      <span class="token keyword">return</span> cssModule
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ctx <span class="token operator">!==</span> <span class="token constant">EMPTY_OBJ</span> <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断是用户设置的自定义属性，也是$开头</span>
      accessCache<span class="token operator">!</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> AccessTypes<span class="token punctuation">.</span><span class="token constant">CONTEXT</span>
      <span class="token keyword">return</span> ctx<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token punctuation">(</span><span class="token punctuation">(</span>globalProperties <span class="token operator">=</span> appContext<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token function">hasOwn</span><span class="token punctuation">(</span>globalProperties<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断是全局属性</span>
      <span class="token keyword">return</span> globalProperties<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">has</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先是访问非内部属性（非$开头的属性），会根据根据缓存情况去取数据，如果没缓存则取数据并记录缓存。这里的缓存对象 <code>accessCache</code> 非常有意思，只记录了数据名称和数据类型（AccessTypes）的映射，通过 <code>hasOwn</code> 函数遍历对象确认是否存在该属性的性能相对低下，而直接对象数据访问（obj[key]）获取数据性能更好，缓存对象 <code>accessCache</code> 只需要记录该数据的类型即可，重复访问可以直接根据缓存的数据类型去对应的对象中取数据</p><blockquote><p>访问非内部属性的顺序为 setupState &gt; data &gt; ctx &gt; props</p></blockquote><p>之后如果是内部属性或方法（$开头），会依次判断内部属性或方法、css模块、自定义属性、全局属性，并返回对应值</p><h4 id="publicinstanceproxyhandlers-set" tabindex="-1"><a class="header-anchor" href="#publicinstanceproxyhandlers-set" aria-hidden="true">#</a> PublicInstanceProxyHandlers.set</h4><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> PublicInstanceProxyHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">set</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span> _<span class="token operator">:</span> instance <span class="token punctuation">}</span><span class="token operator">:</span> ComponentRenderContext<span class="token punctuation">,</span>
    key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token builtin">any</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> setupState<span class="token punctuation">,</span> ctx <span class="token punctuation">}</span> <span class="token operator">=</span> instance
    <span class="token comment">// 如果是setupState、data属性直接设置，如果是props则不能设置</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasSetupBinding</span><span class="token punctuation">(</span>setupState<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      setupState<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">!==</span> <span class="token constant">EMPTY_OBJ</span> <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      data<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>props<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 如果是内部属性 $xxx 不能设置，否则设置渲染上下文中的数据</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39;$&#39;</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">in</span> instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      ctx<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">has</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>set</code> 配置逻辑比较简单，对一些属性赋值进行了限制。如果是setupState、data属性可以进行赋值，如果是内部属性则不能复制，如果以上情况都不是则给渲染上下文赋值（ctx）</p><p>这里渲染上下文赋值的情况属于setup函数没有返回该属性、data中没有配置该属性、props中也没有该属性，例如：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token string">&#39;data&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>可赋值属性顺序 setupState &gt; data &gt; ctx</p></blockquote><h4 id="publicinstanceproxyhandlers-has" tabindex="-1"><a class="header-anchor" href="#publicinstanceproxyhandlers-has" aria-hidden="true">#</a> PublicInstanceProxyHandlers.has</h4><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> PublicInstanceProxyHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">has</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
      _<span class="token operator">:</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> setupState<span class="token punctuation">,</span> accessCache<span class="token punctuation">,</span> ctx<span class="token punctuation">,</span> appContext<span class="token punctuation">,</span> propsOptions <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token operator">:</span> ComponentRenderContext<span class="token punctuation">,</span>
    key<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> normalizedProps
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">!</span><span class="token operator">!</span>accessCache<span class="token operator">!</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">||</span>
      <span class="token punctuation">(</span>data <span class="token operator">!==</span> <span class="token constant">EMPTY_OBJ</span> <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token function">hasSetupBinding</span><span class="token punctuation">(</span>setupState<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token punctuation">(</span><span class="token punctuation">(</span>normalizedProps <span class="token operator">=</span> propsOptions<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>normalizedProps<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token function">hasOwn</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token function">hasOwn</span><span class="token punctuation">(</span>publicPropertiesMap<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token function">hasOwn</span><span class="token punctuation">(</span>appContext<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>has</code>，方法就是在遍历的时候按照一定顺序判断是否存在某值：渲染属性缓存（accessCache） &gt; data &gt; setupState &gt; props &gt; 渲染上下文（ctx） &gt; 内部属性$xxx &gt; 全局属性</p><h3 id="调用setup函数" tabindex="-1"><a class="header-anchor" href="#调用setup函数" aria-hidden="true">#</a> 调用setup函数</h3><p>数据存放在组件实例的各个属性下，渲染上下文代理实际上是将这些属性代理到渲染上下文（cxt）中，统一数据访问入口。接着回到 <code>setupStatefulComponent</code> 函数中</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 判断是否存在setup函数</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token operator">=</span> Component
<span class="token keyword">if</span> <span class="token punctuation">(</span>setup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建setup上下文，前提是setup函数至少有一个参数（也就是使用setup的第一个参数的时候才会创建上下文）</span>
  <span class="token keyword">const</span> setupContext <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>setupContext <span class="token operator">=</span>
    setup<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token function">createSetupContext</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">)</span>

  <span class="token comment">// 调用setup</span>
  <span class="token keyword">const</span> setupResult <span class="token operator">=</span> <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>
    setup<span class="token punctuation">,</span>
    instance<span class="token punctuation">,</span>
    ErrorCodes<span class="token punctuation">.</span><span class="token constant">SETUP_FUNCTION</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>instance<span class="token punctuation">.</span>props<span class="token punctuation">,</span> setupContext<span class="token punctuation">]</span>
  <span class="token punctuation">)</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先根据setup函数参数判断是否需要创建setup上下文，意思如下：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ data }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onClick<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>click<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> String
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">setup</span> <span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> <span class="token punctuation">{</span> emit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">function</span> <span class="token function">onClick</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;onClick&#39;</span><span class="token punctuation">,</span> props<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        onClick
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上面例子，<code>setup</code> 接收了两个参数，第一个是props，第二个就是setup上下文。具体setup上下文的实现在 <code>createSetupContext</code> 函数中</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createSetupContext</span><span class="token punctuation">(</span>
  instance<span class="token operator">:</span> ComponentInternalInstance
<span class="token punctuation">)</span><span class="token operator">:</span> SetupContext <span class="token punctuation">{</span>
  <span class="token keyword">const</span> expose<span class="token operator">:</span> SetupContext<span class="token punctuation">[</span><span class="token string">&#39;expose&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> exposed <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    instance<span class="token punctuation">.</span>exposed <span class="token operator">=</span> exposed <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> attrs<span class="token operator">:</span> Data
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">attrs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> attrs <span class="token operator">||</span> <span class="token punctuation">(</span>attrs <span class="token operator">=</span> <span class="token function">createAttrsProxy</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    slots<span class="token operator">:</span> instance<span class="token punctuation">.</span>slots<span class="token punctuation">,</span>
    emit<span class="token operator">:</span> instance<span class="token punctuation">.</span>emit<span class="token punctuation">,</span>
    expose
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到setup上下文就是对组件实例上部分属性进行了封装，实际上调用方法或操作数据还是在组件实例上</p><p>接着我们回到 <code>setupStatefulComponent</code> 函数中继续分析，执行setup函数是通过 <code>callWithErrorHandling</code> 函数调用</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> setupResult <span class="token operator">=</span> <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>
  setup<span class="token punctuation">,</span>
  instance<span class="token punctuation">,</span>
  ErrorCodes<span class="token punctuation">.</span><span class="token constant">SETUP_FUNCTION</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>instance<span class="token punctuation">.</span>props<span class="token punctuation">,</span> setupContext<span class="token punctuation">]</span>
<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>
  fn<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">,</span>
  instance<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> ErrorTypes<span class="token punctuation">,</span>
  args<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> res
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    res <span class="token operator">=</span> args <span class="token operator">?</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">handleError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> type<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>callWithErrorHandling</code> 函数只是执行了传入函数，并处理报错。可以看到setup函数的第一第二参数就是 <code>callWithErrorHandling</code> 函数传入的 <code>[instance.props, setupContext]</code></p><h3 id="处理setup函数返回结果" tabindex="-1"><a class="header-anchor" href="#处理setup函数返回结果" aria-hidden="true">#</a> 处理setup函数返回结果</h3><p>调用setup的逻辑就是获取使用setup函数参数情况进行参数构建，并调用setup函数将构建好的参数传入，获得setup函数的返回值 <code>setupResult</code>。我们再次回到 <code>setupStatefulComponent</code> 函数看如何处理setup返回结果 <code>setupResult</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token function">handleSetupResult</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> setupResult<span class="token punctuation">,</span> isSSR<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过 <code>handleSetupResult</code> 函数处理 <code>setupResult</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">handleSetupResult</span><span class="token punctuation">(</span>
  instance<span class="token operator">:</span> ComponentInternalInstance<span class="token punctuation">,</span>
  setupResult<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span>
  isSSR<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFunction</span><span class="token punctuation">(</span>setupResult<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断是渲染函数</span>
    instance<span class="token punctuation">.</span>render <span class="token operator">=</span> setupResult <span class="token keyword">as</span> InternalRenderFunction
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>setupResult<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断是对象，将返回值转化成响应式</span>
    instance<span class="token punctuation">.</span>setupState <span class="token operator">=</span> <span class="token function">proxyRefs</span><span class="token punctuation">(</span>setupResult<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 完成组件实例设置</span>
  <span class="token function">finishComponentSetup</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> isSSR<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>handleSetupResult</code> 函数根据 <code>setupResult</code>（setup函数返回值）的类型做不同处理，如果是函数则认为是渲染函数挂载到组件实例上（setup可以返回一个渲染函数），如果是对象则转化成响应式挂载到组件实例，这样setup函数和当前组件就关联上了。最后调用 <code>finishComponentSetup</code> 完成组件实例的设置</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">finishComponentSetup</span><span class="token punctuation">(</span>
  instance<span class="token operator">:</span> ComponentInternalInstance<span class="token punctuation">,</span>
  isSSR<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
  skipOptions<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> Component <span class="token operator">=</span> instance<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token class-name"><span class="token keyword">as</span></span> ComponentOptions

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断组件实例上没有render函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isSSR <span class="token operator">&amp;&amp;</span> compile <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>Component<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 不是服务器渲染，且使用了runtime-only版本，且该组件没有render函数</span>

      <span class="token comment">// 获取模板</span>
      <span class="token keyword">const</span> template <span class="token operator">=</span>
        <span class="token punctuation">(</span>__COMPAT__ <span class="token operator">&amp;&amp;</span>
          instance<span class="token punctuation">.</span>vnode<span class="token punctuation">.</span>props <span class="token operator">&amp;&amp;</span>
          instance<span class="token punctuation">.</span>vnode<span class="token punctuation">.</span>props<span class="token punctuation">[</span><span class="token string">&#39;inline-template&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">||</span>
        Component<span class="token punctuation">.</span>template <span class="token operator">||</span>
        <span class="token function">resolveMergedOptions</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">.</span>template
      <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 根据组件配置和组件模板生成render函数</span>

        <span class="token comment">// 这里配置优先级是 组件配置 &gt; 全局配置</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> isCustomElement<span class="token punctuation">,</span> compilerOptions <span class="token punctuation">}</span> <span class="token operator">=</span> instance<span class="token punctuation">.</span>appContext<span class="token punctuation">.</span>config
        <span class="token keyword">const</span> <span class="token punctuation">{</span> delimiters<span class="token punctuation">,</span> compilerOptions<span class="token operator">:</span> componentCompilerOptions <span class="token punctuation">}</span> <span class="token operator">=</span>
          Component
        <span class="token keyword">const</span> finalCompilerOptions<span class="token operator">:</span> CompilerOptions <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span>
          <span class="token function">extend</span><span class="token punctuation">(</span>
            <span class="token punctuation">{</span>
              isCustomElement<span class="token punctuation">,</span>
              delimiters
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            compilerOptions
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
          componentCompilerOptions
        <span class="token punctuation">)</span>

        <span class="token comment">// 生成render函数</span>
        Component<span class="token punctuation">.</span>render <span class="token operator">=</span> <span class="token function">compile</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> finalCompilerOptions<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 组件实例的render函数就是组件的render函数</span>
    instance<span class="token punctuation">.</span>render <span class="token operator">=</span> <span class="token punctuation">(</span>Component<span class="token punctuation">.</span>render <span class="token operator">||</span> <span class="token constant">NOOP</span><span class="token punctuation">)</span> <span class="token keyword">as</span> InternalRenderFunction

    <span class="token comment">// 对使用with块，使用新的上下文代理</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>installWithProxy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">installWithProxy</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>finishComponentSetup</code> 函数主要作用在于，根据组件配置和组件模板生成该组件的render函数，并挂在至组件实例上</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>这章主要分析组件在渲染vnode之前的逻辑，首先需要创建组件实例，接着设置组件实例。在设置组件实例中了解为什么需要渲染上下文代理以及创建逻辑，了解之后调用setup函数时机以及参数生成，以及最后处理setup函数的返回值并生成该组件的render函数挂载至属性实例上</p><p><img src="`+t+`" alt=""></p><h2 id="附加" tabindex="-1"><a class="header-anchor" href="#附加" aria-hidden="true">#</a> 附加</h2><h3 id="runtime-only和runtime-compiled版本" tabindex="-1"><a class="header-anchor" href="#runtime-only和runtime-compiled版本" aria-hidden="true">#</a> runtime-only和runtime-compiled版本</h3><p>vue组件最终是通过render函数生成的vnode树，render是代码中编写的模板编译生成，如果项目是用webpack构建，可以通过vue-loader将模板编译生成render。如果直接引入vue使用，vue本身也自带编译函数compile进行编译模板</p><p>这也就是为什么有runtime-only和runtime-compiled版本，区别在于是否有compile函数。如果项目使用webpack + vue-loader构建，建议使用runtime-only版本减少打包体积。如果项目直接引入vue则需要使用runtime-compiled版本</p><p>vue3的compile方法是通过函数注册的</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> compile<span class="token operator">:</span> CompileFunction <span class="token operator">|</span> <span class="token keyword">undefined</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">registerRuntimeCompiler</span><span class="token punctuation">(</span>_compile<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  compile <span class="token operator">=</span> _compile
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为什么调用setup需要通过callwitherrorhandling函数" tabindex="-1"><a class="header-anchor" href="#为什么调用setup需要通过callwitherrorhandling函数" aria-hidden="true">#</a> 为什么调用setup需要通过callWithErrorHandling函数</h3><p>我们进入该函数内部查看</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>
  fn<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">,</span>
  instance<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> ErrorTypes<span class="token punctuation">,</span>
  args<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> res
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    res <span class="token operator">=</span> args <span class="token operator">?</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">handleError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> type<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果setup函数报错，这里进入 <code>handleError</code> 函数处理</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">handleError</span><span class="token punctuation">(</span>
  err<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span>
  instance<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> ErrorTypes<span class="token punctuation">,</span>
  throwInDev <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> contextVNode <span class="token operator">=</span> instance <span class="token operator">?</span> instance<span class="token punctuation">.</span>vnode <span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 从当前组件向上冒泡，触发父组件、祖父组件的errorCaptured生命周期，直到根组件</span>
    <span class="token keyword">let</span> cur <span class="token operator">=</span> instance<span class="token punctuation">.</span>parent
    <span class="token keyword">const</span> exposedInstance <span class="token operator">=</span> instance<span class="token punctuation">.</span>proxy
    <span class="token keyword">const</span> errorInfo <span class="token operator">=</span> <span class="token keyword">type</span>
    <span class="token class-name"><span class="token keyword">while</span></span> <span class="token punctuation">(</span>cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> errorCapturedHooks <span class="token operator">=</span> cur<span class="token punctuation">.</span>ec
      <span class="token keyword">if</span> <span class="token punctuation">(</span>errorCapturedHooks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> errorCapturedHooks<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>errorCapturedHooks<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> exposedInstance<span class="token punctuation">,</span> errorInfo<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>parent
    <span class="token punctuation">}</span>
    <span class="token comment">// 调用全局配置的errorHandler函数</span>
    <span class="token keyword">const</span> appErrorHandler <span class="token operator">=</span> instance<span class="token punctuation">.</span>appContext<span class="token punctuation">.</span>config<span class="token punctuation">.</span>errorHandler
    <span class="token keyword">if</span> <span class="token punctuation">(</span>appErrorHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>
        appErrorHandler<span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        ErrorCodes<span class="token punctuation">.</span><span class="token constant">APP_ERROR_HANDLER</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span>err<span class="token punctuation">,</span> exposedInstance<span class="token punctuation">,</span> errorInfo<span class="token punctuation">]</span>
      <span class="token punctuation">)</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 记录错误信息</span>
  <span class="token function">logError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> type<span class="token punctuation">,</span> contextVNode<span class="token punctuation">,</span> throwInDev<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>handleError</code> 函数将错误向上冒泡，调用父级组件的errorCaptured生命周期直到根组件，之后调用全局配置的errorHandler函数，最后记录错误</p>`,75),c=[o];function l(i,u){return s(),a("div",null,c)}const d=n(e,[["render",l],["__file","3.setup.html.vue"]]);export{d as default};
