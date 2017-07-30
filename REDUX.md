# Redux
## Motivation
>前端开发中遇到的困难：我们总是将两个难以理清的概念混在一起。：**变化和异步**。
>一些库如 React 试图在视图层禁止异步和直接操作 DOM 来解决这个问题。美中不足的是，React 依旧把处理 state 中数据的问
>题留给了你。Redux就是为了帮你解决这个问题。
>跟随 Flux、CQRS 和 Event Sourcing 的脚步，通过限制更新发生的时间和方式，Redux 试图让 state 的变化变得可预测。
>这些限制条件反映在 Redux 的三大原则中。

## 核心概念
>1. 使用普通对象来描述``state``;
>>开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据。把应用的 state 想像成数据库。这种方法在 normalizr 文档里有详细阐述。例如，实际开发中，在 state 里同时存放 todosById: { id -> todo } 和 todos: array<id> 是比较好的方式，本文中为了保持示例简单没有这样处理。

```
{
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```
>2. 要想更新state中的数据，你需要发起一个``action``，action就是一个普通的对象。

```
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```
>action 就像是描述发生了什么的面包屑

>3. 为了把acion 和state 联系起来，就是要开发一个纯函数：``reducer``
>>之所以将这样的函数称之为reducer，是因为这种函数与被传入 Array.prototype.reduce(reducer, ?initialValue) 里的回调函数属于相同的类型。保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：
>>1. 修改传入参数；
>>2. 执行有副作用的操作，如 API 请求和路由跳转；
>>3. 调用非纯函数，如 Date.now() 或 Math.random()。

>返回state的时候为了不修改state对象，可以使用以下两种方法：
> 1. Object.assign()创建一个副本；Object.assign({},state,ci:2);ES6
>2. return {...state,ci:2};ES6的展开符；


```
function todos(state = [], action) {
  switch (action.type) {
  case 'ADD_TODO':
    return state.concat([{ text: action.text, completed: false }]);
  case 'TOGGLE_TODO':
    return state.map((todo, index) =>
      action.index === index ?
        { text: todo.text, completed: !todo.completed } :
        todo
   )
  default:
    return state;
  }
}
```
>总结：主要的思想就是根据这些action 对象来更新state. there is no magic;

## 三大原则
> 1. ``单一数据源``
>整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

>2. ``State 是只读的``
>唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

>3.``使用纯函数来执行修改``
>为了描述 action 如何改变 state tree ，你需要编写 reducers。

## Store
>在前面的章节中，我们学会了使用 action 来描述“发生了什么”，和使用 reducers 来根据 action 更新 state 的用法。
>Store 就是把它们联系到一起的对象。Store 有以下职责：
>维持应用的 state；
>1. 提供 getState() 方法获取 state；
>2. 提供 dispatch(action) 方法更新 state；
>3. 通过 subscribe(listener) 注册监听器;
>4. 通过 subscribe(listener) 返回的函数注销监听器。

``Rudux 应用只有一个单一的store``
## 数据流
> 严格的单向数据流是Redux的设计核心；
>Redux 应用中数据的生命周期遵循下面 4 个步骤：

 ```
 1. 调用 store.dispatch(action)。
 2. Redux store 调用传入的 reducer 函数。
      * Store 会把两个参数传入 reducer： 当前的 state 树和 action。
 3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
        * 当你触发 action 后，combineReducers 返回的 todoApp 会负责调用两个 reducer,
        *然后会把两个结果集合并成一个 state 树：
 4. Redux store 保存了根 reducer 返回的完整 state 树。

 ```
 ## 异步Action
 > 标准的做法是使用 Redux Thunk 中间件。通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk。
 当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。thunk 的一个优点是它的结果可以再次被 dispatch;
 **Thunk middleware 并不是 Redux 处理异步 action 的唯一方式：**
1. 你可以使用 redux-promise 或者 redux-promise-middleware 来 dispatch Promise 来替代函数。
2. 你可以使用 redux-observable 来 dispatch Observable。
3. 你可以使用 redux-saga 中间件来创建更加复杂的异步 action。
4. 你可以使用 redux-pack 中间件 dispatch 基于 Promise 的异步 Action。
 ## 异步数据流
 >像 redux-thunk 或 redux-promise 这样支持异步的 middleware 都包装了 store 的 dispatch() 方法，以此来让你 dispatch 一些除了 action 以外的其他内容.

 ## Middleware
 >middleware 是指可以被嵌入在框架接收请求到产生响应过程之中的代码,middleware 最优秀的特性就是可以被链式组合,你可以在一个项目中使用多个独立的第三方 middleware。**它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。**


