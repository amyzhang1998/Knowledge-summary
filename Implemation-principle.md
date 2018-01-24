## 实现原理

## ES7(ECMAScript 2016)

### 异步函数 async (generator,promise)

> 通过 Promise 和 Generator 来使用看起来同步的代码去执行异步操作。
>
> ```
> async function fetchJson(url){
>   try {
>       let request = await fetch(url);
>       let text = await request.text();
>       return JSON.parse(text);
>   catch(error){
>       console.log(`Error:${error.stack}`)}}}
> ```
>
> 在内部，异步函数的工作原理类似于 generators，但并不会被翻译成 generator 函数。
>
> ### async await
>
> async 函数内你可以 await 一个 promise 函数直到它执行完。有错误抛出的话，用 catch 捕捉
> sleep 函数
>
> ```
> function sleep (milliseconds){
> return new Promise((resolve,reject)=>{
> setTimeout(()=>{
> resolve},milliseconds)
> })}
> ```

### 装饰器 Decorators

> 原理 Object.defineProperty(target,key,descriptor){}
> 作用：是给一个已有的方法或类扩展一些新的行为，而不是去直接修改它本身。

### Array.prototype.includes(element,index)

> 相似于 indexOf，唯一区别是：includes（）方法能找到 NaN，可以通过 Obiect.defineProperty(Array.prototype,'includes',{value:(searchElement,fromIndex)=>{}}) 来 polyfill.
>
> ```
> [1,2,3].includes(2)//true
> ```

## ES6（ECMAScript 2015）

### Iterators(迭代器) +for...of + Generators(生成器)

> 迭代器和生成器将迭代的概念直接带入核心语言，并提供了一种机制来自定义 for ... of 的循环行为
>
> ```
> Iterator
> function makeIterator(array){
> var nextIndex = 0;
>
> return{
>       next:function(){
>           return nextIndex < array.length ? {value: array[nextIndex++],done:false}:{done:true};
> }}}
> ```
>
> for ...in 循环可以取代 next()方法的调用。
>
> ```
> var it = Iterator(['ss','dd']);
> for (var key in it)
> ```
>
> 由于迭代器需要显示的维持她们的内部状态，所以需要仔细的规划它们的构造，生成器提供了一个强大的选择，它允许你通过写一个可以保存自己状态的简单函数来定义一个迭代算法。一个函数如果它里面包含了一个或一个以上的 yiled 表达式，那么这个函数就成为一个生成器了。
> function\* simpleGenerator(){}
>
> ```
> function Range(low, high){
>   this.low = low;
>   this.high = high;
> }
> Range.prototype.__iterator__ = function*(){
>   for (var i = this.low; i <= this.high; i++)
> ```

    yield i;

};
var range = new Range(3, 5);
for (var i in range)
print(i);

> ```
> 生成器可以通过 return；中止；
> 生成器通过调用next（）启动生成器，调用send()重新启动生成器。
> for ...of 与for...in 的区别
> for...in循环会遍历一个object的所有可枚举属性。
> for ...of 是为各种collection对象(Array,Map,Set,String,TypeArray,arguments)专门定制的，并不适用于所有的object。
> ```

### spread (... 的实现原理)

```
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6
//**原理** obj={hello:"hello",true:true}
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
    continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
    continue;
    target[i] = obj[i];
    }
    return target;

}
```

### 箭头函数

> 箭头函数表达式的语法比函数表达式短，并且不绑定自己的 this，arguments，super 或 new.target。此外，箭头函数总是匿名的。这些函数表达式最适合非方法函数，它们不能用作构造函数。在箭头函数出现之前，每个新定义的函数都有其自己的 this 值（例如，构造函数的 this 指向了一个新的对象；严格模式下的函数的 this 值为 undefined；如果函数是作为对象的方法被调用的，则其 this 指向了那个调用它的对象）。在面向对象风格的编程中，这被证明是非常恼人的事情。

> 箭头函数不会在其内部暴露出 arguments 对象： arguments.length, arguments[0], arguments[1] 等等，都不会指向箭头函数的 arguments，而是指向了箭头函数所在作用域的一个名为 arguments 的值（如果有的话，否则，就是 undefined。——译者注）。箭头函数没有自己的 arguments 对象，不过在大多数情形下，rest 参数可以给出一个解决方案：

> 箭头函数的引入有两个方面的影响：一是更简短的函数书写，二是对 this 的词法解析。

```
// 返回对象字面量时应当用圆括号将其包起来:
params => ({foo: bar})
// 支持 Rest parameters 和 default parameters:
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }
// 参数列表中的解构赋值也是被支持的
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
<!---->
function foo() {
  var f = (...args) => args[0];
  return f(2);
}
foo(1); // 2
```

### String.prototype.includes()

> 可以直接扩展 String.prototype 的属性，来 polyfill.

```
>if(!String.prototype.includes){
>String.prototype.includes=function(search,start){
>'use strict';
>if(typeof start !=='number'){
>start = 0;
>}
> if(start + search.length > this.length){
> return false;
> }else{
> return this.indexOf(search,start)!==-1}
>}
>}
```

### Object

> Object.assign(target,...sources)//复制自己的可枚举属性
> Object.getOwnPropertyDescriptor(obj, prop)//ES6 增强了功能。属性描述器
> Object.defineProperty(obj, prop, descriptor)//ES6 增强了功能。定义自己的属性描述符
>
> ```
> polyfill...
>
> var _extends = Object.assign || function (target) {
> for (var i = 1; i < arguments.length; i++) {
> var source = arguments[i];
> for (var key in source) {
> if (Object.prototype.hasOwnProperty.call(source, key)) {
>  target[key] = source[key];
> }
> }
> }
>  return target;
> };
> ```
>
> Object.create():可以创建一个具有特殊原型对象和特性的新对象；相当于替代了 new；它先是声明了一个构造器,然后将其原型设置为你想要的值,最后返回生成的新对象.其实就是封装了 new.
> Object.create(proto[,propertiesObject]) (ES5)
> . 参数：proto: 是新创建对象的原型。
> . propertiesObject:可选的，可以定义自己的属性描述。

```
>if (typeof Object.create != 'function') {
  Object.create = (function(undefined) {
    var Temp = function() {};
    return function (prototype, propertiesObject) {
      if(prototype !== Object(prototype)) {
        throw TypeError(
          'Argument must be an object, or null'
        );
      }
      Temp.prototype = prototype || {};
      var result = new Temp();
      Temp.prototype = null;
      if (propertiesObject !== undefined) {
        Object.defineProperties(result, propertiesObject);
      }
      // to imitate the case of Object.create(null)
      if(prototype === null) {
         result.__proto__ = null;
      }
      return result;
    };
  })();
}
```

> Object.setPrototypeof(obj,prototype):返回一个原型指向新的对象的对象

### js 中继承的实现

> 1，原型链继承借助已有的对象创建新的对象，将子类的原型指向父类，就相当于加入了父类这条原型链
>
> 使用原型继承主要由两个问题：一是字面量重写原型会中断关系，使用引用类型的原型，并且子类型还无法给超类型传递参数。

```
<script>
    function Parent(){
        this.name = 'mike';
    }
    function Child(){
        this.age = 12;
    }
    Child.prototype = new Parent();//Child继承Parent，通过原型，形成链条
    var test = new Child();
    alert(test.age);
    alert(test.name);//得到被继承的属性
    //继续原型链继承
    function Brother(){   //brother构造
        this.weight = 60;
    }
    Brother.prototype = new Child();//继续原型链继承
    var brother = new Brother();
    alert(brother.name);//继承了Parent和Child,弹出mike
    alert(brother.age);//弹出12
</script>
```

> `2.类继承`
> 在子类型构造函数的内部调用超类型的构造函数。严格的类式继承并不是很常见，一般都是组合着用;
> 缺点：子类拿不到父类原型链上的属性
>
> ```
> function super(){
> this.color =['res']};
> function sub(){
> Supwe.call(this)
> }
> ```
>
> 3.组合继承（原型+ 构造函数）组合式继承是比较常用的一种继承方法，其背后的思路是 使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。

```
 function Parent(age){
        this.name = ['mike','jack','smith'];
        this.age = age;
    }
    Parent.prototype.run = function () {
        return this.name  + ' are both' + this.age;
    };
    function Child(age){
        Parent.call(this,age);//对象冒充，给超类型传参
    }
    Child.prototype = new Parent();//原型链继承
    var test = new Child(21);//写new Parent(21)也行
    alert(test.run());//mike,jack,smith are both21
```

`4,原型式继承`

> 原型式继承首先在 obj()函数内部创建一个临时性的构造函数 ，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个新实例。

```
 function obj(o){
         function F(){}
         F.prototype = o;
         return new F();
     }
    var box = {
        name : 'trigkit4',
        arr : ['brother','sister','baba']
    };
    var b1 = obj(box);
```

`5,寄生式继承`

> 这种继承方式是把原型式+工厂模式结合起来，目的是为了封装创建的过程。

```
<script>
    function create(o){
        var f= obj(o);
        f.run = function () {
            return this.arr;//同样，会共享引用
        };
        return f;
    }
</script>
```

> 组合式继承是 js 最常用的继承模式，但组合继承的超类型在使用过程中会被调用两次；一次是创建子类型的时候，另一次是在子类型构造函数的内部

`6.寄生组合式继承`

```
function obj(o){
        function F(){}
        F.prototype = o;
        return new F();
    }
    function create(parent,test){
        var f = obj(parent.prototype);//创建对象
        f.constructor = test;//增强对象
    }

    function Parent(name){
        this.name = name;
        this.arr = ['brother','sister','parents'];
    }

    Parent.prototype.run = function () {
        return this.name;
    };

    function Child(name,age){
        Parent.call(this,name);
        this.age =age;
    }

    inheritPrototype(Parent,Child);//通过这里实现继承

    var test = new Child('trigkit4',21);
    test.arr.push('nephew');
    alert(test.arr);//
    alert(test.run());//只共享了方法

    var test2 = new Child('jack',22);
    alert(test2.arr);//引用问题解决
```

### class extends construcor super 继承原理的实现

> `class`的原理就是 Object.defineProperty(obj,prop,descriptor);
> 通过修改该类(实际上是函数)的 prototype 来完成的。但是我们的实例属性还是通过构造函数方式来完成的。

> `extends`的原理就是 Object.create()继承组合式继承

> `super`原理：在调用自方法的时候通过原型链先去父类中找，父类中没有在往上一层层寻找。有就返回值，没有就是 undefined; 原理是 Object.getPropertyOf()

### new 函数的过程

> var o = new Foo();

> //JavaScript 实际上执行的是：

> 1,var o = new Object();

> 2, o.[[Prototype]] = Foo.prototype;
> 3,Foo.call(o);
> 4, 如果函数没有返回其他对象，那么就返回这个新对象。
> new 过程：

```
var objectFunction = function(){
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj._proto_ = Constructor.prototype;
    var ret = Constructor.apply(obj,arguments);
    return typeof ret ==='object'?ret:obj;
}
```

### promise 实现。

## 面包屑 a 标签

> a 标签的 href 属性指的是 a 引用了一些资源，这些资源都属于一些协议，每种协议都有自己的默认行为。

> https?//...

> ftp://...

> tencent://...

> thunder://...

> mailto:...

> javascript:...伪协议，有些浏览器不支持，还有当用户禁用 javascript，这个链接就会失效。
> href 的值为 javascript: 与 click 事件。主要区别：定义的 scope 不同，前者是 global，后者可以是任何作用域执行的 context 不同，前者是 window，后者是 a

> 元素本身执行的时机不同，总是 click 事件先执行，href="javascript:..."后执行，所以，只能在 click

> 事件里阻止默认行为的发生，却不能在 href 里阻止事件的执行。
> href="javascript:;"
> href="javascript:this.close()"
>
> href 里写 JS，目的不外乎就是为了执行 JS 语句而已。比如 <a href="javascript:void(0)" onclick="doing()">link</a> ，是为了点击链接不会跳转，同时执行 onclick 里面的 JS。带 onclick 的好处是可以获取控件本身，比如 onclick="doing(this)"，这个 this 参数就是这个 <a></a> 控件，然后就可以在 doing 这个函数里操作这个控件。写成 href="javascript:doing()" 就是省略了 onclick 的写法。

## 上传组件

## jquery 的选择器

## jquery Ajax 的一些参数深入理解

## 深入理解 Http 里的参数（写一个前后台交互的组件，譬如上传，表单提交）


## nodejs 写一个前后断交互。

## react-native 写一个跨平台的移动端应用（简聊）

## 如何实现一个 modal 框

> 用 react 实现

```
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
export default class Modal extends Component {
    static defaultProps = {
        open: false
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.open && !this.props.open) { // 从无到有
            this.node = document.createElement('div'); // 创建 DOM
            this.node.className = 'ReactModal'; // 给上 ClassName
            document.getElementsByTagName('body')[0].appendChild(this.node) // 给 body 加上刚才的 带有 className 的 div
            // 这个时候创建了 render的目的地。
            const style = require('./style.scss'); // css 样式
            const {children, ...rest} = nextProps;
            let modal = (
                <div className={style.container}>
                    <div className={style.mask} {...rest}></div>
                    {nextProps.children}
                </div>
            );
            // 这个时候创建了 Modal 的虚拟 Dom
            let allClass = document.getElementsByClassName('ReactModal');
            ReactDOM.render(modal, allClass[allClass.length - 1]) // 之所以这么写，是因为能重复打开Modal，因为每一次打开Modal，都会建立一个div
            // 将 Modal 成功 render 到目的地
        }
        if (this.props.open && !nextProps.open) { // 从有到无
            ReactDOM.unmountComponentAtNode(this.node) // 调用 react-dom unmountComponentAtNode方法，将Modal解除。
            // 或者可以写下面的方法，将整个创建的div删除，这样多次打开就不会有很多个div残留在body中，但是并不是很正规的做法。
            // document.getElementsByTagName('body')[0].removeChild(document.getElementsByClassName('ReactModal')[0])
        }
    }
    render() {
        return null // 只要这个Component的方法，不要它的render，它的render将会render到内层。
    }
}
```

## jsonp 实现原理

> jsonp 是一种跨域通信的手段，它的原理是：
> 1）：首先是利用 script 标签的 src 属性来实现跨域；
> 2）通过将前端方法作为参数传递到服务器，然后由服务器端注入参数之后再返回，实现服务端向客户端通信。
> 3）由于使用 script 标签的 src 属性，因此只支持 get 方法。
>
> ```
>   function jsonp(req){
> var script = document.createElement('script');
> var url = req.url + '?callback=' + req.callback.name;
> script.src = url;
> document.getElementByTagName('head')[0].appendChild(script)
> }
> 不足之处：1）传递的参数必须是一个全局方法，我们都知道应该尽可能的减少全局方法；
> 2）需要加入一些参数校验，确保接口可以正常执行
> ```

```
(function (global) {
    var id = 0,
        container = document.getElementsByTagName("head")[0];
    function jsonp(options) {
        if(!options || !options.url) return;
        var scriptNode = document.createElement("script"),
            data = options.data || {},
            url = options.url,
            callback = options.callback,
            fnName = "jsonp" + id++;
        // 添加回调函数
        data["callback"] = fnName;
        // 拼接url
        var params = [];
        for (var key in data) {
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        url = url.indexOf("?") > 0 ? (url + "&") : (url + "?");
        url += params.join("&");
        scriptNode.src = url;
        // 传递的是一个匿名的回调函数，要执行的话，暴露为一个全局方法
        global[fnName] = function (ret) {
            callback && callback(ret);
            container.removeChild(scriptNode);
            delete global[fnName];
        }
        // 出错处理
        scriptNode.onerror = function () {
            callback && callback({error:"error"});
            container.removeChild(scriptNode);
            global[fnName] && delete global[fnName];
        }
        scriptNode.type = "text/javascript";
        container.appendChild(scriptNode)
    }
    global.jsonp = jsonp;
})(this);
```

## node 中 require 实现原理

1. require 语句的内部逻辑。 require(X)
   1）. 如果 X 是内部模块，a.返回该模块.b. 不再继续执行。
   2）如果 X 以 "./" 或者 "/" 或者 "../" 开头

   > a. 根据 X 所在的父模块，确定 X 的绝对路径。
   > b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
   > X
   > X.js
   > X.json
   > X.node
   > 　 c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
   > X/package.json（main 字段）
   > X/index.js
   > X/index.json
   > X/index.node

   3）.（3）如果 X 不带路径

   > a. 根据 X 所在的父模块，确定 X 可能的安装目录。　　 b. 依次在每个目录中，将 X 当成文件名或目录名加载。
   > 4）. 抛出 "not found"

2. 源码解读
   > a. node 定义了一个构造函数 module。所有模块都是 module 的实例。每个实例都有自己的属性，id,parent,exports,loaded,filename
   > b. 每个模块实例有一个 require 方法。这是每个模块的内部方法。
   > c. require 内部调用 Module.\_load 方法。步骤是：（1）确定模块的绝对路径（2）如果有缓存，取出缓存（3）是否为内置模块（4）生成模块实例，存入缓存（5）加载模块。关键步骤是：1，4
   > d. 模块的绝对路径：1）如果是内置模块，不含路径返回。2）确定所有可能路径 3）确定哪一个路径是真
   > e.加载模块。确定模块的后缀名，然后根据不同的后缀名进行加载。模块加载的实质就是，注入 exports，require,module 三个全局变量，然后执行模块的源码，然后将模块的 exports 变量的值输出。

## react-router 的实现原理

> 1,react-router 赖以生存的 history
> 2,如何实现 url 和 ui 共存的一句话：实现 URL 与 UI 界面的同步。其中在 react-router 中，URL 对应 Location 对象，而 UI 是由 react components 来决定的，这样就转变成 location 与 components 之间的同步问题。
> this.context.router
> 跳转前确认：enter,leave routerWillLeave

## break 语句的使用条件，还有什么循环中不能使用 break?(js 中 break,continue,return 使用情况)

> 1，break 和 continue ;都是退出循环，或者 switch 语句。所以只有这种形式才是合理的。
> 2，return 语句。用在函数中。
> 1.return 语句用于指定函数返回的值。
> 2.return 语句应用范围只能出现在函数体内，出现在代码中的其他任何地方都会造成语法错误。注意的是，使用 return 语句时，函数会停止执行，并返回指定的值，return 后面的语句时不执行的。 3.在大多数情况下，为事件处理函数返回 false，可以防止默认的事件行为，例如，默认情况下点击一个
> a 元素，页面会跳转到该元素 href 属性指定的页。
> 4.return false 相当于终止符，return true 相当于执行符。 5.在 js 中 return false 的作用一般是用来取消默认动作的。比如你单击一个链接除了触发你的
> onclick 事>件以外还要触发一个默认事件就是执行页面的跳转。所有如果想取消对象的默认动作就可以 return false。 ##循环原理
> 1，forEach. :callback(T,kValue,k,0)
> 2,map. : mappedValue = callback(T,kValue,k,0); A[k]= mappedValue return A

> ##webpack 压缩打包出来的文件都有什么规则。 ##怎么获取异步语句输出的值。

## 上传,下载文件的实现原理。

> 1, input 的 name 属性
> name 属性规定 input 元素的名称。
> name 属性用于对提交到服务器后的表单数据进行标识，或者在客户端通过 JavaScript 引用表单数据。
> 2, header 中的 Content-Disposition 作用.
> 使用 html 的 标签，提交 form 的几个属性必须为： method=post encType=multipart/form-data;
> method 属性必须设为 post 的原因是：值不是放在 URL 之后传递到服务器的；
> encType 属性：这个属性管理的是表单的 MIME 编码几个属性详解：
> application/x-www-form-urlencoded 在发送前编码所有字符（默认）
> multipart/form-data 不对字符编码，在使用包含文件上传控件的表单时，必须使用该值；对于“multipart/form-data”类型的 form 表单，浏览器上传的实体内 容中的每个表单字段元素的数据之间用字段分隔界线进行分割，两个分隔界线间的内容称为一个分区，每个分区中的内容可以被看作两部分，一部分是对表单字段元 素进行描述的描述头，另外一部是表单字段元素的主体内容
> text/plain 空格转换为“+”，不对特殊字符编码

###使用 FormData+ajax 实现上传

> 兼容性 ie 11 10 部分支持。通过 FormData 对象可以组装一组用 XMLHttpRequest 发送请求的键/值对。它可以更灵活方便的发送表单数据，因为可以独立于表单使用。如果你把表单的编码类型设置为 multipart/form-data ，则通过 FormData 传输的数据格式和表单通过 submit() 方法传输的数据格式相同。

###使用 javascript 的 fileApi 实现文件上传；

> 兼容性 ie 11 10 部分支持。
> FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
> File API 由一组 JavaScript 对象以及事件构成。赋予开发人员操作在 <input type=”file” … /> 文件选择控件中选定文件的能力。图 1 展示了 File API 所有的 JavaScript 的组合关系。类型 FileList 包含一组 File 对象。通常 FileList 对象可以从表单中的文件域（<input type=”file” .../>）中拿取。Blob 对象代表浏览器所能读取的一组原始二进制流。Blob 对象中，属性 size 表示流的大小。函数 slice() 可以将一个长的 Blob 对象分割成小块。File 对象继承自 Blob 对象，在 Blob 对象基础上增加了和 File 相关的属性。其中，属性 name 表示文件的名字，这个名字去掉了文件的路径信息，而只保留了文件名。属性 type 表示文件的 MIME 类型。属性 urn 则代表这个文件的 URN 信息。为完成文件读取的操作，一个 FileReader 对象实例会关联 File 或 Blob 对象，并提供三种不同的文件读取函数以及 6 种事件。表 1. 文件读取函数函数名称 功能
> readAsBinaryString() 读取文件内容，读取结果为一个 binary string。文件每一个 byte 会被表示为一个 [0..255] 区间内的整数。函数接受一个 File 对象作为参数。
> readAsText() 读取文件内容，读取结果为一串代表文件内容的文本。函数接受一个 File 对象以及文本编码名称作为参数。
> readAsDataURL 读取文件内容，读取结果为一个 data: 的 URL。DataURL 由 RFC2397 定义，具体可以参考 http://www.ietf.org/rfc/rfc2397.txt。

表 2. 文件读取事件事件名称 事件说明
Onloadstart 文件读取开始时触发。
Progress 当读取进行中时定时触发。事件参数中会含有已读取总数据量。
Abort 当读取被中止时触发。
Error 当读取出错时触发。
Load 当读取成功完成时触发。
Loadend 当读取完成时，无论成功或者失败都会触发。

```
function uploadAndSubmit() {
			var form = document.forms["demoForm"];

			if (form["file"].files.length > 0)
			{
				var file = form["file"].files[0];

				// try sending
				var reader = new FileReader();

				reader.onloadstart = function() {
					console.log("onloadstart");

	            document.getElementById("bytesTotal").textContent = file.size;
				}

				reader.onprogress = function(p) {
					console.log("onprogress");
					document.getElementById("bytesRead").textContent = p.loaded;
				}

				reader.onload = function() {
					console.log("load complete");
				}

				reader.onloadend = function() {
					if (reader.error) {
						console.log(reader.error);
					} else {
						document.getElementById("bytesRead").textContent = file.size;
						var xhr = new XMLHttpRequest();
						xhr.open(/* method */ "POST", /* target url */ "upload.jsp?fileName=" + file.name /*, async, default to true */);
                  xhr.overrideMimeType("application/octet-stream");
						// xhr.sendAsBinary(reader.result);

						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) {
								if (xhr.status == 200) {
									console.log("upload complete");
									console.log("response: " + xhr.responseText);
								}
							}
						}
					}

				}

<form name="demoForm" id="demoForm" method="post" enctype="multipart/form-data" action="javascript: uploadAndSubmit();">
		<p>Upload File: <input type="file" name="file" /></p>
		<p><input type="submit" value="Submit" /></p>
	</form>
```

### 使用 form 表单可以实现上传，但是要做到无刷新，就要借助 iframe

## iframe 是什么?

> 1.iframe 就是一个普通的 html 元素，同样可以通过 css 设置其样式，而起 iframe 还是一个 inline-block 元素。　 2.只要掌握了父页面和子页面的渲染顺序，就能很容易掌握 iframe 的自适应高宽。其实很简单，在父页面设置 iframe 元素的 width,height 即可，并且 scrolling 为 auto。
>
> ```
> 页面德加载顺序
> 父窗口大小由用户决定--》子页面加载完毕 ---》父页面加载完毕---》在父页面改写iframe元素的height，width ，---》子页面的窗口大小确定---》根据iframe的scrolling属性调节滚动条--->渲染完毕。
> ```
>
> 3.iframe 的一个独特用处是，对含有文件上传表单的无刷新提交。　 4.注意如果 iframe 的内容是外部网址内容，则不能操作其 document。
> 1)document.getElementById("myiframe").contentWindow 得到 iframe 对象后，就可以通过 contentWindow 得到 iframe 包含页面的 window 对象，然后就可以正常访问页面元素了；在 iframe 里使用 iframe

```
  <form method="post"
    encType="multipart/form-data"
    action="${this.props.action}" id="form"
    style="display:block;height:9999px;position:relative;overflow:hidden;">
    <input id="input" type="file"
     name="${this.props.name}"
     style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>
```

> 使用 form 就要制定 enctype="multipart/form-data"；

#### 下载

下载的时候，因为浏览器可以直接浏览图片,txt 文件，因此，我们可以使用 html5 的新属性 download 属性。事实上，用 JavaScript 来下载文件也是利用这一特性来实现的，我们的 JavaScript 代码不外乎就是：

1，用 JavaScript 创建一个隐藏的 a 标签
2，设置它的 href 属性
3，设置它的 download 属性
4，用 JavaScript 来触发这个它的 click 事件

```
<a href='large.png' download></a>
//动态
var a = document.createElement('a');
var url = window.URL.createObjectURL(blob);
var filename = 'what-you-want.txt';
a.href = url;
a.download = filename;
a.click();
window.URL.revokeObjectURL(url);
```

> window.URL 里面有两个方法：
> createObjectURL 用 blob 对象来创建一个 object URL(它是一个 DOMString)，我们可以用这个 object URL 来表示某个 blob 对象，这个 object URL 可以用在 href 和 src 之类的属性上。
> revokeObjectURL 释放由 createObjectURL 创建的 object URL，当该 object URL 不需要的时候，我们要主动调用这个方法来获取最佳性能和内存使用。知道了这两个方法之后，我们再回去看看上面的例子就很容易理解了吧！只是用 blob 对象来创建一条 URL，然后让 a 标签引用该 URL，然后触发个点击事件，就可以下载文件了！

## 跨域问题

> 1.什么引起了 ajax 跨域不能的问题
> ajax 本身实际上是通过 XMLHttpRequest 对象来进行数据的交互，而浏览器出于安全考虑，不允许 js 代码进行跨域操作，所以会警告。

2.有什么完美的解决方案么？没有。解决方案有不少，但是只能是根据自己的实际情况来选择。

具体情况有:
一、本域和子域的相互访问: www.aa.com 和 book.aa.com
二、本域和其他域的相互访问: www.aa.com 和 www.bb.com 用 iframe
三、本域和其他域的相互访问: www.aa.com 和 www.bb.com 用 XMLHttpRequest 访问代理四、本域和其他域的相互访问: www.aa.com 和 www.bb.com 用 JS 创建动态脚本

解决方法：一、如果想做到数据的交互，那么 www.aa.com 和 book.aa.com 必须由你来开发才可以。可以将 book.aa.com 用 iframe 添加到 www.aa.com 的某个页面下,在 www.aa.com 和 iframe 里面都加上 document.domain = "aa.com"，这样就可以统一域了，可以实现跨域访问。就和平时同一个域中镶嵌 iframe 一样，直接调用里面的 JS 就可以了。（这个办法我没有尝试，不过理论可行）

二、当两个域不同时,如果想相互调用，那么同样需要两个域都是由你来开发才可以。用 iframe 可以实现数据的互相调用。解决方案就是用 window.location 对象的 hash 属性。hash 属性就是http://domian/web/a.htm#dshakjdhsjka 里面的#dshakjdhsjka。利用 JS 改变 hash 值网页不会刷新，可以这样实现通过 JS 访问 hash 值来做到通信。不过除了 IE 之外其他大部分浏览器只要改变 hash 就会记录历史，你在前进和后退时就需要处理，非常麻烦。不过再做简单的处理时还是可以用的，具体的代码我再下面有下载。大体的过程是页面 a 和页面 b 在不同域下,b 通过 iframe 添加到 a 里，a 通过 JS 修改 iframe 的 hash 值，b 里面做一个监听（因为 JS 只能修改 hash，数据是否改变只能由 b 自己来判断），检测到 b 的 hash 值被修改了，得到修改的值，经过处理返回 a 需要的值，再来修改 a 的 hash 值（这个地方要注意，如果 a 本身是那种查询页面的话比如http://domian/web/a.aspx?id=3,在b中直接parent.window.location是无法取得数据的，同样报没有权限的错误，需要a把这个传过来，所以也比较麻烦），同样a里面也要做监听，如果hash变化的话就取得返回的数据，再做相应的处理。

三、这种情形是最经常遇到的，也是用的最多的了。就是 www.aa.com 和 www.bb.com 你只能修改一个，也就是另外一个是别人的，人家告诉你你要取得数据就访问某某连接参数是什么样子的，最后返回数据是什么格式的。而你需要做的就是在你的域下新建一个网页，让服务器去别人的网站上取得数据，再返回给你。domain1 下的 a 向同域下的 GetData.aspx 请求数据，GetData.aspx 向 domain2 下的 ResponseData.aspx 发送请求,ResponseData.aspx 返回数据给 GetData.aspx, GetData.aspx 再返回给 a,这样就完成了一次数据请求。GetData.aspx 在其中充当了代理的作用。具体可以看下我的代码。

四、这个和上个的区别就是请求是使用 script 标签来请求的，这个要求也是两个域都是由你来开发才行。原理就是 JS 文件注入，在本域内的 a 内生成一个 JS 标签，它的 SRC 指向请求的另外一个域的某个页面 b，b 返回数据即可，可以直接返回 JS 的代码。因为 script 的 src 属性是可以跨域的。具体看代码，这个也比较简单。

code:
http://www.live-share.com/files/300697/Cross_The_Site_Test_code.rar.html
(csdn 不能粘贴附件么？)

总结：第一种情况：域和子域的问题，可以完全解决交互。第二种情况：跨域，实现过程非常麻烦，需要两个域开发者都能控制，适用于简单交互。第三种情况：跨域，开发者只控制一个域即可，实现过程需要增加代理取得数据，是常用的方式。第四种情况：跨域，两个域开发者都需要控制，返回一段 js 代码。

## redux principle

## jquery 选择器 principle

## 定时器原理

## for...in... 和 for...of...

## instance of 原理

1. 常规用法

```
// 判断 foo 是否是 Foo 类的实例
function Foo(){}
var foo = new Foo();
console.log(foo instanceof Foo)//true
```

2. 继承用法

```
// 判断 foo 是否是 Foo 类的实例 , 并且是否是其父类型的实例
function Aoo(){}
function Foo(){}
Foo.prototype = new Aoo();//JavaScript 原型继承

var foo = new Foo();
console.log(foo instanceof Foo)//true
console.log(foo instanceof Aoo)//true
```

3. 复杂用法

```
清单 4. instanceof 复杂用法
console.log(Object instanceof Object);//true
console.log(Function instanceof Function);//true
console.log(Number instanceof Number);//false
console.log(String instanceof String);//false

console.log(Function instanceof Object);//true

console.log(Foo instanceof Function);//true
console.log(Foo instanceof Foo);//false
```

4. instance of 原理（代码）(不适用基本数据类型)

```
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
 var O = R.prototype;// 取 R 的显示原型
 L = L.__proto__;// 取 L 的隐式原型
 while (true) {
   if (L === null)
     return false;
   if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true
     return true;
   L = L.__proto__;
 }
}
由其本文涉及显示原型和隐式原型，所以下面对这两个概念作一下简单说明。在 JavaScript 原型继承结构里面，规范中用 [[Prototype]] 表示对象隐式的原型，在 JavaScript 中用 __proto__ 表示，并且在 Firefox 和 Chrome 浏览器中是可以访问得到这个属性的，但是 IE 下不行。所有 JavaScript 对象都有 __proto__ 属性，但只有 Object.prototype.__proto__ 为 null，前提是没有在 Firefox 或者 Chrome 下修改过这个属性。这个属性指向它的原型对象。
```

原型链图
https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/figure1.jpg

5. 讲解复杂用法

```
7 Object instanceof Object

// 为了方便表述，首先区分左侧表达式和右侧表达式
ObjectL = Object, ObjectR = Object;
// 下面根据规范逐步推演
O = ObjectR.prototype = Object.prototype
L = ObjectL.__proto__ = Function.prototype
// 第一次判断
O != L
// 循环查找 L 是否还有 __proto__
L = Function.prototype.__proto__ = Object.prototype
// 第二次判断
O == L
// 返回 true
清单 8. Function instanceof Function

// 为了方便表述，首先区分左侧表达式和右侧表达式
FunctionL = Function, FunctionR = Function;
// 下面根据规范逐步推演
O = FunctionR.prototype = Function.prototype
L = FunctionL.__proto__ = Function.prototype
// 第一次判断
O == L
// 返回 true
清单 9. Foo instanceof Foo

// 为了方便表述，首先区分左侧表达式和右侧表达式
FooL = Foo, FooR = Foo;
// 下面根据规范逐步推演
O = FooR.prototype = Foo.prototype
L = FooL.__proto__ = Function.prototype
// 第一次判断
O != L
// 循环再次查找 L 是否还有 __proto__
L = Function.prototype.__proto__ = Object.prototype
// 第二次判断
O != L
// 再次循环查找 L 是否还有 __proto__
L = Object.prototype.__proto__ = null
// 第三次判断
L == null
// 返回 false
```

6.

```
var a ='1'
a instance of String
String是一个构造函数对象，a的类型不是String，而是string，整个类型无法直接检测,a.__proto__会导致a被临时包装为一个object类型的对象,此时这个临时对象是由String构造函数创建的，所以a.__proto__===String.prototype成立，
```

## html 文档的 doctype

dtd 信息就是 doctype 声明。

1. 是什么？
   > DOCTYPE 是 document type 的简写。主要用来说明你用的 XHTML 或者 HTML 是什么版本。浏览器根据你 DOCTYPE 定义的 DTD(文档类型定义)来解释页面代码.
2. 作用？
   > doctype 声明指出阅读程序应该用什么规则集来解释文档中的标记。在 web 文档的情况下，“阅读程序”通常是浏览器或者校验器这样的一个程序，“规则”则是 w3c 所发布的一个文档类型定义（dtd）中包含的规则
   > xhtml 1.0 strict：
                                                                                                                        <!doctype html public "-/w3c/dtd xhtml 1.0 strict/en"
   "http://www.w3.org/tr/xhtml1/dtd/xhtml1-strict.dtd">
   xhtml 1.0 transitional：
      <!doctype html public "-/w3c/dtd xhtml 1.0 transitional/en"
"http://www.w3.org/tr/xhtml1/dtd/xhtml1-transitional.dtd">
   xhtml 1.0 frameset：
      <!doctype html public "-/w3c/dtd xhtml 1.0 frameset/en"
   Transitional 类型：是指一种过渡类型，使用这种类型浏览器对 XHTML 的解析比较宽松，允许使用 HTML4.01 中的标签，但必须符合 XHTML 的语法。这种是现在通用的方法，用 dreamweaver 创建网页时默认就是这种类型。
   Strict 类型：严格类型，使用时浏览器将相对严格，不允许使用任何表现形式的标识和属性，如在元素中直接使用 bgcolor 背景色属性等。
   Frameset 类型：框架页类型，如果网页使用了框架结构，就有必要使用这样的文档声明。

## ES6 模块语法 --》 import export

ES6 模块不是对象，而是 export 命令显示指定输出的代码，输入时也采用静态命令的形式。

```
//es6模块
import { stat,exists,readFile} from 'fs';
```

从 fs 中加载这三个方法，其他不加载。这种加载称为**编译时加载**。即 ES6 可以在编译时就完成模块加载。

> 好处：

1. 由于 ES6 模块是编译时加载，所以可以静态分析。这样就能进一步拓宽 JavaScript 的语法，比如**引入宏(macro)和类型检验(type system)**这些只能靠静态分析实现的功能。
2. 不再需要 UMD 模块格式了，服务器和浏览器现在已经大部分支持 ES6 模块格式。
3. 将来浏览器的新 API 就能用模块格式提供，不再必要做成全局变量或者 navigator 对象的属性
4. 不再需要对象作为命名空间(比如 Math 对象)，这将都可以通过模块提供。

> 注意：
> ES6 的模块自动采用严格模式，不管模块头部有没有 use strict；严格模式有以下限制：

1. 变量必须声明后再使用
2. 函数的参数不能有同名属性，否则报错
3. 不能使用 with 语句
4. 不能对只读属性赋值，否则报错
5. 不能使用前缀 0 表示八进制数，否则报错
6. 不能删除不可删除的属性，否则报错
7. 不能使用 delete prop 删除变量，会报错，只能删除属性 delete global[prop]
8. eval 不会在它的外层作用域引入变量
9. eval 和 arguments 不能被重新赋值
10. arguments 不会自动反映函数参数的变化
11. 不能使用 arguments.callee
12. 不能使用 arguments.caller
13. 禁止 this 指向全局对象
14. 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
15. 增加了保留字(比如 protected,static 和 interface)

### import export

模块主要由连个命令构成：export 和 import。
export 命令用于规定模块的**对外接口**；
import 命令用于获取其他模块提供的功能。一个模块就是一个独立文件。该文件内部的所有变量，外部无法获取。如果希望外部能够读取模块内部的变量，就必须使用 export 关键字输出该变量。

#### export 命令

```
1.变量写法
export var year = 2016;
等价于
var year =2016;
export {year};
2.函数写法
export function multiply(){...}
//as 关键字
function v1(){...}
export {v1 as stream}
```

另外，export 语句输出的接口，与其对应的值是动态绑定关系(引入类型)，即通过该接口，可以取到模块内部实时的值。
export 也不能用在块级作用域内。

#### import 命令

> import 命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块(profile.js)对外接口的名称相同。如果想为输入的变量重新去一个名字，import 命令要使用 as 关键字，将输入的变量重命名。

    import {lastName as surname} from './profile'

**注意，import 命令具有提升效果，会提升到整个模块的头部，首先执行。**
import 语句会执行所加载的模块，因此可以有下面的写法：
import 'lodash'

### 模块的整体加载

```
import * as circle from './circle';
```

#### export default 命令 :export default 命令只能使用一次

可以自己给导入进来的今明命名；

```
export default function(){...}
import customer from './export-default';
```

> export default 和 export 输出时候，使用 import 的区别：

1. export default 对应的 import 语句不需要使用大括号，而 export 对应的 import 需要大括号
2. export default 对应的 import 不需要知道加载的模块里的变量名。而 export 对应的 import 必须和 export 的变量一样。

#### 模块的继承

```
//假设有一个circleplus模块，继承了circle模块：
// circleplus.js
export * from 'circle';
export var e = 2.718
export default function(x) {
  return Math.exp(x);
}
上面代码中的export *，表示再输出circle模块的所有属性和方法。注意export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。
```

#### ES6 模块加载是引用类型

#### 循环加载

> ES6 模块是动态引用，如果使用 import 从一个模块加载变量(即 import foo from 'foo')，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

```
// a.js如下
import {bar} from './b.js';
console.log('a.js');
console.log(bar);
export let foo = 'foo';

// b.js
import {foo} from './a.js';
console.log('b.js');
console.log(foo);
export let bar = 'bar';

//输出结果
b.js
undefined
a.js
bar
上面代码中，由于a.js的第一行是加载b.js，所以先执行的是b.js。而b.js的第一行又是加载a.js，这时由于a.js已经开始执行了，所以不会重复执行，而是继续往下执行b.js，所以第一行输出的是b.js。接着，b.js要打印变量foo，这时a.js还没执行完，取不到foo的值，导致打印出来undifined。b.js执行完，开始执行a.js，这时就一切正常了。
```

## react 中元素和组件的区别

React 元素（React element），它是 React 中最小基本单位，我们可以使用 JSX 语法轻松地创建一个 React 元素。React 元素不是真实的 DOM 元素，它仅仅是 js 的普通对象（plain objects）JSX 语法就是用 React.createElement()来构建 React 元素的。React.cloneElement()与 React.createElement()相似，不同的是它传入的第一个参数是一个 React 元素。
React 中有三种构建组件的方式。React.createClass()、ES6 class 和无状态函数。组件是由元素构成的。元素数据结构是普通对象，而组件数据结构是类或纯函数

## vue 双向数据绑定原理

## 浅谈 react angular vue 区别

## react 虚拟 dom 为什么性能高

## promise 原理 使用 优点

## touch 事件与 click 事件区别
## http 和 https 区别
## js是怎么工作的。
###. js引擎：包括：
 这个引擎主要由两部分组成:

内存堆：这是内存分配发生的地方
调用栈：这是你的代码执行时的地方
### 运行时
  所以说我们还有很多引擎之外的 API，我们把这些称为浏览器提供的 Web API，比如说 DOM、AJAX、setTimeout等等。
然后我们还拥有如此流行的事件循环和回调队列。
### 调用栈
  JavaScript 是一门单线程的语言，这意味着它只有一个调用栈，因此，它同一时间只能做一件事。
  调用栈是一种数据结构，它记录了我们在程序中的位置。如果我们运行到一个函数，它就会将其放置到栈顶。当从这个函数返回的时候，就会将这个函数从栈顶弹出，这就是调用栈做的事情。
 每一个进入调用栈的都称为**调用帧**
由于 JavaScript 只有一个调用堆栈，当某段代码运行变慢时会发生什么?
### 并发与事件循环
调用栈中的函数调用需要大量的时间来处理，那么这会发生什么情况呢?事实上，问题是当调用栈有函数要执行，浏览器就不能做任何事，它会被堵塞住。这意味着浏览器不能渲染，不能运行其他的代码，它被卡住了。那么，如何在不阻塞 UI 的情况下执行复杂的代码，让浏览器不会不响应?解决方案就是异步回调。
## V8 引擎
https://juejin.im/post/5a102e656fb9a044fd1158c6
 JavaScript 引擎 是执行 JavaScript 代码的程序或者说是解释器。JavaScript 引擎能够被实现成标准解释器或者是能够将 JavaScript 以某种方式编译为字节码的即时编译器。
### 为什么要创建 V8 引擎？V8 最初被设计出来是为了提高浏览器内部 JavaScript 的执行性能。为了获取更快的速度，V8 将 JavaScript 代码编译成了更加高效的机器码，而不是使用解释器。
### 优化
### 代码嵌入 (Inlining)
### 隐藏类 (Hidden class)
1.  首次优化就是尽可能的提前嵌入更多的代码。代码嵌入就是将使用函数的地方(调用函数的那一行)替换成调用函数的本体。这简单的一步就会使接下来的优化更加有用。
2.  JavaScript 是一门基于原型的语言: 没有类和对象是通过克隆来创建的。同时 JavaScript 也是一门动态语言，这意味着在实例化之后也能够方便的从对象中添加或者删除属性。
3. 由于采用字典的方式去内存中查找对象属性的位置效率很低，因此 V8 就采用了一种不一样的方法：隐藏类。
### 内联缓存 (Inline caching)
### 编译成机器代码
### 垃圾回收
### 如何写出优化的 JavaScript
https://blog.sessionstack.com/how-javascript-works-deep-dive-into-websockets-and-http-2-with-sse-how-to-pick-the-right-path-584e6b8e3bf7
## 内存管理以及四种常见的内存泄漏的解决方法
## 事件循环和异步编程的崛起以及 5 个如何更好的使用 async/await 编码的技巧