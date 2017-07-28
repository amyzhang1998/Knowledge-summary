## 实现原理
## ES7(ECMAScript 2016)
### 异步函数 async (generator,promise)
>通过Promise和Generator来使用看起来同步的代码去执行异步操作。
>
>```
>async function fetchJson(url){
>   try {
>       let request = await fetch(url);
>       let text = await request.text();
>       return JSON.parse(text);
>   catch(error){
>       console.log(`Error:${error.stack}`)}}}
>```
>在内部，异步函数的工作原理类似于generators，但并不会被翻译成generator函数。
>### async await
>async函数内你可以await 一个promise函数直到它执行完。
>有错误抛出的话，用catch捕捉
>sleep函数
> 
> ```
> function sleep (milliseconds){
> return new Promise((resolve,reject)=>{
> setTimeout(()=>{
> resolve},milliseconds)
> })}
> 
> ```
>
### 装饰器 Decorators
>原理 Object.defineProperty(target,key,descriptor){}
>作用：是给一个已有的方法或类扩展一些新的行为，而不是去直接修改它本身。

### Array.prototype.includes(element,index)
>相似于indexOf，唯一区别是：includes（）方法能找到NaN，
>可以通过Obiect.defineProperty(Array.prototype,'includes',{value:(searchElement,fromIndex)=>{}}) 来polyfill.
>
>```
>[1,2,3].includes(2)//true
>```

## ES6（ECMAScript 2015）
### Iterators(迭代器) +for...of + Generators(生成器)
>迭代器和生成器将迭代的概念直接带入核心语言，并提供了一种机制来自定义 for ... of 的循环行为
>
>```
>Iterator
> function makeIterator(array){
> var nextIndex = 0;
> 
> return{
>       next:function(){
>           return nextIndex < array.length ? {value: array[nextIndex++],done:false}:{done:true};
> }}}
>```
>for ...in循环可以取代next()方法的调用。
>
>```
>var it = Iterator(['ss','dd']);
>for (var key in it) 
>
>```
>由于迭代器需要显示的维持她们的内部状态，所以需要仔细的规划它们的构造，生成器提供了一个强大的选择，它允许你通过写一个可以保存自己状态的简单函数来定义一个迭代算法。一个函数如果它里面包含了一个或一个以上的yiled表达式，那么这个函数就成为一个生成器了。
>function* simpleGenerator(){}
>
>```
>function Range(low, high){
  this.low = low;
  this.high = high;
}
Range.prototype.__iterator__ = function*(){
  for (var i = this.low; i <= this.high; i++)
    yield i;
};
var range = new Range(3, 5);
for (var i in range)
  print(i);
>```
>生成器可以通过 return；中止；
>生成器通过调用next（）启动生成器，调用send()重新启动生成器。
>for ...of 与for...in 的区别
>for...in循环会遍历一个object的所有可枚举属性。
>for ...of 是为各种collection对象(Array,Map,Set,String,TypeArray,arguments)专门定制的，并不适用于所有的object。
### String.prototype.includes()
>可以直接扩展String.prototype的属性，来polyfill.
>
>```
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
>
>```
### Object
>Object.assign(target,...sources)//复制自己的可枚举属性
>Object.getOwnPropertyDescriptor(obj, prop)//ES6增强了功能。属性描述器
>Object.defineProperty(obj, prop, descriptor)//ES6增强了功能。定义自己的属性描述符
>
>```
>polyfill...
>
>var _extends = Object.assign || function (target) { 
>for (var i = 1; i < arguments.length; i++) {
> var source = arguments[i]; 
> for (var key in source) { 
> if (Object.prototype.hasOwnProperty.call(source, key)) {
>  target[key] = source[key]; 
> }
> } 
> }
>  return target; 
> };
>```
>
>Object.create():可以创建一个具有特殊原型对象和特性的新对象；相当于替代了new；
>它先是声明了一个构造器,然后将其原型设置为你想要的值,最后返回生成的新对象.其实就是封装了new.
>Object.create(proto[,propertiesObject]) (ES5)
>.  参数：proto: 是新创建对象的原型。
>.  propertiesObject:可选的，可以定义自己的属性描述。


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

>Object.setPrototypeof(obj,prototype):返回一个原型指向新的对象的对象
>
### js中继承的实现
>1，原型链继承
>借助已有的对象创建新的对象，将子类的原型指向父类，就相当于加入了父类这条原型链
>
>使用原型继承主要由两个问题：
一是字面量重写原型会中断关系，使用引用类型的原型，并且子类型还无法给超类型传递参数。

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

>
``2.类继承``
>在子类型构造函数的内部调用超类型的构造函数。
严格的类式继承并不是很常见，一般都是组合着用;
缺点：子类拿不到父类原型链上的属性
>
>```
>function super(){
>this.color =['res']};
>function sub(){
>Supwe.call(this)
>}
>```
>3.组合继承（原型+ 构造函数）
>组合式继承是比较常用的一种继承方法，其背后的思路是 使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。

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

``4,原型式继承``
>原型式继承首先在obj()函数内部创建一个临时性的构造函数 ，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个新实例。
>
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
``5,寄生式继承``
>这种继承方式是把原型式+工厂模式结合起来，目的是为了封装创建的过程。
>
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

>组合式继承是js最常用的继承模式，但组合继承的超类型在使用过程中会被调用两次；一次是创建子类型的时候，另一次是在子类型构造函数的内部

``6.寄生组合式继承``

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

>``class``的原理就是 Object.defineProperty(obj,prop,descriptor);
>通过修改该类(实际上是函数)的prototype来完成的。但是我们的实例属性还是通过构造函数方式来完成的。

>``extends``的原理就是Object.create()继承组合式继承

>``super``原理：在调用自方法的时候通过原型链先去父类中找，父类中没有在往上一层层寻找。有就返回值，没有就是undefined;  原理是Object.getPropertyOf()


### new 函数的过程
>var o = new Foo();

>//JavaScript 实际上执行的是：

>var o = new Object();

>o.[[Prototype]] = Foo.prototype;
>Foo.call(o);

### promise实现。
## 面包屑 a标签
>a标签的href属性指的是 a引用了一些资源，这些资源都属于一些协议，每种协议都有自己的默认行为。

>https?//...

> ftp://...

>tencent://...

>thunder://...

>mailto:...

>javascript:...伪协议，有些浏览器不支持，还有当用户禁用javascript，这个链接就会失效。
>href 的值为javascript: 与click 事件。
>主要区别：
>定义的scope不同，前者是global，后者可以是任何作用域执行的context不同，前者是window，后者是a

>元素本身执行的时机不同，总是click事件先执行，href="javascript:..."后执行，所以，只能在click

>事件里阻止默认行为的发生，却不能在href里阻止事件的执行。
>href="javascript:;"
>href="javascript:this.close()"
>
>href 里写 JS，目的不外乎就是为了执行 JS 语句而已。比如 <a href="javascript:void(0)" onclick="doing()">link</a> ，是为了点击链接不会跳转，同时执行 onclick 里面的 JS。带 onclick 的好处是可以获取控件本身，比如 onclick="doing(this)"，这个 this 参数就是这个 <a></a> 控件，然后就可以在 doing 这个函数里操作这个控件。写成 href="javascript:doing()" 就是省略了 onclick 的写法。

## 上传组件
## jquery的选择器

## jquery Ajax的一些参数深入理解
## 深入理解Http里的参数（写一个前后台交互的组件，譬如上传，表单提交）
## http和https区别
## nodejs 写一个前后断交互。
## react-native 写一个跨平台的移动端应用（简聊）
## 如何实现一个modal框
>用react实现
>
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
## jsonp实现原理
>jsonp是一种跨域通信的手段，它的原理是：
>1）：首先是利用script标签的src属性来实现跨域；
>2）通过将前端方法作为参数传递到服务器，然后由服务器端注入参数之后再返回，实现服务端向客户端通信。
>3）由于使用script标签的src属性，因此只支持get方法。
>
>```
>   function jsonp(req){
> var script = document.createElement('script');
> var url = req.url + '?callback=' + req.callback.name;
> script.src = url;
> document.getElementByTagName('head')[0].appendChild(script)
> }
> 不足之处：1）传递的参数必须是一个全局方法，我们都知道应该尽可能的减少全局方法；
>2）需要加入一些参数校验，确保接口可以正常执行

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
## 模块化和组件话
## require.js实现原理
## react-router的实现原理
>1,react-router赖以生存的history
>2,如何实现url和ui共存的
>一句话：实现URL与UI界面的同步。其中在react-router中，URL对应Location对象，而UI是由react components来决定的，这样就转变成location与components之间的同步问题。
>this.context.router 
>跳转前确认：enter,leave routerWillLeave

## break语句的使用条件，还有什么循环中不能使用break?(js中break,continue,return 使用情况)
>1，break和continue ;都是退出循环，或者switch语句。所以只有这种形式才是合理的。
>2，return语句。用在函数中。
>1.return语句用于指定函数返回的值。
>2.return语句应用范围只能出现在函数体内，出现在代码中的其他任何地方都会造成语法错误。
>注意的是，使用return语句时，函数会停止执行，并返回指定的值，return后面的语句时不执行的。
>3.在大多数情况下，为事件处理函数返回false，可以防止默认的事件行为，例如，默认情况下点击一个
>a元素，页面会跳转到该元素href属性指定的页。
>4.return false相当于终止符，return true相当于执行符。
>5.在js中return false的作用一般是用来取消默认动作的。比如你单击一个链接除了触发你的
>onclick事>件以外还要触发一个默认事件就是执行页面的跳转。所有如果想取消对象的默认动作就可以return false。
>##循环原理
>1，forEach.  :callback(T,kValue,k,0)
>2,map.  : mappedValue = callback(T,kValue,k,0);     A[k]= mappedValue return A
>

>##webpack压缩打包出来的文件都有什么规则。
>##怎么获取异步语句输出的值。

## 上传,下载文件的实现原理。
>1, input 的 name属性
>name 属性规定 input 元素的名称。
>name 属性用于对提交到服务器后的表单数据进行标识，或者在客户端通过 JavaScript 引用表单数据。
>2, header中的Content-Disposition作用.
>使用html 的 标签，提交form 的几个属性必须为： method=post encType=multipart/form-data; 
method 属性必须设为post的原因是：值不是放在URL之后传递到服务器的； 
encType属性：这个属性管理的是表单的MIME编码 
几个属性详解： 
application/x-www-form-urlencoded 在发送前编码所有字符（默认） 
multipart/form-data 不对字符编码，在使用包含文件上传控件的表单时，必须使用该值；对于“multipart/form-data”类型的form表单，浏览器上传的实体内 容中的每个表单字段元素的数据之间用字段分隔界线进行分割，两个分隔界线间的内容称为一个分区，每个分区中的内容可以被看作两部分，一部分是对表单字段元 素进行描述的描述头，另外一部是表单字段元素的主体内容 
>text/plain 空格转换为“+”，不对特殊字符编码

###使用FormData+ajax实现上传
>兼容性 ie 11 10 部分支持。
>通过FormData对象可以组装一组用 XMLHttpRequest发送请求的键/值对。它可以更灵活方便的发送表单数据，因为可以独立于表单使用。如果你把表单的编码类型设置为multipart/form-data ，则通过FormData传输的数据格式和表单通过submit() 方法传输的数据格式相同。

###使用javascript 的fileApi 实现文件上传；
>兼容性 ie 11 10 部分支持。
>FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
>File API 由一组 JavaScript 对象以及事件构成。赋予开发人员操作在 <input type=”file” … /> 文件选择控件中选定文件的能力。图 1 展示了 File API 所有的 JavaScript 的组合关系。
>类型 FileList 包含一组 File 对象。通常 FileList 对象可以从表单中的文件域（<input type=”file” .../>）中拿取。Blob 对象代表浏览器所能读取的一组原始二进制流。Blob 对象中，属性 size 表示流的大小。函数 slice() 可以将一个长的 Blob 对象分割成小块。File 对象继承自 Blob 对象，在 Blob 对象基础上增加了和 File 相关的属性。其中，属性 name 表示文件的名字，这个名字去掉了文件的路径信息，而只保留了文件名。属性 type 表示文件的 MIME 类型。属性 urn 则代表这个文件的 URN 信息。为完成文件读取的操作，一个 FileReader 对象实例会关联 File 或 Blob 对象，并提供三种不同的文件读取函数以及 6 种事件。
>表 1. 文件读取函数
函数名称	功能
readAsBinaryString()	读取文件内容，读取结果为一个 binary string。文件每一个 byte 会被表示为一个 [0..255] 区间内的整数。函数接受一个 File 对象作为参数。
readAsText()	读取文件内容，读取结果为一串代表文件内容的文本。函数接受一个 File 对象以及文本编码名称作为参数。
readAsDataURL	读取文件内容，读取结果为一个 data: 的 URL。DataURL 由 RFC2397 定义，具体可以参考 http://www.ietf.org/rfc/rfc2397.txt。

表 2. 文件读取事件
事件名称	事件说明
Onloadstart	文件读取开始时触发。
Progress	当读取进行中时定时触发。事件参数中会含有已读取总数据量。
Abort	当读取被中止时触发。
Error	当读取出错时触发。
Load	当读取成功完成时触发。
Loadend	当读取完成时，无论成功或者失败都会触发。

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

### 使用form表单可以实现上传，但是要做到无刷新，就要借助iframe
## iframe是什么?
>　　1.iframe就是一个普通的html元素，同样可以通过css设置其样式，而起iframe还是一个inline-block元素。
>　2.只要掌握了父页面和子页面的渲染顺序，就能很容易掌握iframe的自适应高宽。其实很简单，在父页面设置iframe元素的width,height即可，并且scrolling为auto。
> 
> ```  
> 页面德加载顺序
> 父窗口大小由用户决定--》子页面加载完毕 ---》父页面加载完毕---》在父页面改写iframe元素的height，width ，---》子页面的窗口大小确定---》根据iframe的scrolling属性调节滚动条--->渲染完毕。
> ```
>　3.iframe的一个独特用处是，对含有文件上传表单的无刷新提交。
>　4.注意如果iframe的内容是外部网址内容，则不能操作其document。
>1)document.getElementById("myiframe").contentWindow 得到iframe对象后，就可以通过contentWindow得到iframe包含页面的window对象，然后就可以正常访问页面元素了；
>在iframe里使用 iframe

```
  <form method="post"
    encType="multipart/form-data"
    action="${this.props.action}" id="form"
    style="display:block;height:9999px;position:relative;overflow:hidden;">
    <input id="input" type="file"
     name="${this.props.name}"
     style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>
```  
>使用 form就要制定 enctype="multipart/form-data"；
#### 下载
下载的时候，因为浏览器可以直接浏览图片,txt文件，因此，我们可以使用html5的新属性download属性。
事实上，用 JavaScript 来下载文件也是利用这一特性来实现的，我们的 JavaScript 代码不外乎就是：

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
>window.URL 里面有两个方法：
createObjectURL 用 blob 对象来创建一个 object URL(它是一个 DOMString)，我们可以用这个 object URL 来表示某个 blob 对象，这个 object URL 可以用在 href 和 src 之类的属性上。
revokeObjectURL 释放由 createObjectURL 创建的 object URL，当该 object URL 不需要的时候，我们要主动调用这个方法来获取最佳性能和内存使用。
知道了这两个方法之后，我们再回去看看上面的例子就很容易理解了吧！只是用 blob 对象来创建一条 URL，然后让 a 标签引用该 URL，然后触发个点击事件，就可以下载文件了！

## 跨域问题
>1.什么引起了ajax跨域不能的问题 
ajax本身实际上是通过XMLHttpRequest对象来进行数据的交互，而浏览器出于安全考虑，不允许js代码进行跨域操作，所以会警告。 

2.有什么完美的解决方案么？ 
没有。解决方案有不少，但是只能是根据自己的实际情况来选择。 

具体情况有: 
一、本域和子域的相互访问: www.aa.com和book.aa.com 
二、本域和其他域的相互访问: www.aa.com和www.bb.com 用 iframe 
三、本域和其他域的相互访问: www.aa.com和www.bb.com 用 XMLHttpRequest访问代理 
四、本域和其他域的相互访问: www.aa.com和www.bb.com 用 JS创建动态脚本 


解决方法： 
一、如果想做到数据的交互，那么www.aa.com和book.aa.com必须由你来开发才可以。可以将book.aa.com用iframe添加到 www.aa.com的某个页面下,在www.aa.com和iframe里面都加上document.domain = "aa.com"，这样就可以统一域了，可以实现跨域访问。就和平时同一个域中镶嵌iframe一样，直接调用里面的JS就可以了。（这个办法我没有尝试，不过理论可行） 


二、当两个域不同时,如果想相互调用，那么同样需要两个域都是由你来开发才可以。用iframe可以实现数据的互相调用。解决方案就是用window.location对象的hash属性。hash属性就是http://domian/web/a.htm#dshakjdhsjka 里面的#dshakjdhsjka。利用JS改变hash值网页不会刷新，可以这样实现通过JS访问hash值来做到通信。不过除了IE之外其他大部分浏览器只要改变hash就会记录历史，你在前进和后退时就需要处理，非常麻烦。不过再做简单的处理时还是可以用的，具体的代码我再下面有下载。大体的过程是页面a和页面b在不同域下,b通过iframe添加到a里，a通过JS修改iframe的hash值，b里面做一个监听（因为JS只能修改hash，数据是否改变只能由b自己来判断），检测到b的hash值被修改了，得到修改的值，经过处理返回a需要的值，再来修改a的hash值（这个地方要注意，如果a 本身是那种查询页面的话比如http://domian/web/a.aspx?id=3,在b中直接parent.window.location是无法取得数据的，同样报没有权限的错误，需要a把这个传过来，所以也比较麻烦），同样a里面也要做监听，如果hash变化的话就取得返回的数据，再做相应的处理。 


三、这种情形是最经常遇到的，也是用的最多的了。就是www.aa.com和www.bb.com你只能修改一个，也就是另外一个是别人的，人家告诉你你要取得数据就访问某某连接参数是什么样子的，最后返回数据是什么格式的。而你需要做的就是在你的域下新建一个网页，让服务器去别人的网站上取得数据，再返回给你。domain1下的a向同域下的GetData.aspx请求数据，GetData.aspx向domain2下的 ResponseData.aspx发送请求,ResponseData.aspx返回数据给GetData.aspx, GetData.aspx再返回给a,这样就完成了一次数据请求。GetData.aspx在其中充当了代理的作用。具体可以看下我的代码。 


四、这个和上个的区别就是请求是使用script标签来请求的，这个要求也是两个域都是由你来开发才行。原理就是JS文件注入，在本域内的a 内生成一个JS标签，它的SRC指向请求的另外一个域的某个页面b，b返回数据即可，可以直接返回JS的代码。因为script的src属性是可以跨域的。具体看代码，这个也比较简单。 

code: 
http://www.live-share.com/files/300697/Cross_The_Site_Test_code.rar.html 
(csdn不能粘贴附件么？) 

总结： 
第一种情况：域和子域的问题，可以完全解决交互。 
第二种情况：跨域，实现过程非常麻烦，需要两个域开发者都能控制，适用于简单交互。 
第三种情况：跨域，开发者只控制一个域即可，实现过程需要增加代理取得数据，是常用的方式。 
第四种情况：跨域，两个域开发者都需要控制，返回一段js代码。 

## redux principle
## jquery 选择器 principle
## 定时器原理




