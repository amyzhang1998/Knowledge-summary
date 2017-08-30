## 命令模式
> 命令模式中的命令指的是一个执行某些特定事情的指令。
应用场景：有时候需要向某些对象发送请求，但是并不知道请求的接受者是谁，也不知道被请求的操作是什么， 此时希望用一种松耦合的方式来设计软件，使得请求
发送者和请求接受者能够清除彼此间的耦合关系。

### js 中的命令模式
>命令模式的由来其实是回调函数的一个面向对象的替代品。

```
var setCommand = function(button,func){
    button.onclick = function(){
        func()
    }
}
var MenuBar = {
    refresh:function(){
        console.log('refresh page');
    }
}
var RefreshMenuBarCommand = function(receiver){
    return function(){
        receiver.refresh();
    }
}
var refreshMenuBarCommand = RefreshMenuBarCommand (MenuBar);

setCommand(btn1,refreshMenuBarCommand)
```
### 撤销命令
撤销是命令模式里一个非常有用的功能。