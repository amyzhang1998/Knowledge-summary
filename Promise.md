# Promise

## 实现

promise 里面的 then 函数仅仅是注册了后续需要执行的代码，真正的执行是在 resolve 方法里面执行的，理清了这层，再来分析源码会省力的多。现在回顾下 Promise 的实现过程，其主要使用了设计模式中的观察者模式：

1. 通过 Promise.prototype.then 和 Promise.prototype.catch 方法将观察者方法注册到被观察者 Promise 对象中，同时返回一个新的 Promise 对象，以便可以链式调用。
2. 被观察者管理内部 pending、fulfilled 和 rejected 的状态转变，同时通过构造函数中传递的 resolve 和 reject 方法以主动触发状态转变和通知观察者。

```
function Promise(fn) {
    var value = null;
    var state = 'pending';
    var callbacks = [];
    this.then = function (onFullfilled,onRejected) {
        return new Promise(function (resolve,reject) {
            handle({
                onFullfilled: onFullfilled || null,
                onRejected:onRejected||null,
                resolve: resolve,
                reject:reject
            });
        });
    }
    function handle(callback) {
        if (state == 'pending') {
            callbacks.push(callback);
            return;
        }
        var cb = state === 'fullfilled' ? callback.onFullfilled : callback.onRejected;
        var ret;
        if (cb === null) {
            cb = state === 'fullfilled' ? callback.resolve : callback.reject;
            cb(value);
            return;
        }
        try {
            ret = cb(value);
            callback.resolve(ret);
        } catch (e) {
            callback.reject(e)
        }

    }
    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve);
                return;
            }
        }
        value = newValue
        state = 'fullfilled'
        execute()


    }
    function reject(reason) {
        state = 'rejected';
        value = reason;
        execute()
    }
    function execute() {
          //保证一定在then之后执行resolve:，
        //就是通过setTimeout机制，将resolve中执行回调的逻辑放置到JS任务队列末尾，以保证在resolve执行时，then方法的回调函数已经注册完成.
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value)
            })
        },0)
    }
    fn(resolve,reject)
}
function getUserId() {
    return new Promise(function (resolve) {
        http.get(url, function (results) {
            resolve(results.id)
        })
    })
}
function getJobId(){}
```

//返回一个 promise,通过他的 then 方法注册在 promise 异步操作成功执行时的回调。
getUserID().then(getJobId).then(function () { }, function (){})

1. 链式调用 then
2. 回调要通过异步方式执行，用以保证可靠的执行顺序。
3. 但是，这样好像还存在一个问题，可以细想一下：如果 Promise 异步操作已经成功，这时，在异步操作成功之前注册的回调都会执行，但是在 Promise 异步操作成功这之后调用的 then 注册的回调就再也不会执行了，这显然不是我们想要的。加入状态
4. 链式 promise
5. 失败处理
6. 异常处理

## > 优势

7. 解决回调地狱。有时我们要进行一些相互间有依赖关系的异步操作，比如有多个请求，后一个的请求需要上一次请求的返回结果。过去常规做法只能 callback 层层嵌套，但嵌套层数过多的话就会有 callback hell 问题。使用 promise 代码会变得扁平化，可读性增强。
8. 更好地进行错误捕获 .多重嵌套 callback 除了会造成上面讲的代码缩进问题，更可怕的是可能会造成无法捕获异常或异常捕获不可控。但由于异步回调中，回调函数的执行栈与原函数分离开，导致外部无法抓住异常。

> promise 是抽象异步处理对象，以及进行各种操作的组件。之前在 js 中 ，处理异步的方式，是通过回调函数。但是回调函数的写法没有规范，在 node.js 中有标准形式：
>
> ```
> getAsync('file.txt',function(error,result){
>   if(error){
>   throw error;
>   }
>   //成功
> })
> ```
>
> promise 则是把类似的异步处理对象和处理规则进行规范化，并按照统一接口来编写，而采取其他方法 都会出错

## 创建 Promise 对象

```
new Promise(function(resolve,reject){
   //异步处理
   //"
    或者 reject
})
```

## 实例方法

对通过 new 生成的 promise 对象为了设置其值在 resolve（成功）／reject（失败）时调用的回调函数，可以使用`promise.then()`方法(这个方法是异步调用的),每次调用 then 都会返回一个 promise 对象。

> `promise.then(onFullfilled,onRejected)`在成功失败时都可以使用，另外只想对异常进行处理时可以采用`promise.then(undefined,onRejected)`这种方式，不过这种情况下，用`promise.catch(onRejected)`应该是个更好的选择
> promise.catch()

## 静态方法

`promise.all() promise.resolve()`
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

## 创建 XHR 的 promise 对象

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

## new Promise 的快捷方式

`promise.resolve(value)`是它的快捷方式

```
Promise.resolve(42).then(function(value){...});
```

## Thenable

promise.resolve()的另一个作用就是将 thenable 对象转换成 Promise 对象
Thenable 是一个类似 primise 的东西，指的是一个具有.then 方法的对象。例如：jQuery.ajax(),他的返回值 jqXHR Object 就是 thenable 的,它具有.then()方法；

```
var promise = Promise.resolve($.ajax('/json/comment.json'));
promisr.then(function(value){...});
```

##promise 只能进行异步操作？
promise 只能使用异步操作，因为对异步回调函数进行同步处理。处理顺序可能会与预期不符。

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
在链式调用过程中，如果 taskA 异常,taskB 就不会调用，直接跳到 finalTaskD;
then ,catch 都会返回一个 promise()对象

## promise.all()

> 接受一个 promise 对象的数组作为参数，当这个数组中所有的 promise 对象全部变为 resolve 或者 reject 状态的时候，他才会去调用，then 方法.而`promise.race()`只要又一个变为 resolve()他就会调用 then()
> 特殊点：传递给 promise.all()的 promise 并不是一个个顺序执行的，而是同时开始，并行执行的。

# await
