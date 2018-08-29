## 引擎

http://web.jobbole.com/84351/
唯一的目的就是读取和编译 JavaScript 代码。

### jsvu 是一个引擎版本管理器，与 eshost-cli 配合使用。

注意：要区别在浏览器中排布页面布局的 布局引擎 和解释和执行代码的底层 JavaScript 引擎是非常重要的。在 这里 可以找到一个很好的阐释。

JavaScript 引擎的基本工作是把开发人员写的 JavaScript 代码转换成高效、优化的代码，这样就可以通过浏览器进行解释甚至嵌入到应用中。事实上，JavaScriptCore 自称为“优化虚拟机”。

### 各大浏览器 内核引擎

| Browser, Headless Browser, or Runtime | JavaScript Engine |
| ------------------------------------- | ----------------- |
| Mozilla                               | Spidermonkey      |
| Chrome                                | V8                |
| Safari                                | JavaScriptCore    |
| IE and Edge                           | Chakra            |
| PhantomJS                             | JavaScriptCore    |
| HTMLUnit                              | Rhino             |
| TrifleJS                              | V8                |
| Node.js                               | V8                |
| Io.js\*                               | V8                |

webkit 内核 ： Safari，Chrome
gecko 内核： firefox
Trident: Ie

webkit:1,webCore(包括了 CSS, DOM, Render 等的实现),javascriptCore(),Webkit(不同平台对 Webkit 封装的实现，即抽象出了与浏览器所能直接对应的一些概念的实现，如，WebView,WebPage, WebFrame 等)

### 运行时（nodejs） headless 浏览器、

headless 浏览器:无界面浏览器

### js 的编译过程和运行机制

https://my.oschina.net/ffwcn/blog/209465
1, js 编译：词法分析--》 语法分析---》得到语法树 ---》最后 解释执行
当 JavaScript 引擎解析脚本时，它会在预编译期对所有声明的变量和函数进行处理！并且是先预声明变量，再预定义函数！
2, 执行： 在解释过程中，JavaScript 引擎是严格按着作用域机制（scope）来执行的。JavaScript 语法采用的是词法作用域 （lexcical scope），也就是说 JavaScript 的变量和函数作用域是在定义时决定的，而不是执行时决定的，由于词法作用域取决于源代码结构，所以 JavaScript 解释器只需要通过静态分析就能确定每个变量、函数的作用域，这种作用域也称为静态作用域（static scope）

## 不同的代码解析和执行过程

## JS 的运作机制可以分为 AST 分析、引擎执行两个步骤：
