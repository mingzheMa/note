import{_ as c}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as p,e,w as t,a as s,b as n,d as o,r as l}from"./app.9ac9284b.js";const i={},u=s("h1",{id:"current",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#current","aria-hidden":"true"},"#"),n(" current")],-1),d=s("p",null,[n("这里注意下"),s("code",null,"this.router.match(location, this.current)"),n("传入的"),s("code",null,"this.current"),n("参数")],-1),k=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">router</span><span class="token operator">:</span> Router<span class="token punctuation">,</span> <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token operator">?</span>string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token constant">START</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),v=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">START</span> <span class="token operator">=</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>current</code>属性就是记录当前路由实例，初始化的时候设置为<code>START</code>，也就是一个空的路由实例，<code>transitionTo</code>方法事实上就是在切换<code>current</code>属性</p>`,2);function m(_,h){const a=l("font");return r(),p("div",null,[u,d,e(a,{color:"#999"},{default:t(()=>[n("文件路径: vue-router/src/history/base.js")]),_:1}),k,e(a,{color:"#999"},{default:t(()=>[n("文件路径: vue-router/src/util/route.js")]),_:1}),v])}const y=c(i,[["render",m],["__file","1.current.html.vue"]]);export{y as default};
