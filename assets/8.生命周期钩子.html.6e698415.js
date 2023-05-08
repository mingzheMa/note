import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c,a as s,b as n,e,d as t,r as i}from"./app.002a81c8.js";const l="/note/assets/lifecycle.16e4c08e.png",u={},r=t(`<h1 id="生命周期钩子" tabindex="-1"><a class="header-anchor" href="#生命周期钩子" aria-hidden="true">#</a> 生命周期钩子</h1><p>vue 组件在实例创建、挂载、更新、卸载前后都提供了钩子函数来监听组件在各个阶段的状态，在 vue2.x 中通过 options api 可以进行钩子函数配置</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span> 
  <span class="token function">beforeCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// vue实例创建前</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// vue实例创建后</span>

  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 组件挂载前</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 组件挂载后</span>

  <span class="token function">beforeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 组件更新前</span>
  <span class="token function">updated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 组件更新后</span>

  <span class="token function">beforeDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 组件卸载前</span>
  <span class="token function">destroyed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 组件卸载后</span>

  <span class="token function">activated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// keep-alive组件激活前</span>
  <span class="token function">deactivated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// keep-alive组件激活后</span>

  <span class="token function">errorCaptured</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 子组件发生错误时</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vue3 的 composition api 也提供了生命周期钩子函数，钩子函数在 <code>setup</code> 中进行调用</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> onBeforeUnmount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span> 

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span> 
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">onBeforeMount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">onBeforeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">onUpdated</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">onBeforeUnmount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">onUnmounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">onActivated</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">onDeactivated</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">onErrorCaptured</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">onRenderTracked</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">onRenderTriggered</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vue3 的 composition api 对比 vue2.x 有一些不同，新增两个 <code>onRenderTracked</code>、<code>onRenderTriggered</code> 钩子函数。没有 <code>beforeCreate</code>、<code>created</code> 对应的钩子函数，这两个钩子函数的逻辑可以写在 <code>setup</code> 中，同时也对部分钩子函数命名进行修改</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>beforeCreate =&gt; setup
created =&gt; setup
beforeMount =&gt; onBeforeMount
mounted =&gt; onMounted
beforeUpdate =&gt; onBeforeUpdate
updated =&gt; onUpdated
beforeDestroy =&gt; onBeforeUnmount
destroyed =&gt; onUnmounted
activated =&gt; onActivated
deactivated =&gt; onDeactivated
errorCaptured =&gt; onErrorCaptured
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="钩子函数注册" tabindex="-1"><a class="header-anchor" href="#钩子函数注册" aria-hidden="true">#</a> 钩子函数注册</h2><p>钩子函数属于 vue 核心逻辑，源码在 runtime-core 库中</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 钩子函数入口</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> onBeforeMount <span class="token operator">=</span> <span class="token function">createHook</span><span class="token punctuation">(</span><span class="token string">&quot;bm&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> onMounted <span class="token operator">=</span> <span class="token function">createHook</span><span class="token punctuation">(</span><span class="token string">&quot;m&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> onBeforeUpdate <span class="token operator">=</span> <span class="token function">createHook</span><span class="token punctuation">(</span><span class="token string">&quot;bu&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> onUpdated <span class="token operator">=</span> <span class="token function">createHook</span><span class="token punctuation">(</span><span class="token string">&quot;u&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> onBeforeUnmount <span class="token operator">=</span> <span class="token function">createHook</span><span class="token punctuation">(</span><span class="token string">&quot;bum&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> onUnmounted <span class="token operator">=</span> <span class="token function">createHook</span><span class="token punctuation">(</span><span class="token string">&quot;um&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> onRenderTriggered <span class="token operator">=</span> <span class="token generic-function"><span class="token function">createHook</span><span class="token generic class-name"><span class="token operator">&lt;</span>DebuggerHook<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;rtg&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> onRenderTracked <span class="token operator">=</span> <span class="token generic-function"><span class="token function">createHook</span><span class="token generic class-name"><span class="token operator">&lt;</span>DebuggerHook<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;rtc&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">onErrorCaptured</span><span class="token generic class-name"><span class="token operator">&lt;</span>TError <span class="token operator">=</span> Error<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  hook<span class="token operator">:</span> ErrorCapturedHook<span class="token operator">&lt;</span>TError<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  target<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> currentInstance
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">injectHook</span><span class="token punctuation">(</span><span class="token string">&quot;ec&quot;</span><span class="token punctuation">,</span> hook<span class="token punctuation">,</span> target<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">onActivated</span><span class="token punctuation">(</span>
  hook<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">,</span>
  target<span class="token operator">?</span><span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">registerKeepAliveHook</span><span class="token punctuation">(</span>hook<span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> target<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">onDeactivated</span><span class="token punctuation">(</span>
  hook<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">,</span>
  target<span class="token operator">?</span><span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">registerKeepAliveHook</span><span class="token punctuation">(</span>hook<span class="token punctuation">,</span> <span class="token string">&quot;da&quot;</span><span class="token punctuation">,</span> target<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了 <code>onErrorCaptured</code>、<code>onActivated</code>、<code>onDeactivated</code> 这三个钩子函数，其他的都是通过 <code>createHook</code> 函数注册，先从这里进行分析</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 创建钩子函数</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> createHook <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Function</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token punctuation">(</span>lifecycle<span class="token operator">:</span> LifecycleHooks<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 返回钩子函数，target参数默认当前组件实例</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>hook<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> target<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> currentInstance<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>isInSSRComponentSetup <span class="token operator">||</span> lifecycle <span class="token operator">===</span> <span class="token string">&quot;sp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 排除服务器渲染使用injectHook注入钩子函数</span>
      <span class="token function">injectHook</span><span class="token punctuation">(</span>lifecycle<span class="token punctuation">,</span> hook<span class="token punctuation">,</span> target<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>createHook</code> 返回一个函数，这里使用柯里化对判断服务器环境的生命周期钩子进行了封装，我们调用 <code>onBeforeMount(() =&gt; {})</code> 时就会触发返回的函数，函数内部通过 <code>injectHook</code> 进行注册钩子函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 注册钩子函数</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">injectHook</span><span class="token punctuation">(</span>
  type<span class="token operator">:</span> LifecycleHooks<span class="token punctuation">,</span> <span class="token comment">// 钩子类型</span>
  hook<span class="token operator">:</span> <span class="token builtin">Function</span> <span class="token operator">&amp;</span> <span class="token punctuation">{</span> __weh<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">Function</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 钩子函数</span>
  target<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> currentInstance<span class="token punctuation">,</span> <span class="token comment">// 注册目标，默认当前组件实例</span>
  prepend<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Function</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> hooks <span class="token operator">=</span> target<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">(</span>target<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 获取组件实例</span>
    <span class="token comment">// 对钩子进行包装</span>
    <span class="token keyword">const</span> wrappedHook <span class="token operator">=</span> hook<span class="token punctuation">.</span>__weh <span class="token operator">||</span> <span class="token punctuation">(</span>hook<span class="token punctuation">.</span><span class="token function-variable function">__weh</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 函数内部为钩子函数执行逻辑</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>isUnmounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// isUnmounted为组件实例卸载标识，不需要触发该组件钩子函数</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
  
      <span class="token function">pauseTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 暂停依赖收集</span>
      <span class="token function">setCurrentInstance</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token comment">// 设置当前组件实例</span>
      <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">callWithAsyncErrorHandling</span><span class="token punctuation">(</span>hook<span class="token punctuation">,</span> target<span class="token punctuation">,</span> type<span class="token punctuation">,</span> args<span class="token punctuation">)</span> <span class="token comment">// 执行钩子函数</span>
      <span class="token function">unsetCurrentInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 删除当前组件实例</span>
      <span class="token function">resetTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 恢复依赖收集</span>
      <span class="token keyword">return</span> res
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 将钩子函数插入组件实例中对应配置上，完成注册</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prepend<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      hooks<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>wrappedHook<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      hooks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>wrappedHook<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> wrappedHook
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果没有target，表示没有currentInstance，currentInstance是在setup执行时设置，在组件挂载阶段</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),d=s("code",null,"onBeforeMount(() => {})",-1),k=s("code",null,"setup",-1),v=s("code",null,"setup",-1),m=s("code",null,"setup",-1),b=s("code",null,"currentInstance",-1),f={href:"/vue3%E6%BA%90%E7%A0%81/3.setup.html#%E8%AE%BE%E7%BD%AE%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B",target:"_blank",rel:"noopener noreferrer"},g=s("code",null,"target",-1),y=s("code",null,"onBeforeMount(() => {})",-1),h=s("code",null,"setup",-1),E={href:"/vue3%E6%BA%90%E7%A0%81/3.setup.html#%E5%88%9B%E5%BB%BA%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B",target:"_blank",rel:"noopener noreferrer"},w=s("code",null,"instance",-1),_=t(`<p><code>injectHook</code> 函数的作用就是将调用 <code>onBeforeMount(() =&gt; {})</code> 的时候，将传入的函数挂载至组件实例上，首先需要确认 <code>target</code> 也就是当前组件实例存在，获取 <code>target</code> 上对应的生命周期钩子配置，将用户传入的函数进行包装后插入配置中</p><p>其中 <code>hook</code> 参数是用户注册生命周期钩子时传入的函数，函数注册后会添加一个 <code>__weh</code> 标记，以免同一个函数多次注册</p><p><code>wrappedHook</code> 将用户传入的函数 <code>hook</code> 进行包装，内部首先判断了如果组件被卸载则跳过钩子函数的执行。接着暂停了依赖收集，依赖收集会在 patch 阶段创建子树的时候进行，这里不需要多次进行依赖收集来消耗性能。之后设置了当前组件实例，保证在生命周期钩子函数执行时获取到对应组件实例。最后执行了 <code>hook</code> 函数后将依赖和组件实例的设置重置，至此生命周期钩子执行结束</p><h2 id="beforemount、mounted-执行时机" tabindex="-1"><a class="header-anchor" href="#beforemount、mounted-执行时机" aria-hidden="true">#</a> beforeMount、mounted 执行时机</h2><p><code>beforeMount</code>、<code>mounted</code> 的执行时机在组件副作用函数中（setupRenderEffect &gt; componentUpdateFn），在组件挂载阶段会触发</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 创建副作用实例、副作用函数，触发副作用函数</span>
  <span class="token keyword">const</span> setupRenderEffect<span class="token operator">:</span> SetupRenderEffectFn <span class="token operator">=</span> <span class="token punctuation">(</span>
    instance<span class="token punctuation">,</span> <span class="token comment">// 组件实例</span>
    initialVNode<span class="token punctuation">,</span> <span class="token comment">// 需要挂载的vnode</span>
    container<span class="token punctuation">,</span> <span class="token comment">// 挂载容器</span>
    anchor<span class="token punctuation">,</span> <span class="token comment">// 挂载容器位置</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    optimized
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 副作用函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">componentUpdateFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">.</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>

        <span class="token keyword">const</span> <span class="token punctuation">{</span> bm<span class="token punctuation">,</span> m<span class="token punctuation">,</span> parent <span class="token punctuation">}</span> <span class="token operator">=</span> instance <span class="token comment">// 获取钩子函数以及相关配置</span>
        
        <span class="token comment">// 遍历执行onBeforeMount钩子函数</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>bm<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">invokeArrayFns</span><span class="token punctuation">(</span>bm<span class="token punctuation">)</span> 
        <span class="token punctuation">}</span>
      
        <span class="token comment">// options api beforeMount配置</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          __COMPAT__ <span class="token operator">&amp;&amp;</span>
          <span class="token function">isCompatEnabled</span><span class="token punctuation">(</span>DeprecationTypes<span class="token punctuation">.</span><span class="token constant">INSTANCE_EVENT_HOOKS</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          instance<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;hook:beforeMount&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// patch 流程</span>

        <span class="token comment">// mounted钩子函数</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 将mounted钩子函数加入异步回调队列等待执行</span>
          <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
       
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          __COMPAT__ <span class="token operator">&amp;&amp;</span>
          <span class="token function">isCompatEnabled</span><span class="token punctuation">(</span>DeprecationTypes<span class="token punctuation">.</span><span class="token constant">INSTANCE_EVENT_HOOKS</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> instance<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;hook:mounted&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            parentSuspense
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 更新流程</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建副作用实例</span>

    <span class="token comment">// 触发副作用函数</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">invokeArrayFns</span> <span class="token operator">=</span> <span class="token punctuation">(</span>fns<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> arg<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> fns<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      fns<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 patch 流程前执行了组件 beforeMount 钩子函数，composition api 通过 <code>invokeArrayFns(bm)</code> 执行钩子函数，函数传入组件实例中对应钩子函数配置，<code>invokeArrayFns</code> 函数将传入的函数数组遍历执行。而 options api 通过 <code>instance.emit(&#39;hook:beforeMount&#39;)</code> 执行钩子函数</p><p>在 patch 流程结束后执行了组件 mounted 钩子函数，composition api 通过 <code>queuePostFlushCb</code> 函数将钩子函数插入异步回调队列等待执行。options api 同样加入异步队列等待执行 <code>instance.emit(&#39;hook:mounted&#39;)</code> 来触发钩子函数</p><p>在组件副作用函数中，先调用 beforeMount 钩子函数，在进行 patch 流程，最后异步调用 mounted 钩子函数，整个流程是一个递归形态执行，因此当出现嵌套组件时，会按照 父组件 beforeMount =&gt; 子组件 beforeMount =&gt; 子组件 mounted =&gt; 父组件 mounted 的顺序执行</p><p>mounted 钩子函数需要在异步回调队列中执行，是因为在 mounted 钩子函数中是可以获取真实 dom 的，需要等到 vnode 挂载到页面上才能触发</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token comment">// 挂载真实dom</span>
  <span class="token keyword">const</span> <span class="token function-variable function">mountElement</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    vnode<span class="token operator">:</span> VNode<span class="token punctuation">,</span>
    container<span class="token operator">:</span> RendererElement<span class="token punctuation">,</span>
    anchor<span class="token operator">:</span> RendererNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentComponent<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentSuspense<span class="token operator">:</span> SuspenseBoundary <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    isSVG<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    slotScopeIds<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    optimized<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> el<span class="token operator">:</span> RendererElement <span class="token comment">// 真实dom</span>
    <span class="token keyword">let</span> vnodeHook<span class="token operator">:</span> VNodeHook <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">|</span> <span class="token keyword">null</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> type<span class="token punctuation">,</span> props<span class="token punctuation">,</span> shapeFlag<span class="token punctuation">,</span> transition<span class="token punctuation">,</span> dirs <span class="token punctuation">}</span> <span class="token operator">=</span> vnode

    <span class="token comment">// 创建真实dom对象</span>
    el <span class="token operator">=</span> vnode<span class="token punctuation">.</span>el <span class="token operator">=</span> <span class="token function">hostCreateElement</span><span class="token punctuation">(</span>
      vnode<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token class-name"><span class="token keyword">as</span></span> <span class="token builtin">string</span><span class="token punctuation">,</span>
      isSVG<span class="token punctuation">,</span>
      props <span class="token operator">&amp;&amp;</span> props<span class="token punctuation">.</span><span class="token keyword">is</span><span class="token punctuation">,</span>
      props
    <span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果子元素为数组需要对子元素进行挂载</span>
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

    <span class="token comment">// 将真实dom插入容器，这里容器一般指真实dom，也就是插入页面</span>
    <span class="token function">hostInsert</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>

    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>挂载流程 vue 是以递归形式深度优先遍历 dom 树，在递的过程中创建真实 dom，在归的过程中将真实 dom 添加至容器，例如根元素为真实 dom，则需要等到递归结束进行挂载页面</p><blockquote><p>无论在 created 或 mounted 钩子函数中发起异步请求的效果大概率是一样的，因为等异步请求响应时，组件一般都挂载完毕了，所以大概率会重新触发渲染，如果需要获取数据后操作 dom，则需要再 mounted 钩子函数中进行异步请求。之前说过 vue2.x 的 beforeCreate 和 created 钩子函数在 composition api 中使用 setup 函数来代替，在 vue3 中异步请求可以直接写在 setup 函数中</p></blockquote><h2 id="beforeupdate、updated-执行时机" tabindex="-1"><a class="header-anchor" href="#beforeupdate、updated-执行时机" aria-hidden="true">#</a> beforeUpdate、updated 执行时机</h2><p><code>beforeUpdate</code>、<code>updated</code> 的执行时机是组件更新前后，在组件副作用函数（setupRenderEffect &gt; componentUpdateFn）中的更新逻辑中触发</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token comment">// 创建副作用实例、副作用函数，触发副作用函数</span>
  <span class="token keyword">const</span> setupRenderEffect<span class="token operator">:</span> SetupRenderEffectFn <span class="token operator">=</span> <span class="token punctuation">(</span>
    instance<span class="token punctuation">,</span> <span class="token comment">// 组件实例</span>
    initialVNode<span class="token punctuation">,</span> <span class="token comment">// 需要挂载的vnode</span>
    container<span class="token punctuation">,</span> <span class="token comment">// 挂载容器</span>
    anchor<span class="token punctuation">,</span> <span class="token comment">// 挂载容器位置</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    optimized
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 副作用函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">componentUpdateFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">.</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 组件挂载逻辑</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> <span class="token punctuation">{</span> next<span class="token punctuation">,</span> bu<span class="token punctuation">,</span> u<span class="token punctuation">,</span> parent<span class="token punctuation">,</span> vnode <span class="token punctuation">}</span> <span class="token operator">=</span> instance
        
        <span class="token comment">// beforeUpdate hook</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>bu<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">invokeArrayFns</span><span class="token punctuation">(</span>bu<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          __COMPAT__ <span class="token operator">&amp;&amp;</span>
          <span class="token function">isCompatEnabled</span><span class="token punctuation">(</span>DeprecationTypes<span class="token punctuation">.</span><span class="token constant">INSTANCE_EVENT_HOOKS</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          instance<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;hook:beforeUpdate&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// patch 流程</span>

        <span class="token comment">// updated hook</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>u<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          __COMPAT__ <span class="token operator">&amp;&amp;</span>
          <span class="token function">isCompatEnabled</span><span class="token punctuation">(</span>DeprecationTypes<span class="token punctuation">.</span><span class="token constant">INSTANCE_EVENT_HOOKS</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> instance<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;hook:updated&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            parentSuspense
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和挂载钩子函数逻辑类似，只是在更新逻辑的 patch 流程前后触发钩子函数，updated 钩子函数是可以获取组件更新后真实 dom 的，因此 updated 钩子函数也需要加入异步回调队列等待执行，这里逻辑也和 mounted 类似</p><p>如果需要监听数据改变后执行一些逻辑，最好不要使用 updated 钩子函数而使用 watch api，因为任何数据的变化都可能导致组件更新，这会造成额外的开销。<strong>updated 钩子函数中不能修改数据，因为修改数据可能会导致组件更新，从而导致循环更新</strong></p><blockquote><p>父组件更新不一定导致子组件更新，因为 vue 组件更新流程是先判断当前组件是否需要更新，如果需要更新则走 patch 流程递归。如果子组件没有更新，则不会继续走 patch 流程。因此 vue 的更新粒度是组件级的</p></blockquote><h2 id="beforeunmount、unmounted-执行时机" tabindex="-1"><a class="header-anchor" href="#beforeunmount、unmounted-执行时机" aria-hidden="true">#</a> beforeUnmount、unmounted 执行时机</h2><p><code>beforeUnmount</code>、<code>unmounted</code> 执行时机是在卸载组件时（unmount &gt; unmountComponent）中触发</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 卸载组件</span>
  <span class="token keyword">const</span> unmountComponent <span class="token operator">=</span> <span class="token punctuation">(</span>
    instance<span class="token operator">:</span> ComponentInternalInstance<span class="token punctuation">,</span> <span class="token comment">// 需要卸载的组件实例</span>
    parentSuspense<span class="token operator">:</span> SuspenseBoundary <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    doRemove<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> bum<span class="token punctuation">,</span> scope<span class="token punctuation">,</span> update<span class="token punctuation">,</span> subTree<span class="token punctuation">,</span> um <span class="token punctuation">}</span> <span class="token operator">=</span> instance

    <span class="token comment">// beforeUnmount hook</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bum<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">invokeArrayFns</span><span class="token punctuation">(</span>bum<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      __COMPAT__ <span class="token operator">&amp;&amp;</span>
      <span class="token function">isCompatEnabled</span><span class="token punctuation">(</span>DeprecationTypes<span class="token punctuation">.</span><span class="token constant">INSTANCE_EVENT_HOOKS</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      instance<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;hook:beforeDestroy&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 递归子树 unmount</span>

    <span class="token comment">// unmounted hook</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>um<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span>um<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      __COMPAT__ <span class="token operator">&amp;&amp;</span>
      <span class="token function">isCompatEnabled</span><span class="token punctuation">(</span>DeprecationTypes<span class="token punctuation">.</span><span class="token constant">INSTANCE_EVENT_HOOKS</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> instance<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;hook:destroyed&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        parentSuspense
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 卸载组件</span>

    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>unmountComponent</code> 函数中进行组件卸载，卸载前后的钩子函数逻辑和组件挂载类似。在组件卸载时会自动清理一些副作用，以及删除 dom 元素，但是有一些逻辑是无法自动清理的，比如在 setup 中定义了一个定时器，需要再组件销毁时在钩子函数中清除定时器，否则定时器将不会停止运行</p><h2 id="errorcaptured-执行时机" tabindex="-1"><a class="header-anchor" href="#errorcaptured-执行时机" aria-hidden="true">#</a> errorCaptured 执行时机</h2>`,24),T=s("code",null,"errorCaptured",-1),C=s("code",null,"callWithErrorHandling",-1),B=s("code",null,"callWithAsyncErrorHandling",-1),x={href:"/vue3%E6%BA%90%E7%A0%81/3.setup.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%B0%83%E7%94%A8setup%E9%9C%80%E8%A6%81%E9%80%9A%E8%BF%87callwitherrorhandling%E5%87%BD%E6%95%B0",target:"_blank",rel:"noopener noreferrer"},A=s("code",null,"callWithAsyncErrorHandling",-1),H=s("code",null,"callWithErrorHandling",-1),I=t(`<p><code>callWithErrorHandling</code> 函数内部是调用传入函数参数，如果函数参数在执行过程中发生了错误，则调用 <code>handleError</code> 将错误向先辈组件依次冒泡</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 向先辈组件抛出错误</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">handleError</span><span class="token punctuation">(</span>
  err<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span> <span class="token comment">// 错误内容</span>
  instance<span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 产生错误的组件实例</span>
  type<span class="token operator">:</span> ErrorTypes<span class="token punctuation">,</span> <span class="token comment">// 错误类型</span>
  throwInDev <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取当前组件vnode</span>
  <span class="token keyword">const</span> contextVNode <span class="token operator">=</span> instance <span class="token operator">?</span> instance<span class="token punctuation">.</span>vnode <span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 向先辈组件抛出错误需要当前组件实例来找到先辈组件</span>
    <span class="token keyword">let</span> cur <span class="token operator">=</span> instance<span class="token punctuation">.</span>parent <span class="token comment">// 当前组件的父组件实例</span>
    <span class="token keyword">const</span> exposedInstance <span class="token operator">=</span> instance<span class="token punctuation">.</span>proxy <span class="token comment">// 渲染上下文代理</span>
    <span class="token keyword">const</span> errorInfo <span class="token operator">=</span> __DEV__ <span class="token operator">?</span> ErrorTypeStrings<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">type</span> <span class="token comment">// 错误类型</span>
    <span class="token comment">// 从产生错误的组件向上访问每一个先辈组件</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> errorCapturedHooks <span class="token operator">=</span> cur<span class="token punctuation">.</span>ec <span class="token comment">// 获取先辈组件的errorCaptured生命周期</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>errorCapturedHooks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果先辈组件的errorCaptured生命周期配置有值则遍历执行</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> errorCapturedHooks<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>errorCapturedHooks<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> exposedInstance<span class="token punctuation">,</span> errorInfo<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 执行先辈组件的errorCaptured生命周期钩子，如果改钩子函数返回false则停止错误向上冒泡</span>
            <span class="token keyword">return</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>parent
    <span class="token punctuation">}</span>
    <span class="token comment">// 获取全局配置的errorHandler函数，如果存在则触发全局配置的errorHandler函数</span>
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
  <span class="token comment">// 控制台打印错误</span>
  <span class="token function">logError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> type<span class="token punctuation">,</span> contextVNode<span class="token punctuation">,</span> throwInDev<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当组件发生错误时，会立即获取父组件实例 <code>cur</code>，然后获取父组件实例 <code>cur.ec</code> 配置遍历执行，也就是执行 errorCaptured 生命周期钩子，如果某个 errorCaptured 钩子函数返回 false，则错误将停止向祖父组件冒泡，否则将继续获取组父组件执行重复逻辑，直至根组件。最后执行全局配置中的 <code>errorHandler</code> 函数捕获错误</p><p>可以在根组件注册 errorCaptured 生命周期或在全局注册 errorHandler 配置，用来统计或上报组件的错误信息</p><h2 id="rendertracked、rendertriggered-执行时机" tabindex="-1"><a class="header-anchor" href="#rendertracked、rendertriggered-执行时机" aria-hidden="true">#</a> renderTracked、renderTriggered 执行时机</h2><p><code>renderTracked</code>、<code>renderTriggered</code> 是在收集依赖后以及派发更新前触发。该钩子函数不止有 composition api 或 options api 调用的方式</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token function">watch</span><span class="token punctuation">(</span>监听属性<span class="token punctuation">,</span> 回调函数<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">onTrack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">onTrigger</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> comp <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span>计算属性<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">onTrack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">onTrigger</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们从源码分析 <code>renderTracked</code>、<code>renderTriggered</code> 钩子函数是如何存储</p><p>watch api 会调用 <code>doWatch</code> 函数，在创建副作用实例后会将 <code>onTrack</code>、<code>onTrigger</code> 参数挂载到副作用实例上</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">doWatch</span><span class="token punctuation">(</span>
  source<span class="token operator">:</span> WatchSource <span class="token operator">|</span> WatchSource<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> WatchEffect <span class="token operator">|</span> object<span class="token punctuation">,</span>
  cb<span class="token operator">:</span> WatchCallback <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> immediate<span class="token punctuation">,</span> deep<span class="token punctuation">,</span> flush<span class="token punctuation">,</span> onTrack<span class="token punctuation">,</span> onTrigger <span class="token punctuation">}</span><span class="token operator">:</span> WatchOptions <span class="token operator">=</span> <span class="token constant">EMPTY_OBJ</span>
<span class="token punctuation">)</span><span class="token operator">:</span> WatchStopHandle <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token comment">// 创建副作用实例</span>
  <span class="token keyword">const</span> effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> scheduler<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    effect<span class="token punctuation">.</span>onTrack <span class="token operator">=</span> onTrack
    effect<span class="token punctuation">.</span>onTrigger <span class="token operator">=</span> onTrigger
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>computed api 通过 <code>ComputedRefImpl</code> 构建计算属性实例（而创建 <code>ComputedRefImpl</code> 实例时内部会调用 <code>ReactiveEffect</code> 构建副作用实例），后将 <code>onTrack</code>、<code>onTrigger</code> 参数挂载到副作用实例上</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">computed</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  getterOrOptions<span class="token operator">:</span> ComputedGetter<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token operator">|</span> WritableComputedOptions<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token comment">// 参数传入getter函数或者计算属性配置</span>
  debugOptions<span class="token operator">?</span><span class="token operator">:</span> DebuggerOptions<span class="token punctuation">,</span>
  isSSR <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token comment">// 创建实例传入getter、setter、isReadonly、isSSR</span>
  <span class="token keyword">const</span> cRef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ComputedRefImpl</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> setter<span class="token punctuation">,</span> onlyGetter <span class="token operator">||</span> <span class="token operator">!</span>setter<span class="token punctuation">,</span> isSSR<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> debugOptions <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isSSR<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cRef<span class="token punctuation">.</span>effect<span class="token punctuation">.</span>onTrack <span class="token operator">=</span> debugOptions<span class="token punctuation">.</span>onTrack
    cRef<span class="token punctuation">.</span>effect<span class="token punctuation">.</span>onTrigger <span class="token operator">=</span> debugOptions<span class="token punctuation">.</span>onTrigger
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> cRef <span class="token keyword">as</span> <span class="token builtin">any</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>onRenderTracked</code>、<code>onRenderTriggered</code> 函数会将钩子函数注册在组件实例上，在组件挂载阶段最后会通过 <code>setupRenderEffect</code> 函数来创建副作用实例并执行副作用函数，在创建副作用实例后将组件实例上的 <code>instance.rtc</code>、<code>instance.rtg</code> 挂载到组件副作用实例上</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token comment">// 创建副作用实例、副作用函数，触发副作用函数</span>
  <span class="token keyword">const</span> setupRenderEffect<span class="token operator">:</span> SetupRenderEffectFn <span class="token operator">=</span> <span class="token punctuation">(</span>
    instance<span class="token punctuation">,</span> <span class="token comment">// 组件实例</span>
    initialVNode<span class="token punctuation">,</span> <span class="token comment">// 需要挂载的vnode</span>
    container<span class="token punctuation">,</span> <span class="token comment">// 挂载容器</span>
    anchor<span class="token punctuation">,</span> <span class="token comment">// 挂载容器位置</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    optimized
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token comment">// 创建副作用实例并挂在至组件实例</span>
    <span class="token keyword">const</span> effect <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>
      componentUpdateFn<span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">queueJob</span><span class="token punctuation">(</span>update<span class="token punctuation">)</span><span class="token punctuation">,</span>
      instance<span class="token punctuation">.</span>scope <span class="token comment">// track it in component&#39;s effect scope</span>
    <span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// ...</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      effect<span class="token punctuation">.</span>onTrack <span class="token operator">=</span> instance<span class="token punctuation">.</span>rtc
        <span class="token operator">?</span> e <span class="token operator">=&gt;</span> <span class="token function">invokeArrayFns</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>rtc<span class="token operator">!</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token keyword">void</span> <span class="token number">0</span>
      effect<span class="token punctuation">.</span>onTrigger <span class="token operator">=</span> instance<span class="token punctuation">.</span>rtg
        <span class="token operator">?</span> e <span class="token operator">=&gt;</span> <span class="token function">invokeArrayFns</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>rtg<span class="token operator">!</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token keyword">void</span> <span class="token number">0</span>
      update<span class="token punctuation">.</span>ownerInstance <span class="token operator">=</span> instance
    <span class="token punctuation">}</span>
    
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),S={href:"/vue3%E6%BA%90%E7%A0%81/4.%E5%93%8D%E5%BA%94%E5%BC%8F.html#%E5%9C%A8get%E5%87%BD%E6%95%B0%E4%B8%AD%E5%AE%9E%E7%8E%B0%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86",target:"_blank",rel:"noopener noreferrer"},R={href:"/vue3%E6%BA%90%E7%A0%81/4.%E5%93%8D%E5%BA%94%E5%BC%8F.html#%E5%9C%A8set%E5%87%BD%E6%95%B0%E4%B8%AD%E5%AE%9E%E7%8E%B0%E6%B4%BE%E5%8F%91%E6%9B%B4%E6%96%B0",target:"_blank",rel:"noopener noreferrer"},D=s("code",null,"trackEffects",-1),F=s("code",null,"triggerEffect",-1),q=t(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trackEffects</span><span class="token punctuation">(</span>
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
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> activeEffect<span class="token operator">!</span><span class="token punctuation">.</span>onTrack<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果当前副作用实例有onTrigger配置则触发</span>
      activeEffect<span class="token operator">!</span><span class="token punctuation">.</span><span class="token function">onTrack</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        effect<span class="token operator">:</span> activeEffect<span class="token operator">!</span><span class="token punctuation">,</span>
        <span class="token operator">...</span>debuggerEventExtraInfo<span class="token operator">!</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">triggerEffect</span><span class="token punctuation">(</span>
  effect<span class="token operator">:</span> ReactiveEffect<span class="token punctuation">,</span>
  debuggerEventExtraInfo<span class="token operator">?</span><span class="token operator">:</span> DebuggerEventExtraInfo
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>effect <span class="token operator">!==</span> activeEffect <span class="token operator">||</span> effect<span class="token punctuation">.</span>allowRecurse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> effect<span class="token punctuation">.</span>onTrigger<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果副作用实例有onTrigger配置则触发</span>
      effect<span class="token punctuation">.</span><span class="token function">onTrigger</span><span class="token punctuation">(</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span> effect <span class="token punctuation">}</span><span class="token punctuation">,</span> debuggerEventExtraInfo<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>effect<span class="token punctuation">.</span>scheduler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      effect<span class="token punctuation">.</span><span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>renderTracked</code> 钩子函数在依赖收集完毕后触发，<code>renderTriggered</code> 钩子函数会在派发更新前触发</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>vue3 的生命周期 对 vue2.x 的生命周期完全兼容，并在这基础上新增了 renderTracked、renderTriggered 在收集依赖后和派发更新前触发，用于获取组件依赖来源以及组件渲染的数据更新来源</p><p>还有 activated、deactivated 两个生命周期是关于 keep-alive 的，之后在 keep-alive 的章节会详细说明</p><p><img src="`+l+'" alt=""></p>',6);function M(N,O){const a=i("ExternalLinkIcon");return o(),c("div",null,[r,s("p",null,[d,n(" 是在 "),k,n(" 执行时调用，"),v,n(" 是在组件挂载阶段中设置组件实例时调用，也就是生命周期钩子的注册时机就是组件挂载阶段，在 "),m,n(" 函数调用期间会将 "),b,n(" 设置为当前组件实例（执行完毕后会重置，"),s("a",f,[n("如果忘了这里有传送门"),e(a)]),n("），因此 "),g,n(" 参数为空则表示 "),y,n(" 并不是在 "),h,n(" 函数内调用")]),s("p",null,[n("在"),s("a",E,[n("了解组件实例"),e(a)]),n(),w,n(" 的时候知道，组件实例在创建的时候就初始化了生命周期的属性，注册生命周期钩子函数最终是要将钩子函数挂载到组件实例上，这样组件在经历各个阶段就可以在组件实例中获取对应的生命周期钩子执行")]),_,s("p",null,[T,n(" 钩子函数可以捕获后代组件的错误，可以捕获组件渲染、事件处理器、生命周期钩子、setup() 函数、侦听器、自定义指令钩子、过渡钩子这些逻辑产生的错误，这些逻辑都是通过 "),C,n("、"),B,n(" 执行，回顾下之前分析 "),s("a",x,[n("callWithErrorHandling 函数内部原理"),e(a)]),n("，"),A,n(" 额外处理了异步函数的情况，本质还是调用 "),H]),I,s("p",null,[n("以上三种注册方式可以看出，该钩子函数最后都挂载到副作用实例上等待执行。在"),s("a",S,[n("收集依赖"),e(a)]),n("和"),s("a",R,[n("派发更新"),e(a)]),n("逻辑中，收集依赖最后会调用 "),D,n(" 函数，派发更新最后会调用 "),F]),q])}const W=p(u,[["render",M],["__file","8.生命周期钩子.html.vue"]]);export{W as default};
