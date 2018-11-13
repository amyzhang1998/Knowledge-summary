1，js 如何工作：
https://juejin.im/post/5a05b4576fb9a04519690d42#comment

### js engine(v8)（v8 is used for node.js runtime）

1,memory heap 2,call Stack

> v8 compiles js code into machine code at exexction by inplementing a JIT(Just-In-Time)Compile

#### inlining (代码嵌入)

#### 隐藏类

### runtime

1,browsers provided : DOM,AJAX,setTimeout and much more.

### concurrency(并发) & the event Loop

without block the ui and making the browser unresponsive ,the solution is asynchronous callbacks;

## js 内存空间

内存空间又被分为两种，
栈内存(stock)：基础数据类型：Undefined、Null、Boolean、Number、String、Symbol
与堆内存:

## 事件循环

1，匈牙利命名字符串和驼峰命名字符串互相转换
2，简单实现一个事件订阅机制，具有监听 on 和触发 emit 方法
3，随机排序数组（线性时间复杂度），附加（完全随机）），附加（完全随机）

## React-router

1， react-router 怎么实现路由切换
2， react-router 里的<Link>标签和<a>标签有什么区别
3， <a>标签默认事件禁掉之后做了什么才实现了跳转

https://github.com/stephentian/33-js-concepts
https://juejin.im/post/5b002766518825429d1f90bc
https://segmentfault.com/a/1190000014854793
https://zhuanlan.zhihu.com/p/38793240
https://zhuanlan.zhihu.com/p/38220426
https://zhuanlan.zhihu.com/p/36810237
https://zhuanlan.zhihu.com/p/36521539
https://blog.csdn.net/qq_37746973/article/details/78662177
https://juejin.im/entry/5b4d4721f265da0f926b78c8
https://segmentfault.com/a/1190000008782645
https://segmentfault.com/q/1010000000211442
https://segmentfault.com/a/1190000007546512
https://juejin.im/post/5b2a186cf265da596d04a648
https://www.jianshu.com/p/208c02c9dd1d
http://www.voidcn.com/article/p-dzfhuzar-bqu.html
http://efe.baidu.com/blog/the-inner-workings-of-virtual-dom/
https://oychao.github.io/2017/09/25/react/16_transaction/
https://yanyinhong.github.io/2017/05/05/How-does-react-work-when-setState/
https://juejin.im/entry/5912bb9544d904007b0384f1
http://front-ender.me/react/react-source-code-render.html
http://front-ender.me/react/react-transaction.html
