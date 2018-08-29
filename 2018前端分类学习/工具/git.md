# git

## 全局 安装 说没有权限

1.  npm cache clean

    > 一般发生在*类 Unix*系统中

2.  获取缓存目录 npm config get cache (~/.npm)

3.  删除缓存目录

> sudo rm -rf ~/.npm
> 再次安装坚决不要用 sudo，如果还是出现权限问题请修改安装路径权限

## commit-lint

开源社区已经为我们总结出了一套名为 Conventional Commits 的书写规范.
https://conventionalcommits.org/#conventional-commits-100-beta2

```
<type>[optional scope]: <description>

type ：用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？开源社区目前总结出了以下 11 种类型：

build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
docs：文档更新
feat：新增功能
fix：bug 修复
perf：性能优化
refactor：重构代码(既没有新增功能，也没有修复 bug)
style：不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
test：新增测试用例或是更新现有测试
revert：回滚某个更早之前的提交
chore：不属于以上类型的其他类型

optional scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。根据项目实际情况填写即可，最好在项目中规定好模块列表，保持一致性。
example:

git ci -m "docs:update Reademe.md "
```

### 可以在项目中启动 commitlint

https://loveky.github.io/2018/06/04/write-good-commit-message/

npm install --save-dev @commitlint/cli @commitlint/config-conventional
