# 浏览器

渲染机制

# javascript

闭包，原型，作用域链，ajax , http 协议，盒模型，兼容性问题，xss 攻击，xsrf 攻击，浏览器渲染（重汇，重排）

1.  ajax 请求的过程。
    new XMLHttpRequest()
    xhr.open()
    xhr.send()
    callback()
2.  浏览器里面的事件会按一定的规则传递，这个规则是什么？
    > 答：事件冒泡，事件捕获
3.  事件代理，事件委托是什么意思？
    > 答：主要得益于 事件的冒泡机制
4.  闭包是怎么回事，用在什么场景？
    > 答：内部函数总是能够访问其所在的外部函数中声明的变量和参数。保护函数内的变量安全：如迭代器、生成器。在内存中维持变量：如果缓存数据、柯里化。
5.  变量常驻内存会带来什么问题？
    > 内存泄漏
        5.1 . 如何避免这种问题？
        5.2 . 怎么销毁
6.  call 和 apply 是干嘛的？

            7.2 . 对服务器来说，返回 json 和 jsonp 数据有什么不一样？
            >答：json 是一种 key:value 的数据格式。JSONP 则是一种跨域数据交互协议。

8)  简单说一说盒模型？w3c 和 ie 怪异盒模型？
9)  简要阐述 xss 和 csrf 攻击及规范？
    9.1 xss 脚本劫持，如何截获？
    9.2 csrf 域名劫持
10) 在 js 里如何做到继承？
    10.1 原型链中的方法和自身的同一个方法名有什么区别？
11) 页面性能优化有什么方式？
    11.1 . 文件，脚本合并是如何优化的？
    11.2 . 重汇，重排是怎么回事？有什么区别？答：浏览器加载页面过程？
    DNS 查询
    TCP 连接
    HTTP 请求即响应服务器响应客户端渲染本文讨论第五个部分，即浏览器对内容的渲染，这一部分（渲染树构建、布局及绘制），又可以分为下面五个步骤：

处理 HTML 标记并构建 DOM 树。处理 CSS 标记并构建 CSSOM 树。将 DOM 与 CSSOM 合并成一个渲染树。根据渲染树来布局，以计算每个节点的几何信息。将各个节点绘制到屏幕上。
11.3. 请举例说明什么情况下会重汇？
11.4. 样式更改会引起重回吗？什么样式会引起重排或重汇？什么属性会影响重排或重汇？调整窗口大小改变字体大小样式表变动元素内容变化，尤其是输入控件
CSS 伪类激活
DOM 操作
offsetWidth, width, clientWidth, scrollTop/scrollHeight 的计算， 会使浏览器将渐进回流队列 Flush，立即执行回流。

13. 浏览器如何知道一个文件是否被缓存？
    12.1 HTTP 状态码 304，502.503
    12.2 1，2，3，4，5 开头的状态码都表示什么？
14. 已经上线的项目，出了问题，怎么样去处理？
15. 除了 webpack 还接触过其他的吗？
16. webpack 的优点和应用场景？

大题，

1.  页面内有一个正方形元素 A,以及一个待放置区域 b,实现对其拖拽和放下到 b 区域内，并且改变 b 区域背景颜色（不能使用 h5 原生事件）
2.  实现超过整数存储范围的两个大整数相加函数，注意：参数 a 和 b 以及函数的返回值都是字符串。

3.  页面内有一个 input 输入框，实现在数组 arr 查询命中词并和 autocomplete 效果。
    //考点
4.  基本功：dom 事件，定位，jsAPI
5.  算法：基本逻辑。
6.  考原理和基础、

# css

1.  box-sizing

# html

# react

# redux

# typescript

# http

# es6 /es7

# 设计模式/组件化/模块化

# svg /canvas

# webpack
