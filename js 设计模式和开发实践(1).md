
# js 设计模式 第一部分
## 一：原型模式

### 1.1 
> js 是动态类型语言；
鸭子类型就是 我们只关注对象的行为，而不关注对象本身。动态类型语言中，我们能轻松的实现一个原则就是：‘面向接口编程，而不是面向实现编程’。

### 1.2 多态
>含义：同一操作作用在不同的对象上面，可以产生不同的解释和不同的执行结果。
多态背后的思想是将“做什么”和“谁去做以及怎么做”分离开来，也就是将‘不变的事物’和‘可能改变的事情’分离开来。
js的变量类型在运行期是可变的，这意味着js 对象的多态性是与生俱来的。
作用：多态的最根本好处就在于，你不必再向对象询问‘你是什么类型’，你只管调用就行了。

### 1.3 封装
> 目的： 将信息隐藏；封装数据和封装实现。
封装数据：js中通过函数的作用域。还可以通过es6 的 Symbol创建私有属性。

## 二：apply call
> js 解释器并不会计较行参和实參在数量和类型以及顺序上的区别，js 的参数在内部就是用一个数组实现的，从这个意义来说，apply比call的使用效率更高。
call 是包装在apply上的语法糖。
当穿入的参数是，null；函数内的 this会指向默认的宿主对象。严格模式下还是null；

>作用：
1. 改变this 指向；
2. Function.prototype.bind

```
Function.prototype.bind = function(context){
    var self = this;
    return function(){
        return self.apply(context,arguments);
    }
}
```

3. 借用其他对象的方法
1):借用构造函数实现继承
2):***在操作 arguments时，我们经常找 Array.prototype对象借用方法；**
想把arguments转成真正的数组，可以借用，Array.prototype.slice
原理：Array.prototype.push的原理
 
 ```
 function ArrayPush(){
     var n = TO_UINT32(this.length);//被push对象的length
     var m = %_ArgumentLength();//push的参数个数
     for(var i =0;i<m;i++){
         this[i+n]= %_Arguments(i);//复制元素
     }
     this.length = n+m;//修正length属性的值
     return this.length
 }
 ```
 > 由此可以推断我们可以把‘任意’对象传入Array.prototype.push;
 '任意'对象要符合条件
 1. 对象本身要可以存取属性，（对象属性）
 2. 对象的length 属性可读写；（函数的length属性不可写）



## 三：闭包和高阶函数
> js 是一门完整的面向对象的编程语言，但这门语言同时也拥有许多函数式语言的特性。参考 Scheme ,引入Lambda 表达式，闭包，高阶函数特性。
 **用闭包写一个判断函数是什么类型的函数**；

```
var Type ={};
    for(var i = 0,type;type=['String','Array','Number'][i++];){
        (function(type){
            Type['is'+type] = function(obj){
                return Object.prototype.toString.call(obj) === '[object '+ type +']';
            }
        })(type)
    }
    Type.isArray([]);//true
    Type.isString('ddd');//true
```
> 闭包作用:1. 封装变量成为私有变量;
**提炼函数是代码重构中的一种常见技巧**
1. 如果在一个大函数中有一些代码块能够独立出来，我们常常把这些代码块封装在独立的小函数里面。独立出来的小函数有助于代码复用，如果
这些小函数有一个良好的函数名，他们本身也起到了注释作用。如果这些小函数不需要在程序的其他地方使用，最好是把它们用闭包封闭起来。

```
//对一个函数的提炼；
  var mult = (function(){
   var cache = {};
    var args = Array.prototype.join.call(arguments,',');
    if(cache[args]){
        return cache[args];
    }
    var a =1;
    for(var i = 0,l = arguments.length;i<1;i++){
        a = a * arguments[i];
    }
    return cache[args] =a;
   })();
// 另一种表达
 var mult = (function(){
     //把cache 封装成私有变量
        var cache = {};
        // 封装成私有函数
        var calculate = function(){
            var a = 1;
            for(var i = 0,l = arguments.length;i<l;i++){
                a = a * arguments[i];
            }
            return a ;
        }
        return function(){
            var args = Array.prototype.join.call(arguments,',');
            if(cache[args]){
                return cache[args];
            }
            return cache[args] = calculate.apply(null,arguments);
        }
   })();
   console.log(mult(1,2,3))
   console.log(mult(1,2,3))
```
> 闭包的作用：2，延续局部变量的寿命；

```
    var report = function(src){
        var img = new Image();
        img.src = src;
    };
    report('http://xxx.com/getUserInfo');
```
> 这个函数在一些低版本浏览器实现存在bug,可能进行数据上报会丢失30%左右的数据。因为，report 函数不是每次都成功发起了http请求，
img 是report 函数中的局部变量，当report 函数的调用 结束后，img 局部变量随即被销毁，而此时或许还没来没来得及发出http请求；

```
var report =(function(){
    var imgs = [];
    return function(src){
        var img = new Image();
        imgs.push(img);
        img.src =src;
    }
})()
```
### 3.1.4 闭包和面向对象设计
 > 过程与数据的结合是形容面向对象中的‘对象‘时经常使用的表达。对象以方法 的形式包含了过程，而闭包则是在过程中以环境的形式包含了数据，通常用面向对象思想能
 实现的功能，用闭包也能实现。

 ```
 //闭包；
   var extent = function(){
    var value = 0;
    return {
        call:function(){
            value++;
            console.log(value);
        }
    }
  };
  var extent = extent();
  extent.call();   
  extent.call();   
 //面向对象模式
  var Extent = function(){
    this.value=0;
   }
   Extent.prototype.call = function(){
    this.value++;
    console.log(this.value)
   }
   var extent = new Extent();
   extent.call();
   extent.call();
 ```
 ### 3.1.5 用闭包实现命令模式
 > 命令模式的意图是把请求封装成对象，从而分离请求的发起者和请求的接受者（执行者）之间的耦合关系。 在命令被执行之前，可以预先往命令对象中植入命令的接收者。
 ### 3.1.6 闭包与内存泄漏
 1. 闭包会造成内存泄漏？？？
  把变量放在闭包中和放在全局作用域中，对内存方面的影响是一致的。这里并不能说成是内存泄漏，在需要的时候可以 手动设为null;
  使用闭包的时候，容易形成循环引用，如果闭包的作用域链保存着一些Dom 节点，这时候就可能造成闭包泄漏，但这本身并不是闭包的问题，是因为垃圾回收的机制。

  ### 3.2高阶函数
  >条件：
  1. 函数可以作为参数被传递；
  2. 函数可以作为返回值输出；

  ### 3.2.3 高阶函数实现AOP（装饰者模式）
  >AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括 日志统计，安全控制，异常处理等，
  把这些功能抽离出来以后再通过‘动态织入’的方式参入业务逻辑模块中，好处是，可复用。
  ### 3.2.3 高阶函数实现其他应用
> 1. currying ：一个currying的函数会接受一些参数，接受了这些参数以后，该函数不会立即求值，而是继续返回另一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正求值的时候，之前传入的所有参数会被一次性求值。
函数柯里化，是固定部分参数，返回一个接受剩余参数的函数，也称为部分计算函数，目的是为了缩小适用范围，创建一个针对性更强的函数。
那么反柯里化函数，从字面讲，意义和用法跟函数柯里化相比正好相反，扩大适用范围，创建一个应用范围更广的函数。使本来只有特定对象才适用的方法，扩展到更多的对象。

```
var cost = (function(){
    var args=[];
    return function(val){
        if(arguments.length === 0){
            var money =0;
            for(var i=0,l=args.length;i<l;i++){
                money += args[i];
            }
            return money;
        }else{
            // [].push.apply(args,arguments)
            args.push(val)
            console.log(args)
        }
    }
})();
cost (100);
cost (200);
cost (300);
console.log(cost())
//另一种写法
var currying = function(fn){
    var args =[];
    return function(){
        if(arguments.length ===0){
            return fn.apply(this,args)
        }else{
            [].push.apply(args,arguments);
            return arguments.callee;
        }
    }
};
var cost = (function(){
    var money =0;
    return function(){
        for(var i=0;l = arguments.length;i<l;i++){
            money += arguments[i];
        }
        return money;
    }
})();
var cost = currying(cost);

cost(100);
cost(200);
console.log(cost())
```

2. uncurrying(反柯里化)
> 反柯里化实现方式：

```
//1)
Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj,arguments)
    }
}
//2)
Function.prototype.uncurrying = function(){
    var self =this;
    return function(){
        return Function.prototype.call.apply(self,arguments);
    }
}
```
3. 函数节流
> 大多数情况，函数是由用户主动触发的，但少数情况下，函数的触发不是由用户直接控制的。在这些场景下，函数可能被频繁调用，而造成大的性能问题。
列举场景
1. 函数被频繁调用的场景
1）window.onresize
2)mousemove
3)上传进度
2. 函数节流的原理
上面共同的问题是函数被触发的频率太高；
可以按时间段忽略掉一些事件请求。可以借助setTimeout；
3. 函数节流的代码实现
原理：将即将被执行的函数用setTimeout延迟一段时间执行，如果该次延迟执行还没有完成，则忽略接下来调用该函数的请求。

```
var throttle = function(fn,interval){
    var __self = fn;//保存需要被延迟执行的函数引用
    timer,
    firstTime = true;
    
    return function(){
        var args = arguments,
        __me = this;
        
        if(firstTime){
            __self.apply(__me,args);
            return firstTime = false;
        }
        if(timer){//如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }
        timer = setTimeout(function(){
            clearTimeout(timer);
            timer = null;
            __self.apply(__me,args);
        },interval||500)
    };
}
window.onresize = throttle(function(){
    console.log(1)
},500)
```
4. 分时函数
> 另外一个问题:某些函数确实是用户主动调用的，但因为一些客观原因，这些函数会严重的影响性能；
一个例子是 会话框的列表可能有上千个，在短时间内往页面中添加DOM节点，会让浏览器吃不消。会出现卡顿或假死；
解决方案之一就是让工作分批进行；

```
var timeChunk = function(ary,fn,count){
    var obj,
    t;
    var len = ary.length;
    var start = function(){
        for(var i = 0; i < Math.min(count||1,ary.length);i++){
            var obj = ary.shift();
            fn(obj);
        }
    };
    return function(){
        t = setInterval(function(){
            if(ary.length == 0){
                return clearInterval(t)
            }
            start();
        },200)//分批执行的时间间隔
    }
}

var ary = [];
for(var i =1;i<=1000 ; i++){
    ary.push(i);
}
var renderFriendList = timeChunk(ary,function(n){
    var div =document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
},8)
renderFriendList()
```
5. 惰性加载函数
>惰性载入表示函数执行的分支只会在函数第一次掉用的时候执行，在第一次调用过程中，该函数会被覆盖为另一个按照合适方式执行的函数，这样任何对原函数的调用就不用再经过执行的分支了。

```

var addEvent = function(elem,type,handler){
    if(window.addEventListener){
        addEvent = function(elem,type,handle){
            elem.addEventListener(type,handle,false)
        }
    }else if(window.attachEvent){
        addEvent = function(elem,type,handle){
            elem.attachEvent('on'+type,handle);
        }
    }
    addEvent(elem,type,handler);
}
var div = document.getElementById('div1');
addEvent(div,'click',function(){
    console.log(1)
})
//第二次调用不会在进行分支判断
addEvent(div,'click',function(){
    console.log(444)
})

```
总结：相对于模式的实现过程，我们更关注的是模式可以帮助我们完成什么。。






 

