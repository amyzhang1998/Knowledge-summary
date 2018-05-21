## 锚点定位的原理
1. a标签+name属性（name属性只会支持特定的一些标签，且不利于布局）
2. a标签+ 标签的id属性（）
## querySelector 和 getElementsBytagName区别？
|     --    | querySelectorAll()    |  getElementByTagName()|
| --------   | -----:   | :----: |
| 遍历方式       | 深度优先      |   深度优先    |
| 返回值类型        | nodelist集合    |   htmlCollection集合   |
| 返回值状态       | 静态      |   动态    |

>所以可以知道 为什么 getElementsByTagName的查询速度较快？
因为getElementsByTagName方法我们得到的是一个对象的引用，另一个则是得到一个对象的克隆。显然克隆对象的事件消费更高。
## DFS 和BFS的优势有哪些？
一般来说，能用DFS解决的问题，都能用BFS。
稀疏图bfs会快于dfs，稠密图差不多。dfs写比较简单，bfs没有栈溢出风险