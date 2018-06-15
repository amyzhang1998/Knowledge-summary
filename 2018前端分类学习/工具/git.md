# git

## 全局 安装 说没有权限

1.  npm cache clean

    > 一般发生在*类 Unix*系统中

2.  获取缓存目录 npm config get cache (~/.npm)

3.  删除缓存目录

> sudo rm -rf ~/.npm
> 再次安装坚决不要用 sudo，如果还是出现权限问题请修改安装路径权限
