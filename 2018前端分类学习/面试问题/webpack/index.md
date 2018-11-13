## webpack

1. webpack 打包的整个过程？
   http://taobaofed.org/blog/2016/09/09/webpack-flow/

2. webpack 事件节点：
   compile 开始编译
   make 从入口点分析模块及其依赖的模块，创建这些模块对象（）
   build-module 构建模块 （loader 和转成 ast,和收集依赖和处理依赖）
   after-compile 完成构建
   seal 封装构建结果
   emit 把各个 chunk 输出到结果文件
   after-emit 完成输出

1) webpack 优化
   （1）webpack 是一个基于 node 的前端打包工具，但是 node 基于 v8 运行时只能是单线程，但是 node 中能够 fork 子进程。所以我们可以使用多进程的方式运行 loader，和压缩 js，社区有两个插件就是专门干这两个事的：HappyPack、ParallelUglifyPlugin。
   （2）打出 dll 包
   webpack 4 默认配置会抽取出入口文件的额异步加载的包，并将三方包抽取到 vendor 中，（不会重复）
   （3）支持 tree-shaking ,将 babel 的 module:false 配合 stage-2,comments: true

1) tree-shaking 原理
   （1） es6 模块引入是静态分析的，故而可以在编译阶段判断加载什么代码
   （2）：分析程序流，判断哪些变量未被使用、引用，进而删除此代码。
1) import { Button } from 'antd'，打包的时候只打包 button，分模块加载，是怎么做到的。
   (1)antd 当开发者以 es6 模块的方式去加载 npm 包时，会已 module 的值为入口。
   (2)webpack 开启 treeShaking 模式，静态分析模块。
   (3) webpack 模块加载，把 三方包打入统一的 vendor 中

   2，使用 import 时，webpack 对 node_modules 里的依赖会做什么

   webpack 生命周期
   常用的 plugins
   webpack 怎么实现 code spliting 动态路由加载？
   1，webpack 实现 commonjs 模块加载？

```
let a =require('bar')
exports.bar = function(){}

-----
(
    function(module){
       function __webpack.require__(moduleId){
           1,是否已缓存
           2，缓存模块{id,l,exports}
           3,调用模块函数
           4，module.l = true
           5,return module.exports
       }
    }
)(
    [function(module,exports,__webpack.require__){
        var bar = __webpack.require__(1)
        bar()
    }]
)
```

2，webpack 实现 es 模块加载？
3,怎么实现 codeSpliting
webpack 通过**webpack_require**.e 函数实现了动态加载，再通过 webpackJsonp 函数实现异步加载回调，把模块内容以 promise 的方式暴露给调用方，从而实现了对 code splitting 的支持。
1）, 动态加载模块，通过动态插入 script 脚本
2）， 处理模块加载的回调，

### webpack 插件是怎么实现的？

webpack ,提供两个资源就是 compiler 和 compilation 对象
1，定义 apply 方法，
2， 指定一个绑定到 webpack 事件钩子，compiler.hooks.compile.takpAsync
3,使用 webpack 提供的 webpack api 操作构建结果。 compilation.addModule()

### webpack 整个生命周期，loader 和 plugin 有什么区别

webpack 和 gulp 的优缺点

3. 如何实现分模块打包（多入口）？
   使用多入口配合 commonChunkPlugin
   { 'mian':'','user':['ddd']}
   webpack.optimize.CommonsChunkPlugin({ name:'user', // 上面入口定义的节点组
   filename:'build-user.js' //最后生成的文件名})

## dev-server 是怎么跑起来的？

1. 首先 webpack-dev-server :有自己的配置： 类似 host,起了一个 node 服务。
2. merge 了 webpack 的配置文件
3. 通过 webpack 的 loder 将源文件转换成可识别的 js ,css
4. 通过一些 weboack 内置的 plugin 输出 文件

5. webpack 如何配 sass，需要配哪些 loader?配 css 需要哪些 loader?
   css-loader 是处理 css 文件中的 url() @import 等
   style-loader 将 css 插入到页面的 style 标签
   顺便告诉你
   less-loader 是将 less 文件编译成 css
   sass-loader 是将 sass 文件编译成 css
   css-loader 是将 css 装载到 javascript；style-loader 是让 javascript 认识 css，require 时用

6. 使用 webpack 构建时有无做一些自定义操作?
   自己写过一个插件。
   compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {}

打包时 Hash 码是怎么生成的
随机值存在一样的情况，如何避免
