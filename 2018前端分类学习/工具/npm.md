## devDependencies 和 dependencies 的区别？

## npm install 和 npm i 的区别？

## npm 的本地模块引用；

https://juejin.im/post/5ab3f77df265da2392364341

1.  创建 config 包； config/index.js;
2.  定义 package.json
    {
    "name":"config",
    "main":"index.js",
    "version":"0.1.0"
    }
3.  应用层 package.json 中新增依赖，然后执行 npm install;或直接执行下一步

{
"dependencies":{
"config":"file:/config"
}
}

4.  npm install file:./config

## 开源 package 问题修复

，最好的办法应当是 fork 原作者的 git 库，在自己所属的 repo 下修复问题后，将 dependencies 中相应的依赖项更改为自己修复后版本的 git url 即可解决问题。

## 版本管理

主版本.小版本.修订号版本
