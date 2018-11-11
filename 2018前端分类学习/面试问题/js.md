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

##  react
### 介绍react 生命周期，
 首先分为三个阶段：
 mount: 
 comstructor():
 1, 初始化state;
 2, 绑定事件
 componentWillMount() 
 render
 componentDidMount
 upddate:
 componentWillReceiveProps
 shouldComponentUpdate()
 componentWillUpdate()
 render()
 componentDidUpdate(prevProps,prevstate,snap)
 unmount:

 新的api：
 static getDerivedStateFromProps（prevProps,prevState）
getSnapshotBeforeUpdate()
出现的原因：
1，因为原来的生命周期流程是不可打断的，以后react 官方想出现被打断的生命周期。
2， will mount 里面，再一次更新中可能被触发多次，因为是可以setState的，所以 会被误用。

## React-router

## Redux
## webpack
webpack怎么实现code spliting 动态路由加载？
1，webpack 实现commonjs 模块加载？

```
let a =require('bar')
exports.bar = function(){}

-----
(
    function(module){
       function __webpack.require__(moduleId){
           1,是否已缓存
           2，缓存模块{id,l,exports}
           3,调用模块函数
           4，module.l = true
           5,return module.exports
       }
    }
)(
    [function(module,exports,__webpack.require__){
        var bar = __webpack.require__(1)
        bar()
    }]
)
```
2，webpack 实现es模块加载？

