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
