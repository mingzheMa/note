import{_ as u}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as l,e as a,w as p,a as s,b as n,d as e,r as o}from"./app.9ac9284b.js";const r={},k=s("h1",{id:"confirmtransition",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#confirmtransition","aria-hidden":"true"},"#"),n(" confirmTransition")],-1),d=s("p",null,[n("之后会调用"),s("code",null,"confirmTransition"),n("方法实现真正的跳转，过程可能存在异步组件，所以不仅需要传入跳转目标"),s("code",null,"route"),n("属性，还需要成功和失败回调")],-1),v=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token function">confirmTransition</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">route</span><span class="token operator">:</span> Route<span class="token punctuation">,</span> <span class="token literal-property property">onComplete</span><span class="token operator">:</span> Function<span class="token punctuation">,</span> onAbort<span class="token operator">?</span><span class="token operator">:</span> Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>current
    <span class="token keyword">this</span><span class="token punctuation">.</span>pending <span class="token operator">=</span> route
    <span class="token keyword">const</span> <span class="token function-variable function">abort</span> <span class="token operator">=</span> <span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// changed after adding errors with</span>
      <span class="token comment">// https://github.com/vuejs/vue-router/pull/3047 before that change,</span>
      <span class="token comment">// redirect and aborted navigation would produce an err == null</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isNavigationFailure</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>errorCbs<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>errorCbs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">cb</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">cb</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      onAbort <span class="token operator">&amp;&amp;</span> <span class="token function">onAbort</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> lastRouteIndex <span class="token operator">=</span> route<span class="token punctuation">.</span>matched<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token keyword">const</span> lastCurrentIndex <span class="token operator">=</span> current<span class="token punctuation">.</span>matched<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token function">isSameRoute</span><span class="token punctuation">(</span>route<span class="token punctuation">,</span> current<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token comment">// in the case the route map has been dynamically appended to</span>
      lastRouteIndex <span class="token operator">===</span> lastCurrentIndex <span class="token operator">&amp;&amp;</span>
      route<span class="token punctuation">.</span>matched<span class="token punctuation">[</span>lastRouteIndex<span class="token punctuation">]</span> <span class="token operator">===</span> current<span class="token punctuation">.</span>matched<span class="token punctuation">[</span>lastCurrentIndex<span class="token punctuation">]</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ensureURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>route<span class="token punctuation">.</span>hash<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">handleScroll</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">,</span> current<span class="token punctuation">,</span> route<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token function">abort</span><span class="token punctuation">(</span><span class="token function">createNavigationDuplicatedError</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> route<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token punctuation">{</span> updated<span class="token punctuation">,</span> deactivated<span class="token punctuation">,</span> activated <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">resolveQueue</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>matched<span class="token punctuation">,</span>
      route<span class="token punctuation">.</span>matched
    <span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token literal-property property">queue</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span><span class="token operator">?</span>NavigationGuard<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>
      <span class="token comment">// in-component leave guards</span>
      <span class="token function">extractLeaveGuards</span><span class="token punctuation">(</span>deactivated<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token comment">// global before hooks</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span>beforeHooks<span class="token punctuation">,</span>
      <span class="token comment">// in-component update hooks</span>
      <span class="token function">extractUpdateHooks</span><span class="token punctuation">(</span>updated<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token comment">// in-config enter guards</span>
      activated<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">m</span> <span class="token operator">=&gt;</span> m<span class="token punctuation">.</span>beforeEnter<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token comment">// async components</span>
      <span class="token function">resolveAsyncComponents</span><span class="token punctuation">(</span>activated<span class="token punctuation">)</span>
    <span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token function-variable function">iterator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">hook</span><span class="token operator">:</span> NavigationGuard<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>pending <span class="token operator">!==</span> route<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">abort</span><span class="token punctuation">(</span><span class="token function">createNavigationCancelledError</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> route<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token function">hook</span><span class="token punctuation">(</span>route<span class="token punctuation">,</span> current<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">to</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>to <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// next(false) -&gt; abort navigation, ensure current URL</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ensureURL</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token function">abort</span><span class="token punctuation">(</span><span class="token function">createNavigationAbortedError</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> route<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isError</span><span class="token punctuation">(</span>to<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ensureURL</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token function">abort</span><span class="token punctuation">(</span>to<span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
            <span class="token keyword">typeof</span> to <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span> <span class="token operator">||</span>
            <span class="token punctuation">(</span><span class="token keyword">typeof</span> to <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span>
              <span class="token punctuation">(</span><span class="token keyword">typeof</span> to<span class="token punctuation">.</span>path <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> to<span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// next(&#39;/&#39;) or next({ path: &#39;/&#39; }) -&gt; redirect</span>
            <span class="token function">abort</span><span class="token punctuation">(</span><span class="token function">createNavigationRedirectedError</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> route<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> to <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> to<span class="token punctuation">.</span>replace<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>to<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>to<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// confirm transition and pass on the value</span>
            <span class="token function">next</span><span class="token punctuation">(</span>to<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">abort</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">runQueue</span><span class="token punctuation">(</span>queue<span class="token punctuation">,</span> iterator<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// wait until async components are resolved before</span>
      <span class="token comment">// extracting in-component enter guards</span>
      <span class="token keyword">const</span> enterGuards <span class="token operator">=</span> <span class="token function">extractEnterGuards</span><span class="token punctuation">(</span>activated<span class="token punctuation">)</span>
      <span class="token keyword">const</span> queue <span class="token operator">=</span> enterGuards<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span>resolveHooks<span class="token punctuation">)</span>
      <span class="token function">runQueue</span><span class="token punctuation">(</span>queue<span class="token punctuation">,</span> iterator<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>pending <span class="token operator">!==</span> route<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">abort</span><span class="token punctuation">(</span><span class="token function">createNavigationCancelledError</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> route<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>pending <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token function">onComplete</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span>app<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span>app<span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">handleRouteEntered</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开始部分对错误回调函数进行二次封装</p>`,2),m=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">const</span> <span class="token function-variable function">abort</span> <span class="token operator">=</span> <span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// changed after adding errors with</span>
      <span class="token comment">// https://github.com/vuejs/vue-router/pull/3047 before that change,</span>
      <span class="token comment">// redirect and aborted navigation would produce an err == null</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isNavigationFailure</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>errorCbs<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>errorCbs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">cb</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">cb</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      onAbort <span class="token operator">&amp;&amp;</span> <span class="token function">onAbort</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),b=s("code",null,"onAbort",-1),f=s("code",null,"errorCbs",-1),h={href:"https://v3.router.vuejs.org/zh/api/#router-onerror",target:"_blank",rel:"noopener noreferrer"},y=s("p",null,"之后会判断即将跳转的路由是否和当前路由是同一个路由",-1),w=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">const</span> lastRouteIndex <span class="token operator">=</span> route<span class="token punctuation">.</span>matched<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token keyword">const</span> lastCurrentIndex <span class="token operator">=</span> current<span class="token punctuation">.</span>matched<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token function">isSameRoute</span><span class="token punctuation">(</span>route<span class="token punctuation">,</span> current<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token comment">// in the case the route map has been dynamically appended to</span>
      lastRouteIndex <span class="token operator">===</span> lastCurrentIndex <span class="token operator">&amp;&amp;</span>
      route<span class="token punctuation">.</span>matched<span class="token punctuation">[</span>lastRouteIndex<span class="token punctuation">]</span> <span class="token operator">===</span> current<span class="token punctuation">.</span>matched<span class="token punctuation">[</span>lastCurrentIndex<span class="token punctuation">]</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ensureURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>route<span class="token punctuation">.</span>hash<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">handleScroll</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">,</span> current<span class="token punctuation">,</span> route<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token function">abort</span><span class="token punctuation">(</span><span class="token function">createNavigationDuplicatedError</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> route<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这里取当前路由实例和目标路由实例的<code>matched</code>（我们之前说过该属性是记录路由嵌套层级的结构是RouteRecord）属性的最后一项就是当前路由实例</li><li>之后通过<code>isSameRoute</code>函数判断两个路由实例（Route）是否相等，函数大致逻辑就是：如果有path属性，判断path、hash、query属性是否相等，如果有name属性，则判断name、hash。query、params属性是否相等</li><li>通过<code>lastRouteIndex === lastCurrentIndex</code>和<code>route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]</code>判断层级是否一致</li><li>如果通过以上判断则会触发下面逻辑</li><li>通过<code>ensureURL</code>函数修改浏览器地址栏的url路径，只不过根据不同的路由类型（<code>VueRouter.options.mode</code>）实现方式不同。如果是hash模式则优先使用history API如果不支持就是用window.location.hash。如果是history模式则使用pushState方式实现</li><li>返回路由相同的报错：&quot;Avoided redundant navigation to current location ...&quot;</li></ul>`,2);function g(_,x){const t=o("font"),c=o("ExternalLinkIcon");return i(),l("div",null,[k,d,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/history/base.js")]),_:1}),v,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/history/base.js")]),_:1}),m,s("p",null,[n("在触发错误回调函数"),b,n("之前会先清空"),f,n("队列，"),s("a",h,[n("这个队列是开发者自己配置的错误回调队列"),a(c)])]),y,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/history/base.js")]),_:1}),w])}const I=u(r,[["render",g],["__file","2.confirmTransition.html.vue"]]);export{I as default};