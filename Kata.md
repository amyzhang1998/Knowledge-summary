# IndexOf

array.indexOf(searchValue[,fromIndex])
string.indexOf(searchValue[,fromIndex])
array.lastIndexOf(searchValue[,fromIndex])
string.lastIndexOf(searchValue[,fromIndex])

# String

#不改变原始数据

## String.slice(beginIndex[,endIndex])

负数：beginIndex<0,或者 endIndex<0. 值是:beginIndex+length.
前大于后：beginIndex>endIndex,返回空字符

## String.substring(beginIndex[,endIndex])

负数： beginIndex<0 值是 0.
前大于后：beginIndex>endIndex,前后颠倒位置。

## String.substr(start[,length])

负数： start 是负数，从后面开始算。length 是负数，值是 0。

## String.charAt(index)

## String.replace(regexp|substr, newSubstr|function)

# Array

## Array.slice([begin[, end])

## Array.reduce(callback[, initialValue])

1.  如果 initialValue 没有初始设置，则函数将会从下标 1 开始执行数组，accumulator 等于数组第一个值，如果有初始值，从下标 0 开始执行。
2.  如果传入的数组是空，也没有设置初始值，会抛出 TypeError.
3.  如果数组只有一个值不管位置在哪，没有设置初始值，这唯一的值将会返回。
4.  如果初始值提供，但是数组是空。将会返回初始值。

> callback(accumulator,currentValue,currentIndex[Optional]){}

## Array.filter(callback[, thisArg]):

thisArg 是他的 this 指向。通过 in 操作符操作属性，返回一个创建的新的 array 对象。
callback(element,index)

#### polyfill filter;

## Array.every(callback[,thisArg])

只要有一个值返回了 false ,后面的都不会执行。

# in 操作符

可以判断本身和原型链上的属性，如果有这个属性就返回 true,否则 false。数组的 map，和 forEach 函数都是通过 in 操作符来判断有没有这个属性接下来的判断。

# Math

## Math.floor(x) Math.ceil(x) Math.max(value1[, value2[, ...]]),Math.min(value1[, value2[, ...]])

# Number() 和 parseInt()转换成数字的区别？

parseInt(基数) 可以指定基数。

> typeof NaN ==='number';
> 使用 isNaN(string) 判断是不是 NaN;

### Number 函数转换规则：

1.  Number(null)//0
2.  Number(undefined) //0
3.  Number(" ") // 0
4.  Number(false) //0
5.  Number(true) //1
    对于字符串：
6.  会忽略最前面的 0； Number('011')//11;6
7.  Number('0xf')//16 进制 转成 十进制
8.  Number('1.2')//1.2
9.  如果是对象，先调用 valueof(),然后调用之前规则，如果是 NaN ，则调用 toString() 方法，然后调用之上规则。
10. Number('22dd')//NaN
    ### ParseInt()规则
11. 忽略字符串前面的空格,如果第一个自负不是数字或负号，就反回 NaN.parseInt 会解析到非数字字符，然后把之前的数字返回。
12. parseInt('11ff')//11
13. parseInt(" ")//NaN
14. parseInt("070")//八进制数转成十进制

# Object

## Object.defineProperty()|| Object.defineProperties()

定义的对象属性默认是不可以枚举，不可以删除，不可以写的。

# 运算符优先级

| 运算符                             |                                               说明 |
| ---------------------------------- | -------------------------------------------------: |
| . [] {}                            |           字段访问、数组索引、函数调用和表达式分组 |
| ++ -- - ~ ! delete new typeof void |     一元运算符，返回数据类型，对象创建，未定义的值 |
| \* / %                             |                                相乘， 相除，求余数 |
| + - +                              |                             相加，相减，字符串串联 |
| << >> >>>                          |                                               移位 |
| < <= > >= instanceof               | 小于 小于或等于 大于 大于或等于 是否为特定类的实例 |
| == != === !==                      |                         相等，不相等，全等，不全等 |
| &                                  |                                           按位’与‘ |
| ^                                  |                                           按位异或 |
|                                    |                                             按位或 |
| &&                                 |                                             逻辑与 |
| 逻辑或                             |                                                 $1 |
| ？：                               |                                         条件运算符 |
| =，OP=                             |                                 赋值运算（+=和&=） |
| ，                                 |                                           多个计算 |
