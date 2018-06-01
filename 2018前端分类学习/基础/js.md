# js

## 递归是什么原理，需不需要设置显示终止条件?

需要设置 显示终止条件，要不然就会栈溢出。其实，对一些如树的递归结构，递归算法是又自然又好用

* `本质`

> 递归的本质和栈数据的存取很相似了，都是先进去，但是往往最后处理！再者对于递归函数的局部变量的存储是按照栈的方式去存的，对于每一层的递归函数在栈中都保存了本层函数的局部变量，一边该层递归函数结束时能够保存原来该层的数据！

* `原理`

  1.　每一次函数调用都会有一次返回．当程序流执行到某一级递归的结尾处时，它会转移到前一级递归继续执行．

  2.　递归函数中，位于递归调用前的语句和各级被调函数具有相同的顺序．如打印语句 #1 位于递归调用语句前，它按照递归调用的顺序被执行了 4 次．

  3.　每一级的函数调用都有自己的局部变量．

  4.　递归函数中，位于递归调用语句后的语句的执行顺序和各个被调用函数的顺序相反．即位于递归函数入口前的语句，由外往里执行；位于递归函数入口后面的语句，由里往外执行。

  5.　虽然每一级递归有自己的变量，但是函数代码并不会得到复制．

  6.　递归函数中必须包含可以终止递归调用的语句．

* `使用尾递归优化 替代 递归算法`

##### `尾递归优化(tail calls)`

> 函数的最后一个操作时调用自己，尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误
>
> ```
> function fact(b,acc=1){
>  if(n==0)return acc;
> return fact(n-1,acc*n)}
> //优化：通过循环+递推
> ```
>
> 尾递归优化。（ES6 中令人激动的是尾递归优化）（Es7 中最令人激动的是 async function）
> 1）：使用 babel 预编译
> 2）：使用，sweet.js macro
> 两种方式相似都需要预编译成 ES5 标准，兼容所有的浏览器。babel 会检查这些尾递归，并转化成**循环**。原理：
> `ES6的尾调用优化只在严格模式下开启，正常模式是无效的。`
> 这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
> func.arguments：返回调用时函数的参数。
> func.caller：返回调用当前函数的那个函数。尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

```
function sum(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}
sum(1, 100000)
```

> 上面代码中，sum 是一个递归函数，参数 x 是需要累加的值，参数 y 控制递归次数。一旦指定 sum 递归 100000 次，就会报错，提示超出调用栈的最大次数。

> 蹦床函数（trampoline）可以将递归执行转为循环执行。

```
> function trampoline(f) {
>   while (f && f instanceof Function) {
    f = f();}
return f;
}
```

> 上面就是蹦床函数的一个实现，它接受一个函数 f 作为参数。只要 f 执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。

> 然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。

```
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
 现在，使用蹦床函数执行 sum，就不会发生调用栈溢出。
trampoline(sum(1,100000))
```

> 蹦床函数并不是真正的尾递归优化，下面的实现才是。

```
> function tco(f) {
>   var value;
>   var active = false;
>   var accumulated = [];
>   return function accumulator() {
   accumulated.push(arguments);
   if (!active) {
     active = true;
     while (accumulated.length) {
       value = f.apply(this, accumulated.shift());
     }
     active = false;
     return value;
   }
};
}
var sum = tco(function(x, y) {
if (y > 0) {
return sum(x + 1, y - 1)
}
else {
return x
}
});
sum(1, 100000)
```

> 上面代码中，tco 函数是尾递归优化的实现，它的奥妙就在于状态变量 active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归 sum 返回的都是 undefined，所以就避免了递归执行；而 accumulated 数组存放每一轮 sum 执行的参数，总是有值的，这就保证了 accumulator 函数内部的 while 循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。

##### `tail call (尾调用优化)`

> 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。尾调用之所以与其他调用不同，就在于它的特殊的调用位置。我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数 A 的内部调用函数 B，那么在 A 的调用帧上方，还会形成一个 B 的调用帧。等到 B 运行结束，将结果返回到 A，B 的调用帧才会消失。如果函数 B 内部还调用函数 C，那就还有一个 C 的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。尾调用由于是函数的最后一步操作（那么当前函数不用为下一次调用保存栈和运算的上下文），所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

```
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();
// 等同于
function f() {
  return g(3);
}
f();
// 等同于
g(3);
```

> 上面代码中，如果函数 g 不是尾调用，函数 f 就需要保存内部变量 m 和 n 的值、g 的调用位置等信息。但由于调用 g 之后，函数 f 就结束了，所以执行到最后一步，完全可以删除 f(x) 的调用帧，只保留 g(3) 的调用帧。

> 这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的**调用帧**(函数调用上下文)。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

> 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

```
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```

> 上面的函数不会进行尾调用优化，因为内层函数 inner 用到了外层函数 addOne 的内部变量 one。

##### `相互递归优化`

> 相互递归是函数之间的相互调用，不能轻易的像尾递归一样直接优化成循环。相互递归经常被用来实现状态机。相互递归优化通过返回一个函数（闭包）而不是直接返回一个值。函数最后返回一个闭包，闭包内的递归调用并未被调用，也就不会被压栈。最终的优化还是要靠循环。、递归是比较低级别的操作，如果可以使用集合来完成尽量不要使用递归。

## 对象序列化 JSON.stringify

* 定义在函数的 prototype 上的属性不会被序列化,

## 模块

#### js 模块化 AMD CMD commonJs 规范以及 ES6 的模块化

CommonJS 的核心思想就是通过 require 方法来同步加载所要依赖的其他模块，然后通过 exports 或者 module.exports 来导出需要暴露的接口。。AMD 规范则是非同步加载模块，允许指定回调函数。而 AMD 规范的实现，就是大名鼎鼎的 require.js 了

1.  require([module], callback)
2.  define(id, [depends], callback)

适合在浏览器环境中异步加载模块。可以并行加载多个模块。缺点： 提高了开发成本，并且不能按需加载，而是必须提前加载所有的依赖。但是 CMD 的加载方式更加优秀，是通过按需加载的方式，而不是必须在模块开始就加载所有的依赖。优点：同样实现了浏览器端的模块化加载。可以按需加载，依赖就近。缺点：依赖 SPM 打包，模块的加载逻辑偏重。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

#### `CommonJS AMD 规范 CMD 规范`

commonJs:，因为 js 没有模块的功能所以 CommonJS 应运而生，它希望 js 可以在任何地方运行，不只是浏览器中.(服务于后端,不适合前端)。CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。该规范的主要内容是，模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。CommonJS 是同步加载模块
amd:它就主要为前端 JS 的表现制定规范，AMD 就只有一个接口：define(id?,dependencies?,factory);
它要在声明模块的时候制定所有的依赖(dep)，并且还要当做形参传到 factory 中。RequireJS 就是实现了 AMD 规范的呢。

#### `CommonJS 中的 require/exports 和 ES6 中的 import/export 区别？`

CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。

ES6 模块是动态引用，如果使用 import 从一个模块加载变量，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

import/export 最终都是编译为 require/exports 来执行的。

CommonJS 规范规定，每个模块内部， module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

#### ES6 模块语法 --》 import export

ES6 模块不是对象，而是 export 命令显示指定输出的代码，输入时也采用静态命令的形式。

```
//es6模块
import { stat,exists,readFile} from 'fs';
```

从 fs 中加载这三个方法，其他不加载。这种加载称为**编译时加载**。即 ES6 可以在编译时就完成模块加载。

> 好处：

1.  由于 ES6 模块是编译时加载，所以可以静态分析。这样就能进一步拓宽 JavaScript 的语法，比如**引入宏(macro)和类型检验(type system)**这些只能靠静态分析实现的功能。
2.  不再需要 UMD 模块格式了，服务器和浏览器现在已经大部分支持 ES6 模块格式。
3.  将来浏览器的新 API 就能用模块格式提供，不再必要做成全局变量或者 navigator 对象的属性
4.  不再需要对象作为命名空间(比如 Math 对象)，这将都可以通过模块提供。

> 注意：
> ES6 的模块自动采用严格模式，不管模块头部有没有 use strict；严格模式有以下限制：

1.  变量必须声明后再使用
2.  函数的参数不能有同名属性，否则报错
3.  不能使用 with 语句
4.  不能对只读属性赋值，否则报错
5.  不能使用前缀 0 表示八进制数，否则报错
6.  不能删除不可删除的属性，否则报错
7.  不能使用 delete prop 删除变量，会报错，只能删除属性 delete global[prop]
8.  eval 不会在它的外层作用域引入变量
9.  eval 和 arguments 不能被重新赋值
10. arguments 不会自动反映函数参数的变化
11. 不能使用 arguments.callee
12. 不能使用 arguments.caller
13. 禁止 this 指向全局对象
14. 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
15. 增加了保留字(比如 protected,static 和 interface)

#### import 命令

```
    import {lastName as surname} from './profile'

**注意，import 命令具有提升效果，会提升到整个模块的头部，首先执行。**
import 语句会执行所加载的模块，因此可以有下面的写法：
import 'lodash'
```

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

问题：

#### require(filename) 是如何依据 fileName 找到对应的 module 呢？

> node 中解析 文件名 遵循一定的规则。

1.  为 node 的核心模块，stop
2.  以./或../开头，本地查找, stop
3.  沿着文件树，得到 node_module 的所有路径，知道/node_modules，在 node_module 中查找，stop
4.  path 为目录，则检查 package.json 文件是否存在 main 属性，否则默认为 index.js
5.  最后返回 new Error(‘Cannot find module”’ + request + ‘”’);

#### 为何模块中一定要通过 module.exports 暴露出接口？module.exports 与 require 存在什么关系？

那为什么使用 exports=bar 会报错，而使用 module.exports=bar 又是正确的呢？这是因为 exports 本身就只是 module.exports 的引用，而使用 require 加载模块的时候返回的是 module.exports，exports=bar 改变了 exports 的引用，所以最终返回的 module.exports 只是一个空对象，所以会报 TypeError 的错误。

> 所谓模块对象就是它们的作用域仅限于当前模块上面说了 require，exports 和 module 都是模块对象，但之所以可以在模块中不先声明就可以直接使用，是因为 node 在编译 js 模块的时候，将我们所写的代码进行了包装，将整个代码放进了一个函数中

#### node 中 require 实现原理

1.  require 语句的内部逻辑。 require(X)
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

2.  源码解读
    > a. node 定义了一个构造函数 module。所有模块都是 module 的实例。每个实例都有自己的属性，id,parent,exports,loaded,filename
    > b. 每个模块实例有一个 require 方法。这是每个模块的内部方法。
    > c. require 内部调用 Module.\_load 方法。步骤是：（1）确定模块的绝对路径（2）如果有缓存，取出缓存（3）是否为内置模块（4）生成模块实例，存入缓存（5）加载模块。关键步骤是：1，4
    > d. 模块的绝对路径：1）如果是内置模块，不含路径返回。2）确定所有可能路径 3）确定哪一个路径是真
    > e.加载模块。确定模块的后缀名，然后根据不同的后缀名进行加载。模块加载的实质就是，注入 exports，require,module 三个全局变量，然后执行模块的源码，然后将模块的 exports 变量的值输出。

## `深拷贝与浅拷贝是什么`

参考文章：关于 JS 中的浅拷贝和深拷贝 , 进击 JavaScript 之（四）玩转递归与数列

> 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

* `深拷贝实现方式`

1.  Object.assign，ES6 的新函数，可以帮助我们达成跟上面一样的功能。缺点 不能深拷贝嵌套层次很深的额对象。

```
  obj1 = { a: 10, b: 20, c: 30 }; obj2 = Object.assign({},
obj1); obj2.b = 100; console.log(obj1); // { a: 10, b: 20, c: 30 } <-- 沒被改到
console.log(obj2); // { a: 10, b: 100, c: 30 }
```

2.  转成 JSON 再转回来用 JSON.stringify 把对象转成字符串，再用 JSON.parse 把字符串转成新的对象。缺点：只有可以转成 JSON 格式的对象才可以这样用，像 function 没办法转成 JSON。

3.  jquery ，有提供一个 $.extend 可以用来做 Deep Copy。 lodash ，也有提供
    \_.cloneDeep 用来做 Deep Copy。递归实现深拷贝 .

```
function clone( o ) {
   var temp ={};
    for( var k in o ) {
       if( typeof o[ k ] == 'object' ){
          temp[ k ] = clone( o[ k] ); } else {
             temp[ k ] = o[ k ];
              } }
              return temp; }
```

## 跨域问题 和 XMLHttpRequest 对象

## 跨域问题

> 1.什么引起了 ajax 跨域不能的问题
> jsonp 本身实际上是通过 XMLHttpRequest 对象来进行数据的交互，而浏览器出于安全考虑，不允许 js 代码进行跨域操作，所以会警告。

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

### XmlHttpRequest 是什么？怎么完整执行一次 get 请求？怎么检测错误？

https://segmentfault.com/a/1190000004322487
用于在后台与服务器交换数据。对象事件: readyState 的值的改变会触发 readyStatechange 事件;错误会触发 error 事件；优缺点: 在不重新加载页面的情况下更新网页;
使用 xmlHttpRequest 可以用来传 Formdata（新增 formData 对象，支持发送表单数据；）类型的数据。
xhr.send()可以传的参数类型：ArrayBuffer，Blob，Document，DOMString，FormData，null;

15. 同源与跨域

什么是同源策略？限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。一个源指的是主机名、协议和端口号的组合，必须相同

跨域通信的几种方式 JSONP postMessage document.domain CORS

1.  JSONP 原理基本原理：利用 script 标签的异步加载特性实现给服务端传一个回调函数，服务器返回一个传递过去的回调函数名称的 JS 代码
    JSONP 的优点是：它不像 XMLHttpRequest 对象实现的 Ajax 请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要 XMLHttpRequest 或 ActiveX 的支持；并且在请求完毕后可以通过调用 callback 的方式回传结果。

2.  JSONP 的缺点则是：它只支持 GET 请求而不支持 POST 等其它类型的 HTTP 请求；它只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面之间如何进行 JavaScript 调用的问题。
    CORS（Cross-Origin Resource Sharing）跨域资源共享，定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。CORS 背后的基本思想就是使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败。服务器端对于 CORS 的支持，主要就是通过设置 Access-Control-Allow-Origin 来进行的。如果浏览器检测到相应的设置，就可以允许 Ajax 进行跨域的访问。

CORS 与 JSONP 相比，无疑更为先进、方便和可靠。

    1、 JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求。

    2、 使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理。

    3、 JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS）。

3 通过修改 document.domain 来跨子域。修改 document.domain 的方法只适用于不同子域的框架间的交互。不同的框架之间是可以获取 window 对象的，但却无法获取相应的属性和方法。

4.  使用 HTML5 的 window.postMessage（message, targetOrigin, [transfer]） 方法跨域

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

延伸：跨域的 js 运行错误可以捕获吗，错误提示什么，应该怎么处理？可以。 Script
error 1. 在 script 标签增加 crossorigin 属性

7.  开发中，碰到跨域的问题是如何处理的？

        > 通过 cors 跨域

    7.1 . 如何进行 cors 跨域，需要什么条件？ >答：cors：跨域资源共享，必须在浏览器检测到服务端设置了 Access-Control-Allow-Origin ：


            7.3 . 还有其他跨域方式吗？
            > 1. jsonp、3 通过修改 document.domain 来跨子域。修改 document.domain 的方法只适用于不同子域的框架间的交互。不同的框架之间是可以获取 window 对象的，但却无法获取相应的属性和方法。

7.  使用 HTML5 的 window.postMessage（message, targetOrigin, [transfer]） 方法跨域

#### jsonp 和 cors

两者优点与缺点大致互补，放在一块介绍：JSONP 的主要优势在于对浏览器的支持较好；虽然目前主流浏览器支持 CORS，但 IE10 以下不支持 CORS。JSONP 只能用于获取资源（即只读，类似于 GET 请求）；CORS 支持所有类型的 HTTP 请求，功能完善。（这点 JSONP 被玩虐，但大部分情况下 GET 已经能满足需求了）JSONP 的错误处理机制并不完善，我们没办法进行错误处理；而 CORS 可以通过 onerror 事件监听错误，并且浏览器控制台会看到报错信息，利于排查。JSONP 只会发一次请求；而对于复杂请求，CORS 会发两次请求。始终觉得安全性这个东西是相对的，没有绝对的安全，也做不到绝对的安全。毕竟 JSONP 并不是跨域规范，它存在很明显的安全问题：callback 参数注入和资源访问授权设置。CORS 好歹也算是个跨域规范，在资源访问授权方面进行了限制（Access-Control-Allow-Origin），而且标准浏览器都做了安全限制，比如拒绝手动设置 origin 字段，相对来说是安全了一点。但是回过头来看一下，就算是不安全的 JSONP，我们依然可以在服务端端进行一些权限的限制，服务端和客户端也都依然可以做一些注入的安全处理，哪怕被攻克，它也只能读一些东西。就算是比较安全的 CORS，同样可以在服务端设置出现漏洞或者不在浏览器的跨域限制环境下进行攻击，而且它不仅可以读，还可以写。

#### 使用 cors 时，要携带 cookie 的情况 后端要设置什么 做相应？？

# Promise 和 setTimeout 谁先执行

# JS 的执行机制

> 一个浏览器环境只能有一个事件循环，一个事件循环可以有多个任务队列，每个任务都有一个任务源。任务队列有优先级关系。

同步和异步不同的执行过程

> 1.  同步和异步任务分别进入不同的执行 " 场所 "，同步的进入主线程，异步的进入
>     Event Table 并注册函数。
> 2.  当指定的事情完成时，Event Table 会将这个函数移入 Event Queue。
> 3.  **主线程内的任务执行完毕为空**，会去 Event Queue 读取对应的函数，进入主线程执行
> 4.  上述过程会不断重复，也就是常说的 Event Loop( 事件循环 ),

### 怎么判断主线程为空？

> js 引擎存在 monitoring process 进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去 Event Queue 那里检查是否有等待被调用的函数

### setTimeOut(fn,ms) setInterval(fn,ms)

> 对于 setInterval(fn,ms) 来说，我们已经知道不是每过 ms 秒会执行一次 fn，而是每过 ms 秒，会有 fn 进入 Event Queue

### promise 和 process.nextTick()( 类似 node 的 setTimeOut)

> 我们进入正题，除了广义的同步任务和异步任务，我们对任务有更精细的定义：首先在宏任务中取出第一个任务，执行完后再取出微任务的所有任务执行，循环，指导两个队列都执行完。
> macro-task( 宏任务 )：包括整体代码 script，setTimeout ， setInterval
> micro-task(
> 微任务 )：Promise ， process.nextTick

不同类型的任务会进入对应的 Event Queue，比如 setTimeout 和 setInterval 会进入相同的 Event Queue。事件循环的顺序，决定 js 代码的执行顺序。进入整体代码 ( 宏任务
) 后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务

##

```
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

第一轮事件循环流程分析如下：

整体 script 作为第一个宏任务进入主线程，遇到 console.log，输出 1。遇到
setTimeout，其回调函数被分发到宏任务 Event Queue 中。我们暂且记为 setTimeout1。遇到 process.nextTick()，其回调函数被分发到微任务 Event Queue 中。我们记为
process1。遇到 Promise，new Promise 直接执行，输出 7。then 被分发到微任务 Event
Queue 中。我们记为 then1。又遇到了 setTimeout，其回调函数被分发到宏任务 Event
Queue 中，我们记为 setTimeout2。

宏任务 Event Queue 微任务 Event Queue

setTimeout1 process1

setTimeout2 then1

上表是第一轮事件循环宏任务结束时各 Event Queue 的情况，此时已经输出了 1 和 7。

我们发现了 process1 和 then1 两个微任务。

执行 process1, 输出 6。执行 then1，输出 8。

好了，第一轮事件循环正式结束，这一轮的结果是输出 1，7 ， 6，8 。那么第二轮时间循环从 setTimeout1 宏任务开始：

首先输出 2。接下来遇到了 process.nextTick()，同样将其分发到微任务 Event Queue 中，记为 process2。new Promise 立即执行输出 4，then 也分发到微任务 Event Queue 中，记为 then2。

宏任务 Event Queue 微任务 Event Queue

setTimeout2 process2

then2

第二轮事件循环宏任务结束，我们发现有 process2 和 then2 两个微任务可以执行。输出
3。输出 5。第二轮事件循环结束，第二轮输出 2，4 ， 3，5 。第三轮事件循环开始，此时只剩 setTimeout2 了，执行。直接输出 9。将 process.nextTick() 分发到微任务
Event Queue 中。记为 process3。直接执行 new Promise，输出 11。将 then 分发到微任务 Event Queue 中，记为 then3。

宏任务 Event Queue 微任务 Event Queue

process3

then3

第三轮事件循环宏任务执行结束，执行两个微任务 process3 和 then3。输出 10。输出
12。第三轮事件循环结束，第三轮输出 9，11 ， 10，12 。

整段代码，共进行了三次事件循环，完整的输出为 1，7 ， 6，8 ， 2，4 ， 3，5 ，
9，11 ， 10，12 。

## `客户端存储`

### cookie sessionStorage localStorage

### 4.浏览器本地存储中 cookie 和 localStorage 有什么区别？ localStorage 如何存储删除数据。

cookie :最大 4k,过期时间之前有效。在服务端与客户端来回传递，
localStorage:5M，持久数据。不传到服务端，
sessionStorage:5M,当前会话有效。
localStorage 提供了几个方法: 1.存储:localStorage.setItem(key,value)如果 key 存在时，更新 value 2.获取 localStorage.getItem(key)如果 key 不存在返回 null 3.删除 localStorage.removeItem(key)一旦删除，key 对应的数据将会全部删除 4.全部清除 localStorage.clear() 使用 removeItem 逐个删除太麻烦，可以使用 clear,

需要注意的是，不是什么数据都适合放在 Cookie、localStorage 和 sessionStorage 中的。使用它们的时候，需要时刻注意是否有代码存在 XSS 注入的风险。因为只要打开控制台，你就随意修改它们的值，也就是说如果你的网站中有 XSS 的风险，它们就能对你的 localStorage 肆意妄为。所以千万不要用它们存储你系统中的敏感数据。

### indexDB

### 本地离线存储
