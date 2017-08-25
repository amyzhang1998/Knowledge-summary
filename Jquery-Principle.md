# Jquery

http://rapheal.sinaapp.com/2013/01/26/jquery-src-deferred/
## 工具方法
>实际上jQuery是一个函数，为什么要这样设计呢，是因为：
>1. 函数也是对象，于是在jQuery这个命名空间上可以绑定工具方法
>2. 函数可以有原型prototype，每当通过dom = $(“#id”)取得的所谓jQuery对象，本质就是dom = new jQuery(‘#id’);

>简单来说，就是把jQuery看成是一个类，在原型上绑定方法就相当于成员方法，在jQuery上绑定工具方法，相当于类的静态方法.

### 常用的工具方法
1. $.trim() 去除字符串两端的空格。（内部调用7次）
2. $.each() 遍历数组或对象，这个方法在jQuery内部中被使用很多次，有几个不错的用法，之后剖析再举例吧。（内部调用59次）

3. $.inArray() 返回一个值在数组中的索引位置。如果该值不在数组中，则返回-1。（内部调用9次）

4. $.grep() 返回数组中符合某种标准的元素。（内部调用6次）

5. $.merge() 合并两个数组。（内部调用11次）

6. $.map() 将一个数组中的元素转换到另一个数组中。（内部调用12次）

7. $.makeArray() 将对象转化为数组。（内部调用6次）

8. $.globalEval() 在全局作用域下执行一段js脚本。（内部调用2次）

9. $.proxy() 接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文(context)语境。（内部调用0次）

10. $.nodeName() 返回DOM节点的节点名字，或者判断DOM节点名是否为某某名字。（内部调用51次）

11. $.extend() 将多个对象，合并到第一个对象。（内部调用42次）

>以下均是对类型的判断，本文只是针对$.type做一下讨论，isXXX的方法基本都是调用$.type来实现，不对它们做细节探讨。

12. $.type() 判断对象的类别（函数对象、日期对象、数组对象、正则对象等等）。这个方法的实现就是用$.each辅助的。（内部调用65次）

13. $.isArray() 判断某个参数是否为数组。（内部调用12次）

14. $.isEmptyObject() 判断某个对象是否为空（不含有任何属性）。（内部调用4次）

15. $.isFunction() 判断某个参数是否为函数。（内部调用32次）

16. $.isPlainObject() 判断某个参数是否为用”{}”或”new Object”建立的对象。（内部调用4次）

17. $.isWindow() 判断是否为window对象。（内部调用6次）

>以下三个函数比较简单，没必要在文章剖析。

18. $.noop() 一个空函数，个人觉得是用来作为一个默认的回调函数，无需每次去定义一个空的function消耗资源。（内部调用2次）

19. $.now() 获取当前时间戳，代码很简单：return (new Date()).getTime();。（内部调用4次）

20. $.error() 报错，对外抛出一个异常，代码很简单：throw new Error(msg);。（内部调用2次）

>以下三个是jQuery主要用来在ajax处理返回数据时使用，其中parseJSON这个接口在实际工程中被用得最多，经常用来把一段文本解析成json格式

21. $.parseHTML() 解析HTML，之后再单独一节写。（内部调用2次）

22. $.parseJSON() 解析JSON，之后再单独一节写。（内部调用2次）

23. $.parseXML() 解析XML，之后再单独一节写。（内部调用1次）

> 其中我认为是内部辅助函数如下：

24. $.access() 这个函数我更认为是jQuery内部的辅助函数，没必要暴漏出来，在内部用于去一些对象的属性值等，在之后剖析到DOM操作等再细细探讨一下。（内部调用9次）

25. $.camelCase() 转化成骆驼峰命名。（内部调用12次）

### 分析：

```
define( [
	"./arr"
], function( arr ) {
	"use strict";

	return arr.push;
} );

define( [
	"./class2type"
], function( class2type ) {
	"use strict";

	return class2type.toString;
} );

```
问题：jquery选择把array，string等这些数据类型的基本方法先存储起来调用的原因？
1. 效率问题
>调用实例arr的方法concat时，首先需要辨别当前实例arr的类型是Array，在内存空间中寻找Array的concat内存入口，把当前对象arr的指针和其他参数压入栈，跳转到concat地址开始执行。
当保存了concat方法的入口core_concat时，完全就可以省去前面两个步骤，从而提升一些性能。

2. var obj = {};
> 此时调用obj.concat是非法的，但是如果jQuery采用上边方式二或者三的话，能够解决这个问题。
也即是让类数组也能用到数组的方法（这就是call跟apply带来的另一种用法），尤其在jQuery里边引用一些DOM对象时，也能完美的用这个方法去解决，妙！
### 回调函数队列
1. $.Callbacks();从$.Callbacks的源码中看到一些处理并发异步的做法。
这里的回调函数管理器是可以并发的，也就是在触发事件的过程当中有可能有其他回调被加入队列或者移出队列。
>$.Callbacks的成员方法；
>callbacks.add(fn1, [fn2, fn3,...])//添加一个/多个回调
callbacks.remove(fn1, [fn2, fn3,...])//移除一个/多个回调
callbacks.fire(args)//触发回调，将args传递给fn1/fn2/fn3……
callbacks.fireWith(context, args)//指定上下文context然后触发回调
callbacks.lock()//锁住队列当前的触发状态
callbacks.disable()//禁掉管理器，也就是所有的fire都不生效

>callbacks.has(fn)//判断有无fn回调在队列里边
callbacks.empty()//清空回调队列
callbacks.disabled()//管理器是否禁用
callbacks.fired()//是否已经触发过，即是有没有fire/fireWith过
callbacks.locked()//判断是否锁住队列

2. 异步函数读取结果的状态 用$.Callback()去确认需要获取多次实例，不够优雅。所以，jquey封装了一个方法$.Deferred().
在实际的开发中，其实会经常遇到一些很耗时的操作，例如ajax请求数据，read读取文件，处理大数据等等。由于不能立即得到结果，所以我们需要一个延迟的回调。
$.Deferred就是这样诞生的，jQuery里边的ready，ajax都是用了异步队列deferred。
Deferred 中的成员方法；
> 1,deferred.resolve/deferred.resolveWith([context],args);2,deferred.reject/deferred.rejectWith([context],args);3,deferred.notify/deferred.notifyWith([context],args); 这里三个方法 都等同于$.Callbacks().(fire/fireWith)

deferred.done()方法是调用callbacks.add() callback.fire(）方法将deferred.resolve()的值传出来。

Deferred()实例反回所有实例方法，但是有时候会产生副作用，所以在使用的时候，反回，$.Deferred().promise();
$.Deferred()

生成一个异步队列实例

接受一个function参数，function里边可以使用this来调用当前的异步队列实例

deferred.done(fn)

成功时触发的回调fn

deferred.fail(fn)

失败时触发的回调fn

deferred.progress(fn)

处理中触发的回调fn

deferred.resolve/resolveWith([context], args)

这里等同$.Callbacks().(fire/fireWith)

在任务处理成功之后使用此方法触发成功事件，之前加入done队列的回调会被触发

deferred.reject/rejectWith([context], args)

这里等同$.Callbacks().(fire/fireWith)

在任务处理失败之后使用此方法触发失败事件，之前加入fail队列的回调会被触发

deferred.notify/notifyWith([context], args)

这里等同$.Callbacks().(fire/fireWith)

在任务处理中可以使用此方法触发正在处理事件，之前加入progress队列的回调会被触发

deferred.promise()

简单理解就是生成一个跟deferred一样的对象，但是无法在外部用resolve等去修改当前任务状态

deferred.then(/* fnDone, fnFail, fnProgress */)

可以直接传入三个回调函数，分别对应done|fail|progress三个状态的回调

deferred.always(fn)

不管最后是resolve还是reject，都会触发fn

$.when(mission1, [mission2, mission3, ...])``类似promise（）的promise.all()``

这个是绑定在jQuery上的

可以接受多个任务。如：$.when(readfile1, readfile2).done(/* Your code */)

