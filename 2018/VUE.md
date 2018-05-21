# VUE

## 全局 api

1.  Vue.use(plugin),使用插件

### provide/inject

> 这对选项需要成对，使用。允许祖先组件向所有后代注入一个依赖，

provide 是一个对象或函数

### watch 监听函数

> 键是需要观察的表达式，值是对应的回调函数。也可以是函数名，或者包含选项的对象。实例化时调用。

## VUE 组件

1.  组件之间信息传递
    > 在 Vue 中，父子组件的关系可以总结为 **prop 向下传递，事件向上传递**。父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息。

## 生命周期

过程

> 设置数据监听，编译模板，将实例挂载到 dom 并在数据变化时更新 dom 等。

0.  init Events & LifeCycle
1.  beforeCreate
    1.1 init injections & reactivety

1.  created

1.  beforeMount
1.  mounted
1.  beforeUpdate
1.  updated
1.  destroyed

Created：vue 实例被生成后的一个生命周期钩子函数。(页面初始化数据加载一般写这里);
beforeCreate：给个 loading 界面 created 撤销 loading;
beforeDestory：你确认删除 XX 吗？
destoryed：当前组件已被删除，清空相关内容

## 选项/数据

1.  data
2.  props
3.  methods
4.  computed
5.  watch

类型：array<string> |object

## 实例属性

> 只有实例被创建时，data 中的属性才是响应式的。例外是 使用 Object.freeze()的对象,响应系统不会再追踪变化。

1.  vm.$data() object

## 实例方法/事件

1.  vm.$emit(event,[...args])//出发当前实例上的事件，附加参数都会传给监听器回调。
2.  vm.$on(event,callback)

参数：{string|Array <string> event}

{function} callback
用法：监听当前实例上的自定义事件，事件可以由 vm.$emit 触发。

3.  vm.$off([])
4.  vm.$once(event,callback)//监听一个自定义事件，在第一次触发之后移除监听器

## 模板语法

### 插值

模板表达式 都被放在 沙盒中，只能访问 全局变量的一个白名单，如 math 或 Date,不应该在模板表达式中视图访问用户定义的全局变量。

### 指令

指令的职责是，当表达式的 值发生变化时，将其产生的连带影响，响应式的作用于 DOM,

### 指令参数

v-bind:href; v-bind:click

### 指令修饰符

v-on:submit.prevent:对于触发的事件 调用 event.preventDefault()。
v-on:focus.native='onFocus'
v-bind:title.sync ='doc.title'
v-on:update:title="doc.title=$event"
v-bind.sync ='doc'//doc 是一个对象。这样会把 doc 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

## 计算属性 和侦听器

computed:function(){...}//计算属性的 getter 函数。计算属性默认只有 getter，在需要时也可以写 setter

> 计算属性 与普通的方法相比的区别？
> **计算属性是基于他们的依赖进行缓存的，只有相关依赖进行变化时，才会重新求值。**

## 计算属性 vs 侦听属性

避免滥用 侦听属性。 当需要在数据变化时*执行异步或开销较大*的操作时，侦听属性比较有效。

## 条件渲染

v-if 和 v-show:
v-show: 元素始终会被渲染并保留在 dom 中。

1.  v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
2.  v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
3.  相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
4.  一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

v-for 比 v-if 有更高的优先级

## 组件

Vue.component()

### 模块系统

可以使用 **require.context** 全局注册这些通用的基础组件

### Prop

prop 会在一个组件实例创建之前进行验证的。所以实例的属性 data ,computed 等在 验证属性的 default 或 validator 函数中是不可用的。

#### 验证

String Number Boolean Function Object Array Symbol

```
propA:Number
propB:[String,Number]
propC:{
  type:String,
  required:true,
  default:'ddd'
}
propD:{
  type:Object,
  default:function(){return...},
  validator:function(){return...}
}
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

propF:Person;//验证prop的值 是否是通过 new Person 创建的、
```

### 禁用 特性继承

inheritAttrs:false; 与 $attrs 实例属性配合使用。
$attrs:包含负作用域中不作为 prop 被识别的实例特性绑定（class 和 style 除外）。可以通过 v-bind:"$attrs"传入内部组件
$listrners 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

## 插槽 slot

1.  具名插槽
2.  作用域插槽，解构 slot-scope
3.  编译作用域：**父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译。**

## 动态组件&异步组件

<keep-alive>

new Vue({
components:{
'my-component:()=>import('./my-async-component)
}
})

## 处理边界情况

这也是我们针对需要向任意更深层级的组件提供上下文信息时推荐依赖注入的原因。

### 依赖注入&provide&inject

provide 选项允许我们指定我们想要提供给后代组件的数据/方法。然后使用 inject 选项来接收指定的我们想要添加在实例上的属性

### 程序化的事件侦听器

* 通过 $on(eventName, eventHandler) 侦听一个事件
* 通过 $once(eventName, eventHandler) 一次性侦听一个事件
* 通过 $off(eventName, eventHandler) 停止侦听一个事件

### vue 服务端渲染 nuxt.js

### vueX
