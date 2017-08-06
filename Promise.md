# Promise
>promise 是抽象异步处理对象，以及进行各种操作的组件。
>之前在js中 ，处理异步的方式，是通过回调函数。但是回调函数的写法没有规范，在node.js中有标准形式：
>
>```
getAsync('file.txt',function(error,result){
  if(error){
  throw error;
  }
  //成功
})
>```
>promise 则是把类似的异步处理对象和处理规则进行规范化，并按照统一接口来编写，而采取其他方法 都会出错
>
## 创建Promise对象

```
new Promise(function(resolve,reject){
   //异步处理
   //"
    或者 reject
})
```
## 实例方法 
对通过new 生成的promise对象为了设置其值在resolve（成功）／reject（失败）时调用的回调函数，可以使用```promise.then()```方法(这个方法是异步调用的),每次调用then都会返回一个promise对象。
>```promise.then(onFullfilled,onRejected)```在成功失败时都可以使用，另外只想对异常进行处理时可以采用```promise.then(undefined,onRejected)```这种方式，不过这种情况下，用```promise.catch(onRejected)```应该是个更好的选择
>promise.catch()

## 静态方法
```promise.all() promise.resolve()```
例子

```
function asyncFunction(){
   return new Promise(function(resolve,reject){
     setTimeOut(function(){
        resolve('Async Hello World');
     });
   });
}
asyncFunction().then(function(value){
    console.log(value);
}).catch(function(error){
    console.log(error);
});
```
## 状态变化

```
pending - settled(reslove or error )
.then()后执行的函数可以肯定地说只会被调用一次。
```
## 创建XHR的promise对象

```
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
// 运行示例
var URL = "http://httpbin.org/get";
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});
```
## new Promise的快捷方式
```promise.resolve(value)```是它的快捷方式

```
Promise.resolve(42).then(function(value){...});
```
## Thenable
promise.resolve()的另一个作用就是将thenable对象转换成Promise 对象
Thenable是一个类似primise的东西，指的是一个具有.then方法的对象。
例如：jQuery.ajax(),他的返回值jqXHR Object就是thenable的,它具有.then()方法；

```
var promise = Promise.resolve($.ajax('/json/comment.json'));
promisr.then(function(value){...});
```
##promise 只能进行异步操作？
promise只能使用异步操作，因为对异步回调函数进行同步处理。处理顺序可能会与预期不符。

```
var promise = new Promise(function(resolve{
    console.log('inner promise');
    resolve(42)
}));
promise.then(function(value){
   console.log(value);
});//异步处理
console.log('outer promise');

//输出结果
inner promise
outer promise
42
```
## promise chain 

```
promise.then(function(value){...}).then(function(value){...}).catch(function(value){...}).then(function(value){...})
```
taskA --->taskB --->catch()--->finalTaskD
在链式调用过程中，如果taskA异常,taskB就不会调用，直接跳到finalTaskD;
then ,catch都会返回一个promise()对象

## promise.all()
>接受一个promise对象的数组作为参数，当这个数组中所有的promise对象全部变为resolve或者reject状态的时候，他才会去调用，then方法.而```promise.race()```只要又一个变为resolve()他就会调用then()
>特殊点：传递给promise.all()的promise并不是一个个顺序执行的，而是同时开始，并行执行的。
# await

