import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as p}from"./app.9ac9284b.js";const t={},e=p(`<h1 id="手写commonjs-node环境" tabindex="-1"><a class="header-anchor" href="#手写commonjs-node环境" aria-hidden="true">#</a> 手写CommonJS（node环境）</h1><p>CommonJS是解决js工程化问题，是代码层面实现的，我们先看下使用方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 导出模块</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token comment">// 导入模块</span>
<span class="token keyword">const</span> moduleRes <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span>导入模块路径<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>moduleRes<span class="token punctuation">)</span> <span class="token comment">// { a: 1, b: 2 }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导出模块是通过<code>module.exports</code>导出，导入模块通过<code>require</code>方法导入</p><p>还有一种导出方式，也能达到上面效果</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>exports<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span>
exports<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意<code>exports</code>和<code>module.exports</code>其实就是一个对象</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>module<span class="token punctuation">.</span>exports <span class="token operator">===</span> exports<span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="初步搭建" tabindex="-1"><a class="header-anchor" href="#初步搭建" aria-hidden="true">#</a> 初步搭建</h2><p>我们先梳理下CommonJS的特性：</p><ol><li>运行时加载，加载为同步</li><li>模块中有module、exports全局变量（module.exports === exports）以及require全局方法</li><li>模块导出的module.exports为浅拷贝</li><li>require加载模块的时候会运行模块代码</li><li>模块被引用后会记录缓存，模块代码只会运行一次</li></ol><p>第1条得出加载同步说明加载文件的时候需要同步读取</p><p>第2、4条得出使用require导入的模块是被立即执行函数包裹，并传入module、exports、require参数</p><p>第3、5条得出require方法需要将module.exports浅拷贝返回，并缓存起来</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Module</span> <span class="token punctuation">{</span>
  <span class="token comment">// 缓存</span>
  <span class="token keyword">static</span> cache <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 模块id</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 导出数据</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 是否加载</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>loaded <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建一个<code>Module</code>类，创建时初始化一些数据，接下来我们从require方法入手</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Module</span> <span class="token punctuation">{</span>
  <span class="token comment">// 缓存</span>
  <span class="token keyword">static</span> cache <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// 文件导入</span>
  <span class="token keyword">static</span> <span class="token function">_load</span><span class="token punctuation">(</span><span class="token parameter">requirePath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> absolutePath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>requirePath<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 判断缓存</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Module<span class="token punctuation">.</span>_cache<span class="token punctuation">[</span>absolutePath<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Module<span class="token punctuation">.</span>_cache<span class="token punctuation">[</span>absolutePath<span class="token punctuation">]</span><span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建模块</span>
    <span class="token keyword">const</span> currModule <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Module</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// id赋值</span>
    currModule<span class="token punctuation">.</span>id <span class="token operator">=</span> absolutePath<span class="token punctuation">;</span>
    <span class="token comment">// 存入缓存</span>
    Module<span class="token punctuation">.</span>_cache<span class="token punctuation">[</span>currModule<span class="token punctuation">.</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> currModule<span class="token punctuation">;</span>
    <span class="token comment">// 加载文件</span>
    currModule<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> currModule<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 模块id</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 导出数据</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 是否加载</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>loaded <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 导入方法</span>
  <span class="token function">require</span><span class="token punctuation">(</span><span class="token parameter">requirePath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Module<span class="token punctuation">.</span><span class="token function">_load</span><span class="token punctuation">(</span>requirePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建<code>require</code>实例方法，方法中调用类本身<code>_load</code>方法</p><p><code>_load</code>方法中首先做了缓存判断处理，如果没有缓存则创建模块实例<code>Module</code>，并赋值<code>id</code>（模块id）、<code>_cache</code>（缓存），调用实例<code>load</code>方法去加载模块并赋值<code>exports</code>（模块导出的内容，方法我们之后说），最后将<code>exports</code>导出内容返回</p><p>这样我们就完成了初级阶段，总结一下，使用<code>require</code>方法导入模块时，先去缓存中查找是否存在，如果不存在则创建一个模块，存入缓存，加载导入模块，并将导入模块的导出内容返回</p><h2 id="加载导入模块" tabindex="-1"><a class="header-anchor" href="#加载导入模块" aria-hidden="true">#</a> 加载导入模块</h2><p>上面我们搭建好了一个模块类，并实现了require的简单逻辑，下面我们实现加载模块逻辑</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 加载js模块</span>
<span class="token keyword">function</span> <span class="token function">loadJsModule</span><span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> conent <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>module<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token string">&quot;utf-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  module<span class="token punctuation">.</span><span class="token function">_compile</span><span class="token punctuation">(</span>conent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Module</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token comment">// 加载文件类型对应方法</span>
    <span class="token keyword">static</span> _extensions <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">js</span><span class="token operator">:</span> loadJsModule<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 加载模块</span>
    <span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 根据文件后缀选择加载方式</span>
        <span class="token keyword">const</span> moduleType <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Module<span class="token punctuation">.</span>_extensions<span class="token punctuation">[</span>moduleType<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          Module<span class="token punctuation">.</span>_extensions<span class="token punctuation">[</span>moduleType<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>load</code>实例方法中我们解析文件后缀，根据后缀调用对应加载方法</p><p>目前只支持js文件模块，函数<code>loadJsModule</code>接收模块实例，读取模块内容后加载模块阶段就结束了，接下来调用实例上<code>_compile</code>方法进入编译阶段</p><h2 id="编译模块" tabindex="-1"><a class="header-anchor" href="#编译模块" aria-hidden="true">#</a> 编译模块</h2><p>我们已经拿到了模块内容，接下来进入模块编译阶段（模块外层包函数、包装函数执行并传入对应参数）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Module</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>

    <span class="token comment">// 包装函数</span>
    <span class="token keyword">static</span> <span class="token function">_wrapper</span><span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">(function (exports, module, require, __filename, __dirname){</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>content<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">})</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 编译</span>
    <span class="token function">_compile</span><span class="token punctuation">(</span><span class="token parameter">conent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取包装后函数</span>
        <span class="token keyword">const</span> wrapConent <span class="token operator">=</span> Module<span class="token punctuation">.</span><span class="token function">_wrapper</span><span class="token punctuation">(</span>conent<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 将字符串当做js执行，调用返回包装函数并传入响应参数</span>
        <span class="token keyword">const</span> func <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span>wrapConent<span class="token punctuation">)</span>
        <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">,</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">,</span>
            <span class="token keyword">this</span><span class="token punctuation">,</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>require<span class="token punctuation">,</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">,</span>
            path<span class="token punctuation">.</span><span class="token function">dirname</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过类静态方法<code>_wrapper</code>对导入模块内容进行包装，接着通过<code>eval</code>执行包装后的字符串（字符串返回包装函数），最后执行包赚函数传入对应数值</p><p>调用包装函数后就执行模块中的代码了，当模块中对exports或module.exports赋值时，Module实例使用的是同一个引用值，接着将实例属性exports返回，这样就完成了导入模块</p><h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码" aria-hidden="true">#</a> 完整代码</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;path&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;fs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;vm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 加载js模块</span>
<span class="token keyword">function</span> <span class="token function">loadJsModule</span><span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> conent <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>module<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token string">&quot;utf-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  module<span class="token punctuation">.</span><span class="token function">_compile</span><span class="token punctuation">(</span>conent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Module</span> <span class="token punctuation">{</span>
  <span class="token comment">// 缓存</span>
  <span class="token keyword">static</span> _cache <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// 加载文件类型对应方法</span>
  <span class="token keyword">static</span> _extensions <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;.js&quot;</span><span class="token operator">:</span> loadJsModule<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// 文件导入</span>
  <span class="token keyword">static</span> <span class="token function">_load</span><span class="token punctuation">(</span><span class="token parameter">requirePath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> absolutePath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>requirePath<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 判断缓存</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Module<span class="token punctuation">.</span>_cache<span class="token punctuation">[</span>absolutePath<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Module<span class="token punctuation">.</span>_cache<span class="token punctuation">[</span>absolutePath<span class="token punctuation">]</span><span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建模块</span>
    <span class="token keyword">const</span> currModule <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Module</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// id赋值</span>
    currModule<span class="token punctuation">.</span>id <span class="token operator">=</span> absolutePath<span class="token punctuation">;</span>
    <span class="token comment">// 存入缓存</span>
    Module<span class="token punctuation">.</span>_cache<span class="token punctuation">[</span>currModule<span class="token punctuation">.</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> currModule<span class="token punctuation">;</span>
    <span class="token comment">// 加载文件</span>
    currModule<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> currModule<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 包装函数</span>
  <span class="token keyword">static</span> <span class="token function">_wrapper</span><span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">(function (exports, module, require, __filename, __dirname){</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>content<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">})</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 模块id</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 导出数据</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 是否加载</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>loaded <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 导入方法</span>
  <span class="token function">require</span><span class="token punctuation">(</span><span class="token parameter">requirePath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> moduleType <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span>requirePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    requirePath <span class="token operator">=</span> moduleType <span class="token operator">?</span> requirePath <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>requirePath<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.js</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> Module<span class="token punctuation">.</span><span class="token function">_load</span><span class="token punctuation">(</span>requirePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 加载模块</span>
  <span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 根据文件后缀选择加载方式</span>
    <span class="token keyword">const</span> moduleType <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Module<span class="token punctuation">.</span>_extensions<span class="token punctuation">[</span>moduleType<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Module<span class="token punctuation">.</span>_extensions<span class="token punctuation">[</span>moduleType<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 编译</span>
  <span class="token function">_compile</span><span class="token punctuation">(</span><span class="token parameter">conent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取包装后函数</span>
    <span class="token keyword">const</span> wrapConent <span class="token operator">=</span> Module<span class="token punctuation">.</span><span class="token function">_wrapper</span><span class="token punctuation">(</span>conent<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 将字符串当做js执行，调用返回包装函数并传入响应参数</span>
    <span class="token keyword">const</span> func <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span>wrapConent<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>require<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">,</span>
      path<span class="token punctuation">.</span><span class="token function">dirname</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Module</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// b.js文件</span>
exports<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;b.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>exports<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>module<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>module<span class="token punctuation">.</span>exports <span class="token operator">===</span> exports<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>__filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// a.js文件</span>
<span class="token keyword">const</span> myModule <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;./module&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> myModule<span class="token punctuation">.</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;./b.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>

<span class="token comment">// b.js</span>
<span class="token comment">// { a: { a: 1 } }</span>
<span class="token comment">// { a: { a: 1 } }</span>
<span class="token comment">// Module {</span>
<span class="token comment">//   id: &#39;/Users/max/Downloads/马明哲/b.js&#39;,</span>
<span class="token comment">//   exports: { a: { a: 1 } },</span>
<span class="token comment">//   loaded: true</span>
<span class="token comment">// }</span>
<span class="token comment">// true</span>
<span class="token comment">// /Users/max/Downloads/马明哲/b.js</span>
<span class="token comment">// /Users/max/Downloads/马明哲</span>
<span class="token comment">// { a: { a: 1 } }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","手写CommonJS.html.vue"]]);export{r as default};
