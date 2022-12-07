import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.9ac9284b.js";const t={},p=e(`<h1 id="optimization" tabindex="-1"><a class="header-anchor" href="#optimization" aria-hidden="true">#</a> optimization</h1><p><code>optimization</code>是打包优化配置</p><p>例如我这里有两个模块，之后的配置如果没有特殊说明都使用该例子</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// utils.js</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;a&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;b&quot;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> utils <span class="token keyword">from</span> <span class="token string">&quot;./utils&quot;</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tree-shaking" tabindex="-1"><a class="header-anchor" href="#tree-shaking" aria-hidden="true">#</a> tree shaking</h2><p>tree shaking会删除模块中导出未使用代码以及永远不会运行的代码，是webpack内部机制</p><p>在打包模式配置成<code>mode = production</code>（生产模式）的时候会自动触发tree shaking机制</p><p>我们这里通过webpack配置触发tree shaking</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;webpack&quot;</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Configuration<span class="token punctuation">}</span></span>
*/</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&quot;./src/index.js&quot;</span><span class="token punctuation">,</span>
    
    <span class="token comment">// 优化配置</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 标记导出未使用变量</span>
        <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到这里在<code>optimization</code>配置中配置了<code>usedExports</code>，该配置的作用是如果导出变量未使用则会在打包结果上标记<code>/* unused harmony export 变量名称 */</code></p><p>可以看到在index.js模块中并没有使用导出的函数b，我们先看下没有配置<code>optimization.usedExports</code>的打包结果（这里只保留utils.js模块的函数）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 1 */</span>
<span class="token doc-comment comment">/***/ (function(module, __webpack_exports__, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */</span> __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* harmony export (binding) */</span> __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> b<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;a&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;b&quot;</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/***/ <span class="token punctuation">}</span>)
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出如果不配置<code>optimization.usedExports</code>时会将a、b两个函数全部导出，接下来我们看下配置了<code>optimization.usedExports</code>的打包结果</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 1 */</span>
<span class="token doc-comment comment">/***/ (function(module, __webpack_exports__, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;
/* harmony export (binding) */</span> __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* unused harmony export b */</span>
<span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;a&quot;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;b&quot;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/***/ <span class="token punctuation">}</span>)
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出函数b并没有被导出，并且会增加一个<code>/* unused harmony export b */</code>的标记，但是函数b仍然在打包结果中</p><p>我们增加一个配置<code>optimization.minimize</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;webpack&quot;</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Configuration<span class="token punctuation">}</span></span>
*/</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&quot;./src/index.js&quot;</span><span class="token punctuation">,</span>
    
    <span class="token comment">// 优化配置</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 标记导出未使用变量</span>
        <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token comment">// js代码压缩</span>
        <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">!</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
	<span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span>t<span class="token punctuation">,</span>n</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">;</span>n<span class="token punctuation">.</span><span class="token function">r</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">const</span> r<span class="token operator">=</span><span class="token function">n</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span>t<span class="token punctuation">,</span>n</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">;</span><span class="token keyword">function</span> <span class="token function">r</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">}</span>n<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> r<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;我是该文件副作用&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出打包结果中并没有函数b中<code>return &quot;b&quot;</code>的代码，函数b的代码被移除了</p><p><code>usedExports</code>配置标记出导出未使用代码，而<code>minimize</code>配置则删除标记代码</p><p><code>tree shaking</code>翻译为摇树，意思为将树上的枯树枝摇下来，这里就相当于先使用<code>usedExports</code>找到枯树枝，在使用<code>minimize</code>将枯树枝摇下来</p><h4 id="配置babel-loader导致tree-shaking失效问题" tabindex="-1"><a class="header-anchor" href="#配置babel-loader导致tree-shaking失效问题" aria-hidden="true">#</a> 配置babel-loader导致tree shaking失效问题</h4><p>webpack文档中明确提出tree shaking的前提是ESModules规范</p><p>当我们为了提高代码兼容性配置了babel-loader的时候则会导致代码最终转化成了commonJS（最新版babel-loader已经默认输出ESmodules规范，所以不存在这个问题）</p><p>我们配置babel-loader观察一下打包结果，这里故意将modules配置成&quot;commonjs&quot;来观察导出未使用的代码是否会被标记</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;webpack&quot;</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Configuration<span class="token punctuation">}</span></span>
*/</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&quot;./src/index.js&quot;</span><span class="token punctuation">,</span>
    
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&quot;babel-loader&quot;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                                <span class="token punctuation">[</span><span class="token string">&#39;@babel/preset-env&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                                    <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token string">&quot;commonjs&quot;</span>
                                <span class="token punctuation">}</span><span class="token punctuation">]</span>
                            <span class="token punctuation">]</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 优化配置</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 标记导出未使用变量</span>
        <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 1 */</span>
<span class="token doc-comment comment">/***/ (function(module, exports, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;


Object.defineProperty(exports, &quot;__esModule&quot;, <span class="token punctuation">{</span>
  value: true
<span class="token punctuation">}</span>);
exports.a = a;
exports.b = b;

function a() <span class="token punctuation">{</span>
  return &quot;a&quot;;
<span class="token punctuation">}</span>

function b() <span class="token punctuation">{</span>
  return &quot;b&quot;;
<span class="token punctuation">}</span>

/***/</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在commonJS规范下是不会有导出未使用标记的，因此在压缩阶段也就不会删除函数b</p><p>我们把modules配置改为&quot;auto&quot;从新打包试下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 1 */</span>
<span class="token doc-comment comment">/***/ (function(module, __webpack_exports__, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;
/* harmony export (binding) */</span> __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> a<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* unused harmony export b */</span>
<span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/***/ <span class="token punctuation">}</span>)
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出如果babel-loader输出commonJS规范时是不会有导出未使用标记的，tree shaking也就失效了</p><h2 id="sideeffects" tabindex="-1"><a class="header-anchor" href="#sideeffects" aria-hidden="true">#</a> sideEffects</h2><p><code>sideEffects</code>是和<code>tree shaking</code>一样的优化机制</p><p>我们单独为<code>sideEffects</code>创建一写例子</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> button <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./components&quot;</span>

<span class="token function">button</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// components.js</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span><span class="token keyword">default</span> <span class="token keyword">as</span> button<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./button&quot;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span><span class="token keyword">default</span> <span class="token keyword">as</span> input<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./input&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// button.js，input.js雷同</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;button&quot;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;我是button的副作用&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到我们创建了<code>button</code>和<code>input</code>两个组件，组件分别有副作用，通过<code>components</code>模块统一导出，并在<code>index</code>模块中使用其中的<code>button</code>模块</p><p>我们打包时配置上<code>optimization.usedExports</code>查看打包结果</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 1 */</span>
<span class="token doc-comment comment">/***/ (function(module, __webpack_exports__, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;
/* harmony import */</span> <span class="token keyword">var</span> _button__WEBPACK_IMPORTED_MODULE_0__ <span class="token operator">=</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* harmony reexport (safe) */</span> __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _button__WEBPACK_IMPORTED_MODULE_0__<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* harmony import */</span> <span class="token keyword">var</span> _input__WEBPACK_IMPORTED_MODULE_1__ <span class="token operator">=</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>



<span class="token doc-comment comment">/***/ <span class="token punctuation">}</span>),
/* 2 */</span>
<span class="token doc-comment comment">/***/ (function(module, __webpack_exports__, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;
/* harmony default export */</span> __webpack_exports__<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;button&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;我是button的副作用&quot;</span><span class="token punctuation">)</span>


<span class="token doc-comment comment">/***/ <span class="token punctuation">}</span>),
/* 3 */</span>
<span class="token doc-comment comment">/***/ (function(module, __webpack_exports__, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;
/* unused harmony default export */</span> <span class="token keyword">var</span> _unused_webpack_default_export <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;input&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;我是input的副作用&quot;</span><span class="token punctuation">)</span>


<span class="token doc-comment comment">/***/ <span class="token punctuation">}</span>)
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出在<code>input</code>模块（模块3）中并没有导出结果，但是我们配置了tree shaking，所以将这个模块打包进来了，实时上我们并不需要这个<code>input</code>模块，因为它没有被使用</p><p>我们配置上sideEffects在打包看看</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack.config</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&quot;./src/index.js&quot;</span><span class="token punctuation">,</span>    
    <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sideEffects</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// package.json</span>
<span class="token string-property property">&quot;sideEffects&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>webpack.config中的sideEffects为打开副作用优化，而package.json中的则为配置哪些模块存在副作用，可以是路径数组，配置false为所有模块都没有副作用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 1 */</span>
<span class="token doc-comment comment">/***/ (function(module, __webpack_exports__, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;
__webpack_require__.r(__webpack_exports__);
/* harmony import */</span> <span class="token keyword">var</span> _components__WEBPACK_IMPORTED_MODULE_0__ <span class="token operator">=</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token function">Object</span><span class="token punctuation">(</span>_components__WEBPACK_IMPORTED_MODULE_0__<span class="token punctuation">[</span><span class="token comment">/* default */</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/***/ <span class="token punctuation">}</span>),
/* 2 */</span><span class="token punctuation">,</span>
<span class="token comment">/* 3 */</span>
<span class="token doc-comment comment">/***/ (function(module, __webpack_exports__, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;
/* harmony default export */</span> __webpack_exports__<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;button&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;我是button的副作用&quot;</span><span class="token punctuation">)</span>


<span class="token doc-comment comment">/***/ <span class="token punctuation">}</span>)
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到在打包结果里就没有<code>input</code>模块了</p><p>当某个模块中的副作用函数只是服务于这个模块的时候我们可以配置sideEffects优化打包体积，但是如果某个模块中的副作用修改了全局属性，则不能配置sideEffects，否则这段修改全局的副作用代码将会失效！（比如某个模块的副作用：window.a = &quot;哈哈哈&quot;），所以我们尽量在模块中减少影响全局的副所用</p><h2 id="模块合并" tabindex="-1"><a class="header-anchor" href="#模块合并" aria-hidden="true">#</a> 模块合并</h2><p>我们知道webpack打包结果是一个立即执行函数，并将所有模块当做参数传入函数，模块越多参数越多则创建的函数越多（参数为函数），我们是不是可以将模块和被引用模块合并</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;webpack&quot;</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Configuration<span class="token punctuation">}</span></span>
*/</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&quot;./src/index.js&quot;</span><span class="token punctuation">,</span>
    
    <span class="token comment">// 优化配置</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 合并模块</span>
        <span class="token literal-property property">concatenateModules</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* 0 */</span>
<span class="token doc-comment comment">/***/ (function(module, __webpack_exports__, __webpack_require__) <span class="token punctuation">{</span>

&quot;use strict&quot;;
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/utils.js
function a() <span class="token punctuation">{</span>
    return &quot;a&quot;
    console.log(&quot;a&quot;)
<span class="token punctuation">}</span>

function b() <span class="token punctuation">{</span>
    return &quot;b&quot;
<span class="token punctuation">}</span>

console.log(&quot;我是该文件副作用&quot;)
// CONCATENATED MODULE: ./src/index.js

const res = a()
console.log(res)

/***/</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到打包结果将<code>index.js</code>和<code>utils.js</code>两个模块合并为一个模块</p>`,54),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","optimization.html.vue"]]);export{d as default};
