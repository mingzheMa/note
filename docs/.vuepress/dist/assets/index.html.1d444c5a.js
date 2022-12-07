import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c as e,e as o,w as c,a as n,b as s,d as i,r as l}from"./app.9ac9284b.js";const u={},r=n("h1",{id:"首页",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#首页","aria-hidden":"true"},"#"),s(" 首页")],-1),k=n("p",null,[n("code",null,"history.transitionTo"),s("方法是路由跳转的核心方法，我们上一章知道创建一个新"),n("code",null,"route"),s("的过程")],-1),d=i(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token function">transitionTo</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">location</span><span class="token operator">:</span> RawLocation<span class="token punctuation">,</span>
    onComplete<span class="token operator">?</span><span class="token operator">:</span> Function<span class="token punctuation">,</span>
    onAbort<span class="token operator">?</span><span class="token operator">:</span> Function</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> route
    <span class="token comment">// catch redirect option https://github.com/vuejs/vue-router/issues/3201</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      route <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>location<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>current<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>errorCbs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">cb</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">cb</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token comment">// Exception should still be thrown</span>
      <span class="token keyword">throw</span> e
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> prev <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>current
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">confirmTransition</span><span class="token punctuation">(</span>
      route<span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">updateRoute</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>
        onComplete <span class="token operator">&amp;&amp;</span> <span class="token function">onComplete</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ensureURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span>afterHooks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">hook</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          hook <span class="token operator">&amp;&amp;</span> <span class="token function">hook</span><span class="token punctuation">(</span>route<span class="token punctuation">,</span> prev<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token comment">// fire ready cbs once</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>ready<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>ready <span class="token operator">=</span> <span class="token boolean">true</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>readyCbs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">cb</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">cb</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>onAbort<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">onAbort</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>ready<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// Initial redirection should not mark the history as ready yet</span>
          <span class="token comment">// because it&#39;s triggered by the redirection instead</span>
          <span class="token comment">// https://github.com/vuejs/vue-router/issues/3225</span>
          <span class="token comment">// https://github.com/vuejs/vue-router/issues/3331</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isNavigationFailure</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> NavigationFailureType<span class="token punctuation">.</span>redirected<span class="token punctuation">)</span> <span class="token operator">||</span> prev <span class="token operator">!==</span> <span class="token constant">START</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ready <span class="token operator">=</span> <span class="token boolean">true</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>readyErrorCbs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">cb</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">cb</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function v(m,b){const a=l("font");return p(),e("div",null,[r,k,o(a,{color:"#999"},{default:c(()=>[s("文件路径: vue-router/src/history/base.js")]),_:1}),d])}const f=t(u,[["render",v],["__file","index.html.vue"]]);export{f as default};
