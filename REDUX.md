# Redux

## Motivation

> 前端开发中遇到的困难：我们总是将两个难以理清的概念混在一起。：**变化和异步**。一些库如 React 试图在视图层禁止异步和直接操作 DOM 来解决这个问题。美中不足的是，React 依旧把处理 state 中数据的问题留给了你。Redux 就是为了帮你解决这个问题。跟随 Flux、CQRS 和 Event Sourcing 的脚步，通过限制更新发生的时间和方式，Redux 试图让 state 的变化变得可预测。这些限制条件反映在 Redux 的三大原则中。

##  核心概念

> 1. 使用普通对象来描述`state`;
>     > 开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据。把应用的 state 想像成数据库。这种方法在 normalizr 文档里有详细阐述。例如，实际开发中，在 state 里同时存放 todosById: { id -> todo } 和 todos: array<id> 是比较好的方式，本文中为了保持示例简单没有这样处理。

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

> 2. 要想更新 state 中的数据，你需要发起一个`action`，action 就是一个普通的对象。

```
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```

> action 就像是描述发生了什么的面包屑

> 3. 为了把 acion 和 state 联系起来，就是要开发一个纯函数：`reducer`
>     > 之所以将这样的函数称之为 reducer，是因为这种函数与被传入 Array.prototype.reduce(reducer, ?initialValue) 里的回调函数属于相同的类型。保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：
>     >
>     > 1. 修改传入参数；
>     > 2. 执行有副作用的操作，如 API 请求和路由跳转；
>     > 3. 调用非纯函数，如 Date.now() 或 Math.random()。

> 返回 state 的时候为了不修改 state 对象， 可以使用  以下两种方法：
>
> 1. Object.assign()创建一个副本；Object.assign({},state,ci:2);ES6
> 2. return {...state,ci:2};ES6 的展开符；

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

> 总结：主要的思想就是根据这些 action 对象来更新 state. there is no magic;

## 三大原则

> 1. `单一数据源`
>    整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

> 2. `State 是只读的`
>    唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

> 3.`使用纯函数来执行修改`
> 为了描述 action 如何改变 state tree ，你需要编写 reducers。

## Store

> 在前面的章节中，我们学会了使用 action 来描述“发生了什么”，和使用 reducers 来根据 action 更新 state 的用法。
> Store 就是把它们联系到一起的对象。Store 有以下职责：维持应用的 state；
>
> 1. 提供 getState() 方法获取 state；
> 2. 提供 dispatch(action) 方法更新 state；
> 3. 通过 subscribe(listener) 注册监听器;
> 4. 通过 subscribe(listener) 返回的函数注销监听器。

`Rudux 应用只有一个单一的store`

## 数据流

> 严格的单向数据流  是 Redux 的设计核心；
> Redux 应用中数据的生命周期遵循下面 4 个步骤：

```
1. 调用 store.dispatch(action)。
2. Redux store 调用传入的 reducer 函数。
     * Store 会把两个参数传入 reducer： 当前的 state 树和 action。
3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
       * 当你触发 action 后，combineReducers 返回的 todoApp 会负责调用两个 reducer,
       *然后会把两个结果集合并成一个 state 树：
4. Redux store 保存了根 reducer 返回的完整 state 树。
```

## 异步 Action

> 标准的做法是使用 Redux Thunk 中间件。通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk。当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。thunk 的一个优点是它的结果可以再次被 dispatch;
**Thunk middleware 并不是 Redux 处理异步 action 的唯一方式：**

1. 你可以使用 redux-promise 或者 redux-promise-middleware 来 dispatch Promise 来替代函数。
2. 你可以使用 redux-observable 来 dispatch Observable。
3. 你可以使用 redux-saga 中间件来创建更加复杂的异步 action。
4. 你可以使用 redux-pack 中间件 dispatch 基于 Promise 的异步 Action。
    ## 异步数据流
    > 像 redux-thunk 或 redux-promise 这样支持异步的 middleware 都包装了 store 的 dispatch() 方法，以此来让你 dispatch 一些除了 action 以外的其他内容.

## Middleware

> middleware 是指可以被嵌入在框架接收请求到产生响应过程之中的代码,middleware 最优秀的特性就是可以被链式组合,你可以在一个项目中使用多个独立的第三方 middleware。**它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。**

### 理解 middleware 本质

> 正因为 middleware 可以完成包括异步 API 调用在内的各种事情，了解它的演化过程是一件相当重要的事。我们将以记录日志和创建崩溃报告为例，引导你体会从分析问题到通过构建 middleware 解决问题的思维过程。

> `Monkeypatching 本质上是一种 hack。“将任意的方法替换成你想要的”`

**第一步**

> dispatch 的 monkeypatch

```
let next = store.dispatch
store.dispatch = function dispatchAndLog(action) {
 console.log('dispatching', action)
 let result = next(action)
 console.log('next state', store.getState())
 return result
}
```

**第二步**

>  隐藏 monkeypatch

```
function logger(store) {
 let next = store.dispatch

 // 我们之前的做法:
 // store.dispatch = function dispatchAndLog(action) {

 return function dispatchAndLog(action) {
   console.log('dispatching', action)
   let result = next(action)
   console.log('next state', store.getState())
   return result
 }
}
//我们可以在 Redux 内部提供一个可以将实际的 monkeypatching 应用到 store.dispatch 中的辅助方法：
function applyMiddlewareByMonkeypatching(store, middlewares) {
 middlewares = middlewares.slice()
 middlewares.reverse()

 // 在每一个 middleware 中变换 dispatch 方法。
 middlewares.forEach(middleware =>
   store.dispatch = middleware(store)
 )
}
//然后像这样应用多个 middleware：
applyMiddlewareByMonkeypatching(store, [ logger, crashReporter ])
```

> 尽管我们做了很多，实现方式依旧是 monkeypatching。因为我们仅仅是将它隐藏在我们的框架内部，并没有改变这个事实。

**第三步**：移除 monkeypatching

> 为什么我们要替换原来的 dispatch 呢？当然，这样我们就可以在后面直接调用它，但是还有另一个原因：就是每一个 middleware 都可以操作（或者直接调用）前一个 middleware 包装过的 store.dispatch;将 middleware 串连起来的必要性是显而易见的。如果 applyMiddlewareByMonkeypatching 方法中没有在第一个 middleware 执行时立即替换掉 store.dispatch，那么 store.dispatch 将会一直指向原始的 dispatch 方法。也就是说，第二个 middleware 依旧会作用在原始的 dispatch 方法。但是，还有另一种方式来实现这种链式调用的效果。可以让 middleware 以方法参数的形式接收一个 next() 方法，而不是通过 store 的实例去获取。

```
//ES6箭头函数使其柯里化
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}
```

> 这正是 Redux middleware 的样子。
> Middleware 接收了一个 next() 的 dispatch 函数，并返回一个 dispatch 函数，返回的函数会被作为下一个 middleware 的 next()，以此类推。由于 store 中类似 getState() 的方法依旧非常有用，我们将 store 作为顶层的参数，使得它可以在所有 middleware 中被使用。

###'单纯'使用 middleware

> 我们可以写一个 applyMiddleware() 方法替换掉原来的 applyMiddlewareByMonkeypatching()。在新的 applyMiddleware() 中，我们取得最终完整的被包装过的 dispatch() 函数，并返回一个 store 的副本：

```
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )

  return Object.assign({}, store, { dispatch })
}
```

> 这与 Redux 中 applyMiddleware() 的实现已经很接近了，但是有三个重要的不同之处：

1. 它只暴露一个 store API 的子集给 middleware：dispatch(action) 和 getState()。

2. 它用了一个非常巧妙的方式，以确保如果你在 middleware 中调用的是 store.dispatch(action) 而不是 next(action)，那么这个操作会再次遍历包含当前 middleware 在内的整个 middleware 链。这对异步的 middleware 非常有用，正如我们在之前的章节中提到的。

3. 为了保证你只能应用 middleware 一次，它作用在 createStore() 上而不是 store 本身。因此它的签名不是 (store, middlewares) => store， 而是 (...middlewares) => (createStore) => createStore。由于在使用之前需要先应用方法到 createStore() 之上有些麻烦，createStore() 也接受将希望被应用的函数作为最后一个可选参数传入。

```
//这是redux applyMiddleware的实现方法
export default function applyMiddleware(...middlewares) {
  return createStore => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer);
    let dispatch = store.dispatch;
    let chain = [];

    const middlewareAPI = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}
```

## 技巧

### 减少样板代码

1. Action Creators 生成器

```
function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}
```

### 异步 Action Creators

> 中间件 让你在每个 action 对象 dispatch 出去之前，注入一个自定义的逻辑来解释你的 action 对象。异步 action 是中间件的最常见用例。中间件让我们能写表达更清晰的、潜在的异步 action creators。 它允许我们 dispatch 普通对象之外的东西，并且解释它们的值。比如，中间件能 “捕捉” 到已经 dispatch 的 Promises 并把他们变为一对请求和成功/失败的 action.
> 中间件最简单的例子是 redux-thunk. “Thunk” 中间件让你可以把 action creators 写成 “thunks”，也就是返回函数的函数。 这使得控制被反转了： 你会像一个参数一样取得 dispatch ，所以你也能写一个多次分发的 action creator 。

```
//thunk 函数
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

### Reducer creator

```
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}
```

### 服务端渲染

> 服务端渲染最关键的一步是在发送响应前渲染初始的 HTML。这就要使用 React.renderToString().

1. 准备初始 state
    > 因为客户端只是执行收到的代码，刚开始的初始 state 可能是空的，然后根据需要获取 state。在服务端，渲染是同步执行的而且我们只有一次渲染 view 的机会。在收到请求时，可能需要根据请求参数或者外部 state（如访问 API 或者数据库），计算后得到初始 state。
2. 处理 Request 参数
    > 服务端收到的唯一输入是来自浏览器的请求。在服务器启动时可能需要做一些配置（如运行在开发环境还是生产环境），但这些配置是静态的。
3. 获取异步 state
    > 服务端渲染常用的场景是处理异步 state。因为服务端渲染天生是同步的，因此异步的数据获取操作对应到同步操作非常重要。

> 最简单的做法是往同步代码里传递一些回调函数。在这个回调函数里引用响应对象，把渲染后的 HTML 发给客户端。

```
function handleRender(req, res) {
  // 异步请求模拟的 API
  fetchCounter(apiResult => {
    // 如果存在的话，从 request 读取 counter
    const params = qs.parse(req.query)
    const counter = parseInt(params.counter) || apiResult || 0

    // 得到初始 state
    let preloadedState = { counter }

    // 创建新的 Redux store 实例
    const store = createStore(counterApp, preloadedState)

    // 把组件渲染成字符串
    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )

    // 从 Redux store 得到初始 state
    const finalState = store.getState()

    // 把渲染后的页面发给客户端
    res.send(renderFullPage(html, finalState))
  });
}
```

> 因为在回调中使用了 res.send()，服务器会保护连接打开并在回调函数执行前不发送任何数据。你会发现每个请求都有 500ms 的延时。更高级的用法会包括对 API 请求出错进行处理，比如错误的请求或者超时。

4. 安全注意事项
    > 因为我们代码中很多是基于用户生成内容（UGC）和输入的，不知不觉中，提高了应用可能受攻击区域。任何应用都应该对用户输入做安全处理以避免跨站脚本攻击（XSS）或者代码注入。

> 我们的示例中，只对安全做基本处理。当从请求中拿参数时，对 counter 参数使用 parseInt 把它转成数字。如果不这样做，当 request 中有 script 标签时，很容易在渲染的 HTML 中生成危险代码。就像这样的：?counter=</script><script>doSomethingBad();</script>

> 在我们极简的示例中，把输入转成数字已经比较安全。如果处理更复杂的输入，比如自定义格式的文本，你应该用安全函数处理输入，比如 validator.js。

> 此外，可能添加额外的安全层来对产生的 state 进行消毒。JSON.stringify 可能会造成 script 注入。鉴于此，你需要清洗 JSON 字符串中的 HTML 标签和其它危险的字符。可能通过字符串替换或者使用复杂的库如 serialize-javascript 处理。

### 计算衍生数据

> Reselect 库可以创建可记忆的(Memoized)、可组合的 selector 函数。Reselect selectors 可以用来高效地计算 Redux store 里的衍生数据。

1. 使用 reselect 的初衷
    > 每当组件更新时都会重新计算 todos。如果 state tree 非常大，或者计算量非常大，每次更新都重新计算可能会带来性能问题。Reselect 能帮你省去这些没必要的重新计算。
2. 创建可记忆的 Selector

```
const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
```

> 在上例中，getVisibilityFilter 和 getTodos 是 input-selector。因为他们并不转换数据，所以被创建成普通的非记忆的 selector 函数。但是，getVisibleTodos 是一个可记忆的 selector。他接收 getVisibilityFilter 和 getTodos 为 input-selector，还有一个转换函数来计算过滤的 todos 列表。

3. 使用带有多个 visibleTodoList 容器实例的 getVisibleTodos selector 不能使用函数记忆功能。
    > 为了跨越多个 VisibleTodoList 组件共享 selector，于此同时正确记忆。每个组件的实例需要有拷贝 selector 的私有版本。我们还需要一种每个容器访问自己私有 selector 的方式。connect 的 mapStateToProps 函数可以帮助我们。如果 connect 的 mapStateToProps 返回的不是一个对象而是一个函数，他将被用做为每个容器的实例创建一个单独的 mapStateToProps 函数。

```
const makeMapStateToProps = () => {
  const getVisibleTodos = makeGetVisibleTodos()
  const mapStateToProps = (state, props) => {
    return {
      todos: getVisibleTodos(state, props)
    }
  }
  return mapStateToProps
}
```

### 实现撤销和重做

# 总结

Redux 提供 createStore（）方法
Store : getState() subscribe() dispatcher()

```
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

Reducer:
createrReducer()

```
const combineReducers= reducers=>{
  return (state={},action)=>{
    return Object.keys(reducers).reduce(
      (nextState,key)=>{
        nextState[key]= reducers[key](state[key],action)
      }
    )
  }
}
```

首先，用户发出 Action。然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。

State 一旦有变化，Store 就会调用监听函数。listener 可以通过 store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。异步操作中间件中间件就是一个函数，对 store.dispatch 方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。

const store = createStore(
reducer,
initial_state,
applyMiddleware(logger)
);

```
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}
```

上面代码中，所有中间件被放进了一个数组 chain，然后嵌套执行，最后执行 store.dispatch。可以看到，中间件内部（middlewareAPI）可以拿到 getState 和 dispatch 这两个方法。

## redux-thank 中间件:上面代码使用 redux-thunk 中间件，改造 store.dispatch，使得后者可以接受函数作为参数。而 store.dispatch 方法正常情况下，参数只能是对象，不能是函数。

异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？奥妙就在 Action Creator 之中。

dispatch(fetchPosts(selectedPost)) fetchPosts 就是 action creator

const fetchPosts = postTitle => (dispatch, getState) => {
dispatch(requestPosts(postTitle));
return fetch(`/some/API/${postTitle}.json`)
.then(response => response.json())
.then(json => dispatch(receivePosts(postTitle, json)));
};
};

// 使用方法一
store.dispatch(fetchPosts('reactjs'));
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
console.log(store.getState())
);
（1）fetchPosts 返回了一个函数，而普通的 Action Creator 默认返回一个对象。

（2）返回的函数的参数是 dispatch 和 getState 这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。

因此，异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用 redux-thunk 中间件改造 store.dispatch。

。另一种异步操作的解决方案，就是让 Action Creator 返回一个 Promise 对象。

# redux-promise 中间件

这个中间件使得 store.dispatch 方法可以接受 Promise 对象作为参数。这时，Action Creator 有两种写法。写法一，返回值是一个 Promise 对象。
const fetchPosts =
(dispatch, postTitle) => new Promise(function (resolve, reject) {
dispatch(requestPosts(postTitle));
return fetch(`/some/API/${postTitle}.json`)
.then(response => {
type: 'FETCH_POSTS',
payload: response.json()
});
});
写法二，Action 对象的 payload 属性是一个 Promise 对象。这需要从 redux-actions 模块引入 createAction 方法，import { createAction } from 'redux-actions';

class AsyncApp extends Component {
componentDidMount() {
const { dispatch, selectedPost } = this.props
// 发出同步 Action
dispatch(requestPosts(selectedPost));
// 发出异步 Action
dispatch(createAction(
'FETCH_POSTS',
fetch(`/some/API/${postTitle}.json`)
.then(response => response.json())
));
}

## 使用

React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。

### connect() 用于从 UI 组件生成容器组件

import { connect } from 'react-redux'

const VisibleTodoList = connect(
mapStateToProps,（输入）
mapDispatchToProps（输出）
)(TodoList)
connect 方法可以省略 mapStateToProps 参数，那样的话，UI 组件就不会订阅 Store，就是说 Store 的更新不会引起 UI 组件的更新。

## Provider

connect 方法生成容器组件以后，需要让容器组件拿到 state 对象，才能生成 UI 组件的参数。

一种解决方法是将 state 对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将 state 传下去就很麻烦。

React-Redux 提供 Provider 组件，可以让容器组件拿到 state。
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
<Provider store={store}>
<App />
</Provider>,
document.getElementById('root')
)
App 的所有子组件就默认都可以拿到 state 了.它的原理是 React 组件的 context 属性，请看源码。

## React-Router 路由库

使用 React-Router 的项目，与其他项目没有不同之处，也是使用 Provider 在 Router 外面包一层，毕竟 Provider 的唯一功能就是传入 store 对象。
const Root = ({ store }) => (
<Provider store={store}>
<Router>
<Route path="/" component={App} />
</Router>
</Provider>
);

## Redux

### Action

bindActionCreator()

### Reducer

.  纯函数，数据隔离， 深克隆，dispatcher 会触发所有的 Action...
combineReducers()
combination()

### Store

createStore()
改变状态方法 dispatcher
主要方法
getState()
dispatcher(action) subscribe(listner) replaceReducer(nextReducer)

### middleware

applymiddleware(...middleware)
compose()

### 与 react 结合

react-redux 提供 connect(mapstatetoprops,mapdispatchertoprops)(view)
