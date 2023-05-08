import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.002a81c8.js";const p="/note/assets/mount.41beeec2.png",t={},o=e(`<h1 id="vnode到dom-组件渲染" tabindex="-1"><a class="header-anchor" href="#vnode到dom-组件渲染" aria-hidden="true">#</a> vnode到dom（组件渲染）</h1><p>在vue3中组件是很重要的概念，整个应用都是由组件构成，组件是对一颗dom树的抽象，一个组件生成真实的dom有以下步骤</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>构建vnode =&gt; 渲染vnode =&gt; 生成dom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来我们从初始化阶段开始分析</p><h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h2><p>渲染一颗树是需要从根元素进行渲染，我们需要找到如何使用vue</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// vue2.x</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App&#39;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// vue3.x</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./app&#39;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出vue2.x和3.x初始化阶段还是有一定区别的，vue2需要<code>new Vue</code>来获得实例从而调用方法，而vue3提供了<code>createApp</code>函数返回实例在调用其方法挂载，本质上两者都是将组件挂载到真实dom上，我们看下vue3的内部实现</p><blockquote><p>vue2是将方法都挂载在vue构造函数上，vue3将一些api提取出来，使用导入的方式调用，这么做的好处是在打包阶段利用tree-shaking舍弃掉导出未使用的代码</p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> createApp <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">ensureRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createApp</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token operator">=</span> app
  app<span class="token punctuation">.</span>mount <span class="token operator">=</span> <span class="token punctuation">(</span>containerOrSelector<span class="token operator">:</span> Element <span class="token operator">|</span> ShadowRoot <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>

  <span class="token keyword">return</span> app
<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">as</span> CreateAppFunction<span class="token operator">&lt;</span>Element<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到其内部通过<code>ensureRenderer().createApp(...args)</code>创建了一个app实例，并修改实例的<code>mount</code>，最后将实例返回，我们逐步研究其内部构造</p><h3 id="创建app实例" tabindex="-1"><a class="header-anchor" href="#创建app实例" aria-hidden="true">#</a> 创建app实例</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> createApp <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">ensureRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createApp</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">as</span> CreateAppFunction<span class="token operator">&lt;</span>Element<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>app实例是通过渲染器<code>ensureRenderer()</code>调用<code>createApp</code>方法创建的，</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> renderer<span class="token operator">:</span> Renderer<span class="token operator">&lt;</span>Element <span class="token operator">|</span> ShadowRoot<span class="token operator">&gt;</span> <span class="token operator">|</span> HydrationRenderer

<span class="token keyword">function</span> <span class="token function">ensureRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    renderer <span class="token operator">||</span>
    <span class="token punctuation">(</span>renderer <span class="token operator">=</span> <span class="token generic-function"><span class="token function">createRenderer</span><span class="token generic class-name"><span class="token operator">&lt;</span>Node<span class="token punctuation">,</span> Element <span class="token operator">|</span> ShadowRoot<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>rendererOptions<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数<code>ensureRenderer</code>通过传入一个配置创建一个渲染器，通过配置生成渲染器是因为vue3不止有web环境，这么做能降低代码耦合度</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">createRenderer</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  HostNode <span class="token operator">=</span> RendererNode<span class="token punctuation">,</span>
  HostElement <span class="token operator">=</span> RendererElement
<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>options<span class="token operator">:</span> RendererOptions<span class="token operator">&lt;</span>HostNode<span class="token punctuation">,</span> HostElement<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token generic-function"><span class="token function">baseCreateRenderer</span><span class="token generic class-name"><span class="token operator">&lt;</span>HostNode<span class="token punctuation">,</span> HostElement<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">baseCreateRenderer</span><span class="token punctuation">(</span>
  options<span class="token operator">:</span> RendererOptions<span class="token punctuation">,</span>
  createHydrationFns<span class="token operator">?</span><span class="token operator">:</span> <span class="token keyword">typeof</span> createHydrationFunctions
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token keyword">const</span> render<span class="token operator">:</span> <span class="token function-variable function">RootRenderFunction</span> <span class="token operator">=</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> isSVG<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    render<span class="token punctuation">,</span>
    createApp<span class="token operator">:</span> <span class="token function">createAppAPI</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终调用<code>baseCreateRenderer</code>函数返回渲染器，其属性<code>createApp</code>是通过<code>createAppAPI(render)</code>创建的</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">createAppAPI</span><span class="token generic class-name"><span class="token operator">&lt;</span>HostElement<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  render<span class="token operator">:</span> RootRenderFunction<span class="token operator">&lt;</span>HostElement<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  hydrate<span class="token operator">?</span><span class="token operator">:</span> RootHydrateFunction
<span class="token punctuation">)</span><span class="token operator">:</span> CreateAppFunction<span class="token operator">&lt;</span>HostElement<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">createApp</span><span class="token punctuation">(</span>rootComponent<span class="token punctuation">,</span> rootProps <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token function">createAppContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">let</span> isMounted <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">const</span> app<span class="token operator">:</span> App <span class="token operator">=</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>app <span class="token operator">=</span> <span class="token punctuation">{</span>
      _uid<span class="token operator">:</span> uid<span class="token operator">++</span><span class="token punctuation">,</span>
      _component<span class="token operator">:</span> rootComponent <span class="token keyword">as</span> ConcreteComponent<span class="token punctuation">,</span>
      _props<span class="token operator">:</span> rootProps<span class="token punctuation">,</span>
      _container<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      _context<span class="token operator">:</span> context<span class="token punctuation">,</span>
      _instance<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>

      version<span class="token punctuation">,</span>

      <span class="token keyword">get</span> <span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> context<span class="token punctuation">.</span>config
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">use</span><span class="token punctuation">(</span>plugin<span class="token operator">:</span> Plugin<span class="token punctuation">,</span> <span class="token operator">...</span>options<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">mixin</span><span class="token punctuation">(</span>mixin<span class="token operator">:</span> ComponentOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">component</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> component<span class="token operator">?</span><span class="token operator">:</span> Component<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">directive</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> directive<span class="token operator">?</span><span class="token operator">:</span> Directive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">mount</span><span class="token punctuation">(</span>
        rootContainer<span class="token operator">:</span> HostElement<span class="token punctuation">,</span>
        isHydrate<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
        isSVG<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
      <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">createVNode</span><span class="token punctuation">(</span>
            rootComponent <span class="token keyword">as</span> ConcreteComponent<span class="token punctuation">,</span>
            rootProps
          <span class="token punctuation">)</span>
          <span class="token comment">// store app context on the root VNode.</span>
          <span class="token comment">// this will be set on the root instance on initial mount.</span>
          vnode<span class="token punctuation">.</span>appContext <span class="token operator">=</span> context

          <span class="token function">render</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> rootContainer<span class="token punctuation">,</span> isSVG<span class="token punctuation">)</span>

          isMounted <span class="token operator">=</span> <span class="token boolean">true</span>
          app<span class="token punctuation">.</span>_container <span class="token operator">=</span> rootContainer
          <span class="token comment">// for devtools and telemetry</span>
          <span class="token punctuation">(</span>rootContainer <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__vue_app__ <span class="token operator">=</span> app

          <span class="token keyword">return</span> <span class="token function">getExposeProxy</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>component<span class="token operator">!</span><span class="token punctuation">)</span> <span class="token operator">||</span> vnode<span class="token punctuation">.</span>component<span class="token operator">!</span><span class="token punctuation">.</span>proxy
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">unmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">provide</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> app
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>createAppAPI</code>最终返回一个<code>createApp</code>函数，也就是我们在vue3中调用的<code>createApp(App)</code></p><ul><li>通过<code>const context = createAppContext()</code>创建实例上下文，就是一个对象，我们后面讲</li><li>接着创建了一个<code>app</code>对象，上面有一些属性方法，最后将其返回</li><li>在<code>app.mount</code>方法上，通过<code>createVNode</code>创建vnode</li><li>后调用<code>render</code>来生成真实dom，这里的<code>render</code>是<code>createAppAPI</code>函数中传入的，通过闭包的形式保存，这样在调用实例<code>mount</code>方法时就不用传入render函数了</li></ul><h3 id="重写mount方法" tabindex="-1"><a class="header-anchor" href="#重写mount方法" aria-hidden="true">#</a> 重写mount方法</h3><p>在创建一个app实力后重写了mount方法</p><blockquote><p>因为渲染器和创建app的逻辑在每个平台中都需要，所以被抽取在runtime-core的库中，而浏览器环境需要创建真实dom，所以跟dom有关的代码都在runtime-dom的库中，所以渲染器需要通过配置生成，而dom需要特殊方法挂载</p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> createApp <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">ensureRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createApp</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>

  <span class="token keyword">const</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token operator">=</span> app
  app<span class="token punctuation">.</span>mount <span class="token operator">=</span> <span class="token punctuation">(</span>containerOrSelector<span class="token operator">:</span> Element <span class="token operator">|</span> ShadowRoot <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> container <span class="token operator">=</span> <span class="token function">normalizeContainer</span><span class="token punctuation">(</span>containerOrSelector<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>container<span class="token punctuation">)</span> <span class="token keyword">return</span>

    <span class="token keyword">const</span> component <span class="token operator">=</span> app<span class="token punctuation">.</span>_component
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isFunction</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>component<span class="token punctuation">.</span>render <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>component<span class="token punctuation">.</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// __UNSAFE__</span>
      <span class="token comment">// Reason: potential execution of JS expressions in in-DOM template.</span>
      <span class="token comment">// The user must make sure the in-DOM template is trusted. If it&#39;s</span>
      <span class="token comment">// rendered by the server, the template should not contain any user data.</span>
      component<span class="token punctuation">.</span>template <span class="token operator">=</span> container<span class="token punctuation">.</span>innerHTML
    <span class="token punctuation">}</span>

    <span class="token comment">// clear content before mounting</span>
    container<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
    <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> container <span class="token keyword">instanceof</span> <span class="token class-name">SVGElement</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> proxy
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> app
<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">as</span> CreateAppFunction<span class="token operator">&lt;</span>Element<span class="token operator">&gt;</span>

<span class="token keyword">function</span> <span class="token function">normalizeContainer</span><span class="token punctuation">(</span>
  container<span class="token operator">:</span> Element <span class="token operator">|</span> ShadowRoot <span class="token operator">|</span> <span class="token builtin">string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Element <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isString</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span>
    
    <span class="token keyword">return</span> res
  <span class="token punctuation">}</span>
 
  <span class="token keyword">return</span> container <span class="token keyword">as</span> <span class="token builtin">any</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>首先通过<code>normalizeContainer</code>获取到真实的dom，也就是挂在目标dom</li><li>这里<code>app._component</code>指的是我们创建app实例传入的组件，之后判断该组件如果没有定义render或template属性则提取挂载元素的html内容</li><li>使用app实例原先的mount方法进行真实的挂载</li></ul><p>到这里一个组件渲染到页面的过程也就结束了，在过程中还需要生成vnode（<code>createVNode</code>）和渲染vnode（<code>render</code>）的方法我们没有说明，接下来重点分析这两个过程</p><h2 id="创建vnode和渲染vnode" tabindex="-1"><a class="header-anchor" href="#创建vnode和渲染vnode" aria-hidden="true">#</a> 创建vnode和渲染vnode</h2><h3 id="创建vnode" tabindex="-1"><a class="header-anchor" href="#创建vnode" aria-hidden="true">#</a> 创建vnode</h3><p>vnode是用来描述一个真实dom和组件的，本质就是一个对象，上面有一些描述属性以及方法，我们回到构建app实例的地方在原始的mount方法中创建了vnode</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">createAppAPI</span><span class="token generic class-name"><span class="token operator">&lt;</span>HostElement<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  render<span class="token operator">:</span> RootRenderFunction<span class="token operator">&lt;</span>HostElement<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  hydrate<span class="token operator">?</span><span class="token operator">:</span> RootHydrateFunction
<span class="token punctuation">)</span><span class="token operator">:</span> CreateAppFunction<span class="token operator">&lt;</span>HostElement<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">createApp</span><span class="token punctuation">(</span>rootComponent<span class="token punctuation">,</span> rootProps <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> app<span class="token operator">:</span> App <span class="token operator">=</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>app <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>

      <span class="token function">mount</span><span class="token punctuation">(</span>
        rootContainer<span class="token operator">:</span> HostElement<span class="token punctuation">,</span>
        isHydrate<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
        isSVG<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
      <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">createVNode</span><span class="token punctuation">(</span>
            rootComponent <span class="token keyword">as</span> ConcreteComponent<span class="token punctuation">,</span>
            rootProps
          <span class="token punctuation">)</span>
          
          <span class="token comment">// ...</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> app
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>vnode也是vue核心的思想之一，因此代码也在runtime-core核心库中</p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> createVNode <span class="token operator">=</span> <span class="token punctuation">(</span>
  __DEV__ <span class="token operator">?</span> createVNodeWithArgsTransform <span class="token operator">:</span> _createVNode
<span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token keyword">typeof</span> _createVNode

<span class="token keyword">function</span> <span class="token function">_createVNode</span><span class="token punctuation">(</span>
  type<span class="token operator">:</span> VNodeTypes <span class="token operator">|</span> ClassComponent <span class="token operator">|</span> <span class="token keyword">typeof</span> <span class="token constant">NULL_DYNAMIC_COMPONENT</span><span class="token punctuation">,</span>
  props<span class="token operator">:</span> <span class="token punctuation">(</span>Data <span class="token operator">&amp;</span> VNodeProps<span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  children<span class="token operator">:</span> <span class="token builtin">unknown</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  patchFlag<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  dynamicProps<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  isBlockNode <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token operator">:</span> VNode <span class="token punctuation">{</span>
  <span class="token comment">// 统一组件类型以及属性class或style</span>

  <span class="token comment">// encode the vnode type information into a bitmap</span>
  <span class="token keyword">const</span> shapeFlag <span class="token operator">=</span> <span class="token function">isString</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> <span class="token number">1</span>
    <span class="token operator">:</span> __FEATURE_SUSPENSE__ <span class="token operator">&amp;&amp;</span> <span class="token function">isSuspense</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> <span class="token number">128</span>
    <span class="token operator">:</span> <span class="token function">isTeleport</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> <span class="token number">64</span>
    <span class="token operator">:</span> <span class="token function">isObject</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> <span class="token number">4</span>
    <span class="token operator">:</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token operator">?</span> <span class="token number">2</span>
    <span class="token operator">:</span> <span class="token number">0</span>

  <span class="token keyword">return</span> <span class="token function">createBaseVNode</span><span class="token punctuation">(</span>
    type<span class="token punctuation">,</span>
    props<span class="token punctuation">,</span>
    children<span class="token punctuation">,</span>
    patchFlag<span class="token punctuation">,</span>
    dynamicProps<span class="token punctuation">,</span>
    shapeFlag<span class="token punctuation">,</span>
    isBlockNode<span class="token punctuation">,</span>
    <span class="token boolean">true</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>首先统一组件类型和属性，我们这里不细说</li><li>之后对节点进行分类，每一种节点都对应一个数字</li><li>之后通过<code>createBaseVNode</code>创建vnode</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">let</span> currentBlock<span class="token operator">:</span> VNode<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token keyword">function</span> <span class="token function">createBaseVNode</span><span class="token punctuation">(</span>
  type<span class="token operator">:</span> VNodeTypes <span class="token operator">|</span> ClassComponent <span class="token operator">|</span> <span class="token keyword">typeof</span> <span class="token constant">NULL_DYNAMIC_COMPONENT</span><span class="token punctuation">,</span>
  props<span class="token operator">:</span> <span class="token punctuation">(</span>Data <span class="token operator">&amp;</span> VNodeProps<span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  children<span class="token operator">:</span> <span class="token builtin">unknown</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  patchFlag <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  dynamicProps<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  shapeFlag <span class="token operator">=</span> type <span class="token operator">===</span> Fragment <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ELEMENT</span><span class="token punctuation">,</span>
  isBlockNode <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  needFullChildrenNormalization <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
    __v_isVNode<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    __v_skip<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    type<span class="token punctuation">,</span>
    props<span class="token punctuation">,</span>
    key<span class="token operator">:</span> props <span class="token operator">&amp;&amp;</span> <span class="token function">normalizeKey</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span>
    ref<span class="token operator">:</span> props <span class="token operator">&amp;&amp;</span> <span class="token function">normalizeRef</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span>
    scopeId<span class="token operator">:</span> currentScopeId<span class="token punctuation">,</span>
    slotScopeIds<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    children<span class="token punctuation">,</span>
    component<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    suspense<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    ssContent<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    ssFallback<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    dirs<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    transition<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    el<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    anchor<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    target<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    targetAnchor<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    staticCount<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    shapeFlag<span class="token punctuation">,</span>
    patchFlag<span class="token punctuation">,</span>
    dynamicProps<span class="token punctuation">,</span>
    dynamicChildren<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    appContext<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    ctx<span class="token operator">:</span> currentRenderingInstance
  <span class="token punctuation">}</span> <span class="token keyword">as</span> VNode

  <span class="token keyword">if</span> <span class="token punctuation">(</span>needFullChildrenNormalization<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">normalizeChildren</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// compiled element vnode - if children is passed, only possible types are</span>
    <span class="token comment">// string or Array.</span>
    vnode<span class="token punctuation">.</span>shapeFlag <span class="token operator">|=</span> <span class="token function">isString</span><span class="token punctuation">(</span>children<span class="token punctuation">)</span>
      <span class="token operator">?</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TEXT_CHILDREN</span>
      <span class="token operator">:</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span>
  <span class="token punctuation">}</span>


  <span class="token comment">// track vnode for block tree</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    isBlockTreeEnabled <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// avoid a block node from tracking itself</span>
    <span class="token operator">!</span>isBlockNode <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// has current parent block</span>
    currentBlock <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// presence of a patch flag indicates this node needs patching on updates.</span>
    <span class="token comment">// component nodes also should always be patched, because even if the</span>
    <span class="token comment">// component doesn&#39;t need to update, it needs to persist the instance on to</span>
    <span class="token comment">// the next vnode so that it can be properly unmounted later.</span>
    <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>patchFlag <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">||</span> shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">COMPONENT</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// the EVENTS flag is only for hydration and if it is the only flag, the</span>
    <span class="token comment">// vnode should not be considered dynamic due to handler caching.</span>
    vnode<span class="token punctuation">.</span>patchFlag <span class="token operator">!==</span> PatchFlags<span class="token punctuation">.</span><span class="token constant">HYDRATE_EVENTS</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    currentBlock<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> vnode
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>createBaseVNode</code>函数就是最终生成vnode的地方</p><ul><li>首先创建了vnode对象，定义了一些属性</li><li><code>normalizeChildren(vnode, children)</code>对子元素进行标准化处理，只是根据子元素的类型修改当前vnode的<code>shapeFlag</code>属性</li><li>判断当前节点是否是block节点（就是内部是否有动态节点），并记录</li><li>返回vnode</li></ul><p>到这里就完成了vnode的创建流程，我们获取到了vnode，下一步就把它渲染到页面</p><h3 id="渲染vnode" tabindex="-1"><a class="header-anchor" href="#渲染vnode" aria-hidden="true">#</a> 渲染vnode</h3><p>我们在回到runtime-core中app实例上的mount函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">createAppAPI</span><span class="token generic class-name"><span class="token operator">&lt;</span>HostElement<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  render<span class="token operator">:</span> RootRenderFunction<span class="token operator">&lt;</span>HostElement<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  hydrate<span class="token operator">?</span><span class="token operator">:</span> RootHydrateFunction
<span class="token punctuation">)</span><span class="token operator">:</span> CreateAppFunction<span class="token operator">&lt;</span>HostElement<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">createApp</span><span class="token punctuation">(</span>rootComponent<span class="token punctuation">,</span> rootProps <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token keyword">const</span> app<span class="token operator">:</span> App <span class="token operator">=</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>app <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>

      <span class="token function">mount</span><span class="token punctuation">(</span>
        rootContainer<span class="token operator">:</span> HostElement<span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">createVNode</span><span class="token punctuation">(</span>
            rootComponent <span class="token keyword">as</span> ConcreteComponent<span class="token punctuation">,</span>
            rootProps
          <span class="token punctuation">)</span>
        
          <span class="token function">render</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> rootContainer<span class="token punctuation">)</span>

          <span class="token keyword">return</span> <span class="token function">getExposeProxy</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>component<span class="token operator">!</span><span class="token punctuation">)</span> <span class="token operator">||</span> vnode<span class="token punctuation">.</span>component<span class="token operator">!</span><span class="token punctuation">.</span>proxy
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> app
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们刚才研究了如何获取<code>vnode</code>，接下来通过执行<code>render</code>渲染<code>vnode</code>，<code>render</code>函数传入vnode以及挂载容器，是创建appApi的时候传入的</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">baseCreateRenderer</span><span class="token punctuation">(</span>
  options<span class="token operator">:</span> RendererOptions<span class="token punctuation">,</span>
  createHydrationFns<span class="token operator">?</span><span class="token operator">:</span> <span class="token keyword">typeof</span> createHydrationFunctions
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token keyword">const</span> render<span class="token operator">:</span> <span class="token function-variable function">RootRenderFunction</span> <span class="token operator">=</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> isSVG<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">unmount</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">patch</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> isSVG<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">flushPreFlushCbs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">flushPostFlushCbs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    container<span class="token punctuation">.</span>_vnode <span class="token operator">=</span> vnode
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    render<span class="token punctuation">,</span>
    hydrate<span class="token punctuation">,</span>
    createApp<span class="token operator">:</span> <span class="token function">createAppAPI</span><span class="token punctuation">(</span>render<span class="token punctuation">,</span> hydrate<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>render</code>有两个功能，卸载和渲染，如果没有传入vnode就进行卸载，否则通过<code>patch</code>渲染</p><p><code>patch</code>会进行节点对比，我们在mount阶段传入的是一个类选择器，通过重写mount函数后传入这里是一个真实dom</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token comment">// Note: functions inside this closure should use \`const xxx = () =&gt; {}\`</span>
  <span class="token comment">// style in order to prevent being inlined by minifiers.</span>
  <span class="token keyword">const</span> patch<span class="token operator">:</span> <span class="token function-variable function">PatchFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
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

    <span class="token comment">// 当新旧节点都存在且类型不同的时候</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      anchor <span class="token operator">=</span> <span class="token function">getNextHostNode</span><span class="token punctuation">(</span>n1<span class="token punctuation">)</span>
      <span class="token function">unmount</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      n1 <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token punctuation">{</span> type<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> shapeFlag <span class="token punctuation">}</span> <span class="token operator">=</span> n2
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> Text<span class="token operator">:</span> <span class="token comment">// 处理文本节点</span>
      <span class="token keyword">case</span> Comment<span class="token operator">:</span> <span class="token comment">// 处理注释节点</span>
      <span class="token keyword">case</span> Static<span class="token operator">:</span> <span class="token comment">// 处理静态节点</span>
      <span class="token keyword">case</span> Fragment<span class="token operator">:</span> <span class="token comment">// 处理Fragment元素</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ELEMENT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 处理dom元素</span>
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
          <span class="token comment">// 处理组件</span>
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
          <span class="token comment">// 处理TELEPORT组件</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__FEATURE_SUSPENSE__ <span class="token operator">&amp;&amp;</span> shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">SUSPENSE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 处理SUSPENSE组件</span>
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>patch</code>函数有两个功能，一个是根据vnode挂载dom，一个是根据新旧vnode更新dom</p><p>当<code>n1</code>为null时，当前应该执行挂载操作。当n2表示新节点时，会根据节点类型做不同更新处理。<code>container</code>参数表示挂载容器</p><p>我们这里重点关注处理dom元素和组件的逻辑</p><h4 id="处理组件" tabindex="-1"><a class="header-anchor" href="#处理组件" aria-hidden="true">#</a> 处理组件</h4><p>组件处理调用了<code>processComponent</code>函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">processComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
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
      <span class="token keyword">if</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">COMPONENT_KEPT_ALIVE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token punctuation">;</span><span class="token punctuation">(</span>parentComponent<span class="token operator">!</span><span class="token punctuation">.</span>ctx <span class="token keyword">as</span> KeepAliveContext<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">activate</span><span class="token punctuation">(</span>
          n2<span class="token punctuation">,</span>
          container<span class="token punctuation">,</span>
          anchor<span class="token punctuation">,</span>
          isSVG<span class="token punctuation">,</span>
          optimized
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">mountComponent</span><span class="token punctuation">(</span>
          n2<span class="token punctuation">,</span>
          container<span class="token punctuation">,</span>
          anchor<span class="token punctuation">,</span>
          parentComponent<span class="token punctuation">,</span>
          parentSuspense<span class="token punctuation">,</span>
          isSVG<span class="token punctuation">,</span>
          optimized
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">updateComponent</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>processComponent</code>函数通过判断处理挂载、更新以及keep—alive的情况，我们这里先关注挂载</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> mountComponent<span class="token operator">:</span> <span class="token function-variable function">MountComponentFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    initialVNode<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    anchor<span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    optimized
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">=</span> <span class="token punctuation">(</span>initialVNode<span class="token punctuation">.</span>component <span class="token operator">=</span> <span class="token function">createComponentInstance</span><span class="token punctuation">(</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>挂载组件函数的重要逻辑有三个，一个是获取组件实例<code>instance</code>，一个是设置组件实例，最后是设置并运行带副作用的渲染函数<code>setupRenderEffect</code></p><p><code>instance</code>本质是一个对象，上面记录一些组件的属性，具体细节我们之后详细说明</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> setupRenderEffect<span class="token operator">:</span> <span class="token function-variable function">SetupRenderEffectFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
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
        <span class="token keyword">const</span> subTree <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>subTree <span class="token operator">=</span> <span class="token function">renderComponentRoot</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">)</span>
      
        <span class="token function">patch</span><span class="token punctuation">(</span>
          <span class="token keyword">null</span><span class="token punctuation">,</span>
          subTree<span class="token punctuation">,</span>
          container<span class="token punctuation">,</span>
          anchor<span class="token punctuation">,</span>
          instance<span class="token punctuation">,</span>
          parentSuspense<span class="token punctuation">,</span>
          isSVG
        <span class="token punctuation">)</span>

        initialVNode<span class="token punctuation">.</span>el <span class="token operator">=</span> subTree<span class="token punctuation">.</span>el
        instance<span class="token punctuation">.</span>isMounted <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 更新渲染</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>首先声明<code>componentUpdateFn</code>函数</li><li><code>ReactiveEffect</code>构建一个副作用实例<code>effect</code>，暂时理解成当组件数据变化，会触发<code>componentUpdateFn</code>函数</li><li>创建一个<code>update</code>函数</li><li>调用<code>update</code>函数，实际是调用<code>effect.run</code>，最终调用<code>componentUpdateFn</code>函数，函数内做了三件事 <ul><li>创建子树</li><li>递归对比子树</li><li>将子树的跟元素赋值与需要挂载的vnode，也就是我们cereateApp传入的组件</li></ul></li></ul><p>每个组件都有一个render函数（如果你写template最终也会转化成render函数），<code>renderComponentRoot</code>函数将执行render函数，将内部的节点都转化为vnode并且形成依赖关系，也就是<code>subTree</code>，之后递归调用<code>patch</code>将<code>subTree</code>上的所有节点挂载到容器<code>container</code>上</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- app.vue --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>123<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如我们挂载的组件App.vue内部结构是这样的，那么接下来递归<code>patch</code>函数将开始处理真实dom了</p><h4 id="处理dom" tabindex="-1"><a class="header-anchor" href="#处理dom" aria-hidden="true">#</a> 处理dom</h4><p><code>patch</code>中处理dom的函数是<code>processElement</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">const</span> <span class="token function-variable function">processElement</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
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
      <span class="token function">mountElement</span><span class="token punctuation">(</span>
        n2<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        anchor<span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        slotScopeIds<span class="token punctuation">,</span>
        optimized
      <span class="token punctuation">)</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和<code>mountComponent</code>逻辑类似，<code>n1</code>为null则挂载</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">const</span> <span class="token function-variable function">mountElement</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    vnode<span class="token operator">:</span> VNode<span class="token punctuation">,</span>
    container<span class="token operator">:</span> RendererElement<span class="token punctuation">,</span>
    anchor<span class="token operator">:</span> RendererNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentComponent<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentSuspense<span class="token operator">:</span> SuspenseBoundary <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    isSVG<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    slotScopeIds<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    optimized<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> el<span class="token operator">:</span> RendererElement
    <span class="token keyword">let</span> vnodeHook<span class="token operator">:</span> VNodeHook <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">|</span> <span class="token keyword">null</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> type<span class="token punctuation">,</span> props<span class="token punctuation">,</span> shapeFlag<span class="token punctuation">,</span> transition<span class="token punctuation">,</span> dirs <span class="token punctuation">}</span> <span class="token operator">=</span> vnode

    el <span class="token operator">=</span> vnode<span class="token punctuation">.</span>el <span class="token operator">=</span> <span class="token function">hostCreateElement</span><span class="token punctuation">(</span>
      vnode<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token class-name"><span class="token keyword">as</span></span> <span class="token builtin">string</span><span class="token punctuation">,</span>
      isSVG<span class="token punctuation">,</span>
      props <span class="token operator">&amp;&amp;</span> props<span class="token punctuation">.</span><span class="token keyword">is</span><span class="token punctuation">,</span>
      props
    <span class="token punctuation">)</span>

    <span class="token comment">// mount children first, since some props may rely on child content</span>
    <span class="token comment">// being already rendered, e.g. \`&lt;select value&gt;\`</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TEXT_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">hostSetElementText</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>children <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">mountChildren</span><span class="token punctuation">(</span>
        vnode<span class="token punctuation">.</span>children <span class="token keyword">as</span> VNodeArrayChildren<span class="token punctuation">,</span>
        el<span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG <span class="token operator">&amp;&amp;</span> type <span class="token operator">!==</span> <span class="token string">&#39;foreignObject&#39;</span><span class="token punctuation">,</span>
        slotScopeIds<span class="token punctuation">,</span>
        optimized
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>dirs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">invokeDirectiveHook</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> <span class="token string">&#39;created&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// props</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>dirs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">invokeDirectiveHook</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> <span class="token string">&#39;beforeMount&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
   
    <span class="token function">hostInsert</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通过<code>hostCreateElement</code>创建真实dom</li><li>如果子vnode是文本则通过<code>hostSetElementText</code>创建文本dom</li><li>如果子vnode是数组则通过<code>mountChildren</code>处理</li><li>触发生命周期<code>created</code></li><li>处理props相关</li><li>触发生命周期<code>beforeMount</code></li><li>通过<code>hostInsert</code>将dom插入到容器上</li></ul><blockquote><p><code>hostCreateElement</code>和<code>hostInsert</code>函数都是在创建渲染器的时候通过配置传进来的，在runtime-dom中，本质是调用底层DomAPI进行操作dom的，这么做的原因仍然是为了兼容各个平台将web平台的特性抽离出去</p></blockquote><p>我们看下如何处理子vnode</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> mountChildren<span class="token operator">:</span> <span class="token function-variable function">MountChildrenFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    children<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    anchor<span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    slotScopeIds<span class="token punctuation">,</span>
    optimized<span class="token punctuation">,</span>
    start <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> start<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> child <span class="token operator">=</span> <span class="token punctuation">(</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> optimized
        <span class="token operator">?</span> <span class="token function">cloneIfMounted</span><span class="token punctuation">(</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token function">normalizeVNode</span><span class="token punctuation">(</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token function">patch</span><span class="token punctuation">(</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        child<span class="token punctuation">,</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到遍历子vnode并重新调用<code>patch</code>递归，只不过容器变成他们的父元素了</p><p>由此我们可以看出在mount阶段调用<code>render</code>后，将根vnode的子节点全部解析成vnode格式，形成vnode树，通过<code>patch</code>进行挂载，现将根vnode构建成根元素（真实dom），在处理其子vnode，通过<code>patch</code>递归子vnode将创建子元素并挂载至父元素内，最后将根元素挂载到mount函数传入的容器中</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>我们研究了当调用createApp的时候进行初始化，最终返回app实例，而调用app.mount的时候会将挂载组件转化为vnode树，在根据根vnode创建根元素，在递归子vnode挂载父元素，最终将根元素挂载到容器上，这里有个图能更好的帮助我们理解</p><p><img src="`+p+'" alt="Alt text"></p>',75),c=[o];function l(i,u){return s(),a("div",null,c)}const k=n(t,[["render",l],["__file","1.vnode到dom.html.vue"]]);export{k as default};
