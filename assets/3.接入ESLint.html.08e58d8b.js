import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as t}from"./app.002a81c8.js";const e={},p=t(`<h1 id="接入eslint" tabindex="-1"><a class="header-anchor" href="#接入eslint" aria-hidden="true">#</a> 接入ESLint</h1><p>ESLint 是一款 JS 代码静态检查工具，通过解析代码的 AST 来分析代码格式，检查代码风格和质量，vscode 提供了 ESLint 插件，可以在编辑器中直接对不合规代码标红</p><h2 id="初始化-eslint" tabindex="-1"><a class="header-anchor" href="#初始化-eslint" aria-hidden="true">#</a> 初始化 ESLint</h2><p>使用 ESLint 官方提供的脚手架进行初始化，我们需要安装并初始化 ESLint</p><div class="language-终端 line-numbers-mode" data-ext="终端"><pre class="language-终端"><code>&lt;!-- 安装 --&gt;
pnpm i eslint -D

&lt;!-- 初始化 --&gt;
pnpx eslint --init

&lt;!-- 执行初始化需要回答一些问题 --&gt;
You can also run this command directly using &#39;npm init @eslint/config&#39;.
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard-with-typescript
✔ What format do you want your config file to be in? · JavaScript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化完成后再项目根目录会出现一个 <code>.eslintrc.cjs</code> 文件，这就是 ESLint 初始化后产生的默认配置文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token comment">// 运行环境</span>
	<span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token comment">// 浏览器环境</span>
		<span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		<span class="token comment">// es2021 环境</span>
		<span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token comment">// 全局变量</span>
	<span class="token literal-property property">globals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token comment">// 可重写</span>
		<span class="token comment">// &quot;$&quot;: true,</span>
		<span class="token comment">// &quot;$&quot;: &quot;writable&quot;,</span>
		<span class="token comment">// 不可重写</span>
		<span class="token comment">// &quot;$&quot;: false,</span>
		<span class="token comment">// &quot;$&quot;: &quot;readonly&quot;,</span>
		<span class="token comment">// 禁用</span>
		<span class="token comment">// &quot;$&quot;: &quot;off&quot;,</span>

		<span class="token string-property property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;readonly&quot;</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token comment">// 继承规则</span>
	<span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
		<span class="token comment">// eslint 内部推荐规则</span>
		<span class="token string">&quot;eslint:recommended&quot;</span><span class="token punctuation">,</span>
		<span class="token comment">// react 插件中推荐规则</span>
		<span class="token string">&quot;plugin:react/recommended&quot;</span><span class="token punctuation">,</span>
		<span class="token comment">// @typescript-eslint 插件推荐规则</span>
		<span class="token string">&quot;plugin:@typescript-eslint/recommended&quot;</span><span class="token punctuation">,</span>
		<span class="token comment">// 可以根据npm包继承</span>
		<span class="token comment">// &quot;npm包名称&quot;</span>
	<span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token literal-property property">overrides</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token comment">// 解析器，将代码解析成 AST，@typescript-eslint/parser 是用来解析 ts 代码</span>
	<span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&quot;@typescript-eslint/parser&quot;</span><span class="token punctuation">,</span>
	<span class="token comment">// 解析器配置</span>
	<span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token comment">// 兼容语法版本</span>
		<span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">&quot;latest&quot;</span><span class="token punctuation">,</span>
		<span class="token comment">// 代码来源类型，这里使用 esm 模式</span>
		<span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token comment">// 插件</span>
	<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
		<span class="token string">&quot;react&quot;</span><span class="token punctuation">,</span>
		<span class="token comment">// ts 语法规则，只是导入规则，并没有开启或修改规则</span>
		<span class="token string">&quot;@typescript-eslint&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token comment">// 代码规则</span>
	<span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">indent</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tab&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
		<span class="token string-property property">&quot;linebreak-style&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;unix&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
		<span class="token literal-property property">quotes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;double&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
		<span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;never&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="eslint-接入-prettier" tabindex="-1"><a class="header-anchor" href="#eslint-接入-prettier" aria-hidden="true">#</a> ESLint 接入 Prettier</h2><p>ESLint 提供了 <code>eslint --fix</code> 命令来自动格式化代码，在格式化代码风格上推荐使用 Prettier</p><div class="language-终端 line-numbers-mode" data-ext="终端"><pre class="language-终端"><code>pnpm i prettier -D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在项目根目录创建 <code>.prettierrc.js</code> 配置文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .prettierrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">80</span><span class="token punctuation">,</span> <span class="token comment">//一行的字符数，如果超过会进行换行，默认为80</span>
	<span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 一个 tab 代表几个空格数，默认为 2 个</span>
	<span class="token literal-property property">useTabs</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//是否使用 tab 进行缩进，默认为false，表示用空格进行缩减</span>
	<span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 字符串是否使用单引号，默认为 false，使用双引号</span>
	<span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 行尾是否使用分号，默认为true</span>
	<span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 是否使用尾逗号</span>
	<span class="token literal-property property">bracketSpacing</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后将 Prettier 集成到 ESLint 中，需要两个工具</p><div class="language-终端 line-numbers-mode" data-ext="终端"><pre class="language-终端"><code>pnpm i eslint-config-prettier eslint-plugin-prettier -D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>eslint-config-prettier</code> 用来覆盖 ESLint 规则配置放置规则冲突，<code>eslint-plugin-prettier</code> 用来代替 <code>eslint --fix</code> 功能</p><p>接着需要将 prettier 插入到 ESLint 配置中</p>`,16),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","3.接入ESLint.html.vue"]]);export{d as default};
