# 面试题

## 0. 谈谈对前端安全的理解，有什么，怎么防范

前端安全问题主要有 XSS、CSRF 攻击 XSS：跨站脚本攻击它允许用户将恶意代码植入到提供给其他用户使用的页面中，可以简单的理解为一种 javascript 代码注入。 XSS 的防御措施：

1 、过滤转义输入输出 2、避免使用 eval、new Function 等执行字符串的方法，除非确定字符串和用户输入无关 3、使用 cookie 的 httpOnly 属性，加上了这个属性的 cookie 字段，js 是无法进行读写的 4、使用 innerHTML、document.write 的时候，如果数据是用户输入的，那么需要对象关键字符进行过滤与转义

CSRF：跨站请求伪造其实就是网站中的一些提交行为，被黑客利用，在你访问黑客的网站的时候进行操作，会被操作到其他网站上 CSRF 防御措施：

1 、检测 http referer 是否是同域名 2、避免登录的 session 长时间存储在客户端中
3、关键请求使用验证码或者 token 机制其他的一些攻击方法还有 HTTP 劫持、界面操作劫持

1. 使用箭头函数需要注意的地方当要求动态上下文的时候，你就不能使用箭头函数，比如：定义方法，用构造器创建对象，处理时间时用 this 获取目标。

2.webpack.load 的原理 loaders 是你用在 app 源码上的转换元件。他们是用 node.js 运行的，把源文件作为参数，返回新的资源的函数。

3.ES6 let 、 const

let let 是更完美的 var

let 声明的变量拥有块级作用域 ,let 声明仍然保留了提升的特性，但不会盲目提升。 let
声明的全局变量不是全局对象的属性。不可以通过 window. 变量名的方式访问形如 for
(let x…) 的循环在每次迭代时都为 x 创建新的绑定 let 声明的变量直到控制流到达该变量被定义的代码行时才会被装载，所以在到达之前使用该变量会触发错误。

const 定义常量值，不可以重新赋值，但是如果值是一个对象，可以改变对象里的属性值

const OBJ = {"a":1, "b":2}; OBJ.a = 3; OBJ = {};// 重新赋值，报错！
console.log(OBJ.a); // 3

4.CSS3 box-sizing 的作用设置 CSS 盒模型为标准模型或 IE 模型。标准模型的宽度只包括 content，二 IE 模型包括 border 和 padding

box-sizing 属性可以为三个值之一：

1 、 content-box，默认值，border 和 padding 不计算入 width 之内 2、padding-box
， padding 计算入 width 内 3、border-box ， border 和 padding 计算入 width 之内

5. 说说 HTML5 中有趣的标签（新标签及语义化）如果代码写的语义化，有利于 SEO。搜索引擎就会很容易的读懂该网页要表达的意思。例如文本模块要有大标题，合理利用
   h1-h6，列表形式的代码使用 ul 或 ol，重要的文字使用 strong 等等。总之就是要充分利用各种 HTML 标签完成他们本职的工作

6.git 命令，如何批量删除分支 git branch |grep 'branchName' |xargs git branch -D,
从分支列表中匹配到指定分支，然后一个一个 ( 分成小块 ) 传递给删除分支的命令，最后进行删除。( 参考这里 )

7. 创建对象的三种方法第一种方式，字面量 var o1 = {name: "o1"} var o2 = new
   Object({name: "o2"})

第二种方式，通过构造函数 var M = function(name){ this.name = name } var o3 = new
M("o3")

第三种方式，Object.create var p = {name: "p"} var o4 = Object.create(p)

新创建的对 o4 的原型就是 p，同时 o4 也拥有了属性 name

8.JS 实现继承的几种方式

借用构造函数实现继承 function Parent1(){ this.name = "parent1" } function
Child1(){ Parent1.call(this); this.type = "child1"; } 缺点：Child1 无法继承
Parent1 的原型对象，并没有真正的实现继承（部分继承）

借用原型链实现继承 function Parent2(){ this.name = "parent2"; this.play =
[1,2,3]; } function Child2(){ this.type = "child2"; } Child2.prototype = new
Parent2(); 缺点：原型对象的属性是共享的

组合式继承 function Parent3(){ this.name = "parent3"; this.play = [1,2,3]; }
function Child3(){ Parent3.call(this); this.type = "child3"; } Child3.prototype
= Object.create(Parent3.prototype); Child3.prototype.constructor = Child3;

9. 当 new Foo() 时发生了什么 1. 创建了一个新对象 2. 将 this 指向这个新对象 3. 执行构造函数里面的代码 4. 返回新对象（this ）参考《JS 高程》6.6.2

10. 你做过哪些性能优化雪碧图，移动端响应式图片，静态资源 CDN，减少 Dom 操作（事件代理、fragment ），压缩 JS 和 CSS、HTML 等，DNS 预解析

11. 浏览器渲染原理

首先来看一张图：

HTML 被解析成 DOM Tree，CSS 被解析成 CSS Rule Tree 把 DOM Tree 和 CSS Rule Tree
经过整合生成 Render Tree（布局阶段）元素按照算出来的规则，把元素放到它该出现的位置，通过显卡画到屏幕上

12. 前端路由的原理什么是路由？简单的说，路由是根据不同的 url 地址展示不同的内容或页面

使用场景？前端路由更多用在单页应用上 , 也就是 SPA, 因为单页应用 , 基本上都是前后端分离的 , 后端自然也就不会给前端提供路由。

前端的路由和后端的路由在实现技术上不一样，但是原理都是一样的。在 HTML5 的
history API 出现之前，前端的路由都是通过 hash 来实现的，hash 能兼容低版本的浏览器。

两种实现前端路由的方式 HTML5 History 两个新增的 API：history.pushState 和
history.replaceState，两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。

Hash 就是 url 中看到 # , 我们需要一个根据监听哈希变化触发的事件 ( hashchange) 事件。我们用 window.location 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容。

优点从性能和用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升。

缺点使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存。

13.Restful API 是什么 1、Restful 的意思就是表现层状态转化。 2 、 " 表现层 " 其实指的是 " 资源 "（Resources ）的 " 表现层 "，把 " 资源 " 具体呈现出来的形式，叫做它的 " 表现层 "（Representation ）。 3 、所谓 " 资源 "，就是网络上的一个实体，或者说是网络上的一个具体信息。它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在，每一个 URI 代表一种资源。 4 、如果客户端想要操作服务器，必须通过某种手段，让服务器端发生 " 状态转化 "（State Transfer ）。而这种转化是建立在表现层之上的，所以就是 " 表现层状态转化 "。 5 、 Restful 就是客户端和服务器之间，传递这种资源的某种表现层 6、客户端通过四个 HTTP 动词，对服务器端资源进行操作，实现 " 表现层状态转化 " Restful API 就是符合 Restful 架构的 API 设计。

Restful API 一些具体实践：

1 、应该尽量将 API 部署在专用域名之下。如果确定 API 很简单，不会有进一步扩展，可以考虑放在主域名下。 2 、应该将 API 的版本号放入 URL。 3 、对于资源的具体操作类型，由 HTTP 动词表示 4、如果记录数量很多，服务器不可能都将它们返回给用户。API 应该提供参数，过滤返回结果 5、如果状态码是 4xx，就应该向用户返回出错信息。一般来说，返回的信息中将 error 作为键名 .....

14.script 标签的 defer、async 的区别 defer 是在 HTML 解析完之后才会执行，如果是多个，按照加载的顺序依次执行 async 是在加载完成后立即执行，如果是多个，执行顺序和加载顺序无关

15. 同源与跨域

什么是同源策略？限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。一个源指的是主机名、协议和端口号的组合，必须相同

跨域通信的几种方式 JSONP Hash postMessage WebSocket CORS

JSONP 原理基本原理：利用 script 标签的异步加载特性实现给服务端传一个回调函数，服务器返回一个传递过去的回调函数名称的 JS 代码

更多请查看：《前后端通信类知识》

16. 原型与闭包相关问题原型是什么原型就是一个普通的对象，每个对象都有一个原型（Object 除外），原型能存储我们的方法，构造函数创建出来的实例对象能够引用原型中的方法。查看原型以前一般使用对象的**proto**属性，ES6 推出后，推荐用
    Object.getPrototypeOf() 方法来获取对象的原型

闭包是什么？专业说法：当一个内部函数被其外部函数之外的变量引用时，就形成了一个闭包。

还可以这么理解：闭包就是一个具有封闭功能与包裹功能的结构，是为了实现具有私有访问空间的函数的，函数可以构成闭包，因为函数内部定义的数据函数外部无法访问，即函数具有封闭性；函数可以封装代码即具有包裹性，所以函数可以构成闭包。创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量

闭包的特性闭包有三个特性：

1 、函数嵌套函数 2、函数内部可以引用外部的参数和变量 3、参数和变量不会被垃圾回收机制回收

闭包有什么用，使用场景当我们需要在模块中定义一些变量，并希望这些变量一直保存在内存中但又不会 “ 污染 ” 全局的变量时，就可以用闭包来定义这个模块。

闭包的缺点闭包的缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

函数套函数就是闭包吗？不是！，当一个内部函数被其外部函数之外的变量引用时，才会形成了一个闭包。

17. 如何进行错误监控前端错误的分类即时运行错误（代码错误）资源加载错误

错误的捕获方式即时运行错误的捕获方式： 1 、 try...catch 2、window.onerror

资源加载错误： 1 、 object.onerror（如 img,script） 2 、
performance.getEntries() 3、Error 事件捕获

延伸：跨域的 js 运行错误可以捕获吗，错误提示什么，应该怎么处理？可以。 Script
error 1. 在 script 标签增加 crossorigin 属性

2. 设置 js 资源响应头 Access-Control-Allow-Orgin:\* 上报错误的基本原理采用 Ajax
   通信方式上报利用 Image 对象上报

   18.DOM 事件类 DOM 事件的级别 DOM0，element.onclick = function(){} DOM2 ，
   element.addEventListener('click', function(){}, false);

DOM 事件模型是什么：指的是冒泡和捕获 DOM 事件流是什么：捕获阶段 -> 目标阶段 ->
冒泡阶段描述 DOM 事件捕获的具体流程 window --> document --> documentElement(html
标签 ) --> body --> .... --> 目标对象

Event 对象常见应用

1、event.preventDefault() ，阻止默认行为 2、event.stopPropagation() ，阻止事件冒泡 3、event.stopImmediatePropagation() ，阻止剩余的事件处理函数执行并且防止事件冒泡到 DOM 树上，这个方法不接受任何参数。 4 、 event.currentTarget，返回绑定事件的元素 5、event.target ，返回触发事件的元素

如何自定义事件 Event，不能传递参数 var eve = new Event(' 自定义事件名 ');
ev.addEventListener(' 自定义事件名 ', function(){ console.log(' 自定义事件 ')
}); ev.dispatchEvent(eve); CustomEvent，还可以指定参数

19. 本地起了一个 http server，为什么只能在同一个 WIFI( 局域网 ) 上访问？你没有公网 IP 当然就不能被外网访问了。常见的 WIFI 情况下，一般的 ip 会是
    ~192.168.0.x· 这样的，只是对局域网 ( 同 WIFI 下 ) 可见，但是外网是访问不了的。（ segmentfault 上的答案）

20. 回流和重绘参考：《如何写出高性能 DOM？》

21. 数组去重的方法参考：《 JavaScript 数组去重》

22. 深拷贝与浅拷贝是什么浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

实现浅拷贝 var obj1 = { a: 10, b: 20, c: 30 }; var obj2 = obj1; obj2.b = 100;
console.log(obj1); // { a: 10, b: 100, c: 30 } <-- b 被改到了 console.log(obj2);
// { a: 10, b: 100, c: 30 }

实现深拷贝 var obj1 = { a: 10, b: 20, c: 30 }; var obj2 = { a: obj1.a, b:
obj1.b, c: obj1.c }; obj2.b = 100; console.log(obj1); // { a: 10, b: 20, c: 30 }
<-- b 沒被改到 console.log(obj2); // { a: 10, b: 100, c: 30 }

深拷贝实现方式

手动复制方式，如上面的代码，缺点就是 Object.assign，ES6 的新函数，可以帮助我们达成跟上面一样的功能。 obj1 = { a: 10, b: 20, c: 30 }; obj2 = Object.assign({},
obj1); obj2.b = 100; console.log(obj1); // { a: 10, b: 20, c: 30 } <-- 沒被改到
console.log(obj2); // { a: 10, b: 100, c: 30 }

转成 JSON 再转回来用 JSON.stringify 把对象转成字符串，再用 JSON.parse 把字符串转成新的对象。缺点：只有可以转成 JSON 格式的对象才可以这样用，像 function 没办法转成 JSON。

jquery ，有提供一个 $.extend 可以用来做 Deep Copy。 lodash ，也有提供
\_.cloneDeep 用来做 Deep Copy。递归实现深拷贝 function clone( o ) { var temp =
{}; for( var k in o ) { if( typeof o[ k ] == 'object' ){ temp[ k ] = clone( o[ k
] ); } else { temp[ k ] = o[ k ]; } } return temp; } 参考文章：关于 JS 中的浅拷贝和深拷贝 , 进击 JavaScript 之（四）玩转递归与数列

23. 如何快速合并雪碧图 Gulp：gulp-css-spriter webpack ：
    optimize-css-assets-webpack-plugin Go！Png 在线工具

24. 代码优化基本方法减少 HTTP 请求

HTML 优化： 1 、使用语义化标签 2、减少 iframe：iframe 是 SEO 的大忌，iframe 有好处也有弊端 3、避免重定向

CSS 优化： 1 、布局代码写前面 2、删除空样式 3、不滥用浮动，字体，需要加载的网络字体根据网站需求再添加 4、选择器性能优化 5、避免使用表达式，避免用 id 写样式

js 优化： 1 、压缩 2、减少重复代码

图片优化： 1 、使用 WebP 2、图片合并，CSS sprite 技术

减少 DOM 操作 1、缓存已经访问过的元素 2、" 离线 " 更新节点 , 再将它们添加到树中
3、避免使用 JavaScript 输出页面布局 -- 应该是 CSS 的事儿

使用 JSON 格式来进行数据交换使用 CDN 加速使用 HTTP 缓存：添加 Expires 或
Cache-Control 信息头使用 DNS 预解析 Chrome 内置了 DNS Prefetching 技术 , Firefox
3.5 也引入了这一特性，由于 Chrome 和 Firefox 3.5 本身对 DNS 预解析做了相应优化设置，所以设置 DNS 预解析的不良影响之一就是可能会降低 Google Chrome 浏览器及火狐
Firefox 3.5 浏览器的用户体验。预解析的实现：

1 、用 meta 信息来告知浏览器 , 当前页面要做 DNS 预解析
:<meta http-equiv="x-dns-prefetch-control" content="on" /> 2、在页面 header 中使用 link 标签来强制对 DNS 预解析 :

<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />

25.HTTPS 的握手过程 1、浏览器将自己支持的一套加密规则发送给服务器。 2 、服务器从中选出一组加密算法与 HASH 算法，并将自己的身份信息以证书的形式发回给浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息。 3 、浏览器获得网站证书之后浏览器要做以下工作： *验证证书的合法 *如果证书受信任，或者是用户接受了不受信的证书，浏览器会生成一串随机数的密码，并用证书中提供的公钥加密。 *使用约定好的
HASH 算法计算握手消息，并使用生成的随机数对消息进行加密，最后将之前生成的所有信息发送给服务器 4、网站接收浏览器发来的数据之后要做以下的操作： *使用自己的私钥将信息解密取出密码，使用密码解密浏览器发来的握手消息，并验证 HASH 是否与浏览器发来的一致。 \* 使用密码加密一段握手消息，发送给浏览器。 5 、浏览器解密并计算握手消息的 HASH，如果与服务端发来的 HASH 一致，此时握手过程结束，之后所有的通信数据将由之前浏览器生成的随机密码并利用对称加密算法进行加密。参考文章：《 HTTPS 工作原理和 TCP 握手机制》

26.BFC 相关问题 BFC(Block formatting context) 直译为 " 块级格式化上下文 "。它是一个独立的渲染区域，只有 Block-level box 参 与， 它规定了内部的 Block-level Box
如何布局，并且与这个区域外部毫不相干。

BFC 的渲染规则 1、BFC 这个元素的垂直方向的边距会发生重叠 2、BFC 的区域不会与浮动元素的 box 重叠（清除浮动原理） 3 、 BFC 在页面上是一个独立的容器，外面的元素不会影响它里面的元素，反过来它里面的元素也不会影响外面的元素计算 BFC 的高度的时候，浮动元素也会参与计算

如何创建 BFC？ 1 、 overflow 属性不为 visible 2、float 属性不为 none 3、position
属性为 absolute 或 fixed 4、display 属性为 inline-block、table-cell 、
table-caption、flex 、 inline-flex

BFC 的使用场景他的很常用的一个应用场景就是解决边距重叠的问题 .

27. 响应式图片 1.JS 或者服务端硬编码，resize 事件，判断屏幕大小加载不同的图片
    2.img srcset 方法 3.picture 标签 -> source 4.svg 5. 第三方库 polyfill

28. 判断一个变量是否是数组 var a = []; // 1. 基于 instanceof a instanceof Array;
    // 2. 基于 constructor a.constructor === Array; // 3. 基于
    Object.prototype.isPrototypeOf Array.prototype.isPrototypeOf(a); // 4. 基于
    getPrototypeOf Object.getPrototypeOf(a) === Array.prototype; // 5. 基于
    Object.prototype.toString Object.prototype.toString.apply(a) === '[object
    Array]'; // 6.Array.isArray Array.isArray([]); // true 以上，除了
    Object.prototype.toString 外，其它方法都不能正确判断变量的类型。

29.UTF-8 和 Unicode 的区别 UTF-8 就是在互联网上使用最广的一种 unicode 的实现方式。 Unicode 的出现是为了统一地区性文字编码方案，为解决 unicode 如何在网络上传输的问题，于是面向传输的众多 UTF（UCS Transfer Format ）标准出现了，顾名思义，UTF-8
就是每次 8 个位传输数据，而 UTF-16 就是每次 16 个位。 ASCII --> 地区性编码（GBK
） --> Unicode --> UTF-8

# Promise 和 setTimeout 谁先执行

# JS 的执行机制

同步和异步不同的执行过程

> 1. 同步和异步任务分别进入不同的执行 " 场所 "，同步的进入主线程，异步的进入
>    Event Table 并注册函数。
> 2. 当指定的事情完成时，Event Table 会将这个函数移入 Event Queue。
> 3. **主线程内的任务执行完毕为空**，会去 Event Queue 读取对应的函数，进入主线程执行
> 4. 上述过程会不断重复，也就是常说的 Event Loop( 事件循环 ),

### 怎么判断主线程为空？

> js 引擎存在 monitoring process 进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去 Event Queue 那里检查是否有等待被调用的函数

### setTimeOut(fn,ms) setInterval(fn,ms)

> 对于 setInterval(fn,ms) 来说，我们已经知道不是每过 ms 秒会执行一次 fn，而是每过 ms 秒，会有 fn 进入 Event Queue

### promise 和 promise.nextTick()( 类似 node 的 setTimeOut)

> 我们进入正题，除了广义的同步任务和异步任务，我们对任务有更精细的定义：

macro-task( 宏任务 )：包括整体代码 script，setTimeout ， setInterval micro-task(
微任务 )：Promise ， process.nextTick

不同类型的任务会进入对应的 Event Queue，比如 setTimeout 和 setInterval 会进入相同的 Event Queue。事件循环的顺序，决定 js 代码的执行顺序。进入整体代码 ( 宏任务
) 后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务

##

```
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

第一轮事件循环流程分析如下：

整体 script 作为第一个宏任务进入主线程，遇到 console.log，输出 1。遇到
setTimeout，其回调函数被分发到宏任务 Event Queue 中。我们暂且记为 setTimeout1。遇到 process.nextTick()，其回调函数被分发到微任务 Event Queue 中。我们记为
process1。遇到 Promise，new Promise 直接执行，输出 7。then 被分发到微任务 Event
Queue 中。我们记为 then1。又遇到了 setTimeout，其回调函数被分发到宏任务 Event
Queue 中，我们记为 setTimeout2。

宏任务 Event Queue 微任务 Event Queue

setTimeout1 process1

setTimeout2 then1

上表是第一轮事件循环宏任务结束时各 Event Queue 的情况，此时已经输出了 1 和 7。

我们发现了 process1 和 then1 两个微任务。

执行 process1, 输出 6。执行 then1，输出 8。

好了，第一轮事件循环正式结束，这一轮的结果是输出 1，7 ， 6，8 。那么第二轮时间循环从 setTimeout1 宏任务开始：

首先输出 2。接下来遇到了 process.nextTick()，同样将其分发到微任务 Event Queue 中，记为 process2。new Promise 立即执行输出 4，then 也分发到微任务 Event Queue 中，记为 then2。

宏任务 Event Queue 微任务 Event Queue

setTimeout2 process2

then2

第二轮事件循环宏任务结束，我们发现有 process2 和 then2 两个微任务可以执行。输出
3。输出 5。第二轮事件循环结束，第二轮输出 2，4 ， 3，5 。第三轮事件循环开始，此时只剩 setTimeout2 了，执行。直接输出 9。将 process.nextTick() 分发到微任务
Event Queue 中。记为 process3。直接执行 new Promise，输出 11。将 then 分发到微任务 Event Queue 中，记为 then3。

宏任务 Event Queue 微任务 Event Queue

process3

then3

第三轮事件循环宏任务执行结束，执行两个微任务 process3 和 then3。输出 10。输出
12。第三轮事件循环结束，第三轮输出 9，11 ， 10，12 。

整段代码，共进行了三次事件循环，完整的输出为 1，7 ， 6，8 ， 2，4 ， 3，5 ，
9，11 ， 10，12 。

# 面试

1.关于 this 的调用，以及 call apply bind 的影响，箭头函数中的 this

> 1.)this.指向 1.作为普通函数调用.this 指向全局对象 2.作为对象的方法调用 this 指向该对象 3.作为构造函数调用 this 指向了该构造函数实例化出来的对象。
> 4.) call apply 调用函数会立即执行，bind 不会.bind 返回值是函数。
> 5 自己实现 bind

```
if(!Function.proptotype.bind){
    Function.prototype.bind =  function(){
        var self =this,
        context = [].shift.call(arguments),
        args = [].shift.call(arguments);
        return funtion(){
            self.apply(context,[].concat.call(args,[].slice.call(arguments)))
        }

    }
}
```

> 5. 箭头函数 this
>    箭头函数表达式的语法比函数表达式短，并且不绑定自己的 this，arguments，super 或 new.target。此外，箭头函数总是匿名的。这些函数表达式最适合非方法函数，它们不能用作构造函数。在箭头函数出现之前，每个新定义的函数都有其自己的 this 值（例如，构造函数的 this 指向了一个新的对象；严格模式下的函数的 this 值为 undefined；如果函数是作为对象的方法被调用的，则其 this 指向了那个调用它的对象）。在面向对象风格的编程中，这被证明是非常恼人的事情。

> 箭头函数不会在其内部暴露出 arguments 对象： arguments.length, arguments[0], arguments[1] 等等，都不会指向箭头函数的 arguments，而是指向了箭头函数所在作用域的一个名为 arguments 的值（如果有的话，否则，就是 undefined。——译者注）。箭头函数没有自己的 arguments 对象，不过在大多数情形下，rest 参数可以给出一个解决方案：

> 箭头函数的引入有两个方面的影响：一是更简短的函数书写，二是对 this 的词法解析。

```
// 返回对象字面量时应当用圆括号将其包起来:
params => ({foo: bar})
// 支持 Rest parameters 和 default parameters:
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }
// 参数列表中的解构赋值也是被支持的
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
<!---->
function foo() {
  var f = (...args) => args[0];
  return f(2);
}
foo(1); // 2
```

2.前端跨域怎么解决？ 参考 implemation-principle.md

3. 闭包问题？由闭包引起的作用域链，以及闭包的优缺点
   https://github.com/dwqs/blog/issues/18
   > 闭包是指有权访问另外一个函数作用域中的变量的函数

```
function getOuter(){
  var date = '815';
  function getDate(str){
    console.log(str + date);  //访问外部的date
  }
  return getDate('今天是：'); //"今天是：815"
}
getOuter();
```

> getDate 是一个闭包，该函数执行时，会形成一个作用域 A，A 中并没有定义变量 date，但它能在父一级作用域中找到该变量的定义。即使外部函数已经返回，闭包仍能访问外部函数定义的变量
> 3、闭包可以更新外部变量的值
>
> #### 作用域链
>
> 为毛闭包就能访问外部函数的变量呢？这就要说说 Javascript 中的作用域链了。
> Javascript 中有一个执行环境(execution context)的概念，它定义了变量或函数有权访问的其它数据，决定了他们各自的行为。每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。你可以把它当做 Javascript 的一个普通对象，但是你只能修改它的属性，却不能引用它。变量对象也是有父作用域的。当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不再存在父作用域了，这就是作用域链。作用域链和原型继承有点类似，但又有点小区别：如果去查找一个普通对象的属性时，在当前对象和其原型中都找不到时，会返回 undefined；但查找的属性在作用域链中不存在的话就会抛出 ReferenceError。作用域链的顶端是全局对象。对于全局环境中的代码，作用域链只包含一个元素：全局对象。所以，在全局环境中定义变量的时候，它们就会被定义到全局对象中。当函数被调用的时候，作用域链就会包含多个作用域对象。

> 当函数返回没有被引用的时候，就会被垃圾回收器回收。但是对于闭包（函数嵌套是形成闭包的一种简单方式）呢，即使外部函数返回了，函数对象仍会引用它被创建时的作用域对象.

```
"use strict";
function createCounter(initial) {
  var counter = initial;
  function increment(value) {
    counter += value;
  }
  function get() {
    return counter;
  }
  return {
    increment: increment,
    get: get
  };
}
var myCounter = createCounter(100);
console.log(myCounter.get());   // 返回 100
myCounter.increment(5);
console.log(myCounter.get());   // 返回 105
```

内嵌函数 increment 和 get 都有指向 createCounter(100) scope 的引用。如果 createCounter(100)没有任何返回值，那么 createCounter(100) scope 不再被引用，于是就可以被垃圾回收。但是因为 createCounter(100)实际上是有返回值的，并且返回值被存储在了 myCounter 中，所以对象之间的引用关系变成了如下图所示：闭包的强大也在于此，能够存贮私有数据。

### 事件委托

> 事件委托是一种由其它元素而非事件目标元素来响应事件产生的行为的思想，事件委托是利用了冒泡机制，得益于冒泡机制使用事件委托来管理事件流有很多优点，其中最大的优点是改善性能.元素绑定的每一个监听器都会占用一些内存.这种方法的缺点是,父容器的侦听器可能需要检查事件来选择正确的操作，而元素本身不会是一个监听器

1. 管理较少的函数
2. 更少的内存消耗，
3. 降低代码和 dom 之间的关联
4. a 修改 dom 的时候不用考虑删除事件。
   ### 事件绑定
   false：冒泡阶段。true:捕获阶段
   > 佐证了先前说道的 w3c 规范下的先执行捕获再执行冒泡的行为。总结： 当一个页面元素包含子元素节点的时候，他在处理在其身上的绑定事件的时候，采用先执行捕获阶段的事件，再执行冒泡阶段的事件。而事件处于哪个阶段是由 addevnetlistener 的第三个参数决定的。
   ### 阻止冒泡
   stoppropagation()：**阻止父级元素冒泡阶段的事件**。

###：事件委托和冒泡机制有关系吗？

> 虽然提到 js 的事件委托通常都会联系到冒泡，但是就算当初没有设计冒泡和捕获，事件委托还是事件委托，它依赖的是 event 对象传递到监听函数里面了，和其他无关。

### cookie localStorage, sessionStorage
### 基本数据类型
Undefined、Null、Boolean、Number、String

> null
（1） 作为函数的参数，表示该函数的参数不是对象。
（2） 作为对象原型链的终点。
> undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
(1)变量被声明了，但没有赋值时，就等于undefined。
（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
（3）对象没有赋值的属性，该属性的值为undefined。
（4）函数没有返回值时，默认返回undefined。
### js中检测数据类型的方法
1. typeof 2.Object.prototype.toStringg()3. instanceof 4 constructor
### js 伪数组，如何转化为真正数组
 var arr = Array.prototype.slice.call(obj);其实我们也可以通过[].slice.call这种形式实现同样的效果，但是通过prototype的形式执行程序效率更高，同样代码也更加优美。 

 ```
 function slice(obj) {
    var arr =[];
    var len = obj.length; // length 正好对应伪数组中的length属性
    for(var i = 0;i < len;i++){
        arr.push[i] = obj[i]; // i 正好对应伪数组中的索引值
    }
    return arr;
}
 ```

 ### 讲讲mvc /mvp/mvvm区别
 > 1. m:model层 数据保存
 2. v：view 用户界面
 3. c:controller :业务逻辑
 View 传送指令到 Controller
Controller 完成业务逻辑后，要求 Model 改变状态
Model 将新的数据发送到 View，用户得到反馈
 >MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。
 1. 各部分之间的通信，都是双向的。
2. View 与 Model 不发生联系，都通过 Presenter 传递。
3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。
>MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。
唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。Angular 和 Ember 都采用这种模式。

### js 如何使用继承特性；

