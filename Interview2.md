### XmlHttpRequest 是什么？怎么完整执行一次 get 请求？怎么检测错误？

https://segmentfault.com/a/1190000004322487
用于在后台与服务器交换数据。对象事件: readyState 的值的改变会触发 readyStatechange 事件;错误会触发 error 事件；优缺点: 在不重新加载页面的情况下更新网页;
使用 xmlHttpRequest 可以用来传 Formdata（新增 formData 对象，支持发送表单数据；）类型的数据。
xhr.send()可以传的参数类型：ArrayBuffer，Blob，Document，DOMString，FormData，null;

### 严格模式与混杂模式，doctype ,区分他们有何意义？

Doctype：(Document Type)文档类型，既然它是一种声明，它的责任就是告诉浏览器文档使用哪种 html 或者 xhtml 规范/。
xhtml 1.0 中有 3 种 dtd 声明可以选择，过渡性的(Transitional)、严格的(Strict)、框架的(Frameset)。下面我们来分别介绍：不同文档模式主要影响 CSS 内容的呈现，尤其是浏览器对盒模型的解析，但在某些情况下也会影响到 JavaScript 的解释执行。

2、两种模式间的差异

对于这两种模式之间的差异，最显著的一个例子与 Windows 上 IE 专有的盒模型有关。在 IE 6 出现时，在标准模式中使用的是正确的盒模型，在混杂模式中使用的则是老式的专有盒模型。为了维持对 IE 5 和更低版本的向后兼容性，Opera 7 和更高版本也在混杂模式中使用有缺点的 IE 盒模型。呈现方面的其他差异比较小，而且是与特定浏览器相关的，包括对于十六进制颜色值不需要#号、假设 CSS 中没有指定单位的长度的单位是像素，以及在使用关键字时将字号增加一级。

### json 是什么 该怎么使用，为什么使用？说出实现细节？

1. 是一种用于数据交换的轻量级格式。
2. （1）JSON 数据格式在前后端都能够被很好的支持。现在想想其实应该是后台有提供相应的 jar 包处理 JSON 格式，而前端 JSON 则是被原生 JavaScript 支持，不需要任何其他的辅助就可以解析。（2） JSON 数据格式的体量相对小，其实这个很好理解。对比其他的数据格式，比如说 xml 或者 html，都需要其他额外的标签，而 JSON 不需要，直接就是数据本身，所以说使用 JSON 作为传输体量相对小。（
   3） 第三点理由其实在第一点有提及到一点，主要是因为 JavaScript 对于 JSON 的支持，如果使用 xml 格式，还需要额外进行解析。
3. 使用 JavaScript 对 xml 数据格式进行解析；--》 DOMParser，domParser.parseFromString();ActiveXObject
   (1),创建 xmlDoc 对象，；（2）解析 xmlDoc 对象 xmlDoc = domParser.parseFromString(xmlString, "text/xml");

### 1、谈谈你对 Ajax 的理解？(概念、特点、作用)

AJAX 全称为“Asynchronous JavaScript And XML”（异步 JavaScript 和 XML） 是指一种创建交互式网页应用的开发技术、改善用户体验，实现无刷新效果。

### 2、说说你对延迟对象 deferred 的理解?

deferred 对象是从 jQuery 1.5.0 版本开始引入的一个新功能。
a、什么是 deferred 对象开发网站的过程中，我们经常遇到某些耗时很长的 javascript 操作。其中，既有异步的操作（比如 ajax 读取服务器数据），也有同步的操作（比如遍历一个大型数组），它们都不是立即能得到结果的。通常的做法是，为它们指定回调函数（callback）。即事先规定，一旦它们运行结束，应该调用哪些函数。但是，在回调函数方面，jQuery 的功能非常弱。为了改变这一点，jQuery 开发团队就设计了 deferred 对象。简单说，deferred 对象就是 jQuery 的回调函数解决方案。在英语中，defer 的意思是”延迟”，所以 deferred 对象的含义就是”延迟”到未来某个点再执行。它解决了如何处理耗时操作的问题，对那些操作提供了更好的控制，以及统一的编程接口。

b、它的主要功能，可以归结为四点：
(1)、实现链式操作
(2)、指定同一操作的多个回调函数
(3)、为多个操作指定回调函数
(4)、普通操作的回调函数接口

### 4、为什么要使用模板引擎？

a、模板引擎（这里特指用于 Web 开发的模板引擎）是为了使**用户界面与业务数据**（内容）分离而产生的，它可以生成特定格式的文档，用于网站的模板引擎就会生成一个标准的 HTML 文档。
b、在一些示例中 javascript 有大量的 html 字符串，html 中有一些像 onclick 样的 javascript，这样 javascript 中有 html，html 中有 javascript，代码的偶合度很高，不便于修改与维护，使用模板引擎可以解决问题。

### 5、JavaScript 是一门什么样的语言，它有哪些特点？

JavaScript 是一种脚本语言，官方名称为 ECMAScript（因定义语言的标准为 ECMA-262）。
JS 的主要特点：
a、语法类似于常见的高级语言，如 C 和 Java；
b、脚本语言，不需要编译就可以由解释器直接运行；
c、 变量松散定义，属于弱类型语言；
d、面向对象的。
JS 最初是为网页设计而开发的，现在也是 Web 开发的重要语言。它支持对浏览器（浏览器对象模型，BOM）和 HTML 文档（文档对象模型，DOM）进行操作而使网页呈现动态的交互特性。严格的说，JS 只是 ECMAScript 的一种实现，是 ECMAScript 和 BOM、DOM 组成的一种 Web 开发技术。

### 6、JavaScript 的数据类型有哪些？

基本数据类型：字符串 String、数字 Number、布尔 Boolean
复合数据类型：数组 Array、对象 Object
特殊数据类型：Null 空对象、Undefined 未定义

### 8、根据你的理解,请简述 JavaScript 脚本的执行原理?

JavaScript 是一种动态、弱类型、基于原型的语言，通过浏览器可以直接执行。当浏览器遇到\<script> 标记的时候，浏览器会执行之间的 javascript 代码。嵌入的 js 代码是顺序执行的，每个脚本定义的全局变量和函数，都可以被后面执行的脚本所调用。 变量的调用，必须是前面已经声明，否则获取的变量值是 undefined。

### 12、谈谈你对闭包的理解?

(1)、使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。
(2)、闭包有三个特性：
a、函数嵌套函数
b、函数内部可以引用外部的参数和变量
c、参数和变量不会被垃圾回收机制回收

### 13、谈谈你 This 对象的理解?

回答一：
(1)、js 的 this 指向是不确定的，也就是说是可以动态改变的。call/apply 就是用于改变 this 指向的函数，这样设计可以让代码更加灵活，复用性更高
(2)、this 一般情况下，都是指向函数的拥有者。
(3)、在函数自执行里，this 指向的是 window 对象。setTimeout
(4)，自定义 call,apply()
扩展：关于 this，还有一个地方比较让人模糊的是在 dom 事件里，通常有如下 3 种情况：
a、使用标签属性注册事件，此时 this 指向的是 window 对象。
b、对与 a，要让 this 指向 input，可以将 this 作为参数传递。
c、使用 addEventListener 等注册事件。此时 this 也是指向 input。

### 14、JavaScript 对象的几种创建方式?

1. 工厂模式
2. 构造函数方式；
3. 原型模式
4. 混合的构造函数，原型方式（推荐）

### (1)、get 是从服务器上获取数据，post 是向服务器传送数据。 get 请求返回 request - URI 所指出的任意信息。

Post 请求用来发送电子邮件、新闻或发送能由交互用户填写的表格。这是唯一需要在请求中发送 body 的请求。使用 Post 请求时需要在报文首部 Content - Length 字段中指出 body 的长度。
(2)、get 是把参数数据队列加到提交表单的 ACTION 属性所指的 URL 中，值和表单内各个字段一一对应，在 URL 中可以看到。post 是通过 HTTP post 机制，将表单内各个字段与其内容放置在 HTML HEADER 内一起传送到 ACTION 属性所指的 URL 地址，用户看不到这个过程。
(3)、对于 get 方式，服务器端用 Request.QueryString 获取变量的值，对于 post 方式，服务器端用 Request.Form 获取提交的数据。
(4)、get 传送的数据量较小，不能大于 2KB。post 传送的数据量较大，一般被默认为不受限制。但理论上，IIS4 中最大量为 80KB，IIS5 中为 100KB。 用 IIS 过滤器的只接受 get 参数，所以一般大型搜索引擎都是用 get 方式。
(5)get 安全性非常低，post 安全性相对较高。如果这些数据是中文数据而且是非敏感数据，那么使用 get；如果用户输入的数据不是中文字符而且包含敏感数据，那么还是使用 post 为好。

### 16、null 和 undefined 的区别？

(1)、null 是一个表示”无”的对象，转为数值时为 0；undefined 是一个表示”无”的原始值，转为数值时为 NaN。当声明的变量还未被初始化时，变量的默认值为 undefined。
(2)、null 用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。
(3)、undefined 表示”缺少值”，就是此处应该有一个值，但是还没有定义。典型用法是：
a、变量被声明了，但没有赋值时，就等于 undefined。
b、调用函数时，应该提供的参数没有提供，该参数等于 undefined。
c、对象没有赋值的属性，该属性的值为 undefined。
d、函数没有返回值时，默认返回 undefined。
(4)、null 表示”没有对象”，即该处不应该有值。典型用法是：
a、作为函数的参数，表示该函数的参数不是对象。
b、作为对象原型链的终点。

### 17、请写出 js 内存泄漏的问题?

回答一：
(1)、IE7/8 DOM 对象或者 ActiveX 对象循环引用导致内存泄漏
a、多个对象循环引用
b、循环引用自己
(2)、基础的 DOM 泄漏当原有的 DOM 被移除时，子结点引用没有被移除则无法回收。
(3)、timer 定时器泄漏这个时候你无法回收 buggyObject,解决办法，先停止 timer 然后再回收

回答二：内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。
setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）也会引发内存泄漏问题。

### 18、哪些地方会出现 css 阻塞，哪些地方会出现 js 阻塞？

js 的阻塞特性：所有浏览器在下载 JS 的时候，会阻止一切其他活动，比如其他资源的下载，内容的呈现等等。直到 JS 下载、解析、执行完毕后才开始继续并行下载其他资源并呈现内容。为了提高用户体验，新一代浏览器都支持并行下载 JS，但是 JS 下载仍然会阻塞其它资源的下载（例如.图片，css 文件等）。由于浏览器为了防止出现 JS 修改 DOM 树，需要重新构建 DOM 树的情况，所以就会阻塞其他的下载和呈现。嵌入 JS 会阻塞所有内容的呈现，而外部 JS 只会阻塞其后内容的显示，2 种方式都会阻塞其后资源的下载。也就是说外部样式不会阻塞外部脚本的加载，但会阻塞外部脚本的执行。

CSS 怎么会阻塞加载？
CSS 本来是可以并行下载的，在什么情况下会出现阻塞加载了(在测试观察中，IE6 下 CSS 都是阻塞加载）当 CSS 后面跟着嵌入的 JS 的时候，该 CSS 就会出现阻塞后面资源下载的情况。而当把嵌入 JS 放到 CSS 前面，就不会出现阻塞的情况了。根本原因：因为浏览器会维持 html 中 css 和 js 的顺序，样式表必须在嵌入的 JS 执行前先加载、解析完。而嵌入的 JS 会阻塞后面的资源加载，所以就会出现上面 CSS 阻塞下载的情况。

JS 应该放在什么位置？
(1)、放在底部，虽然放在底部照样会阻塞所有呈现，但不会阻塞资源下载。
(2)、如果嵌入 JS 放在 head 中，请把嵌入 JS 放在 CSS 头部。
(3)、使用 defer（只支持 IE）
(4)、不要在嵌入的 JS 中调用运行时间较长的函数，如果一定要用，可以用 setTimeout 来调用

Javascript 无阻塞加载具体方式将脚本放在底部。\还是放在 head 中，用以保证在 js 加载前，能加载出正常显示的页面。\<script>标签放在\前。成组脚本：由于每个\<script>标签下载时阻塞页面解析过程，所以限制页面的\<script>总数也可以改善性能。适用于内联脚本和外部脚本。非阻塞脚本：等页面完成加载后，再加载 js 代码。也就是，在 window.onload 事件发出后开始下载代码。（1）defer 属性：支持 IE4 和 fierfox3.5 更高版本浏览器（2）动态脚本元素：文档对象模型（DOM）允许你使用 js 动态创建 HTML 的几乎全部文档内容。代码如下：

```
<script>

var script=document.createElement("script");

script.type="text/javascript";

script.src="file.js";

document.getElementsByTagName("head")[0].appendChild(script);

</script>
```

此技术的重点在于：无论在何处启动下载，文件额下载和运行都不会阻塞其他页面处理过程。即使在 head 里（除了用于下载文件的 http 链接）。

### 22、说说你对 Promise 的理解?

ES6 原生提供了 Promise 对象。所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。
Promise 对象有以下两个特点。
(1)、对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。
(2)、一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

### 23、谈谈你对 Javascript 垃圾回收机制的理解？

(1)、标记清除（mark and sweep）这是 JavaScript 最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”。垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了

(2)、引用计数(reference counting)
在低版本 IE 中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加 1，如果该变量的值变成了另外一个，则这个值得引用次数减 1，当这个值的引用次数变为 0 的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的空间。在 IE 中虽然 JavaScript 对象通过标记清除的方式进行垃圾回收，但 BOM 与 DOM 对象却是通过引用计数回收垃圾的，也就是说只要涉及 BOM 及 DOM 就会出现循环引用问题。

### 24、说说你对原型（prototype）理解?

JavaScript 是一种通过原型实现继承的语言与别的高级语言是有区别的，像 java，C#是通过类型决定继承关系的，JavaScript 是的动态的弱类型语言，总之可以认为 JavaScript 中所有都是对象，在 JavaScript 中，原型也是一个对象，通过原型可以实现对象的属性继承，JavaScript 的对象中都包含了一个” prototype”内部属性，这个属性所对应的就是该对象的原型。

“prototype”作为对象的内部属性，是不能被直接访问的。所以为了方便查看一个对象的原型，Firefox 和 Chrome 内核的 JavaScript 引擎中提供了”proto“这个非标准的访问器（ECMA 新标准中引入了标准对象原型访问器”Object.getPrototype(object)”）。

原型的主要作用就是为了实现继承与扩展对象。

### 25、typeof 与 instanceof 的区别是什么？

在 JavaScript 中，判断一个变量的类型可以用 typeof
(1)、数字类型， typeof 返回的值是 number。比如说：typeof(1)，返回值是 number
(2)、字符串类型， typeof 返回的值是 string。比如 typeof(“123”)返回值是 string。
(3)、布尔类型， typeof 返回的值是 boolean 。比如 typeof(true)返回值是 boolean。
(4)、对象、数组、null 返回的值是 object 。比如 typeof(window)，typeof(document)，typeof(null)返回的值都是 object。
(5)、函数类型，返回的值是 function。比如：typeof(eval)，typeof(Date)返回的值都是 function。
(6)、不存在的变量、函数或者 undefined，将返回 undefined。比如：typeof(abc)、typeof(undefined)都返回 undefined。

在 JavaScript 中,instanceof 用于判断某个对象是否被另一个函数构造。使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 “object”。ECMAScript 引入了另一个 Java 运算符 instanceof 来解决这个问题。instanceof 运算符与 typeof 运算符相似，用于识别正在处理的对象的类型。与 typeof 方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型。

### 26、说说你对 node.js 的理解

a、Node.js 是一个基于 Google Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。Node.js 的包管理器 npm，是全球最大的开源库生态系统。
b、能方便地搭建响应速度快、易于扩展的网络应用，Node.js 使用事件驱动， 非阻塞 I/O 模型而得以轻量和高效，非常适合在分布式设备上运行的数据密集型的实时应用。
c、简单说 Node.js 就是运行在服务器端的 JavaScript，是现在流行的语言中能同时运行在前端与后台的程序语言

### 27、NPM(包管理器)作用是什么?

NPM 是随同 NodeJS 一起安装的包管理工具，能解决 NodeJS 代码部署上的很多问题，常见的使用场景有以下几种：
a、允许用户从 NPM 服务器下载别人编写的第三方包到本地使用。
b、允许用户从 NPM 服务器下载并安装别人编写的命令行程序到本地使用。
c、允许用户将自己编写的包或命令行程序上传到 NPM 服务器供别人使用。

### react 防 XSS 攻击。

1. 所有的用户输入都需要经过 HTML 实体编码，这里 React 已经帮我们做了很多，它会在运行时动态创建 DOM 节点然后填入文本内容（你也可以强制设置 HTML 内容，不过这样比较危险）

2. 当你打算序列化某些状态并且传给客户端的时候，你同样需要进行 HTML 实体编码

（1）. 防范 XSS 攻击； 1.还是将前端输出数据都进行转义最为稳妥（2），保护 cookie 设置 http-only
(3),CSRF 攻击，跨站伪造攻击。主要是针对 post 提交，我们平时开发要注意些什么？

1. 开发时要提防用户产生的内容，要对用户输入的信息进行层层检测

2. 要注意对用户的输出内容进行过滤(进行转义等)

3. 重要的内容记得要加密传输(无论是利用 https 也好，自己加密也好)

4. get 请求与 post 请求，要严格遵守规范，不要混用，不要将一些危险的提交使用 jsonp 完成。

5. 对于 URL 上携带的信息，要谨慎使用。

### 4.浏览器本地存储中 cookie 和 localStorage 有什么区别？ localStorage 如何存储删除数据。

cookie :最大 4k,过期时间之前有效。在服务端与客户端来回传递，
localStorage:5M，持久数据。不传到服务端，
sessionStorage:5M,当前会话有效。
localStorage 提供了几个方法: 1.存储:localStorage.setItem(key,value)如果 key 存在时，更新 value 2.获取 localStorage.getItem(key)如果 key 不存在返回 null 3.删除 localStorage.removeItem(key)一旦删除，key 对应的数据将会全部删除 4.全部清除 localStorage.clear() 使用 removeItem 逐个删除太麻烦，可以使用 clear,

需要注意的是，不是什么数据都适合放在 Cookie、localStorage 和 sessionStorage 中的。使用它们的时候，需要时刻注意是否有代码存在 XSS 注入的风险。因为只要打开控制台，你就随意修改它们的值，也就是说如果你的网站中有 XSS 的风险，它们就能对你的 localStorage 肆意妄为。所以千万不要用它们存储你系统中的敏感数据。

### object.create(prop),object.assign(target,props)

1. Object.assign(target, ...sources) 1.不算是深拷贝，对嵌套对象不能做到深拷贝。
2. 因为 assign 复制的事属性名，所以会产生覆盖和数据合并。可以复制 Symbol 类型数据,null，undefiend 会被忽略
3. 继承属性和不可枚举属性是不能拷贝的

### object.create(proptype)；

第一个属性是继承属性

### 防抖 节流

针对多次触发 resize 和 scroll 事件执行函数

1. 防抖：防抖技术即是可以把多个顺序地调用合并成一次，也就是在一定时间内，规定事件被触发的次数。

```
function debounce(func, wait, immediate) {
    // 定时器变量
    var timeout;
    return function() {
        // 每次触发 scroll handler 时先清除定时器
        clearTimeout(timeout);
        // 指定 xx ms 后触发真正想进行的操作 handler
        timeout = setTimeout(func, wait);
    };
};

// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}

// 采用了防抖动
window.addEventListener('scroll',debounce(realFunc,500));
// 没采用防抖动
window.addEventListener('scroll',realFunc);
```

2. 节流：与防抖相比，节流函数最主要的不同在于它保证在 X 毫秒内至少执行一次我们希望触发的事件 handler

```
function throttle(func, wait, mustRun) {
    var timeout,
        startTime = new Date();

    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= mustRun){
            func.apply(context,args);
            startTime = curTime;
        // 没达到触发间隔，重新设定定时器
        }else{
            timeout = setTimeout(func, wait);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}
// 采用了节流函数
window.addEventListener('scroll',throttle(realFunc,500,1000));
```

### 懒加载

当访问一个页面时，先把 img 元素或者其他元素的路径换成一个大小为 1px 的占位图片。只有图片出现在可是区域后，才设置图片真正的路径。

1. 原理懒加载的原理就是先在页面中把所有的图片统一使用一张占位图进行占位，把正真的路径存在元素的“data-url”（自定义属性）属性里，当图片出现在可视区域内时，就取出来，再设置；

```
function isVisible($node){
    var winH = $(window).height(),
        scrollTop = $(window).scrollTop(),
        offSetTop = $(window).offSet().top;
    if (offSetTop < winH + scrollTop) {
        return true;
    } else {
        return false;
    }
}
```

### 预加载

提前加载图片，当用户需要查看时可直接从**本地缓存**中渲染

#### 实现

1.方法一：用 CSS 和 JavaScript 实现预加载
background:url(./png)

2. 方法二：用 javascript 实现
   image = new Image()
   image.src='./aaa'
3. 用 ajax
   var xhr = new XMLHttpRequest();  
    xhr.open('GET', 'http://domain.tld/preload.js');  
    xhr.send('');

2)区别：两种技术的本质：两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。 3)懒加载的意义及实现方式有：意义：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数。实现方式： 1.第一种是纯粹的延迟加载，使用 setTimeOut 或 setInterval 进行加载延迟. 2.第二种是条件加载，符合某些条件，或触发了某些事件才开始异步下载。 3.第三种是可视区加载，即仅加载用户可以看到的区域，这个主要由监控滚动条来实现，一般会在距用户看到某图片前一定距离遍开始加载，这样能保证用户拉下时正好能看到图片。

4)预加载的意义及实现方式有：意义:
预加载可以说是牺牲服务器前端性能，换取更好的用户体验，这样可以使用户的操作得到最快的反映。实现方式：实现预载的方法非常多，比如：用 CSS 和 JavaScript 实现预加载；仅使用 JavaScript 实现预加载；使用 Ajax 实现预加载。常用的是 new Image();设置其 src 来实现预载，再使用 onload 方法回调预载完成事件。只要浏览器把图片下载到本地，同样的 src 就会使用缓存，这是最基本也是最实用的预载方法。当 Image 下载完图片头后，会得到宽和高，因此可以在预载前得到图片的大小(方法是用记时器轮循宽高变化)。

### 瀑布流布局

1. 固定列宽的多列布局。
   float:left
2. css3 多列布局
   column-count column-gap
3. 绝对定位方式
4. 流体布局
    ### 12 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

答案解析：

行内元素：a  b i br sub sup  span  img  input  select  strong button, input, label, select, textarea

块级元素：div  ul  ol  li    dt  dd  h1  h2  h3  h4  p form pre video 等

空元素：<br>  <hr>  <img>  <link> <meta>

### 简述一下 src 与 href 的区别

答案解析：

href 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。

src 是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片和 frame 等元素。

当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 js 脚本放在底部而不是头部。
