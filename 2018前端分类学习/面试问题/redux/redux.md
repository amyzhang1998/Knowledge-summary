## redux

1.  redux 的设计思想?
    Redux 的主要作用是管理程序的数据状态，redux 试图让 state 的变化可预测。redux 有三大原则，单一数据源，state,是只读的，只能通过 dispach action,通过纯函数 修改 state,

2.  如何设计状态树?
    state 树按照页面进行划分，模块与模块之间相互区分，每个页面维护自己的 reducer,，并且只在 store 中存入该页面展示或者变化的最小数据。用了 redux 必须通篇要用 store 中的 state，比较好的做法是结合 react 组件自己的 state 和 store 中的 state 一起使用。

3.  Redux 在状态管理方面解决了 React 本身不能解决的问题？
    react 本身不能解决数据的变化。数据不可预测。不可回溯。

Redux 状态管理器和变量挂载到 window 中有什么区别
介绍下 redux 整个流程原理
Redux 怎么实现属性传递，介绍下原理

2. 接入 redux 的过程

### react-redux

1,connect(mapStateToProps,mapDispatchToProps,mergeProps)
原理：dispatch 一个 action 更新到 store , conect 函数:
1):constructor:初始化选择器函数，初始化监听函数，监听 onStateChange。
如果没有传入 mapStateToPros，就不监听 store；
2)didmount,willProps 中 获取到 state,props
3), 根据不同类型值变化，产生不同的策略。
如果 state,变化，调用 mapStateToProps 计算
如果 props 发生变化，需要看 mapStateToPRops,mapDispatchToProps 是否依赖自己 props 来决定是否调用。

2, Redux 如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理?
组件通信：多个组件同时订阅一个数据源，
使用相同状态：

3, 多个组件之间如何拆分各自的 state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块？
使用自身 state + redux 状态管理

### 自己做过的 redux 封装

封装 reducer 函数
（1）： reducer 的复用。例如 createReducer
（2）：reducer 的增强,给每个 reducer 封装一层 wrapper，里面可以处理公共的一些 action 逻辑。
封装 action 函数
（1）：封装公共的 createAction 函数
(3): 封装针对特殊状态的中间件：处理特殊异步，

### middleware

1. Redux 中间件是什么东西，接受几个参数（两端的柯里化函数）
   const log = Store => next=>action ={
   console.log('start)
   next(action)
   console.log('end')
   }
   applymiddleware(log)
   log(store)(sotre.dispatch)
2. 柯里化函数两端的参数具体是什么东西?
   store:是初始化的 dispatch
   store.dispatch:是中间件强化包装更新后的 dispatch
3. 中间件是怎么拿到 store 和 action，然后怎么处理？
   中间件是通过 applyMiddleWare ，因为是闭包，共享了 store ，变量。
   action ，是 组件中触发动作时传入

4. Redux 中异步的请求怎么处理？
   (1) :redux-thunk
   export {dispatch,getState} => next=> action={
   if(typeof action === 'function'){
   return action(dispatch,getState)
   }
   return next(action)
   }
   (2):redux-promise

   function promiseMiddleware({dispatch}){
   return next=> action=>{
   if(!isFSA(action)){
   return isPromise(action)?action.then(dispatch):next(action)
   }
   return isPromise(action.payload)?
   action.payload.then(result=> dispatch({...action,payload:result}),error=>dispatch(...action,payload:error,error:error)return Promisereject(error)):next(action)
   }
   }

5. redux 请求中间件如何处理并发，
   中间件支持 promise.all
   const sequenceMiddleware = ({dispatch,getState})=>next=>action=>{
   if(!Array.isArray(action)){
   return next(action)
   }
   return action.reduce((result,currAction)=>{
   return result.then(()=>{
   return Array.isAction(currenAction)?Promise.all(currAction.map(item=>dispatche(item)):dispatch(currAction)
   })
   },Promise.resolve())
   }
