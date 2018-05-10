 #VUE
 ## 全局api
 1. Vue.use(plugin),使用插件
 >
 ### provide/inject
 > 这对选项需要成对，使用。允许祖先组件向所有后代注入一个依赖，
 provide 是一个对象或函数
 ### watch 监听函数
 > 键是需要观察的表达式，值是对应的回调函数。也可以是函数名，或者包含选项的对象。实例化时调用。

 ## VUE组件
 1. 组件之间信息传递
 >在 Vue 中，父子组件的关系可以总结为 **prop 向下传递，事件向上传递**。父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息。
## 生命周期

Created：vue实例被生成后的一个生命周期钩子函数。(页面初始化数据加载一般写这里);
beforeCreate：给个loading界面 created撤销loading;
beforeDestory：你确认删除XX吗？
destoryed：当前组件已被删除，清空相关内容
## 选项/数据
1. data
2. props
3. methods
4. computed
5. watch
类型：array<string>|object
## 实例属性
1. vm.$data() object
## 实例方法/事件
1. vm.$emit(event,[...args])//出发当前实例上的事件，附加参数都会传给监听器回调。
2. vm.$on(event,callback)
参数：{string|Array<string> event}
{function} callback
用法：监听当前实例上的自定义事件，事件可以由 vm.$emit触发。
3. vm.$off([])
4. vm.$once(event,callback)//监听一个自定义事件，在第一次触发之后移除监听器
# vue 服务端渲染 nuxt.js
# vueX
