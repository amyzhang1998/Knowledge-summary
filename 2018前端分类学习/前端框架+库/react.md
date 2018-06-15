# react

## react

http://www.infoq.com/cn/articles/subversion-front-end-ui-development-framework-react
至于 React 如何做到将原来 O(n^3)复杂度的 Diff 算法降低到 O（n），大家可以参考这篇文章。
https://facebook.github.io/react/docs/reconciliation.html

> 优点（原理）:
>
> 1.  :虚拟 DOM：在 Web 开发中，我们总需要将变化的数据实时反应到 UI 上，这时就需要对 DOM 进行操作。而复杂或频繁的 DOM 操作通常是性能瓶颈产生的原因（如何进行高性能的复杂 DOM 操作通常是衡量一个前端开发人员技能的重要指标）。React 为此引入了虚拟 DOM（Virtual DOM）的机制：在浏览器端用 Javascript 实现了一套 DOM API。基于 React 进行开发时所有的 DOM 构造都是通过虚拟 DOM 进行，每当数据变化时，React 都会重新构建整个 DOM 树，然后 React 将当前整个 DOM 树和上一次的 DOM 树进行对比，得到 DOM 结构的区别，然后仅仅将需要变化的部分进行实际的浏览器 DOM 更新。

2.  而且 React 能够批处理虚拟 DOM 的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从 A 变成 B，然后又从 B 变成 A，React 会认为 UI 不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。
3.  尽管每一次都需要构造完整的虚拟 DOM 树，但是因为虚拟 DOM 是内存数据，性能是极高的，而对实际 DOM 进行操作的仅仅是 Diff 部分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的 DOM 元素，而只需要关心在任意一个数据状态下，整个界面是如何 Render 的。当一条新的消息过来时，传统开发的思路如上图，你的开发过程需要知道哪条数据过来了，如何将新的 DOM 结点添加到当前 DOM 树上；而基于 React 的开发思路如下图，你永远只需要关心数据整体，两次数据之间的 UI 如何变化，则完全交给框架去做。

## context

https://segmentfault.com/a/1190000002878442

> 父组件往子组件传数据父组件指定：
>
> ```
> static contextTypes ={
> name:React.PropTypes.string;
> } 或者
> static childContextTypes={
> name:React.PropTypes.string
> }
> 父组件将数据注入到context里
> static getChildContext={
> name:'amy'}
>
> 子组件声明，获取context
> static contextTypes={
> name:React.Component.string
> }
> ```

> ```
>
> ```

## 优化

减少 DOM 对比
return false;就不会对比

```
shouldComponentUpdate(nextProps,nextState){
return this.props.value.foo !== nextProps.value.foo;
}
```

> 总结：shouldComponentUpdate 里面的 nextProps 比较是根据数据的指针指向，如果 nextProps 和 this.props 的数据指向不同，两者永远不会相等。所以建议使用不可变数据。
>
> ```
> object.assign({},colorMap,{right:blue}) or
> {...colormap,right:blue};//扩展运算符
> ```
>
> 父组件 setState()或 forceUpdate()则子组件跟着重新渲染，走 Updating 阶段。子组件重新渲染不会影响父组件。父组件 forceUpdate()则会跳过 shouldComponentUpdate();不会影响子组件

```
const words = this.state.words;
    words.push('marklar');//数据指向没有改变
    this.setState({words: words});

    const a = ['3']
    this.setState({words:a})//指向改变；


  class A extends React.PureComponent{}
```

React.Component 可以替代 shouldComponentUpdate

## React.PropTypes

```
MyComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  optionalArray: React.PropTypes.array,
  optionalBool: React.PropTypes.bool,
  optionalFunc: React.PropTypes.func,
  optionalNumber: React.PropTypes.number,
  optionalObject: React.PropTypes.object,
  optionalString: React.PropTypes.string,
  optionalSymbol: React.PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: React.PropTypes.node,

  // A React element.
  optionalElement: React.PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: React.PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: React.PropTypes.shape({
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: React.PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: React.PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  customArrayProp: React.PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

## react

> 1 .专注视图层
> Virtual DOM
> 函数式编程：react 把过去不断重复构建 UI 的过程抽象成了组件，且在给定参数的情况下，约定渲染对应的 UI 界面。React 能充分利用很多函数式方法去减少冗余代码，此外，由于它本身是简单函数，所以容易测试。所以函数式编程才是 react 精髓。创建元素是通过 React.createElement()函数，所以标签一定要是闭合的。元素类型：Dom 元素和组件元素
> react 会将所有要显示到 Dom 的字符串转义，防止 XSS。
> react 的本质是关心元素的构成，react 组件即为组件元素。组件元素被描述成纯粹的 JSON 对象，意味着可以使用方法或是类来构建。
>
> ```
> const Button =
> React.createClass({ getDefaultProps(){},render(){return()}});
> //调用几次Button就会创建几次实例。
> class Button extends React.Component{
> }//也会创建实例
> function BUtton({color='ddd'}){
> return()}//无状态函数，构建的组件称为无状态组件，不存在state，也没有生命周期，其在创建时只会保持一个实例，避免了不必要的检查和内存分配。做到了内部优化。
> ```

### 2,组件间抽象

针对 react ，重点讨论，mixin 和高阶组件。

#### mixin

作用：创造一种类似多重继承的效果，或者说是组合。

> react 在用 ES6 组件构建模块时，就不支持 mixin 了。使用 decorator 语法糖（运用在运行时）就可以实现 ES6 中的 mixin。

````
//core-decorator库
import { getOwnPropertyDecorators } from './private/utils';
const { defineProperty } = object;
function handleClass(target,mixins){
if (!mixins.length) {
throw new SyntaxError('hh')
}
for (let i = 0; l = mixins.length, i < 1; i++){
const desc = getOwnPropertyDecorators(mixins[i]);
for (const key in mixin[i]) {
if (!(key in target.property)) {
defineProperty(target.property,key,desc[key])}}}
}
export default function mixin(...mixins) {
if (typeof mixins[0] == 'function') {
return handleClass(mixins[0], []);
} else {
return target => {
return handleClass(target,mixins)  
};}}
@minxin(PureComponent,Theme)
> ```

> mixin 的问题
> 1，破坏了原有组件的封装
> 2，命名冲突
> 3，增加复杂性，
> ```

### 高阶组件

高阶函数：这种函数接受函数作为输入，或是输出一个函数，常用的工具方法：map,reduce,sort,
高阶组件，就是接受 react 组件作为输入，然后输出一个高阶组件。高阶组件让代码更具有复用性，逻辑性和抽象特性。实现高阶组件的方式有两种：
1，属性代理：高阶组件通过被包裹的 React 组件来操作 props;{可用装饰器的写法，简化调用}
2,反向继承：高阶组件继承于被包裹的 React 组件。

使用属性代理时，调用顺序不同于 mixin，生命周期的调用类似于堆栈调用

> 高阶组件符合函数式编程思想，对于原组件说，并不会感知到高阶组件的存在，只需要把功能套在她之上就行了，可以避免 mixin 产生的副作用。

### 组件性能优化

> 减少浏览器的重排和重绘
> react 提出的一个快捷的方法就是 pureRender
> 纯函数由三大原则构成
> 1，给定相同的输入，他总是返回相同的输出，
> 2，过程没有副作用。
> 3，没有额外的状态依赖
> pureRender 的本质原理是重新实现了 shouldComponentUpdate()生命周期方法。让当前传入的 props 和 state 与之前的做浅比较。以下几种类型都会出发 pureRender 为 true
> 1,直接为 props 设置对象和数组。 2.设置子组件（可通过父组件使用 pureRender 来避免）使用 Immutable 好处持久化的数据结构
> 1，降低了‘可变’带来的复杂度 2.节省内存（Immutable 使用结构共享尽量覆盖内存。）
> 3，拥抱函数式编程。缺点容易与原生对象混淆（使用特定的变量名命名避免，比如$$,使用 Immutable.fromJS 而不是 Immutable.map（）来创建对象）

### react 动画

### 解读 react 源码

## Higher Order Components(HOC)
````

const loaderHOC = (propName)=>(WrappedComponent)=>{
return class loaderHOC extends Component {
empty(prop){
return (
prop === null|| prop === undefiend||
(prop.hasOwnProperty('length')&&prop.length === 0)||
(props.constructor === object&& Object,keys(prop).length ===0)
)
}

    render(){
      const myProps={}
      return this.empty(this.props.proName)?<div className='loader'> </div>:<WrappedComponent {...this.props}{..myProps}/>
    }

}
}
export default loaderHOC

```
## Functions as Child Component

## 生命周期

为什么 react 会按顺序执行？为什么多次渲染会执行不同的阶段。通过递归循环队列

### 为什么 defaultProps 只执行一次？？

因为是通过构造函数进行管理的

### setState 机制 是通过状态队列机制实现异步更新

为什么 SetState 要设计成异步的？利用 javascript 的异步线程，合并 setState 次数。

## React 16 大致有以下改变：

新的 Fiber render 引擎：以支持许多原来做不到的关于 render 的特性支持非阻塞式渲染
render 支持 fragments (数组) 与字符串类型支持 Error 边界捕获添加 ReactDOM.createPortal 方法来进行组件 DOM 节点之外的渲染，这个特性使得模态框、popover、tooltip 之类的渲染变得更加方便。BTW, 这个本来是另一个开源库的思路： tajo/react-portal
支持 stream 的 server side render
减少的体积：大致减少了 30% 的文件体积

### 可能需要关注的 Breaking Changes:

unstable_renderIntoContainer, unstable_handleError 等之前的内部特性有改变，如果有依赖库用到了的话可能需要注意生命周期的顺序更加稳定，尤其是子节点的 componentWillMount 总会发生在父节点的 componentWillUnmount 之前
componentDidUpdate 方法不再能够获取 prevContext 参数
Shallow Renderer 不再调用 componentDidUpdate 方法，并且不再提供 unstable_batchedUpdates 方法（这个似乎会影响到一些之前的测试代码）不再有 react-with-addons.js 这个库。目测这个之后会有开源库来提供类似功能，但 React 官方提倡的是分别引用不同的 npm 库来做 addons 的事情

总结：
React 通过三种状态：MOUNTING、RECEIVE_PROPS、UNMOUNTING，管理整个生命周期的执行顺序；
setState 会先进行 \_pendingState 更新队列的合并操作，不会立刻 reRender，因此是异步操作，且通过判断状态（MOUNTING、RECEIVE_PROPS）来控制 reRender 的时机；
```

## setState 原理 （batchUpdate 设计）

1.  setState 只是把变化存入一个临时队列中，那么新的 state 究竟是如何生效的呢？

> 当一次 DOM 事件触发后，ReactEventListener.dispatchEvent 方法会被调用。而这个方法并不是急着去调用我们在 JSX 中指定的各种回调，而是调用了 ReactUpdates.batchedUpdates 方法，该方法 会执行一个 transaction,其 核心内容就是找到事件对应的所有节点并依次对这些节点 triiger 事件。实际上，Transacation 就是给需要执行的函数封装了两个 wrapper，每个 wrapper 都有 initialize 和 close 方法。当一个 transaction 需要执行（perform）的时候，会先调用对应的 initialize 方法。同样的，当一个 transaction 执行完成后，会调用对应的 close 方法。

## Fiber:新的调度算法

Fiber 可以提升复杂 React 应用的可响应性和性能。
state 变化 react 会重新计算，如果计算量过大，浏览器的主线程就来不及做其他的事情，比如 rerender 或 layout.
React 制定了一种名为 Fiber 的数据结构，加上新的算法，使得大量的计算可以被拆解，**异步化**，浏览器主线程得以释放，保证了渲染的帧率。从而提高响应性。
痛点：调用栈 过深且不可 打断。
想要实现的是： 随意操纵这些 调用栈，需要一个任务调度器，可以暂停一个任务 ，一会再 执行。

## react16 之前 的痛点

https://zhuanlan.zhihu.com/p/37095662

- 弹窗问题，之前一直使用不稳定的 unstable_renderSubtreeIntoContainer。弹窗是依赖原来 DOM 树的上下文，因此这个 API 第一个参数是组件实例，通过它得到对应虚拟 DOM，然后一级级往上找，得到上下文。它的其他参数也很好用，但这个方法一直没有转正。。。
- 异常处理，我们想知道哪个组件出错，虽然有了 React DevTool，但是太深的组件树查找起来还是很吃力。希望有个方法告诉我出错位置，并且出错时能让我有机会进行一些修复工作
- HOC 的流行带来两个问题，毕竟是社区兴起的方案，没有考虑到 ref 与 context 的向下传递。
- 组件的性能优化全凭人肉，并且主要集中在 SCU，希望框架能干些事情，即使不用 SCU，性能也能上去。

### 解决进度

16.0 让组件支持返回任何数组类型，从而解决数组问题; 推出 createPortal API ,解决弹窗问题; 推出 componentDidCatch 新钩子， 划分出错误组件与边界组件， 每个边界组件能修复下方组件错误一次， 再次出错，转交更上层的边界组件来处理，解决异常处理问题。
16.2 推出 Fragment 组件，可以看作是数组的一种语法糖。
16.3 推出 createRef 与 forwardRef 解决 Ref 在 HOC 中的传递问题，推出 new Context API，解决 HOC 的 context 传递问题（主要是 SCU 作崇）
而性能问题，从 16.0 开始一直由一些内部机制来保证，涉及到批量更新及基于时间分片的限量更新。

究其原因是因为浏览器是单线程，它将 GUI 描绘，时间器处理，事件处理，JS 执行，远程资源加载统统放在一起。当做某件事，只有将它做完才能做下一件事。如果有足够的时间，浏览器是会对我们的代码进行编译优化（JIT）及进行热代码优化，一些 DOM 操作，内部也会对 reflow 进行处理。reflow 是一个性能黑洞，很可能让页面的大多数元素进行重新布局。
因此 React 团队称 React16 之前的调度器为栈调度器，栈没有什么不好，栈显浅易懂，代码量少，但它的坏处不能随意 break 掉，continue 掉。根据我们上面的实验，break 后我们还要重新执行，我们需要一种链表的结构
因此 Reat16 设法将组件的递归更新，改成链表的依次执行。如果页面有多个虚拟 DOM 树，那么就将它们的根保存到一个数组中。

## 如何调度时间才能保证流畅

1.  requestAnimationFrame
2.  requestIdleCallback
3.  web worker
4.  IntersectionObserver
    我们依次称为浏览器层面的帧数控制调用，闲时调用，多线程调用， 进入可视区调用。
    requestAnimationFrame 在做动画时经常用到，jQuery 新版本都使用它。web worker 在 angular2 开始就释出一些包，实验性地用它进行 diff 数据。IntersectionObserver 可以用到 ListView 中。而 requestIdleCallback 是一个生脸孔，而 React 官方恰恰看上它。

刚才说 updateFiberAndView 有出两个时间段，一个给自己的，一个给浏览器的。requestAnimationFrame 能帮我们解决第二个时间段，从而确保整体都是 60 帧或 75 帧（这个帧数可以在操作系统的显示器刷新频率中设置）流畅运行。

## 批量更新：batchUpdates

可以说，setState 是对单个组件的合并渲染，batchedUpdates 是对多个组件的合并渲染。合并渲染是 React 最主要的优化手段。

## 为什么使用深度优化遍历

## 任务系统

## 中间件系统

## react 合成事件

DOM 事件代理系统：1）基于选择器的；2）基于 virtual-dom 的
