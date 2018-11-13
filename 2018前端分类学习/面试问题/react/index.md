## Api

1. React.Children

1， React.Children.map 与数组 map 的区别？
If children is null or undefined, this method will return null or undefined rather than an array.
2, React.Children.count(children)
2, React.Children.only(children)//只有一个自节点

## react

### React 层面的性能优化

### 介绍 react 生命周期，

首先分为三个阶段：
mount:
comstructor():
1, 初始化 state;
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

新的 api：
static getDerivedStateFromProps（prevProps,prevState）
getSnapshotBeforeUpdate()
出现的原因：
1，因为原来的生命周期流程是不可打断的，以后 react 官方想出现被打断的生命周期。
2， will mount 里面，再一次更新中可能被触发多次，因为是可以 setState 的，所以 会被误用。

### 事件代理

1，介绍事件代理以及优缺点
2，React 组件中怎么做事件代理
3， React 组件事件代理的原理

### vdom

1,React 中 Dom 结构发生变化后内部经历了哪些变化
2,React 挂载的时候有 3 个组件，textComponent、composeComponent、domComponent，区别和关系，Dom 结构发生变化时怎么区分 data 的变化，怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理
3,key 主要是解决哪一类的问题，为什么不建议用索引 index（重绘）
介绍虚拟 DOM
介绍高阶组件
react 性能优化

###

react 异步渲染的概念,介绍 Time Slicing 和 Suspense
介绍纯函数
pureComponent 和 FunctionComponent 区别
介绍 Fiber
shouldComponentUpdate 是为了解决什么问题
如何解决 props 层级过深的问题
react 生命周期，常用的生命周期
对应的生命周期做什么事
遇到性能问题一般在哪个生命周期里解决
怎么做性能优化（异步加载组件...）
写 react 有哪些细节可以优化
React 的事件机制（绑定一个事件到一个组件上）
介绍下事件代理，主要解决什么问题
前端开发中用到哪些设计模式
React/Redux 中哪些功能用到了哪些设计模式
React 子父组件之间如何传值
Emit 事件怎么发，需要引入什么
介绍下 React 高阶组件，和普通组件有什么区别
一个对象数组，每个子对象包含一个 id 和 name，React 如何渲染出全部的 name
在哪个生命周期里写
其中有几个 name 不存在，通过异步接口获取，如何做
渲染的时候 key 给什么值，可以使用 index 吗，用 id 好还是 index 好
对 React 看法，有没有遇到一些坑
对闭包的看法，为什么要用闭包
React 生命周期
React 的生命周期
componentWillReceiveProps 的触发条件是什么
React16.3 对生命周期的改变
介绍下 React 的 Filber 架构
画 Filber 渲染树
介绍 React 高阶组件
父子组件之间如何通信
React 声明周期
React 使用过的一些组件
介绍 Immuable
React 中 setState 后发生了什么
setState 为什么默认是异步
setState 什么时候是同步的
为什么 3 大框架出现以后就出现很多 native（RN）框架（虚拟 DOM）
虚拟 DOM 主要做了什么
虚拟 DOM 本身是什么（JS 对象）
react 设计思路
为什么虚拟 DOM 比真实 DOM 性能好
react 常见的通信方式
react 生命周期
react 性能优化
介绍 pureComponet
介绍 Function Component
React 数据流
props 和 state 的区别
介绍 react context
react 设计思路
为什么虚拟 DOM 比真实 DOM 性能好
react 常见的通信方式
react 设计思路
为什么虚拟 DOM 比真实 DOM 性能好
react 常见的通信方式对 react 看法，它的优缺点
使用过程中遇到的问题，如何解决的
react 的理念是什么（拿函数式编程来做页面渲染）
