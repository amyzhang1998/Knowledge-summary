# nuxt 服务端渲染

## ssr 是什么？ssr 是怎么解决问题的？

## ssr 方案

- 开发分离发布合并。为搜索引擎和真实用户准备两套呈现逻辑，通过 HTML5 History 实现资源的统一，通过 noscript 分流机器和人，缺点是页面不能有复杂的交互，因为缺少数据和页面事件的处理机制。

## nuxt 内存泄露

## asyncData 是在编译时加载，还是 请求 时加载？

## nuxt 部署。

## nuxt 引起的内存溢出

## 提速

## 缓存的原理

## 缺点

1.  不能 异步按需加载
2.  目录结构不可变
3.  解决了 dev 环境，但是没能整合 sever 端，你用 nuxt 开发完，还得继续选择 express 或者 koa 等，来配置线上环境

## 坑

publicpath，多语言

## nuxt2 出来 了 体验版 nuxt-adge

## 其他网站

使用 vue seo 的高流量 网站，
http://www.bilibili.com
（1）TDK 描叙详细。
（2）提升网页加载速度：对外联 css,以及 js 使用了延迟加载以及 dns-prefetch，preload。
（3）外联较多，关键词排名高。
2） 掘金网站使用了 vue-meta-info 管理网站的 meta，应该配合使用了 prerender-spa-plugin 对 SEO 进行了优化。
3） Element 在 logo 上加了首页的地址，并且只有 logo 是放在 h1 标签中。
http://www.cdxtjy.com/swzpmrj/58.html seo 分析 方法

## 分析 内存泄露的方法

###. 定位原因

1.  出现大量的引用循环对象
2.  随着时间过去，问题复现。就可能是定时器上下文问题
3.  随着请求的堆积，问题复现。

4.  某些 dom 操作
5.  自动类型装箱转换
6.  定时器泄漏

###. 泄漏出现概率
业务代码 > 除框架外的三方代码（比如同事或其他团队写的代码） > 框架代码 > Node 本身问题

###. 方法

针对 1 原因，node 执行 gc ,如果内存恢复很多 ，就是存在大量循环引用。

### 工具
