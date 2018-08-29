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

## package.json

### module 字段

https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/
pkg.module 字段要指向的应该是一个基于 ES6 模块规范的使用 ES5 语法书写的模块。
基于 ES6 模块规范是为了用户在使用我们的包时可以享受 Tree Shaking 带来的好处；
使用 ES5 语法书写是为了用户在配置 babel 插件时可以放心的屏蔽 node_modules 目录。

### peerDependencies

有时候做一些插件开发，比如 grunt 等工具的插件，它们往往是在 grunt 的某个版本的基础上开发的，而在他们的代码中并不会出现 require("grunt")这样的依赖，dependencies 配置里边也不会写上 grunt 的依赖，为了说明此模块只能作为插件跑在宿主的某个版本范围下

### npm 包版本

https://github.com/npm/node-semver#caret-ranges-123-025-004

```
~1.2.3 := >=1.2.3 <1.(2+1).0 := >=1.2.3 <1.3.0
~1.2 := >=1.2.0 <1.(2+1).0 := >=1.2.0 <1.3.0 (Same as 1.2.x)

^1.2.3 := >=1.2.3 <2.0.0
^0.2.3 := >=0.2.3 <0.3.0
^0.0.3 := >=0.0.3 <0.0.4
```

## 命令

### 把项目依赖的包都锁定在某一个固定版本 -----》--save-exact/-E

npm install --save -E left-pad
（ 只能控制你直接依赖的包（也就是出现在 package.json 里的那些）。假设你依赖了包 A，包 A 又依赖了包 B。那么即使你使用了-E 参数安装包 A，由于包 A 内部没有写死包 B 的版本号，还是有可能得到不一致的依赖树。）

### npm shrinkwrap

npm shrinkwrap 命令会在项目路径下创建一个 npm-shrinkwrap.json 文件。该文件中包含了当前项目中所有依赖包的版本信息。把该文件提交到 git 中。其他人在 clone 该项目执行 npm install 时，npm 检测到该文件后会按照文件中的信息完整的还原出完全相同的依赖树。从而解决版本不一致问题。

```
npm install --save-dev left-pad
npm prune
npm shrinkwrap --dev
```

该方法缺陷：安装一个依赖包，原来只需要一条命令，现在却需要三条命令。不方便。

### yarn

yarn 是一个与 npm 兼容的 node 包管理器。使用它安装 npm 包，会自动在项目目录中创建一个 yarn.lock 文件。该文件包含了当前项目中所安装的依赖包的版本信息。其他人在使用 yarn 安装项目的依赖包时就可以通过该文件创建一个完全相同的依赖环境。

```
yarn # 现有项目中使用yarn来创建yarn.lock
yarn init # 使用yarn新建一个项目
yarn add xxxx # 安装一个依赖包
yarn remove xxx # 删除一个依赖包
```

除了可以自动帮你锁定依赖包的版本之外，yarn 还有一个很棒的特性就是可以缓存已经安装过的包。当再次安装时，直接从本地读取即可，可以极大的提高依赖安装速度。
