# Vue

### vue （mvvm）双向数据绑定原理以及核心代码模块。

双向数据绑定：在单向 绑定的基础上给可输入元素 添加 chang 事件，来动态修改 model 和 view.
实现 数据绑定的做法：

1.  发布者-订阅者模式：(backbone.js)
2.  脏值检测：(andular.js):angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 setInterval() 定时轮询检测数据变动，当然 Google 不会这么 low，angular 只有在指定的事件触发时进入脏值检测.
3.  数据劫持：(vue.js);vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

要实现 mvvm 的双向绑定，就必须要实现以下几点： 1、实现一个数据监听器 Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者 2、实现一个指令解析器 Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数 3、实现一个 Watcher，作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 4、mvvm 入口函数，整合以上三者

## 原理

### 核心概念

1，渐进式框架
2，响应式 reactive ,
3, 数据变更 ，更新视图
4，vue 设置了一些 DSL（v-on）(为某些特定领域设定的专业用语))

### 对比 react 框架

https://cn.vuejs.org/v2/guide/comparison.html
1，运行时性能
2，优化
react 需要 使用 should Component 手动优化，而 vue 会在渲染过成中自动追踪，
3，向上扩展和向下扩展 都比较方便

## 双向数据绑定原理（）

Object.defineProperty()

### 代理（PROXY）

### Observer(收集依赖)

### Watcher（数据劫持，监听数据）

### computed(依赖缓存)

### 依赖更新
