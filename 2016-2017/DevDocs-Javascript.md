
**JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了 Map 和 Set。这样就有了四种数据集合**

## Iterator:遍历器 > ES6

> 作用：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费。

> 遍历器对象本质上，就是一个指针对象。每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中，value 属性是当前成员的值，done 属性是一个布尔值，表示遍历是否结束。

```
//模拟实现
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++]} :
        {done: true};
    }
  };
}
```

ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是“可遍历的”（iterable）。ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被 for...of 循环遍历。原因在于，这些数据结构原生部署了 Symbol.iterator 属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了 Symbol.iterator 属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

> 原生具备 Iterator 接口的数据结构如下。

1.  Array
2.  Map
3.  Set
4.  String
5.  TypedArray
6.  函数的 arguments 对象
7.  NodeList 对象

### 调用 Iterator 接口的场合

有一些场合会默认调用 Iterator 接口（即 Symbol.iterator 方法），除了下文会介绍的 for...of 循环，还有几个别的场合。

8.  解构赋值对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法。
9.  扩展运算符扩展运算符（...）也会调用默认的 Iterator 接口。实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。
10. yield*
    yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
11. 其他场合由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。
12. for...of
13. Array.from()
14. Map(), Set(), WeakMap(), WeakSet()（比如 new Map([['a',1],['b',2]])）
15. Promise.all()
16. Promise.race()

```
1.
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
2.
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
3.
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
```

### 字符串的 Iterator 接口

字符串是一个类似数组的对象，也原生具有 Iterator 接口。

```
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  //
```

### Iterator 接口与 Generator 函数

Symbol.iterator 方法的最简单实现，还是使用 Generator 函数。

```
let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
}
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"
```

### 遍历器对象的 return()，throw()

> return 方法的使用场合是，如果 for...of 循环提前退出（通常是因为出错，或者有 break 语句或 continue 语句），就会调用 return 方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署 return 方法。
> throw 方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。

## Array

（哪个是重新赋值，哪个是属性修改）

### 返回新值

1.  Array.from()创建一个新的 array 实例从一个类数组或遍历器对象中；<font color='red'>**>[ES6]**</font>
    > Array.from(arrayLike[,MapFn[,thisArg]])
2.  Array.isArray()
    > Array.isArray(obj)
3.  Array.of(element[n]);创建了一个新数组
4.  ## Array.length()
5.  array.concat()
    > var new_array = old_array.concat(value1[,value2[,...[,valueN]]])
6.  array.toLocalString()
7.  array.toString()
8.  array.slice(begin,end)
9.  array.join(separator)
10. array.find()<font color='red'>**>[ES6]**</font>
    > arr.find(callback[,thisArg]):返回数组中找到的符合条件的第一个元素
11. array.findIndex()<font color='red'>**>[ES6]**</font>

    > arr.findIndex(callback[,thisArg]):返回数组中找到的符合条件的第一个元素的下标

12. array.includes()<font color='red'>**>[ES7]**</font>返回 true 或 false
    > arr.includes(searchElement,fromIndex)
13. array.indexOf()
    > arr.indexOf(searchElement[,fromIndex])
14. array.lastIndexOf()

    > arr.lastIndexOf(searchElement[,fromIndex])

    ---

15. array.forEach()
16. array.every():测试  所有元素的是否符合  这个函数
    > arr.every(callback[,thisArg])
17. array.filter()
    > var newArray = arr.filter(callback[,thisArg])
18. arrya.map()
19. array.reduce(callback[,])
20. array.reduceRight(callback[,])
21. array.some(callback[,thisArg]):是否至少有一个符和条件

    ---

22. array.entries():<font color='red'>**>[ES6]**</font>
    返回新的 Array Iterator 包含键值对的数组对象。
23. array.keys() <font color='red'>**>[ES6]**</font>.返回新的数组遍历器对象包括数组中所有的  关键字。
24. array.values()<font color='red'>**>[ES6]**</font>.返回新的数组遍历器对象包括数组中所有的值

---

### 就地更改数据

1.  array.copyWithin() <font color='red'>**>[ES6]**</font>
    本数组内  克隆
    > arr.copyWithin(target,[start],[end])
2.  array.fill() <font color='red'>**>[ES6]**</font>
    填充数组内数据

    > arr.fill(value,[start],[end])

    ---

3.  array.pop();remove the last element.
4.  array.push()
5.  array.reverse()
6.  array.shift()
7.  array.unshift()
8.  array.sort([compareFunction])
9.  array.splice(start,deleteCount,item1,item2...):

## Object

### methods

### 返回新值

1.  Object.assign(target,...source)
    2.  Object.create()
    3.  Object.entries()：返回 array 类型的[key,value]
    4.  Object.keys()
    5.  Object.values()
    6.  Object.getOwnPropertyDescriptor()
    7.  Object.getOwnPropertyDescriptors()
    8.  Object.getOwnPropertyNames();返回 array 类型的属性名，包括不可枚举的属性
    9.  Object.getOwnPropertySymbols()
    10. Object.getPrototypeOf()
    11. Object.setPrototypeOf()
    12. Object.isPrototypeOf()
    13. Object.hasOwnProperty()
    14. Object.is()
    15. Object.isExtensible()
    16. Object.preventExtensions()
    17. Object.isFrozen()
    18. Object.isSealed()
    19. Object.seal()

### 就地更改数据

22. Object.defineProperty()
23. Object.defineProperties()
24. Object.freeze():

### ES6 扩展

## Map > ES6

## Set > ES6

---

**原始数据类型**
ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

## undefined

## null

## Boolean

## String

## Number

## Symbol > ES6

> ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入 Symbol 的原因。
