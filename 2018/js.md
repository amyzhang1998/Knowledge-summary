## 锚点定位的原理

1.  a 标签+name 属性（name 属性只会支持特定的一些标签，且不利于布局）
2.  a 标签+ 标签的 id 属性（）

## querySelector 和 getElementsBytagName 区别？

| --         | querySelectorAll() | getElementByTagName() |
| ---------- | -----------------: | :-------------------: |
| 遍历方式   |           深度优先 |       深度优先        |
| 返回值类型 |      nodelist 集合 |  htmlCollection 集合  |
| 返回值状态 |               静态 |         动态          |

> 所以可以知道 为什么 getElementsByTagName 的查询速度较快？因为 getElementsByTagName 方法我们得到的是一个对象的引用，另一个则是得到一个对象的克隆。显然克隆对象的事件消费更高。

## DFS 和 BFS 的优势有哪些？

一般来说，能用 DFS 解决的问题，都能用 BFS。稀疏图 bfs 会快于 dfs，稠密图差不多。dfs 写比较简单，bfs 没有栈溢出风险

## 前端数据流

> 首先数据流管理模式，比较热门的分为三种。

FP(函数式)。 FRP() TFRP(Transparent Functional Reactive Programming)

1.  函数式、不可变、模式化。典型实现：Redux - 简直是正义的化身。
2.  响应式、依赖追踪。典型实现：Mobx。
3.  响应式，和楼上区别是以流的形式实现。典型实现：Rxjs、xstream。

4.  redux:最重要的原因，是 redux 拥有一套几乎洁癖般完美的定位，就是要清晰、可回溯。

2,mobx
可以把 observable 理解为信号源，每当信号变化时，函数流会自动执行，并输出结果，对前端而言，最终会使视图刷新。这就是数据驱动视图。然而 mobx 是 TFRP 框架，每当变量变化时，都会自动触发数据源的 dispatch，而且各视图也是自动订阅各数据源的，我们称为依赖追踪，或者叫自动依赖绑定。

## 依赖注入（=== 控制反转）

依赖注入（DI）和控制反转（IOC）基本是一个意思，因为说起来谁都离不开谁。简单来说，a 依赖 b，但 a 不控制 b 的创建和销毁，仅使用 b，那么 b 的控制权交给 a 之外处理，这叫控制反转（IOC），而 a 要依赖 b，必然要使用 b 的 instance，那么通过 a 的接口，把 b 传入；通过 a 的构造，把 b 传入；通过设置 a 的属性，把 b 传入；这个过程叫依赖注入（DI）
