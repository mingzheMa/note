import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as t}from"./app.002a81c8.js";const e="/note/assets/1.htmlRequire.71a26729.jpg",p="/note/assets/1.mainRequire.e64b7f8b.jpg",o="/note/assets/1.bundel.8f0dc24e.jpg",c="/note/assets/1.noBundel.9ab16af6.jpg",i={},l=t(`<h1 id="项目构建" tabindex="-1"><a class="header-anchor" href="#项目构建" aria-hidden="true">#</a> 项目构建</h1><p>本章我们搭建一个 vite + react + ts 项目，并逐步解决在实战中项目构建问题</p><div class="language-终端 line-numbers-mode" data-ext="终端"><pre class="language-终端"><code>pnpm create vite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>文件结构如下</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目命令" tabindex="-1"><a class="header-anchor" href="#项目命令" aria-hidden="true">#</a> 项目命令</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// package.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;project-building&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;private&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 开发</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tsc &amp;&amp; vite build&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 打包</span>
    <span class="token property">&quot;preview&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite preview&quot;</span> <span class="token comment">// 打包后预览</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;react&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^18.2.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;react-dom&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^18.2.0&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;@types/react&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^18.0.26&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@types/react-dom&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^18.0.9&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@vitejs/plugin-react&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;typescript&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.9.3&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;vite&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>package.json</code> 中提供了三个命令，分别应用于开发、打包以及打包后预览</p><h2 id="开发构建" tabindex="-1"><a class="header-anchor" href="#开发构建" aria-hidden="true">#</a> 开发构建</h2><p><code>pnpm dev</code> 命令会启动开发服务器 Vite Dev Server，当我们访问 Vite Dev Server 时会将项目中 <code>index.html</code> 文件内容返回</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- index.html --&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/svg+xml<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/vite.svg<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Vite + React + TS<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>root<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/src/main.tsx<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+e+`" alt=""></p><p>浏览器收到 html 响应开始进行解析，当浏览器解析到 <code>&lt;script type=&quot;module&quot; src=&quot;/src/main.tsx&quot;&gt;&lt;/script&gt;</code> 的时候根据 ES 模块的特性会向服务器发起 <code>/src/main.tsx</code> 请求获取该文件</p><p>我们先看下 <code>/src/main.tsx</code> 文件的内容</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">&#39;react-dom/client&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./index.css&#39;</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">createRoot</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> HTMLElement<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.StrictMode</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">App</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.StrictMode</span></span><span class="token punctuation">&gt;</span></span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是浏览器是无法解析 tsx 的文件，那么 vite 是怎么做的呢</p><p><img src="`+p+'" alt=""></p><p>可以看到 Vite Dev Server 并没有简单的读取文件并返回，而是在读取后进行了代码转义，在响应体顶部可以看到一些 <code>import</code> 语句，在执行到每个 <code>import</code> 语句的时候浏览器根据路径请求资源。例如在响应体中可以看到 <code>import App from &quot;/src/App.tsx&quot;;</code> 语句，在请求中也可以找到 <code>App.tsx</code> 的请求</p><p>这也就是 vite 的 no-bundle 理念的真正含义，利用 ES 模块特性实现按需加载。对比 webpack 先打包再加载的模式，vite 省去了耗时的打包流程，这也就是 vite 在开发模式下构建速度快的原因之一，官方提供了两张 bundle 和 no-bundel 的启动流程图</p><p><img src="'+o+'" alt=""><img src="'+c+`" alt=""></p><p>在项目中每个 <code>import</code> 语句都会发起请求，在返回的模块中如果含有 <code>import</code> 语句，则会继续发起请求，直到相关资源加载完毕</p><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h2><p>vite 可以通过命令行传入参数，如 <code>vite --port=9527</code>，如果项目根目录存在 <code>vite.config.ts</code> 文件，则视该文件为配置文件，这里先简单看下配置文件，后面会详细分析</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> react <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-react&#39;</span>

<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">react</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件中只配置了 <code>@vitejs/plugin-react</code> 插件，该插件由官方提供，来提供 react 代码的编译以及热更新功能</p><p>vite dev server 默认 5174 端口，如果该端口被占用则自动加一</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> react <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-react&#39;</span>

<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  server<span class="token operator">:</span> <span class="token punctuation">{</span>
    port<span class="token operator">:</span> <span class="token number">9527</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">react</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想指定端口，可以配置 <code>server.port</code></p><h2 id="生产构建" tabindex="-1"><a class="header-anchor" href="#生产构建" aria-hidden="true">#</a> 生产构建</h2><p>生产环境中仍然需要将代码打包，虽然 ES 模块大多数浏览器兼容，但是这种方式会造成大量的网络请求。为了在生产环境有更好的性能，代码仍需要打包、tree shaking、按需引入等。<code>package.json</code> 中提供了 <code>build</code> 命令来进行项目打包</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tsc &amp;&amp; vite build&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到命令先执行 <code>tsc</code> 后再执行 <code>vite build</code> 进行打包，这是问什么呢？因为 vite 只提供了 ts 的编译功能，在打包时并没有 ts 的类型校验，所以在打包前利用 <code>tsc</code> 先进行类型校验后在打包。从 ts 配置文件 <code>tsconfig.json</code> 中也可以看出，实际 <code>tsc</code> 只做了类型校验，并没有进行 ts 代码编译</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token property">&quot;noEmit&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>刚才也说过，开发构建和生产构建的流程是不一样的，这可能会存在一些隐患，因此 vite 提供了预览打包项目的命令</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;preview&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite preview&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令会启动一个服务器，访问时会返回返回项目打包后的结果，就和 webpack 的开发流程类似</p>`,36),u=[l];function r(d,k){return s(),a("div",null,u)}const g=n(i,[["render",r],["__file","1.项目构建.html.vue"]]);export{g as default};
