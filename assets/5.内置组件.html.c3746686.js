import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as u,c as r,e as a,w as p,a as s,b as n,t as k,d as e,r as o}from"./app.002a81c8.js";const d={},v=s("h1",{id:"内置组件",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#内置组件","aria-hidden":"true"},"#"),n(" 内置组件")],-1),m=s("p",null,[n("VueRouter分别提供了"),s("code",null,"RouterLink"),n("和"),s("code",null,"RouterView"),n("两个组件，分别实现路由跳转和路由显示两个功能，我们分开说每个的实现")],-1),b=s("h2",{id:"routerview",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#routerview","aria-hidden":"true"},"#"),n(" RouterView")],-1),y=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> warn <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/warn&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> extend <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/misc&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> handleRouteEntered <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/route&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;RouterView&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">functional</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;default&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">render</span> <span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> <span class="token punctuation">{</span> props<span class="token punctuation">,</span> children<span class="token punctuation">,</span> parent<span class="token punctuation">,</span> data <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// used by devtools to display a router-view badge</span>
    data<span class="token punctuation">.</span>routerView <span class="token operator">=</span> <span class="token boolean">true</span>

    <span class="token comment">// directly use parent context&#39;s createElement() function</span>
    <span class="token comment">// so that components rendered by router-view can resolve named slots</span>
    <span class="token keyword">const</span> h <span class="token operator">=</span> parent<span class="token punctuation">.</span>$createElement
    <span class="token keyword">const</span> name <span class="token operator">=</span> props<span class="token punctuation">.</span>name
    <span class="token keyword">const</span> route <span class="token operator">=</span> parent<span class="token punctuation">.</span>$route
    <span class="token keyword">const</span> cache <span class="token operator">=</span> parent<span class="token punctuation">.</span>_routerViewCache <span class="token operator">||</span> <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>_routerViewCache <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// determine current view depth, also check to see if the tree</span>
    <span class="token comment">// has been toggled inactive but kept-alive.</span>
    <span class="token keyword">let</span> depth <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> inactive <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>parent <span class="token operator">&amp;&amp;</span> parent<span class="token punctuation">.</span>_routerRoot <span class="token operator">!==</span> parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> vnodeData <span class="token operator">=</span> parent<span class="token punctuation">.</span>$vnode <span class="token operator">?</span> parent<span class="token punctuation">.</span>$vnode<span class="token punctuation">.</span>data <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vnodeData<span class="token punctuation">.</span>routerView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        depth<span class="token operator">++</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vnodeData<span class="token punctuation">.</span>keepAlive <span class="token operator">&amp;&amp;</span> parent<span class="token punctuation">.</span>_directInactive <span class="token operator">&amp;&amp;</span> parent<span class="token punctuation">.</span>_inactive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        inactive <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
      parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>$parent
    <span class="token punctuation">}</span>
    data<span class="token punctuation">.</span>routerViewDepth <span class="token operator">=</span> depth

    <span class="token comment">// render previous view if the tree is inactive and kept-alive</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>inactive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> cachedData <span class="token operator">=</span> cache<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
      <span class="token keyword">const</span> cachedComponent <span class="token operator">=</span> cachedData <span class="token operator">&amp;&amp;</span> cachedData<span class="token punctuation">.</span>component
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cachedComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// #2301</span>
        <span class="token comment">// pass props</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cachedData<span class="token punctuation">.</span>configProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">fillPropsinData</span><span class="token punctuation">(</span>cachedComponent<span class="token punctuation">,</span> data<span class="token punctuation">,</span> cachedData<span class="token punctuation">.</span>route<span class="token punctuation">,</span> cachedData<span class="token punctuation">.</span>configProps<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>cachedComponent<span class="token punctuation">,</span> data<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// render previous empty view</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> matched <span class="token operator">=</span> route<span class="token punctuation">.</span>matched<span class="token punctuation">[</span>depth<span class="token punctuation">]</span>
    <span class="token keyword">const</span> component <span class="token operator">=</span> matched <span class="token operator">&amp;&amp;</span> matched<span class="token punctuation">.</span>components<span class="token punctuation">[</span>name<span class="token punctuation">]</span>

    <span class="token comment">// render empty node if no matched route or no config component</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>matched <span class="token operator">||</span> <span class="token operator">!</span>component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      cache<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// cache component</span>
    cache<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> component <span class="token punctuation">}</span>

    <span class="token comment">// attach instance registration hook</span>
    <span class="token comment">// this will be called in the instance&#39;s injected lifecycle hooks</span>
    data<span class="token punctuation">.</span><span class="token function-variable function">registerRouteInstance</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// val could be undefined for unregistration</span>
      <span class="token keyword">const</span> current <span class="token operator">=</span> matched<span class="token punctuation">.</span>instances<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token punctuation">(</span>val <span class="token operator">&amp;&amp;</span> current <span class="token operator">!==</span> vm<span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token punctuation">(</span><span class="token operator">!</span>val <span class="token operator">&amp;&amp;</span> current <span class="token operator">===</span> vm<span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        matched<span class="token punctuation">.</span>instances<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> val
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// also register instance in prepatch hook</span>
    <span class="token comment">// in case the same component instance is reused across different routes</span>
    <span class="token punctuation">;</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>hook <span class="token operator">||</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>hook <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">prepatch</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> vnode</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      matched<span class="token punctuation">.</span>instances<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> vnode<span class="token punctuation">.</span>componentInstance
    <span class="token punctuation">}</span>

    <span class="token comment">// register instance in init hook</span>
    <span class="token comment">// in case kept-alive component be actived when routes changed</span>
    data<span class="token punctuation">.</span>hook<span class="token punctuation">.</span><span class="token function-variable function">init</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">vnode</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>keepAlive <span class="token operator">&amp;&amp;</span>
        vnode<span class="token punctuation">.</span>componentInstance <span class="token operator">&amp;&amp;</span>
        vnode<span class="token punctuation">.</span>componentInstance <span class="token operator">!==</span> matched<span class="token punctuation">.</span>instances<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        matched<span class="token punctuation">.</span>instances<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> vnode<span class="token punctuation">.</span>componentInstance
      <span class="token punctuation">}</span>

      <span class="token comment">// if the route transition has already been confirmed then we weren&#39;t</span>
      <span class="token comment">// able to call the cbs during confirmation as the component was not</span>
      <span class="token comment">// registered yet, so we call it here.</span>
      <span class="token function">handleRouteEntered</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> configProps <span class="token operator">=</span> matched<span class="token punctuation">.</span>props <span class="token operator">&amp;&amp;</span> matched<span class="token punctuation">.</span>props<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
    <span class="token comment">// save route and configProps in cache</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>configProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">extend</span><span class="token punctuation">(</span>cache<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        route<span class="token punctuation">,</span>
        configProps
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token function">fillPropsinData</span><span class="token punctuation">(</span>component<span class="token punctuation">,</span> data<span class="token punctuation">,</span> route<span class="token punctuation">,</span> configProps<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>component<span class="token punctuation">,</span> data<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">fillPropsinData</span> <span class="token punctuation">(</span><span class="token parameter">component<span class="token punctuation">,</span> data<span class="token punctuation">,</span> route<span class="token punctuation">,</span> configProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// resolve props</span>
  <span class="token keyword">let</span> propsToPass <span class="token operator">=</span> data<span class="token punctuation">.</span>props <span class="token operator">=</span> <span class="token function">resolveProps</span><span class="token punctuation">(</span>route<span class="token punctuation">,</span> configProps<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>propsToPass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// clone to prevent mutation</span>
    propsToPass <span class="token operator">=</span> data<span class="token punctuation">.</span>props <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> propsToPass<span class="token punctuation">)</span>
    <span class="token comment">// pass non-declared props as attrs</span>
    <span class="token keyword">const</span> attrs <span class="token operator">=</span> data<span class="token punctuation">.</span>attrs <span class="token operator">=</span> data<span class="token punctuation">.</span>attrs <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> propsToPass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>component<span class="token punctuation">.</span>props <span class="token operator">||</span> <span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> component<span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        attrs<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> propsToPass<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token keyword">delete</span> propsToPass<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">resolveProps</span> <span class="token punctuation">(</span><span class="token parameter">route<span class="token punctuation">,</span> config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;undefined&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span>
    <span class="token keyword">case</span> <span class="token string">&#39;object&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> config
    <span class="token keyword">case</span> <span class="token string">&#39;function&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token function">config</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token string">&#39;boolean&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> config <span class="token operator">?</span> route<span class="token punctuation">.</span>params <span class="token operator">:</span> <span class="token keyword">undefined</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token boolean">false</span><span class="token punctuation">,</span>
          <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">props in &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>route<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; is a </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">typeof</span> config<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
          <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">expecting an object, function or boolean.</span><span class="token template-punctuation string">\`</span></span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先是一个函数式组件，因为没有需要响应式的设计这么做能降低开销，接下来我们分析<code>render</code>函数中的逻辑</p>`,2),h=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token comment">// directly use parent context&#39;s createElement() function</span>
    <span class="token comment">// so that components rendered by router-view can resolve named slots</span>
    <span class="token keyword">const</span> h <span class="token operator">=</span> parent<span class="token punctuation">.</span>$createElement
    <span class="token keyword">const</span> name <span class="token operator">=</span> props<span class="token punctuation">.</span>name
    <span class="token keyword">const</span> route <span class="token operator">=</span> parent<span class="token punctuation">.</span>$route
    <span class="token keyword">const</span> cache <span class="token operator">=</span> parent<span class="token punctuation">.</span>_routerViewCache <span class="token operator">||</span> <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>_routerViewCache <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),w=s("li",null,"先从父组件中拿到创建vnode函数（h）",-1),f=s("li",null,[n("获取name，渲染组件时会根据这个"),s("code",null,"porps.name"),n("的值去选择"),s("code",null,"VueRouter.options.routers"),n("（路由配置，创建实例时传的那个）配置的"),s("code",null,"components"),n("（如果只配置component会变成{default: Component}，我们之前说过）")],-1),g=s("code",null,"$route",-1),_={href:"/nav.2.vue-router3%E6%BA%90%E7%A0%81/4.%E8%B7%AF%E7%94%B1%E8%B7%B3%E8%BD%AC/3.%E8%B7%AF%E7%94%B1%E5%AE%88%E5%8D%AB.html#%E7%AC%AC8%E6%AD%A5-%E4%BF%AE%E6%94%B9%E5%BD%93%E5%89%8D%E8%B7%AF%E7%94%B1",target:"_blank",rel:"noopener noreferrer"},x=s("code",null,"$route",-1),C=s("li",null,[s("code",null,"cache"),n("获取父组件存的路由缓存，如果没有初始化一个")],-1),A=s("h4",{id:"层级嵌套",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#层级嵌套","aria-hidden":"true"},"#"),n(" 层级嵌套")],-1),j=s("p",null,[s("code",null,"RouterView"),n("组件支持嵌套使用")],-1),R=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token comment">// used by devtools to display a router-view badge</span>
    data<span class="token punctuation">.</span>routerView <span class="token operator">=</span> <span class="token boolean">true</span>

    <span class="token comment">// determine current view depth, also check to see if the tree</span>
    <span class="token comment">// has been toggled inactive but kept-alive.</span>
    <span class="token keyword">let</span> depth <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> inactive <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>parent <span class="token operator">&amp;&amp;</span> parent<span class="token punctuation">.</span>_routerRoot <span class="token operator">!==</span> parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> vnodeData <span class="token operator">=</span> parent<span class="token punctuation">.</span>$vnode <span class="token operator">?</span> parent<span class="token punctuation">.</span>$vnode<span class="token punctuation">.</span>data <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vnodeData<span class="token punctuation">.</span>routerView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        depth<span class="token operator">++</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vnodeData<span class="token punctuation">.</span>keepAlive <span class="token operator">&amp;&amp;</span> parent<span class="token punctuation">.</span>_directInactive <span class="token operator">&amp;&amp;</span> parent<span class="token punctuation">.</span>_inactive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        inactive <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
      parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>$parent
    <span class="token punctuation">}</span>
    data<span class="token punctuation">.</span>routerViewDepth <span class="token operator">=</span> depth 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记录<code>data.routerView</code>（这里的data就是当前组件的data配置），方便后续判断组件是否是<code>RouterView</code>组件，一直遍历直到根vue实例（_routerRoot就是根实例我们install阶段说过），如果组件<code>data</code>上有<code>routerView</code>的属性，则判断是<code>RouterView</code>组件，层数加一</p><p>这里还有一个缓存判断，就是如果需要走缓存则<code>inactive</code>置为true</p><h4 id="缓存机制" tabindex="-1"><a class="header-anchor" href="#缓存机制" aria-hidden="true">#</a> 缓存机制</h4><p>我们在层级嵌套处已经知道是否要走缓存了（<code>inactive</code>）</p>`,5),D=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token comment">// render previous view if the tree is inactive and kept-alive</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>inactive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> cachedData <span class="token operator">=</span> cache<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
      <span class="token keyword">const</span> cachedComponent <span class="token operator">=</span> cachedData <span class="token operator">&amp;&amp;</span> cachedData<span class="token punctuation">.</span>component
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cachedComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// #2301</span>
        <span class="token comment">// pass props</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cachedData<span class="token punctuation">.</span>configProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">fillPropsinData</span><span class="token punctuation">(</span>cachedComponent<span class="token punctuation">,</span> data<span class="token punctuation">,</span> cachedData<span class="token punctuation">.</span>route<span class="token punctuation">,</span> cachedData<span class="token punctuation">.</span>configProps<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>cachedComponent<span class="token punctuation">,</span> data<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// render previous empty view</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>

    <span class="token comment">// cache component</span>
    cache<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> component <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先获取缓存数据（cachedData）以及缓存组件（cachedComponent），如果缓存组件有值则通过<code>return h(cachedComponent, data, children)</code>创建VNode，如果没有缓存则将缓存放置父组件（也就是keep-alive组件）的<code>_routerViewCache</code>属性下</p><h4 id="注册路由实例" tabindex="-1"><a class="header-anchor" href="#注册路由实例" aria-hidden="true">#</a> 注册路由实例</h4>`,3),E=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">const</span> matched <span class="token operator">=</span> route<span class="token punctuation">.</span>matched<span class="token punctuation">[</span>depth<span class="token punctuation">]</span>

    <span class="token comment">// ...</span>

    <span class="token comment">// attach instance registration hook</span>
    <span class="token comment">// this will be called in the instance&#39;s injected lifecycle hooks</span>
    data<span class="token punctuation">.</span><span class="token function-variable function">registerRouteInstance</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// val could be undefined for unregistration</span>
      <span class="token keyword">const</span> current <span class="token operator">=</span> matched<span class="token punctuation">.</span>instances<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token punctuation">(</span>val <span class="token operator">&amp;&amp;</span> current <span class="token operator">!==</span> vm<span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token punctuation">(</span><span class="token operator">!</span>val <span class="token operator">&amp;&amp;</span> current <span class="token operator">===</span> vm<span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        matched<span class="token punctuation">.</span>instances<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> val
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先是在<code>data.registerRouteInstance</code>赋值一个函数，函数在当前路由记录（route）的层级记录（matched）中的<code>instances</code>属性中添加当前vue实例，函数是在组件beforeCreate生命周期函数中触发的</p>`,2),V=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token keyword">const</span> <span class="token function-variable function">registerInstance</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> callVal</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_parentVnode
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span>i <span class="token operator">=</span> i<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span>i <span class="token operator">=</span> i<span class="token punctuation">.</span>registerRouteInstance<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">i</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> callVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">beforeCreate</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      <span class="token function">registerInstance</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">destroyed</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">registerInstance</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当<code>RouterView</code>渲染了某个组件，则会触发<code>beforeCreate</code>函数，最终会触发<code>registerRouteInstance</code>函数，将当前vue实例记录在当前路由层级列表中对应的位置（$route.matched[层级位置].instances）中，后续在触发一系列组件路由守卫时函数需要将this指向现在存入的vue实例</p><p>最后通过<code>return h(component, data, children)</code>将对应组件转化为VNode</p><h2 id="routerlink" tabindex="-1"><a class="header-anchor" href="#routerlink" aria-hidden="true">#</a> RouterLink</h2><p>在分析代码之前我们思考下为什么要设计这个组件，如果直接使用a标签呢，实际上a标签有几个缺点</p><ul><li>如果路由模式变动则需要修改a标签中的href属性</li><li>如果在路由配置中配置了base属性，在RouterLink中是会自动添加到根目录上的，但是a标签不会</li><li>在history模式下使用RouterLink点击重复路由是不会触发重新渲染的，但是a标签会重新渲染</li></ul>`,6),P=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createRoute<span class="token punctuation">,</span> isSameRoute<span class="token punctuation">,</span> isIncludedRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/route&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> extend <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/misc&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> normalizeLocation <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/location&#39;</span>

<span class="token comment">// work around weird flow bug</span>
<span class="token keyword">const</span> <span class="token literal-property property">toTypes</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Function<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> Object<span class="token punctuation">]</span>
<span class="token keyword">const</span> <span class="token literal-property property">eventTypes</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Function<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> Array<span class="token punctuation">]</span>

<span class="token keyword">const</span> <span class="token function-variable function">noop</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;RouterLink&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">to</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> toTypes<span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;a&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">custom</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
    <span class="token literal-property property">exact</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
    <span class="token literal-property property">exactPath</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
    <span class="token literal-property property">append</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
    <span class="token literal-property property">replace</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
    <span class="token literal-property property">activeClass</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token literal-property property">exactActiveClass</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token literal-property property">ariaCurrentValue</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;page&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">event</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> eventTypes<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;click&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">render</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">h</span><span class="token operator">:</span> Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取路由（Router）和路由实例（Route）</span>
    <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$router
    <span class="token keyword">const</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route
    <span class="token comment">// 解析路由参数</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> location<span class="token punctuation">,</span> route<span class="token punctuation">,</span> href <span class="token punctuation">}</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">,</span>
      current<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>append
    <span class="token punctuation">)</span>

    <span class="token comment">// 记录class属性</span>
    <span class="token keyword">const</span> classes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 获取路由配置中全局路由激活时的类</span>
    <span class="token keyword">const</span> globalActiveClass <span class="token operator">=</span> router<span class="token punctuation">.</span>options<span class="token punctuation">.</span>linkActiveClass
    <span class="token keyword">const</span> globalExactActiveClass <span class="token operator">=</span> router<span class="token punctuation">.</span>options<span class="token punctuation">.</span>linkExactActiveClass
    <span class="token comment">// Support global empty active class</span>
    <span class="token comment">// 路由激活类默认值</span>
    <span class="token keyword">const</span> activeClassFallback <span class="token operator">=</span>
      globalActiveClass <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&#39;router-link-active&#39;</span> <span class="token operator">:</span> globalActiveClass
    <span class="token keyword">const</span> exactActiveClassFallback <span class="token operator">=</span>
      globalExactActiveClass <span class="token operator">==</span> <span class="token keyword">null</span>
        <span class="token operator">?</span> <span class="token string">&#39;router-link-exact-active&#39;</span>
        <span class="token operator">:</span> globalExactActiveClass
    <span class="token comment">// 获取组件路由激活类的配置，没有的话取全局的</span>
    <span class="token keyword">const</span> activeClass <span class="token operator">=</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>activeClass <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> activeClassFallback <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>activeClass
    <span class="token keyword">const</span> exactActiveClass <span class="token operator">=</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>exactActiveClass <span class="token operator">==</span> <span class="token keyword">null</span>
        <span class="token operator">?</span> exactActiveClassFallback
        <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exactActiveClass

    <span class="token keyword">const</span> compareTarget <span class="token operator">=</span> route<span class="token punctuation">.</span>redirectedFrom
      <span class="token operator">?</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token function">normalizeLocation</span><span class="token punctuation">(</span>route<span class="token punctuation">.</span>redirectedFrom<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> router<span class="token punctuation">)</span>
      <span class="token operator">:</span> route

    <span class="token comment">// 赋值class类，判断是否配置了精确匹配以及路由是否相等</span>
    classes<span class="token punctuation">[</span>exactActiveClass<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">isSameRoute</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> compareTarget<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exactPath<span class="token punctuation">)</span> <span class="token comment">// 精确匹配</span>
    <span class="token comment">// 如果配置了精确匹配则跟classes[exactActiveClass]的逻辑一致，如果没配置则使用isIncludedRoute判断是否包含</span>
    classes<span class="token punctuation">[</span>activeClass<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exact <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exactPath
      <span class="token operator">?</span> classes<span class="token punctuation">[</span>exactActiveClass<span class="token punctuation">]</span>
      <span class="token operator">:</span> <span class="token function">isIncludedRoute</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> compareTarget<span class="token punctuation">)</span>

    <span class="token keyword">const</span> ariaCurrentValue <span class="token operator">=</span> classes<span class="token punctuation">[</span>exactActiveClass<span class="token punctuation">]</span> <span class="token operator">?</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ariaCurrentValue <span class="token operator">:</span> <span class="token keyword">null</span>

    <span class="token comment">// 触发路由函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handler</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">guardEvent</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>replace<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          router<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>location<span class="token punctuation">,</span> noop<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>location<span class="token punctuation">,</span> noop<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 绑定触发路由函数</span>
    <span class="token keyword">const</span> on <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">click</span><span class="token operator">:</span> guardEvent <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>event<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>event<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        on<span class="token punctuation">[</span>e<span class="token punctuation">]</span> <span class="token operator">=</span> handler
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      on<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>event<span class="token punctuation">]</span> <span class="token operator">=</span> handler
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token literal-property property">data</span><span class="token operator">:</span> any <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">class</span><span class="token operator">:</span> classes <span class="token punctuation">}</span>

    <span class="token comment">// 处理插槽</span>
    <span class="token keyword">const</span> scopedSlot <span class="token operator">=</span>
      <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>$scopedSlots<span class="token punctuation">.</span>$hasNormal <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$scopedSlots<span class="token punctuation">.</span>default <span class="token operator">&amp;&amp;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$scopedSlots<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        href<span class="token punctuation">,</span>
        route<span class="token punctuation">,</span>
        <span class="token literal-property property">navigate</span><span class="token operator">:</span> handler<span class="token punctuation">,</span>
        <span class="token literal-property property">isActive</span><span class="token operator">:</span> classes<span class="token punctuation">[</span>activeClass<span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">isExactActive</span><span class="token operator">:</span> classes<span class="token punctuation">[</span>exactActiveClass<span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>scopedSlot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>scopedSlot<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> scopedSlot<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>scopedSlot<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token operator">||</span> <span class="token operator">!</span>scopedSlot<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> scopedSlot<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;span&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> scopedSlot<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 处理标签</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>on <span class="token operator">=</span> on
      data<span class="token punctuation">.</span>attrs <span class="token operator">=</span> <span class="token punctuation">{</span> href<span class="token punctuation">,</span> <span class="token string-property property">&#39;aria-current&#39;</span><span class="token operator">:</span> ariaCurrentValue <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// find the first &lt;a&gt; child and apply listener and href</span>
      <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">findAnchor</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span>default<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// in case the &lt;a&gt; is a static node</span>
        a<span class="token punctuation">.</span>isStatic <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">const</span> aData <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
        aData<span class="token punctuation">.</span>on <span class="token operator">=</span> aData<span class="token punctuation">.</span>on <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token comment">// transform existing events in both objects into arrays so we can push later</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> event <span class="token keyword">in</span> aData<span class="token punctuation">.</span>on<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> handler <span class="token operator">=</span> aData<span class="token punctuation">.</span>on<span class="token punctuation">[</span>event<span class="token punctuation">]</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>event <span class="token keyword">in</span> on<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            aData<span class="token punctuation">.</span>on<span class="token punctuation">[</span>event<span class="token punctuation">]</span> <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span> <span class="token operator">?</span> handler <span class="token operator">:</span> <span class="token punctuation">[</span>handler<span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// append new listeners for router-link</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> event <span class="token keyword">in</span> on<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>event <span class="token keyword">in</span> aData<span class="token punctuation">.</span>on<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// on[event] is always a function</span>
            aData<span class="token punctuation">.</span>on<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>on<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            aData<span class="token punctuation">.</span>on<span class="token punctuation">[</span>event<span class="token punctuation">]</span> <span class="token operator">=</span> handler
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">const</span> aAttrs <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>data<span class="token punctuation">.</span>attrs <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>data<span class="token punctuation">.</span>attrs<span class="token punctuation">)</span><span class="token punctuation">)</span>
        aAttrs<span class="token punctuation">.</span>href <span class="token operator">=</span> href
        aAttrs<span class="token punctuation">[</span><span class="token string">&#39;aria-current&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> ariaCurrentValue
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// doesn&#39;t have &lt;a&gt; child, apply listener to self</span>
        data<span class="token punctuation">.</span>on <span class="token operator">=</span> on
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tag<span class="token punctuation">,</span> data<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span>default<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">guardEvent</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// don&#39;t redirect with control keys</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>metaKey <span class="token operator">||</span> e<span class="token punctuation">.</span>altKey <span class="token operator">||</span> e<span class="token punctuation">.</span>ctrlKey <span class="token operator">||</span> e<span class="token punctuation">.</span>shiftKey<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token comment">// don&#39;t redirect when preventDefault called</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>defaultPrevented<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token comment">// don&#39;t redirect on right click</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>button <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>button <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token comment">// don&#39;t redirect if \`target=&quot;_blank&quot;\`</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>currentTarget <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">.</span>getAttribute<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> target <span class="token operator">=</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;target&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\b_blank\\b</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// this may be a Weex event which doesn&#39;t have this method</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>preventDefault<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">findAnchor</span> <span class="token punctuation">(</span><span class="token parameter">children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> child
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      child <span class="token operator">=</span> children<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>child<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> child
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>child<span class="token punctuation">.</span>children <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>child <span class="token operator">=</span> <span class="token function">findAnchor</span><span class="token punctuation">(</span>child<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> child
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),S=s("code",null,"RouterView",-1),$=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token comment">// 获取路由（Router）和路由实例（Route）</span>
    <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$router
    <span class="token keyword">const</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route
    <span class="token comment">// 解析路由参数</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> location<span class="token punctuation">,</span> route<span class="token punctuation">,</span> href <span class="token punctuation">}</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">,</span>
      current<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>append
    <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先根据现有的数据分析路由，我们看下<code>resolve</code>函数</p>`,2),T=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">VueRouter</span> <span class="token punctuation">{</span>
  <span class="token comment">// ... </span>

  <span class="token function">resolve</span> <span class="token punctuation">(</span>
    <span class="token literal-property property">to</span><span class="token operator">:</span> RawLocation<span class="token punctuation">,</span>
    current<span class="token operator">?</span><span class="token operator">:</span> Route<span class="token punctuation">,</span>
    append<span class="token operator">?</span><span class="token operator">:</span> boolean
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">location</span><span class="token operator">:</span> Location<span class="token punctuation">,</span>
    <span class="token literal-property property">route</span><span class="token operator">:</span> Route<span class="token punctuation">,</span>
    <span class="token literal-property property">href</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
    <span class="token comment">// for backwards compat</span>
    <span class="token literal-property property">normalizedTo</span><span class="token operator">:</span> Location<span class="token punctuation">,</span>
    <span class="token literal-property property">resolved</span><span class="token operator">:</span> Route
  <span class="token punctuation">}</span> <span class="token punctuation">{</span>
    current <span class="token operator">=</span> current <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">.</span>current
    <span class="token keyword">const</span> location <span class="token operator">=</span> <span class="token function">normalizeLocation</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> current<span class="token punctuation">,</span> append<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>location<span class="token punctuation">,</span> current<span class="token punctuation">)</span>
    <span class="token keyword">const</span> fullPath <span class="token operator">=</span> route<span class="token punctuation">.</span>redirectedFrom <span class="token operator">||</span> route<span class="token punctuation">.</span>fullPath
    <span class="token keyword">const</span> base <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">.</span>base
    <span class="token keyword">const</span> href <span class="token operator">=</span> <span class="token function">createHref</span><span class="token punctuation">(</span>base<span class="token punctuation">,</span> fullPath<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mode<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      location<span class="token punctuation">,</span>
      route<span class="token punctuation">,</span>
      href<span class="token punctuation">,</span>
      <span class="token comment">// for backwards compat</span>
      <span class="token literal-property property">normalizedTo</span><span class="token operator">:</span> location<span class="token punctuation">,</span>
      <span class="token literal-property property">resolved</span><span class="token operator">:</span> route
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ... </span>
<span class="token punctuation">}</span>

<span class="token comment">// ... </span>

<span class="token keyword">function</span> <span class="token function">createHref</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">base</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">fullPath</span><span class="token operator">:</span> string<span class="token punctuation">,</span> mode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> path <span class="token operator">=</span> mode <span class="token operator">===</span> <span class="token string">&#39;hash&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;#&#39;</span> <span class="token operator">+</span> fullPath <span class="token operator">:</span> fullPath
  <span class="token keyword">return</span> base <span class="token operator">?</span> <span class="token function">cleanPath</span><span class="token punctuation">(</span>base <span class="token operator">+</span> <span class="token string">&#39;/&#39;</span> <span class="token operator">+</span> path<span class="token punctuation">)</span> <span class="token operator">:</span> path
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先规范化<code>location</code>，在通过<code>location</code>获取<code>route</code>，最后获取最终跳转的路径<code>href</code></p><p>之后我们回到<code>RouterLink</code>组件中</p>`,3),B=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token comment">// 记录class属性</span>
    <span class="token keyword">const</span> classes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 获取路由配置中全局路由激活时的类</span>
    <span class="token keyword">const</span> globalActiveClass <span class="token operator">=</span> router<span class="token punctuation">.</span>options<span class="token punctuation">.</span>linkActiveClass
    <span class="token keyword">const</span> globalExactActiveClass <span class="token operator">=</span> router<span class="token punctuation">.</span>options<span class="token punctuation">.</span>linkExactActiveClass <span class="token comment">// 精确匹配</span>
    <span class="token comment">// Support global empty active class</span>
    <span class="token comment">// 路由激活类默认值</span>
    <span class="token keyword">const</span> activeClassFallback <span class="token operator">=</span>
      globalActiveClass <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&#39;router-link-active&#39;</span> <span class="token operator">:</span> globalActiveClass
    <span class="token keyword">const</span> exactActiveClassFallback <span class="token operator">=</span>
      globalExactActiveClass <span class="token operator">==</span> <span class="token keyword">null</span>
        <span class="token operator">?</span> <span class="token string">&#39;router-link-exact-active&#39;</span>
        <span class="token operator">:</span> globalExactActiveClass
    <span class="token comment">// 获取组件路由激活类的配置，没有的话取全局的</span>
    <span class="token keyword">const</span> activeClass <span class="token operator">=</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>activeClass <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> activeClassFallback <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>activeClass
    <span class="token keyword">const</span> exactActiveClass <span class="token operator">=</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>exactActiveClass <span class="token operator">==</span> <span class="token keyword">null</span>
        <span class="token operator">?</span> exactActiveClassFallback
        <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exactActiveClass

    <span class="token keyword">const</span> compareTarget <span class="token operator">=</span> route<span class="token punctuation">.</span>redirectedFrom
      <span class="token operator">?</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token function">normalizeLocation</span><span class="token punctuation">(</span>route<span class="token punctuation">.</span>redirectedFrom<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> router<span class="token punctuation">)</span>
      <span class="token operator">:</span> route

    <span class="token comment">// 赋值class类，判断是否配置了精确匹配以及路由是否相等</span>
    classes<span class="token punctuation">[</span>exactActiveClass<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">isSameRoute</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> compareTarget<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exactPath<span class="token punctuation">)</span> <span class="token comment">// 精确匹配</span>
    <span class="token comment">// 如果配置了精确匹配则跟classes[exactActiveClass]的逻辑一致，如果没配置则使用isIncludedRoute判断是否包含</span>
    classes<span class="token punctuation">[</span>activeClass<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exact <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exactPath
      <span class="token operator">?</span> classes<span class="token punctuation">[</span>exactActiveClass<span class="token punctuation">]</span>
      <span class="token operator">:</span> <span class="token function">isIncludedRoute</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> compareTarget<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码是处理激活路由时<code>RouteLink</code>组件的<code>class</code>属性，首先获取了全局配置激活路由的类并设置默认值，这里匹配的规则分为精确匹配和模糊匹配，之后在处理组件上激活路由的配置，最后判断当前路由是否满足激活条件，最后<code>classes</code>的值应该是”{全局激活类名:是否激活, 局部激活类名:是否激活}“的数据格式</p><p>之后处理触发函数</p>`,3),I=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token comment">// 触发路由函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handler</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">guardEvent</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>replace<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          router<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>location<span class="token punctuation">,</span> noop<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>location<span class="token punctuation">,</span> noop<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 绑定触发路由函数</span>
    <span class="token keyword">const</span> on <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">click</span><span class="token operator">:</span> guardEvent <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>event<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>event<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        on<span class="token punctuation">[</span>e<span class="token punctuation">]</span> <span class="token operator">=</span> handler
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      on<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>event<span class="token punctuation">]</span> <span class="token operator">=</span> handler
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里将<code>RouteLink</code>组件的<code>event</code>属性（触发事件类型）遍历将<code>handler</code>事件挂载</p><p>之后会创建<code>const data: any = { class: classes }</code>把<code>on</code>和<code>classes</code>属性都挂载到渲染元素上</p><p>在生成VNode之前还有一些处理插槽以及标签的逻辑这里就不展开说了可以直接看代码注释</p>`,4);function F(c,L){const t=o("font"),l=o("ExternalLinkIcon");return u(),r("div",null,[v,m,b,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/components/view.js")]),_:1}),y,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/components/view.js")]),_:1}),h,s("ul",null,[w,f,s("li",null,[n("获取路由记录"),g,n("，我们在"),s("a",_,[n("路由守卫阶段（文章末尾）"),a(l)]),n("说过"),x,n("的来源以及如何赋值")]),C]),A,j,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/components/view.js")]),_:1}),R,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/components/view.js")]),_:1}),D,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/components/view.js")]),_:1}),E,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/install.js")]),_:1}),V,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/components/link.js")]),_:1}),P,s("p",null,[n("组件是可以传入动态参数的"),s("code",null,'<RouterLink :to="path" >'+k(c.name)+"</RouterLink>",1),n("所以组件没有向"),S,n("一样使用函数式组件")]),a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/components/link.js")]),_:1}),$,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/index.js")]),_:1}),T,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/components/link.js")]),_:1}),B,a(t,{color:"#999"},{default:p(()=>[n("文件路径: vue-router/src/components/link.js")]),_:1}),I])}const q=i(d,[["render",F],["__file","5.内置组件.html.vue"]]);export{q as default};
