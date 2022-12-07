import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as o,e as t,w as r,b as s,d as n,r as l}from"./app.9ac9284b.js";const c={},i=n(`<h1 id="vnode" tabindex="-1"><a class="header-anchor" href="#vnode" aria-hidden="true">#</a> VNode</h1><p>我们创建一个dom并打印它，可以看出一个真实的dom的内容时非常多的，频繁的更新就会造成巨大的开销</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;div&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">accessKey</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">align</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">ariaAtomic</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaAutoComplete</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaBusy</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaChecked</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaColCount</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaColIndex</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaColSpan</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaCurrent</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaDescription</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaDisabled</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaExpanded</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaHasPopup</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaHidden</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaInvalid</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaKeyShortcuts</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaLabel</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaLevel</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaLive</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaModal</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaMultiLine</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaMultiSelectable</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaOrientation</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaPlaceholder</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaPosInSet</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaPressed</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaReadOnly</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaRelevant</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaRequired</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaRoleDescription</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaRowCount</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaRowIndex</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaRowSpan</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaSelected</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaSetSize</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaSort</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaValueMax</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaValueMin</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaValueNow</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ariaValueText</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">assignedSlot</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">attributeStyleMap</span><span class="token operator">:</span> StylePropertyMap <span class="token punctuation">{</span><span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">}</span>
<span class="token literal-property property">attributes</span><span class="token operator">:</span> NamedNodeMap <span class="token punctuation">{</span><span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">}</span>
<span class="token literal-property property">autocapitalize</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">autofocus</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token literal-property property">baseURI</span><span class="token operator">:</span> <span class="token string">&quot;https://ustbhuangyi.github.io/vue-analysis/v2/data-driven/virtual-dom.html#%E6%80%BB%E7%BB%93&quot;</span>
<span class="token literal-property property">childElementCount</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">childNodes</span><span class="token operator">:</span> NodeList <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token literal-property property">children</span><span class="token operator">:</span> HTMLCollection <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token literal-property property">classList</span><span class="token operator">:</span> DOMTokenList <span class="token punctuation">[</span>value<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">]</span>
<span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">clientHeight</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">clientLeft</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">clientTop</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">clientWidth</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">contentEditable</span><span class="token operator">:</span> <span class="token string">&quot;inherit&quot;</span>
<span class="token literal-property property">dataset</span><span class="token operator">:</span> DOMStringMap <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token literal-property property">dir</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">draggable</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token literal-property property">elementTiming</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">enterKeyHint</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">firstChild</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">firstElementChild</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">hidden</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">inert</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token literal-property property">innerHTML</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">innerText</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">inputMode</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">isConnected</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token literal-property property">isContentEditable</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token literal-property property">lang</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">lastChild</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">lastElementChild</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">localName</span><span class="token operator">:</span> <span class="token string">&quot;div&quot;</span>
<span class="token literal-property property">namespaceURI</span><span class="token operator">:</span> <span class="token string">&quot;http://www.w3.org/1999/xhtml&quot;</span>
<span class="token literal-property property">nextElementSibling</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">nextSibling</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">nodeName</span><span class="token operator">:</span> <span class="token string">&quot;DIV&quot;</span>
<span class="token literal-property property">nodeType</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token literal-property property">nodeValue</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">nonce</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">offsetHeight</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">offsetLeft</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">offsetParent</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">offsetTop</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">offsetWidth</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">onabort</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onanimationend</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onanimationiteration</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onanimationstart</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onauxclick</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onbeforecopy</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onbeforecut</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onbeforematch</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onbeforepaste</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onbeforexrselect</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onblur</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oncancel</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oncanplay</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oncanplaythrough</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onchange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onclick</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onclose</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oncontextlost</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oncontextmenu</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oncontextrestored</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oncopy</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oncuechange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oncut</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ondblclick</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ondrag</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ondragend</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ondragenter</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ondragleave</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ondragover</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ondragstart</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ondrop</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ondurationchange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onemptied</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onended</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onerror</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onfocus</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onformdata</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onfullscreenchange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onfullscreenerror</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ongotpointercapture</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oninput</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">oninvalid</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onkeydown</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onkeypress</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onkeyup</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onload</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onloadeddata</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onloadedmetadata</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onloadstart</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onlostpointercapture</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onmousedown</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onmouseenter</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onmouseleave</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onmousemove</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onmouseout</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onmouseover</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onmouseup</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onmousewheel</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpaste</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpause</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onplay</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onplaying</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpointercancel</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpointerdown</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpointerenter</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpointerleave</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpointermove</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpointerout</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpointerover</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpointerrawupdate</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onpointerup</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onprogress</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onratechange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onreset</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onresize</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onscroll</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onsearch</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onsecuritypolicyviolation</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onseeked</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onseeking</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onselect</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onselectionchange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onselectstart</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onslotchange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onstalled</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onsubmit</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onsuspend</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ontimeupdate</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ontoggle</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ontransitioncancel</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ontransitionend</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ontransitionrun</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">ontransitionstart</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onvolumechange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onwaiting</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onwebkitanimationend</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onwebkitanimationiteration</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onwebkitanimationstart</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onwebkitfullscreenchange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onwebkitfullscreenerror</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onwebkittransitionend</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">onwheel</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">outerHTML</span><span class="token operator">:</span> <span class="token string">&quot;&lt;div&gt;&lt;/div&gt;&quot;</span>
<span class="token literal-property property">outerText</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">ownerDocument</span><span class="token operator">:</span> document
<span class="token literal-property property">parentElement</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">parentNode</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">part</span><span class="token operator">:</span> DOMTokenList <span class="token punctuation">[</span>value<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">]</span>
<span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">previousElementSibling</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">previousSibling</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">scrollHeight</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">scrollLeft</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">scrollTop</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">scrollWidth</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token literal-property property">shadowRoot</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">slot</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">spellcheck</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token literal-property property">style</span><span class="token operator">:</span> CSSStyleDeclaration <span class="token punctuation">{</span><span class="token literal-property property">accentColor</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">additiveSymbols</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">alignContent</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">alignItems</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">alignSelf</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> …<span class="token punctuation">}</span>
<span class="token literal-property property">tabIndex</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token literal-property property">tagName</span><span class="token operator">:</span> <span class="token string">&quot;DIV&quot;</span>
<span class="token literal-property property">textContent</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token literal-property property">translate</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token literal-property property">virtualKeyboardPolicy</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">[</span><span class="token punctuation">[</span>Prototype<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token operator">:</span> HTMLDivElement
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="虚拟dom" tabindex="-1"><a class="header-anchor" href="#虚拟dom" aria-hidden="true">#</a> 虚拟dom</h2><p>虚拟dom事实上就是使用一个对象去描述dom，操作js比直接操作dom的开销要小很多（更新dom会触发重绘or重排，vnode的概念就是减少更新频率）,在vue中是使用VNode的类去创建虚拟dom的</p><br>`,7),k=n(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">VNode</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> VNodeData <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">elm</span><span class="token operator">:</span> Node <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">ns</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// rendered in this component&#39;s scope</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string <span class="token operator">|</span> number <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">componentOptions</span><span class="token operator">:</span> VNodeComponentOptions <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">componentInstance</span><span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// component instance</span>
  <span class="token literal-property property">parent</span><span class="token operator">:</span> VNode <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// component placeholder node</span>

  <span class="token comment">// strictly internal</span>
  <span class="token literal-property property">raw</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// contains raw HTML? (server only)</span>
  <span class="token literal-property property">isStatic</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// hoisted static node</span>
  <span class="token literal-property property">isRootInsert</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// necessary for enter transition check</span>
  <span class="token literal-property property">isComment</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// empty comment placeholder?</span>
  <span class="token literal-property property">isCloned</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// is a cloned node?</span>
  <span class="token literal-property property">isOnce</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span> <span class="token comment">// is a v-once node?</span>
  <span class="token literal-property property">asyncFactory</span><span class="token operator">:</span> Function <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// async component factory function</span>
  <span class="token literal-property property">asyncMeta</span><span class="token operator">:</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">isAsyncPlaceholder</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
  <span class="token literal-property property">ssrContext</span><span class="token operator">:</span> Object <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token literal-property property">fnContext</span><span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token comment">// real context vm for functional nodes</span>
  <span class="token literal-property property">fnOptions</span><span class="token operator">:</span> <span class="token operator">?</span>ComponentOptions<span class="token punctuation">;</span> <span class="token comment">// for SSR caching</span>
  <span class="token literal-property property">devtoolsMeta</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">;</span> <span class="token comment">// used to store functional render context for devtools</span>
  <span class="token literal-property property">fnScopeId</span><span class="token operator">:</span> <span class="token operator">?</span>string<span class="token punctuation">;</span> <span class="token comment">// functional scope id support</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span>
    tag<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token comment">// 标签名</span>
    data<span class="token operator">?</span><span class="token operator">:</span> VNodeData<span class="token punctuation">,</span> <span class="token comment">// 标签属性</span>
    children<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Array<span class="token operator">&lt;</span>VNode<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token comment">// 子元素</span>
    text<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token comment">// 元素内文本</span>
    elm<span class="token operator">?</span><span class="token operator">:</span> Node<span class="token punctuation">,</span> <span class="token comment">// 元素</span>
    context<span class="token operator">?</span><span class="token operator">:</span> Component<span class="token punctuation">,</span> <span class="token comment">// 当前vue实例</span>
    componentOptions<span class="token operator">?</span><span class="token operator">:</span> VNodeComponentOptions<span class="token punctuation">,</span> <span class="token comment">// 当前vue实例配置</span>
    asyncFactory<span class="token operator">?</span><span class="token operator">:</span> Function
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tag <span class="token operator">=</span> tag
    <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data
    <span class="token keyword">this</span><span class="token punctuation">.</span>children <span class="token operator">=</span> children
    <span class="token keyword">this</span><span class="token punctuation">.</span>text <span class="token operator">=</span> text
    <span class="token keyword">this</span><span class="token punctuation">.</span>elm <span class="token operator">=</span> elm
    <span class="token keyword">this</span><span class="token punctuation">.</span>ns <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>context <span class="token operator">=</span> context
    <span class="token keyword">this</span><span class="token punctuation">.</span>fnContext <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>fnOptions <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>fnScopeId <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> data <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>key
    <span class="token keyword">this</span><span class="token punctuation">.</span>componentOptions <span class="token operator">=</span> componentOptions
    <span class="token keyword">this</span><span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>raw <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isStatic <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isRootInsert <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isComment <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isCloned <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isOnce <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>asyncFactory <span class="token operator">=</span> asyncFactory
    <span class="token keyword">this</span><span class="token punctuation">.</span>asyncMeta <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isAsyncPlaceholder <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// DEPRECATED: alias for componentInstance for backwards compat.</span>
  <span class="token comment">/* istanbul ignore next */</span>
  <span class="token keyword">get</span> <span class="token function">child</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>componentInstance
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事实上vue的虚拟dom是借鉴<a href="https://github.com/snabbdom/snabbdom" target="view_window">snabbdom</a>的，在这之上加了一些vue独有的属性，比如：<code>context</code>、<code>componentOptions</code></p><br>`,3);function d(u,y){const a=l("font");return e(),o("div",null,[i,t(a,{color:"#999"},{default:r(()=>[s("文件路径: vue/src/core/vdom/vnode.js")]),_:1}),k,s(" 虚拟dom操作无非就是创建（create），对比（diff），更新（patch）")])}const b=p(c,[["render",d],["__file","5.VNode.html.vue"]]);export{b as default};
