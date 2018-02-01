# react
## react
http://www.infoq.com/cn/articles/subversion-front-end-ui-development-framework-react
至于React如何做到将原来O(n^3)复杂度的Diff算法降低到O（n），大家可以参考这篇文章。
https://facebook.github.io/react/docs/reconciliation.html
>优点（原理）:
>1:虚拟DOM：
在Web开发中，我们总需要将变化的数据实时反应到UI上，这时就需要对DOM进行操作。而复杂或频繁的DOM操作通常是性能瓶颈产生的原因（如何进行高性能的复杂DOM操作通常是衡量一个前端开发人员技能的重要指标）。React为此引入了虚拟DOM（Virtual DOM）的机制：在浏览器端用Javascript实现了一套DOM API。基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的浏览器DOM更新。而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从A变成B，然后又从B变成A，React会认为UI不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。尽管每一次都需要构造完整的虚拟DOM树，但是因为虚拟DOM是内存数据，性能是极高的，而对实际DOM进行操作的仅仅是Diff部分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素，而只需要关心在任意一个数据状态下，整个界面是如何Render的。
当一条新的消息过来时，传统开发的思路如上图，你的开发过程需要知道哪条数据过来了，如何将新的DOM结点添加到当前DOM树上；而基于React的开发思路如下图，你永远只需要关心数据整体，两次数据之间的UI如何变化，则完全交给框架去做。

## context
https://segmentfault.com/a/1190000002878442
>父组件往子组件传数据
>父组件指定：
>
> ```
> static contextTypes ={
> name:React.PropTypes.string;
>} 或者
>static childContextTypes={
>name:React.PropTypes.string
>}
>父组件将数据注入到context里
>static getChildContext={
>name:'amy'}
>
>子组件声明，获取context
>static contextTypes={
>name:React.Component.string
>}

> ```
>

## 优化
减少DOM 对比
return false;就不会对比

```
shouldComponentUpdate(nextProps,nextState){
return this.props.value.foo !== nextProps.value.foo;
}
```

>总结：shouldComponentUpdate里面的nextProps比较是根据数据的指针指向，如果nextProps和this.props的数据指向不同，两者永远不会相等。所以建议使用不可变数据。
>
>```
>object.assign({},colorMap,{right:blue}) or
>{...colormap,right:blue};//扩展运算符
>```
>父组件setState()或forceUpdate()则子组件跟着重新渲染，走Updating阶段。子组件重新渲染不会影响父组件。
>父组件forceUpdate()则会跳过shouldComponentUpdate();不会影响子组件

```
const words = this.state.words;
    words.push('marklar');//数据指向没有改变
    this.setState({words: words});
    
    const a = ['3']
    this.setState({words:a})//指向改变；
  
  
  class A extends React.PureComponent{}
```
React.Component可以替代shouldComponentUpdate


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
>1 .专注视图层
>Virtual DOM
>函数式编程：react 把过去不断重复构建UI的过程抽象成了组件，且在给定参数的情况下，约定渲染对应的UI界面。React能充分利用很多函数式方法去减少冗余代码，此外，由于它本身是简单函数，所以容易测试。所以函数式编程才是react精髓。
>创建元素是通过React.createElement()函数，所以标签一定要是闭合的。
>元素类型：Dom元素和组件元素
>react会将所有要显示到Dom的字符串转义，防止XSS。
>react 的本质是关心元素的构成，react组件即为组件元素。组件元素被描述成纯粹的JSON对象，意味着可以使用方法或是类来构建。
>
>```
>const Button = 
>React.createClass({ getDefaultProps(){},render(){return()}});
>//调用几次Button就会创建几次实例。
>class Button extends React.Component{
>}//也会创建实例
>function BUtton({color='ddd'}){
>return()}//无状态函数，构建的组件称为无状态组件，不存在state，也没有生命周期，其在创建时只会保持一个实例，避免了不必要的检查和内存分配。做到了内部优化。
>```

### 2,组件间抽象
针对react ，重点讨论，mixin 和高阶组件。
#### mixin
作用：创造一种类似多重继承的效果，或者说是组合。
>react在用ES6组件构建模块时，就不支持mixin了。使用decorator语法糖（运用在运行时）就可以实现ES6中的mixin。
>
>```
>//core-decorator库
>import { getOwnPropertyDecorators } from './private/utils';
const { defineProperty } = object;

function handleClass(target,mixins){
    if (!mixins.length) {
       throw new SyntaxError('hh')
    }
    for (let i = 0; l = mixins.length, i < 1; i++){
        const desc = getOwnPropertyDecorators(mixins[i]);
        for (const key in mixin[i]) {
            if (!(key in target.property)) {
                defineProperty(target.property,key,desc[key])
            }
        }
    } 
}
export default function mixin(...mixins) {
    if (typeof mixins[0] == 'function') {
        return handleClass(mixins[0], []);
    } else {
        return target => {
          return handleClass(target,mixins)  
        };
    }
}
@minxin(PureComponent,Theme)
class MyConponent extends Component{

}
>```
> mixin 的问题
> 1，破坏了原有组件的封装
> 2，命名冲突
> 3，增加复杂性，
>
### 高阶组件
高阶函数：这种函数接受函数作为输入，或是输出一个函数，常用的工具方法：map,reduce,sort,
高阶组件，就是接受react组件作为输入，然后输出一个高阶组件。
高阶组件让代码更具有复用性，逻辑性和抽象特性。
实现高阶组件的方式有两种：
1，属性代理：高阶组件通过被包裹的React组件来操作props;{可用装饰器的写法，简化调用}
2,反向继承：高阶组件继承于被包裹的React组件。

使用属性代理时，调用顺序不同于mixin，生命周期的调用类似于堆栈调用
>高阶组件符合函数式编程思想，对于原组件说，并不会感知到高阶组件的存在，只需要把功能套在她之上就行了，可以避免mixin产生的副作用。

### 组件性能优化
>减少浏览器的重排和重绘
>react提出的一个快捷的方法就是pureRender
>纯函数由三大原则构成
>1，给定相同的输入，他总是返回相同的输出，
>2，过程没有副作用。
>3，没有额外的状态依赖
>pureRender的本质
>原理是重新实现了shouldComponentUpdate()生命周期方法。让当前传入的props和state与之前的做浅比较。
>以下几种类型都会出发pureRender为true
>1,直接为props设置对象和数组。
>2.设置子组件（可通过父组件使用pureRender来避免）
>使用Immutable 好处
>持久化的数据结构
>1，降低了‘可变’带来的复杂度
>2.节省内存（Immutable使用结构共享尽量覆盖内存。）
>3，拥抱函数式编程。
>缺点
>容易与原生对象混淆（使用特定的变量名命名避免，比如$$,使用Immutable.fromJS而不是Immutable.map（）来创建对象）
### react 动画
### 解读react源码
## Higher Order Components(HOC)

```
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
## React 16 大致有以下改变：
新的 Fiber render 引擎：以支持许多原来做不到的关于 render 的特性
支持非阻塞式渲染
render 支持 fragments (数组) 与字符串类型
支持 Error 边界捕获
添加 ReactDOM.createPortal 方法来进行组件 DOM 节点之外的渲染，这个特性使得模态框、popover、tooltip 之类的渲染变得更加方便。BTW, 这个本来是另一个开源库的思路： tajo/react-portal
支持 stream 的 server side render
减少的体积：大致减少了 30% 的文件体积
### 可能需要关注的 Breaking Changes:
unstable_renderIntoContainer, unstable_handleError 等之前的内部特性有改变，如果有依赖库用到了的话可能需要注意
生命周期的顺序更加稳定，尤其是子节点的 componentWillMount 总会发生在父节点的 componentWillUnmount 之前
componentDidUpdate 方法不再能够获取 prevContext 参数
Shallow Renderer 不再调用 componentDidUpdate 方法，并且不再提供 unstable_batchedUpdates 方法（这个似乎会影响到一些之前的测试代码）
不再有 react-with-addons.js 这个库。目测这个之后会有开源库来提供类似功能，但 React 官方提倡的是分别引用不同的 npm 库来做 addons 的事情





