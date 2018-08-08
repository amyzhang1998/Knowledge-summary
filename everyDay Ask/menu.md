## 2018.06.26

散列表（哈希表） 是什么？
散列表（Hash table，也叫哈希表），是根据键（Key）而直接访问在内存存储位置的数据结构。也就是说，它通过计算一个关于键值的函数，将所需查询的数据映射到表中一个位置来访问记录，这加快了查找速度。这个映射函数称做散列函数，存放记录的数组称做散列表。
提供的 包要支持服务端渲染，要满足什么条件？
URL 访问网站的网络传输全过程？
https://blog.csdn.net/Cloudox_/article/details/69669035
1、域名解析成 IP 地址
2、与目的主机进行 TCP 连接（三次握手）；
3、发送与收取数据；
4、与目的主机断开 TCP 连接（四次挥手）；

## 2018.06.27

浏览器允许的并发请求资源数是什么？
https://www.zhihu.com/question/20474326
cdn 是什么？cdn 能托管一些什么文件？ cdn 支持多域名吗？
https://www.zhihu.com/question/36514327?rf=37353035
cdn 内容分发网络。DN 主要功能是在不同的地点缓存内容，通过负载均衡技术，将用户的请求定向到最合适的缓存服务器上去获取内容，与传统访问方式不同，CDN 网络则是在用户和服务器之间增加缓存层，将用户的访问请求引导到最优的缓存节点而不是服务器源站点，从而加速访问速度。
（1） 系统访问量高了，速度变慢需要优化系统部署。
方式：读写分离，负载均衡
资源服务器和应用服务器分离
（2)网络方面的优化
cdn 一般存放 js,css
(3)优点：
为了实现跨运营商，跨地域的全网覆盖
为了保障你的网络安全
为了异地缓存
为了节约成本投入
（4） 适用场景
网站站点、应用加速
移动应用加速  
视音频点播/大文件下载分发加速
前端每次发起请求 是怎么携带 cookie 的？
axios:axios.defaults.withCredentials
使用 log4js
怎么让自己的包 支持服务端渲染？

## 2018.06.29

1, 浏览器怎么支持 delete 方式？
2， node 对 es6（javascript）语法的支持程度？
3， 服务端渲染网页需要响应的模板文件？ koa-nunjucks-promise 流行的有 jade(对前端来说不直观)
4, redis 是什么？
5, babel-register 是什么？
6 ， webpack style-loader 的加载原理？为什么不适合 ssr?

## 2018.07.06

dom-to-image 和 html2canvas 两个库整和 dom 元素 到 图片的方式和 区别？
base64
css 隐藏元素的功能和区别？
background-size 属性的区别
怎么让 dom 转出的图片不失真

## 2018.0709

graphQL 是什么？
url-loader 限制 图片 的大小 转成 base64 字节流 的原理？
新的 数据流工具
https://github.com/microstates/microstates.js?utm_source=gold_browser_extension
html 转 url
https://github.com/alcor/itty-bitty?utm_source=gold_browser_extension
宋小菜

## 2018.0727

1,vuex-class 是怎么实现 namespace 的
2,vue-property-decorator 实现装饰器 配合 Ts
3,mapGetters 与 Vue 组件的 关系，（初始化 vue 组件时，store 是怎么存储的 ）
4,vue 和 vuex 之间是怎么监听数据变化的？

## 2018.0803

1，js 引擎是什么？
http://web.jobbole.com/84351/
2， 不同 js 引擎的工具
**jsvu** 搭配 **eshost-cli** 运行 js 脚本 /

### 工具

网页版 ppt
**reveal.js**

## 2018.0804

vuevalidate 和 普通的验证 有什么区别？ 各种验证的库 都时基于什么样的设计理念 ？？？
