# css 相关问题

## 一、基本选择器

| 序号 | 选择器  | 含义           |
| ---- | ------- | -------------- |
| 1    | \*      | 通用元素选择器 |
| 2    | E       | 标签选择器     |
| 3    | .info   | class 选择器， |
| 4    | #footer | id 选择器      |

实例：

```
* { margin:0; padding:0; }
p { font-size:2em; }
.info { background:#ff0; }
p.info { background:#ff0; }
p.info.error { color:#900; font-weight:bold; }
#info { background:#ff0; }
p#info { background:#ff0; }
```

## 二、多元素的组合选择器

| 序号 | 选择器 | 含义                                                                    |
| ---- | ------ | ----------------------------------------------------------------------- |
| 5    | E,F    | 多元素选择器，同时匹配所有 E 元素或 F 元素，E 和 F 之间用逗号分隔       |
| 6    | E F    | 后代元素选择器，匹配所有属于 E 元素后代的 F 元素，E 和 F 之间用空格分隔 |
| 7    | E>F    | 子元素选择器，匹配所有 E 元素的子元素 F                                 |
| 8    | E+F    | 毗邻元素选择器，匹配所有紧随 E 元素之后的同级元素 F                     |

实例：

```
div p { color:#f00; }
#nav li { display:inline; }
#nav a { font-weight:bold; }
div > strong { color:#f00; }
p + p { color:#f00; }
```

## 三、CSS 2.1 属性选择器

| 序号 | 选择器      | 含义                                                                                                                                            |
| ---- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 9    | E[attr]     | 匹配所有具有 att 属性的 E 元素，不考虑它的值。（注意：E 在此处可以省略，比如"[cheacked]"。以下同。）                                            |
| 10   | E[att=val]  | 匹配所有 att 属性等于"val"的 E 元素                                                                                                             |
| 11   | E[att~=val] | 匹配所有 att 属性具有多个空格分隔的值、其中一个值等于"val"的 E 元素                                                                             |
|      |
| 12   | E[att!=val] | 匹配所有 att 属性具有多个连字号分隔（hyphen-separated）的值、其中一个值以"val"开头的 E 元素，主要用于 lang 属性，比如"en"、"en-us"、"en-gb"等等 |
|      |

实例：

```
p[title] { color:#f00; }
div[class=error] { color:#f00; }
td[headers~=col1] { color:#f00; }
p[lang|=en] { color:#f00; }
blockquote[class=quote][cite] { color:#f00; }
```

## 四、CSS 2.1 中的伪类

| 序号 | 选择器        | 含义                                      |
| ---- | ------------- | ----------------------------------------- |
| 13   | E:first-child | 匹配父元素的第一个子元素                  |
| 14   | E:link        | 匹配所有未被点击的链接                    |
| 15   | E:visited     | 匹配所有已被点击的链接                    |
| 16   | E:active      | 匹配鼠标已经其上按下、还没有释放的 E 元素 |
| 17   | E:hover       | 匹配鼠标悬停其上的 E 元素                 |

|
| 18 | E:focus | 匹配获得当前焦点的 E 元素 |
| 19 | E:lang( c) |匹配 lang 属性等于 c 的 E 元素 |

实例：

```
p:first-child { font-style:italic; }
input[type=text]:focus { color:#000; background:#ffe; }
input[type=text]:focus:hover { background:#fff; }
q:lang(sv) { quotes: "\201D" "\201D" "\2019" "\2019"; }
```

## 五、 CSS 2.1 中的伪元素

| 序号 | 选择器         | 含义                        |
| ---- | -------------- | --------------------------- |
| 20   | E:first-line   | 匹配 E 元素的第一行         |
| 21   | E:first-letter | 匹配 E 元素的第一个字母     |
|      |
| 22   | E:before       | 在 E 元素之前插入生成的内容 |
| 23   | E:after        | 在 E 元素之后插入生成的内容 |

实例：

```
p:first-line { font-weight:bold; color;#600; }
.preamble:first-letter { font-size:1.5em; font-weight:bold; }
.cbb:before { content:""; display:block; height:17px; width:18px; background:url(top.png) no-repeat 0 0; margin:0 0 0 -18px; }
a:link:after { content: " (" attr(href) ") "; }
```

## 六、CSS 3 的同级元素通用选择器

| 序号 | 选择器 | 含义                               |
| ---- | ------ | ---------------------------------- |
| 24   | E~F    | 匹配任何在 E 元素之后的同级 F 元素 |

实例：

```
p ~ ul { background:#ff0; }
```

## 七、CSS 3 属性选择器

| 序号 | 选择器        | 含义                                 |
| ---- | ------------- | ------------------------------------ |
| 25   | E[att^="val"] | 属性 att 的值以"val"开头的元素       |
|      |
| 26   | E[att$="val"] | 属性 att 的值以"val"结尾的元素       |
| 27   | E[att*="val"] | 属性 att 的值包含"val"字符串的元素， |

实例：

```
div[id^="nav"] { background:#ff0; }
```

## 八、CSS 3 中与用户界面有关的伪类

| 序号 | 选择器      | 含义                                                          |
| ---- | ----------- | ------------------------------------------------------------- |
| 28   | E:enabled   | 匹配表单中激活的元素                                          |
| 29   | E:disabled: | 匹配表单中禁用的元素                                          |
| 30   | E:checked   | 匹配表单中被选中的， radio（单选框）或 checkbox（复选框）元素 |

|
| 31 | E::selection|匹配用户当前选中的元素 |
实例：

```
input[type="text"]:disabled { background:#ddd; }
```

## 九、CSS 3 中的结构性伪类

| 序号 | 选择器                | 含义                                                                                                               |
| ---- | --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 32   | E:root                | 匹配文档的根元素，对于 HTML 文档，就是 HTML 元素                                                                   |
| 33   | E:nth-child(n)        | 匹配其父元素的第 n 个子元素，第一个编号为 1                                                                        |
|      |
| 34   | E:nth-last-child(n)   | 匹配其父元素的倒数第 n 个子元素，第一个编号为 1                                                                    |
| 35   | E:nth-of-type(n)      | 与:nth-child()作用类似，但是仅匹配使用同种标签的元素                                                               |
| 36   | E:nth-last-of-type(n) | 与:nth-last-child() 作用类似，但是仅匹配使用同种标签的元素                                                         |
| 37   | E:last-child          | 匹配父元素的最后一个子元素，等同于:nth-last-child(1)                                                               |
| 38   | E:first-of-type       | 匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1)                                                      |
| 39   | E:last-of-type        | 匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1)                                               |
| 40   | E:only-child          | 匹配父元素下仅有的一个子元素，等同于:first-child:last-child 或 :nth-child(1):nth-last-child(1)                     |
| 41   | E:only-of-type        | 匹配父元素下使用同种标签的唯一一个子元素，等同于:first-of-type:last-of-type 或 :nth-of-type(1):nth-last-of-type(1) |
| 42   | E:empty               | 匹配一个不包含任何子元素的元素，注意，文本节点也被看作子元素，                                                     |

实例：

```
p:nth-child(3) { color:#f00; }
p:nth-child(odd) { color:#f00; }
p:nth-child(even) { color:#f00; }
p:nth-child(3n+0) { color:#f00; }
p:nth-child(3n) { color:#f00; }
tr:nth-child(2n+11) { background:#ff0; }
tr:nth-last-child(2) { background:#ff0; }
p:last-child { background:#ff0; }
p:only-child { background:#ff0; }
p:empty { background:#ff0; }
```

## 十、CSS 3 的反选伪类

| 序号 | 选择器   | 含义                           |
| ---- | -------- | ------------------------------ |
| 43   | E:not(s) | 匹配不符合当前选择器的任何元素 |

实例：

```
:not(p) { border:1px solid #ccc; }
```

## 十一、CSS 3 中的 :target 伪类

| 序号 | 选择器   | 含义                           |
| ---- | -------- | ------------------------------ |
| 44   | E:target | 匹配文档中特定"id"点击后的效果 |

# css 中的层级问题

# css 中的浮动

position 属性和 z-index 属性对页面节点层级的影响总结最近在做的一个 Web 项目中因为很多地方都要用 tooltip 对某些功能和操作做一些信息提示，以便用户可以很容易的理解和使用本系统，由于页面和 tips 比较多，做的当中遇到了各种奇葩的 z-index 的问题，也相信很多人在项目中也都多多少少曾因遇到各种不可预期层级遮盖问题而烦恼，所以我决定花点时间来好好研究一些这方面的问题，跟大家分享一下，希望能对大家有所帮助。

同级元素比较：

### 一.

> 结论：只设置 z-index 还没有设置 position 为 relative 或 absolute 或 fixed，则 z-index 是不会起作用的。示例：
> {
> A: {z-index:3}
> B: {z-index:2}
> C: {z-index:1}
> }
> 从上到下的层级关系为：C > B > A

### 二：

> 结论：同级元素不设置 position,则后面元素会覆盖前面元素示例：
> {
> A: {}
> B: {}
> C: {}
> }
> 从上到下的层级关系为：C > B > A

### 三：

> 结论：同级元素之间设置了 position(非 static)的元素会覆盖没有设置 position(或为 static)的元素示例：
> {
> A: {position:relative;}
> B: {}
> }
> 从上到下的层级关系为：A > C

### 四：

> 结论：同级元素之间都设置了 position(非 static)，则后面的元素会覆盖前面的元素示例：
> {
> A: {position:relative;}
> B: {position:relative;}
> }
> 从上到下的层级关系为：B > A

### 五：

> 结论：同级元素之间都设置了 position(非 static)，那么设置了 z-index(大于 0)的元素会覆盖没有设置的元素示例：
> {
> A: {position:relative;z-index:1}
> B: {position:relative;}
> }
> 从上到下的层级关系为：A > B

### 六：同级元素之间，各种层级的混合比较，直接看示例：

> {
> A: {}
> B: {position:relative;z-index:2}
> C: {position:relative;}
> D: {position:relative;z-index:1}
> E: {position:relative;z-index:0}
> F: {position:relative;}
> G: {}
> H: {position:relative;z-index:-1}
> }
> 从上到下的层级关系为：B > D > F > E > C > G > A > H
> 多级元素比较：

#### 一.

> 结论：父级元素设置了 position(非 static)或者没有设置的情况下，当子节点没有设置 position 或只设置了 position 的情况下，则子节点的层级会受到父节点的影响; 当子节点设置了 position(非 static)且又设置了 z-index(大于 0)，则子节点的层级不会受到父节点层级的影响

`示例1：`
{
A: {}
A-1: {}
B: {}
B-1: {}
}
B 以及 B 的所以子元素会覆盖在 A 以及 A 的所有子元素从上到下的层级关系为：B-1 > B > A-1 > A

`示例2：`
{
A: {position:relative}
A-1: {}
B: {position:relative}
B-1: {}
}
B 以及 B 的所以子元素会覆盖在 A 以及 A 的所有子元素从上到下的层级关系为：B-1 > B > A-1 > A
`示例3：`
{
A: {}
A-1: {position:relative}
B: {}
}
从上到下的层级关系为：A-1 > B > A
`示例4`：
{
A: {position:relative;}
A-1: {position:relative;z-index:2;}
A-2: {}
B: {position:relative;}
B-1: {position:relative;z-index:1}
B-2: {}
}
从上到下的层级关系为：A-1 > B-1 > B-2 > B > A-2 > A

#### 二.

> 结论：父级元素设置了 position(非 static)和 z-index 的情况下，则子节点的层级会受到父节点层级的影响，且子节点会一直覆盖父节点的。

`示例1：`
{
A: {position:relative;z-index:1}
A-1: {position:relative;z-index:2}
A-2: {position:relative;z-index:-100}
B: {position:relative;z-index:3;}
B-1: {position:relative;z-index:4}
B-2: {position:relative;z-index:5}
}
B 以及 B 的所有子元素会覆盖 A 以及 A 的所有子元素从上到下的层级关系为：B-2 > B-1 > B > A-1 > A-2 > A
很多人将 z-index 设得很大, 9999 什么的都出来了, 如果不考虑父节点的影响, 设得再大也没用, 那是无法逾越的层级.

#### 三.【负 z-index 跟 position 的关系】

`结论1`：当父节点设置了 position(非 static)但没有设置 z-index 的情况下，子节点如果设置 position(非 static)和负的 z-index 值，子节点会被父节点覆盖

{
A: {position:relative;}
A-1: {position:relative;z-index:-1}
}
从上到下的层级关系为：A > A-1

`结论2`：当父节点设置了 position(非 static)和 z-index 的情况下，子节点如果设置 position(非 static)和负的 z-index 值，子节点不会被父节点覆盖
{
A: {position:relative;z-index:1}
A-1: {position:relative;z-index:-1}
}
从上到下的层级关系为：A-1 > A

`总结`
上中下三个大层级(非 W3C 官方定义，只是个人为了好理解，以下文字总结可能不是太准确，请参照示例来分析)：将没有设置 z-index 值，或 z-index 值为 0，或 z-index 值为 auto 的所有元素归为一类(AAA);
将设置了 position(非 static)和 z-index 值大于 0 的所有元素归为一类(BBB);
将设置了 position(非 static)和 z-index 值小于 0 的所有元素归为一类(CCC);

`结论`：BBB 类的元素会高于 AAA 和 CCC 类, AAA 类元素会高于 CCC 类。示例：
{
A: {position:relative}
A-1: {position:relative;z-index:-20}
B: {position:relative;z-index:2}
B-1: {position:relative;z-index:-10}
C: {position:absolute;z-index:3}
D: {}
E: {position:fixed;z-index:1}
F: {position:fixed;z-index:-1}
G: {position:relative;z-index:0}
H: {position:fixed;z-index:-2}
}
从上到下的层级关系为：B B-1 C E > A D G > A-1 F H
`后话`：以上是我本人对 position 属性和 z-index 属性的所有可能性情况的分析以及总结。相信很多人也曾遇到过这样的问题：滚动条任你如何滚动，也奈何不了子节点一动不动。 针对这个问题，有时间我会写一篇 position 属性和 scroll 属性之间关系的文章跟大家分享一下。

# 深入理解清除浮动

`一、什么是清除浮动？`

> 浮动的缺陷在了解如何清除浮动之前，先介绍为什么需要清除浮动。如本文开头所说的，浮动虽然可以便于页面布局，但同时会产生一些问题，也就是我们常说的“副作用”。而一个元素设置了浮动（即 float 值为 left, right 或 inherit 并从父元素上继承 left 或 right 值）的常见缺陷是——影响它的兄弟元素的位置和父元素产生高度塌陷，下面对这两个问题展开说明。一个元素设置了浮动后，会影响它的兄弟元素，具体的影响方式较为复杂，这要视乎这些兄弟元素是块级元素还是内联元素，若是块级元素会无视这个浮动的块框，也就是我们平时看到的效果——使到自身尽可能与这个浮动元素处于同一行，导致被浮动元素覆盖，除非这些 div 设置了宽度，并且父元素的宽度不足以包含它们，这样兄弟元素才会被强制换行；若是内联元素，则会尽可能围绕浮动元素。另外，浮动的元素脱离了普通流，这样使得包含它的父元素并不会因为这个浮动元素的存在而自动撑高，这样就会造成高度塌陷。下面是演示效果图:

`关于这几点的更多说明，请看 Demo 。`

> 很显然，无论是影响兄弟元素还是高度塌陷的问题，都不是我们使用浮动的目的，设置浮动，只是为了改变一个元素的布局，但最终的结果却造成了更多不必要的影响，这不利于布局，因此我们需要清除这些额外的影响，也就是本文要介绍的清除浮动，其实更加准确的说，是清除浮动带来的额外影响。

`清除浮动的常见方法`

> 了解了为什么要清除浮动后，这里可以开始介绍清除浮动的常见方法了，不过这里并不急于探讨这些方法的原理，首先列出几种常见清除浮动的方法，再作探讨。说起清除浮动，大家肯定会想起 clear: both ，的确，这是 CSS 中清除浮动的属性，clear 有 both/left/right/none/inherit 几个属性值，分别代表在元素左右两侧不允许出现浮动元素/左侧不允许出现浮动元素/右侧不允许出现浮动元素/不清除浮动/继承父元素的值。

> 从例子中可以看出，设置了 clear: both （当然在该例子中也可以为 clear: left）的元素不会跟浮动元素同行，并且会占据新的一整行，而不是根据内容来自动调整宽度。之所以会这样，要从 clear 的原理说起，clear 会为元素添加足够的空白空间，使到该元素的位置会放置在它前一个浮动元素之下，这跟增加元素外边距使到元素占据满行而强制换行的效果是一样的，事实上在 CSS1 和 CSS2 中，清除浮动正是通过自动为清除元素（即设置了 clear 属性的元素）增加外边距实现的，从 CSS 2.1 开始改为增加额外的空白空间，不改变外边距。现在大家应该清楚了，既然是增加足够的空间使到元素换行，那么最稳妥的办法就是使到该元素占据一整行，也就是 Demo 中的效果。现在清除了浮动，但是，这只是清除了浮动对于兄弟元素的影响，而高度塌陷的问题还没有解决，因此，我们需要更高级的清除浮动——闭合浮动。

`为什么叫闭合浮动？`

> 因为浮动的元素脱离了普通流，因此对于它的父元素，它并没有闭合，这时候就需要闭合浮动了。这个问题的解决方法经过多年的发展，已经有了比较完善的方法，下面为大家详细介绍三种常用方法。

`(1)空 div 方法`

> 这是较为古老的方法了，除了 div ，也有使用其他标签的，但 div 更为适用，因为除了浏览器赋予它的 display: block 外，它没有其他的样式了，也不会有特殊的功能，干干净净。这里插一段题外话，display: block 是浏览器赋予 div 的，存在于浏览器的 user agent stylesheet ，而不是 div 默认 display 的值就为 block ，在 W3C 中，所有的 HTML 标签 display 的默认值都为 inline 。下面代码中使用到的 box main left aside 为预先设置了相关 CSS 的类，具体可以查看 Demo 的源码，在其他例子中也是如此。

```
<div class="box">
  <div class="main left">我设置了左浮动 float: left</div>
  <div style="clear: both;"></div>
  <div class="aside">我是页脚，我的上面添加了一个设置了 clear: both 的空 div</div>
</div>
```

空 div 方法很方便，但是加入了没有涵义的 div ，这违背了结构与表现分离的原则，并且后期维护也不方便。

`(2)overflow 方法`

在浮动元素的父元素上设置了 overflow 的值为 hidden 或 auto ，可以闭合浮动。另外在 IE6 中还需要触发 hasLayout ，例如为父元素设置容器宽高或设置 zoom：1

```
<div class="box" style="overflow: hidden; *zoom: 1;">
    <div class="main left">我设置了左浮动 float: left</div>
    <div class="aside left">我是页脚，但是我也设置了左浮动。</div>
</div>
```

这个方法相对前者更加方便，也更加符合语义要求，只是 overflow 并不是为了闭合浮动而设计的，因此当元素内包含会超出父元素边界的子元素时，可能会覆盖掉有用的子元素，或是产生了多余的滚动条。这也是在 overflow 方法诞生后依然需要寻找更佳方法的原因。

`(3)使用 :after 伪元素的方法`

该方法来源于 positioniseverything ,结合 :after 伪元素（注意这不是伪类，而是伪元素，代表一个元素之后最近的元素）和 IEhack ，可以完美兼容当前主流的各大浏览器，这里的 IEhack 指的是触发 hasLayout ，具体请看下面的方法。

```
<style>
    .clearfix {/* 触发 hasLayout */ zoom: 1; }
    .clearfix:after {content: &quot;.&quot;; display: block; height: 0; clear: both; visibility: hidden; }
</style>
<div class="box clearfix">
    <div class="main left">我设置了左浮动 float: left</div>
    <div class="aside left">我是页脚，但是我也设置了左浮动。</div>
</div>
```

显然，相对来说，这个办法不但完美兼容主流浏览器，并且也很方便，使用重用的类，可以减轻代码编写，另外网页的结构也会更加清晰。效果如图：

### 二、清除浮动方法的实质 —— CSS clear 与 BFC 特性

> 通过上面的例子，我们不难发现清除浮动的方法可以分成两类：一是利用 clear 属性，包括在浮动元素末尾添加一个带有 clear: both 属性的空 div 来闭合元素，其实利用 :after 伪元素的方法也是在元素末尾添加一个内容为一个点并带有 clear: both 属性的元素实现的。二是触发浮动元素父元素的 BFC (Block Formatting Contexts, 块级格式化上下文)，使到该父元素可以包含浮动元素，关于这一点，下面会为大家进行详细的介绍。
> BFC 在 CSS 的可视化格式模型 (Visual Formatting Model) 中具有非常重要的地位，很多开发者因为不了解 BFC 的特性而在实际开发中产生很多让人感到莫名其妙的问题。尽管如此，因为 BFC 涉及 CSS 中很少接触的部分，因此国内的相关介绍很少，这里展开说明一下。
> position 属性对 overflow 的影响, 深入理解 position 和 overflow 的关系项目中遇到了一个问题，就是明明父节点设置 overflow:scroll,但是不管滚动条如果滚动，但是子节点一直都不动，因此就小研究了一下 position 对 overflow 的影响，跟大家分享一下。当父节点不设置 position 情况下，子节点 position 的四种值的分析：
> `示例1.1:`

```
body{
A {overflow: scroll;}
A-1 {}
}
```

`效果：A-1会根据A滚动条的滚动而滚动`
分析：A-1 的默认 position 设置为 static，当 position 为 static 时，A-1 元素还是遵循正常的文档流，因此 A-1 会受它父节点属性的影响示例 1.2:

```
body{
A {overflow: scroll;}
A-1 {position: relative;}
}
```

`效果：A-1会根据A滚动条的滚动而滚动`
分析：当 A-1 的 position 设置为 relative 时，A-1 元素还是遵循正常的文档流，因此 A-1 会受它父节点属性的影响示例 1.3:(重点)

```
body{
A {overflow: scroll;}
A-1 {position: absolute;}
}
```

效果：A-1 不会根据 A 滚动条的滚动而滚动分析：当 A-1 的 position 设置为 absolute 时，A-1 元素脱离了文档流，所以 A-1 不再受父节点属性的影响注意：这时在父节点没有设置 position 的时，只会受到 body 节点的影响示例 1.4:

```
body{
A {overflow: scroll;}
A-1 {position: fixed;}
}
```

效果：A-1 不会根据 A 滚动条的滚动而滚动分析：当 A-1 的 position 设置为 fixed 时，A-1 元素脱离了文档流，这时 A-1 只受 body 元素的影响当父节点设置 position 值为非 static 情况下，子节点 position 的四种值的分析：示例 2.1:

```
body{
A {position：relative; overflow: scroll;}
A-1 {}
}
```

效果：A-1 会根据 A 滚动条的滚动而滚动分析：跟示例 1.1 一样，当父节点 A 设置了 position 之后，子节点 A-1 还是遵循正常的文档流，因此 A-1 会受它父节点属性的影响示例 2.2:

```
body{
A {position：relative; overflow: scroll;}
A-1 {position: relative;}
}
```

效果：A-1 会根据 A 滚动条的滚动而滚动分析：跟示例 1.2 一样，当父节点 A 设置了 position 之后，子节点 A-1 还是遵循正常的文档流，因此 A-1 会受它父节点属性的影响示例 2.3:(重点, 注意跟 1.3 示例对比)

```
body{
A {position：relative; overflow: scroll;}
A-1 {position: absolute;}
}
```

效果：A-1 会根据 A 滚动条的滚动而滚动分析：当父节点 A 设置了 position 之后，效果就跟示例 1.3 不一样了，这时 A-1 会受到离它自己最近的一个设置了 position 属性的父节点的影响，再看下面一个示例：

```
body{
A {position：relative; overflow: hidden;}
A-1 {overflow: scroll;}
A-1-1 {position: absolute;}
}
```

注意：这时 A-1-1 不会收 A-1 的影响，但是会受到 A 的影响示例 2.4:
body{
A {position:relative; overflow: scroll;}
A-1 {position: fixed;}
}
效果：A-1 不会根据 A 滚动条的滚动而滚动分析：跟 1.4 示例一样，当子节点的 position 属性设置为 fixed 之后，不管的父节点是否设置了 position 值，都只会受到 body 节点的影响，其他任何节点都不会影响它
Feb 13 2014

# 负 margin 用法权威指南

从事前端如果连负 margin 都不懂那就赶紧来学习一下吧！下面是 w3cplus 的一篇对负 margin 的译文，讲的很清楚，如果觉得看中文不爽可以直接看英文。中文译文
http://www.w3cplus.com/css/the-definitive-guide-to-using-negative-margins.html

英文原文
http://www.smashingmagazine.com/2009/07/27/the-definitive-guide-to-using-negative-margins/

# BFC

# 文字溢出使用...代替

> css 中有一个属性叫做 text-overflow:ellipsis 配合其他属性可以实现.但火狐浏览器不兼容。保证兼容性，可以使用 margin 负值定位法。

```
<div class="zxx_text_overflow" >
    <div class="zxx_con" >这是一段比较长的文字，用来测试是否文字溢出时会用省略号显示。</div>
     <div class="zxx_dotted" >…</div>
 </div>
 .zxx_text_overflow{width:24em; height:1.3em; overflow:hidden; zoom:1;}
.zxx_text_overflow .text_con{float:left; height:1.3em; margin-right:3em; overflow:hidden;}
.zxx_text_overflow .text_dotted{width:3em; height:1.31em; float:right; margin-top:-1.3em;}
```

> 也可以使用 jquery

## 清除浮动

clear 原理，clear 会为元素添加足够的空白空间，使到该元素的位置会放置在它前一个浮动元素之下，这跟增加元素外边距使到元素占据满行而强制换行的效果是一样的。只是清除了浮动元素对兄弟元素的影响。而高度塌陷的问题要用更高级的清楚浮动的方法实现：闭合浮动。为什么叫闭合浮动？因为浮动的元素脱离了普通流，因此对于它的父元素，它并没有闭合，这时候就需要闭合浮动了。实现闭合浮动有三种方法
1，空 div 方法
2，overflow 方法
3，使用 :after 伪元素的方法

# CSS

## px em rem 区别

> px 像素（Pixel）。相对长度单位。像素 px 是相对于显示器屏幕分辨率而言的(引自 CSS2.0 手册)
> em 是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸.(引自 CSS2.0 手册)
> 任意浏览器的默认字体高都是 16px。所有未经调整的浏览器都符合: 1em=16px。那么 12px=0.75em,10px=0.625em。为了简化 font-size 的换算，需要在 css 中的 body 选择器中声明 Font-size=62.5%，这就使 em 值变为 16px\*62.5%=10px, 这样 12px=1.2em, 10px=1em, 也就是说只需要将你的原来的 px 数值除以 10，然后换上 em 作为单位就行了。
> EM 特点

> 1. em 的值并不是固定的；

2. em 会继承父级元素的字体大小。所以我们在写 CSS 的时候，需要注意两点：
1. body 选择器中声明 Font-size=62.5%；
1. 将你的原来的 px 数值除以 10，然后换上 em 作为单位；
1. 重新计算那些被放大的字体的 em 数值。避免字体大小的重复声明。
   > 也就是避免 1.2 \* 1.2= 1.44 的现象。比如说你在#content 中声明了字体大小为 1.2em，那么在声明 p 的字体大小时就只能是 1em，而不是 1.2em, 因为此 em 非彼 em，它因继承#content 的字体高而变为了 1em=12px。

> rem 特点
> rem 是 CSS3 新增的一个相对单位（root em，根 em），这个单位引起了广泛关注。这个单位与 em 有什么区别呢？区别在于使用 rem 为元素设定字体大小时，仍然是相对大小，但相对的只是 HTML 根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。目前，除了 IE8 及更早版本外，所有浏览器均已支持 rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用 rem 设定的字体大小。下面就是

## 滚动条

>

```
::-webkit-scrollbar {
    width: 3px;
    height: 3px;
}
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
    border-radius: 3px;
    background: @scrollBarTrackBackgroundColor;
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb:hover {
    border-radius: 3px;
    background: @scrollBarThumbBackgroundColor;
}
::-webkit-scrollbar-thumb:window-inactive {
    background: @scrollBarThumbActiveBackgroundColor;
}
html {
    SCROLLBAR-WIDTH: 3px;
    SCROLLBAR-HEIGHT: 3px;
    SCROLLBAR-FACE-COLOR: @scrollBarTrackBackgroundColor;
    SCROLLBAR-SHADOW-COLOR: @scrollBarTrackBackgroundColor;
    SCROLLBAR-HIGHLIGHT-COLOR: @scrollBarTrackBackgroundColor;
    SCROLLBAR-3DLIGHT-COLOR: @scrollBarTrackBackgroundColor;
    SCROLLBAR-DARKSHADOW-COLOR: @scrollBarTrackBackgroundColor;
    SCROLLBAR-TRACK-COLOR: @scrollBarThumbBackgroundColor;
    SCROLLBAR-ARROW-COLOR: @scrollBarTrackBackgroundColor;
}
```

## position

## overflow

> overflow:visible|hidden|scroll|auto|initial|inherit
> overflow 可以清楚浮动
> overflow 会形成一个 bfc(block formatting context)块级格式化上下文。使用场景：将一个块级元素放在一个浮动元素的后面。

# CSS3

## icon font

> 就是用 font-family 来实现 icon,主要用到 css3 中的@font-face 以前我们的实现方式都是切成图片，然后合成聚合图，最后用坐标定位的方法来实现，但这种方法有一定的弊端就是：通用性不强，图片的方式适合于比较独特的并且有一定项目特殊性的 icon，而如果一个 Icon 是同一颜色只不过大小发生了变化，这时用@font-face 的方式来实现则显得更加具有优势。

```
@font-face {
  font-family: 'uxiconfont';
  src: url('uxiconfont.eot'); /* IE9*/
  src: url('uxiconfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('uxiconfont.woff') format('woff'), /* chrome、firefox */
       url('uxiconfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
       url('uxiconfont.svg#svgFontName') format('svg'); /* iOS 4.1- */
}
```

第二步：定义使用 iconfont 的样式
<span class="iconfont">&#33</span>
当然这种方法是利用了空标签的方法来设置字体 icon。其实一种更好的方式是用:before\:after 的方式添加字体 icon，这样可以精简 dom
html 如下

```
<span class="iconfont">阿斯顿撒旦撒旦</span>
css如下；
.iconfont:after,.iconfont::after{
  font-family:"uxiconfont";
  display:inline-block;
  content:"&#33";/*在这里调用字符*/
  width:16px;
  height:16px;
}
```

引用四种格式的字体文件是为了兼容不同的浏览器。缺点：只支持纯色 icon。最多使用渐变色

## background

可以设置如下属性：
background-color
background-position
background-size
background-repeat
background-origin
background-clip
background-attachment
background-image
通常建议使用这个属性，而不是分别使用单个属性，因为这个属性在较老的浏览器中能够得到更好的支持，而且需要键入的字母也更少。

## linear-gradient

线性渐变
linear-gradient(to right|45deg,color-stop,color-stop)

```
background: linear-gradient(45deg, red 25%, blue 0);
//red从0 到25% 停止，blue从25%到blue100%
```

## repeating-linear-gradient

> 在此方法中实现两色必须使用 4 个色标

```
 repeating-linear-gradient(45deg,
              #fb3 0 , #fb3 25%,#58a 0,#58a 50%
           );
```

## background-size

> background-size:length|percentage|cover|contain

## background-clip

> 其主要是用来确定背景的裁剪区域，换句话说，就是如何控制元素背景显示区域.>第一步：使用 font-face 声明字体

```
background-clip ： border-box || padding-box || content-box
```

> _**background-image:是从 paddingq-box 区域开始平铺**_；
>
> _**background-color:是从 border-box 区域开始渲染;**_
> 让两个元素起始位置相同就用 background-clip：padding-box|content-box

## background-position

> background-position 属性设置背景图像的起始位置。默认情况下
> _**background-position 这个属性是以 padding-box 为基准的**_

> ```
> background-position:center;
> background-position:right 50px bottom 20px;
> background-position:calc(100% - 20px) calc(100% -10px)
> ```

> ```
>
> ```

## background-origin

将其值指定为 content-box：可以改变 background-position 起始位置的设置；

## font

> font：italic bold 12px/20px arial,sans-serif
> 默认顺序：
> font-style
> font-variant
> font-weight
> font-size/line-height
> font-family
> 可以不设置其中的某个值，比如 font:100% verdana; 也是允许的。未设置的属性会使用其默认值。

## box-shadow

其填充颜色会根据阴影形状走，而 outline 不会。

```
box-shadow: h-shadow v-shadow blur spread color inset;
box-shadow: 10px 10px 5px #888888;

h-shadow	必需。水平阴影的位置。允许负值。
v-shadow	必需。垂直阴影的位置。允许负值。
blur	可选。模糊距离。
spread	可选。阴影的尺寸。
color	可选。阴影的颜色。请参阅 CSS 颜色值。
inset	可选。将外部阴影 (outset) 改为内部阴影。
```

## outline

outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。注释：轮廓线不会占据空间，也不一定是矩形。
outline 简写属性在一个声明中设置所有的轮廓属性。可以按顺序设置如下属性：
outline-color
outline-style
outline-width
如果不设置其中的某个值，也不会出问题，比如 outline:solid #ff0000; 也是允许的。

## calc():可以实现自适应布局，同时可以计算

> ```
> .ele{
>     width:calc(expression)
>    /*Firefox*/
> ```

    -moz-calc(expression);
    /*chrome safari*/
    -webkit-calc(expression);
    /*Standard */
    calc();

> ```
> ## box-sizing
> ```

## transform

## text-overflow

> text-overflow:clip|ellipsis|string
> 使用 ellipsis 生效：要使用
> white-space:nowrap; //不换行
> overflow:hidden；

## pre

## css 居中

### 水平居中（元素容器宽度固定）

#### 行内或类行内元素（比如文本和链接）

> 块级父容器中：text-align:center;可以让 inline,inline-block,..等元素水平居中。

#### 块级元素水平居中：

> 块级父容器：子元素是块级元素，首先要给子元素一个适当的宽度，然后设置 magin :0 auto;
> 缺点是无法自适应

#### inline-block 实现水平居中：

> 块级父容器：关键是在父容器设置 text-align:center;
> 缺点是 inline-block 元素的空白间距。这个问题可以通过设置父元素的 font-size:0;解决，在子元素中重新定义 font-size 的值。

#### 浮动实现水平居中

> float + position:relative 实现首先父容器都要进行浮动。float：left 整个分页向右移动 50%；left:50%;子元素也向左浮动，子元素向左边浮动 50%；

#### 绝对定位实现水平居中

> .ele{position:absolute;width:宽度值；left:50%;margin-left:-(宽度值／2)}
> 难点是不知道元素的宽度值。可以借助 float:left;解决子元素：float:left;right:50%;

#### 还有 css3 的 flex 和 width 属性的 fit-content;但是兼容性太差；ie11

### 垂直居中

#### vertical-align

> 其只适用于 inline or table-cellbox
> vertical-align:middle

#### line-height

> 适用于所有元素。仅适用于单行文本和图片；

#### absolute and -margin or absolute + transform3d or absolute + stretching

> 第一种限制：最好是知道父容器的宽度和高度。要不然会产生内容溢出。后两种：ie8 一下不支持。用绝对定位将目标元素左上角定位在父级元素的中央位置，然后通过设定目标元素的属性，使其中心点于父级元素重合。

> .parent{ position: relative;height:800px;}
> 第一种：.child{position:absolute;top:50%;left:50%;height:30%;width:50%;margin:-15% 0,0,-25px;}//margin 为负值且为自身尺寸的一半；第二种：.child{position:absolute;top:0;bottom:0;left:0;right:0;width:50%;height:30%;margin:auto}
> 第三种：.child{position:absolute;top:50%;left:50%;width:150px;height:130px;translate3d(-50%,-50%,0)}
> 主要是针对多行元素的垂直居中而不是此元素内容的垂直居中

### 水平垂直居中

#### position:absolute 和-margin

> 限制：水平垂直居中的元素要有明确的大小；给元素进行绝对定位。
> .child{width:200px;height:200px;position:absolute;}

# CSS 布局

布局文章
<http://www.cnblogs.com/xiaohuochai/p/5455905.html#anchor1>
BFC 文章
<http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html>

## 两列布局（单列定宽，单列自适应）

### 思路一：float

> 说起两列布局，最常见的就是使用 float 来实现。float 浮动布局的缺点是浮动后会造成文本环绕等效果，以及需要及时清除浮动。如果各浮动元素的高度不同时，可能会出犬牙交错的效果
> `float+margin`

```
<style>
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{float: left;width: 100px;}
.right{margin-left: 120px;}
</style>
```

> ```
> <div class="parent" style="background-color: lightgrey;">
> ```

    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>

</div>
>```

`缺点：1》ie6下的三像素bug(因为盒模型)`

> 2》当右侧容器内有元素清除浮动时，会使元素不与左侧浮动元素同行，从而出现文字下沉现象。

```
.right p { clear:both;}
```

> `2]float + margin + (fix)`

> (fix 代表增加结构)，为了解决上述问题，可以通过增加结构来解决。自适应的一列外侧增加一层结构.rightWrap 并设置浮动。要实现自适应效果，.rightWrap 宽度必须设置为 100%。若不设置，float 后的元素宽度将由内容撑开。同时再配合盒模型属性的计算，设置计算后的负 margin 值，使两列元素在同一行显示。同时两列之间的间距由.right 的 margin 值确定。由于右侧元素会层叠在左侧元素之上，.left 需要使用 relative 来提升层级。

```
<style>
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{position: relative;float: left;width: 100px;}  
.rightWrap{float: left;width: 100%;margin-left: -100px;}
.right{margin-left: 120px;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="rightWrap" style="background-color: pink;">
        <div class="right"  style="background-color: lightgreen;">
            <p>right</p>
            <p>right</p>
        </div>
    </div>
</div>
```

`3]float + margin + calc()`

```
<style>
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{float: left;width: 100px;margin-right: 20px;}  
.right{float: left;width: calc(100% - 120px);}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

`4]float + overflow`

> 还可以使用 overflow 属性来触发 bfc，来阻止浮动造成的文字环绕效果。由于使用 overflow 不会改变元素的宽度属性，所以不需要重新设置宽度。由于设置 overflow:hidden 并不会触发 IE6-浏览器的 haslayout 属性，所以需要设置 zoom:1 来兼容 IE6-浏览器

```
<style>
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{ float: left;width: 100px;margin-right: 20px;}
.right{overflow: hidden;zoom: 1;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

### 思路二 ： inline-block

> inline-block 内联块布局的主要缺点是需要设置垂直对齐方式 vertical-align，则需要处理换行符解析成空格的间隙问题。IE7-浏览器不支持给块级元素设置 inline-block 属性，兼容代码是 display:inline;zoom:1;
> 1]inline-block + margin + calc()
> 　　一般来说，要解决 inline-block 元素之间的间隙问题，要在父级设置 font-size 为 0，然后在子元素中将 font-size 设置为默认大小.

```
<style>
p{margin: 0;}
.parent{font-size: 0;}
.left{display:inline-block;vertical-align:top;width:100px;margin-right:20px;font-size:16px;}
.right{display:inline-block;vertical-align:top;width:calc(100% - 120px);font-size:16px;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

`2] inline-block + margin +(fix)`

```
<style>
p{margin: 0;}
.parent{font-size: 0;}
.left{position:relative;display:inline-block;vertical-align:top;width:100px;font-size:16px;}
.rightWrap{display:inline-block;vertical-align:top;width:100%;margin-left: -100px;font-size:16px;}
.right{margin-left: 120px;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="rightWrap" style="background-color: pink;">
        <div class="right"  style="background-color: lightgreen;">
            <p>right</p>
            <p>right</p>
        </div>
    </div>
</div>
```

### 思路三：table

### 思路四：absolute

> absolute 布局的缺点是由于父元素需要设置为 relative，且子元素设置为 absolute，所以父元素的高度并不是由子元素撑开的，需要单独设置。

```
<style>
p{margin: 0;}
.parent{position: relative;width:100%;height:40px;}
.left{position: absolute;left:0;width:100px;}
.right{position: absolute;left:120px;right:0;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

## 思路五：flex

> flex 弹性盒模型是非常强大的布局方式。但由于其性能消耗较大，适合于局部小范围的布局　　[注意]IE9-不支持

```
　<style>
p{margin: 0;}
.parent{display: flex;}
.left{width:100px;margin-right: 20px;}
.right{flex:1;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

## 两列布局（两列自适应）

### 思路一：float

> 在单列定宽单列自适应的两列布局中，经常用 float 和负 margin 配合实现布局效果。但由于 margin 取值只能是固定值，所以在两列都是自适应的布局中就不再适用。而 float 和 overflow 配合可实现两列自适应效果。使用 overflow 属性来触发 bfc，来阻止浮动造成的文字环绕效果。由于设置 overflow:hidden 并不会触发 IE6-浏览器的 haslayout 属性，所以需要设置 zoom:1 来兼容 IE6-浏览器

```
<style>
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{float: left;margin-right: 20px;}
.right{overflow: hidden;zoom: 1;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

### 思路二：table

### 思路三：flex

```
<style>
p{margin: 0;}
.parent{display:flex;}  
.right{margin-left:20px; flex:1;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

## 三列布局

## 两侧定宽中间自适应布局

### 思路一：float

`（1）float + margin + calc()`

```
<style>
p{margin: 0;}
.parent{overflow: hidden;}
.left,.right{float: left;width: 100px;}
.center{float: left; width:calc(100% - 240px);margin: 0 20px;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="center" style="background-color: pink;">
        <p>center</p>
        <p>center</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
    </div>
</div>
```

`(2)float + margin + (fix)`

```
<style>
p{margin: 0;}
.parent{overflow: hidden;}
.left,.right{position: relative;float: left;width: 100px;}
.centerWrap{float: left; width:100%; margin: 0 -100px;}
.center{margin: 0 120px;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="centerWrap" style="background-color: red;">
        <div class="center" style="background-color: pink;">
            <p>center</p>
            <p>center</p>
        </div>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
    </div>
</div>
```

### 思路二：inline-block

`(1)inline-block + margin + calc()`

```
<style>
p{margin: 0;}
.parent{font-size: 0;}
.left,.right,.center{display:inline-block; vertical-align: top;font-size: 16px;}
.left,.right{width: 100px;}
.center{width: calc(100% - 240px); margin: 0 20px;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="center" style="background-color: pink;">
        <p>center</p>
        <p>center</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
    </div>
</div>
```

`(2) inline-block + margi + (fix)`

```
<style>
p{margin: 0;}
.parent{font-size: 0;}
.left,.right,.centerWrap{display:inline-block; vertical-align: top;font-size: 16px;}
.left,.right{width: 100px;position:relative;}
.centerWrap{width: 100%; margin: 0 -100px;}
.center{margin: 0 120px;}
</style>
```

```
<div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
        <p>left</p>
    </div>
    <div class="centerWrap" style="background-color: orange;">
        <div class="center" style="background-color: pink;">
            <p>center</p>
            <p>center</p>
        </div>
    </div>
    <div class="right"  style="background-color: lightgreen;">
        <p>right</p>
    </div>
</div>
```

### 思路三：table

### 思路四：absolute

### 思路五：flex

## 两列定宽一侧自适应

### 思路一：float

> (1)float + margin
> (2)float + margin + calc()
> (3)float + margin + (fix)
> (4)float + overflow

### 思路二：inline-block

> (1)inline-block + margin + calc()
> (2)inline-block + margin + (fix)

### 思路三 table

### 思路四：absolute

### 思路五：flex

## 中间定宽两侧自适应

### 思路一：float

### 思路二：table

### 思路三：flex

## 一侧定宽两列自适应

### 思路一：float

### 思路二：table

### 思路三：flex

## 三列自适应

### 思路一：float

### 思路二：table

### 思路三：flex

## 总结

> 三列布局类似于大号的两列布局。无论是什么布局方式，无外乎需要应用 float、inline-block、table、absolute 和 flex 这五种布局属性，然后再配合负 margin、calc()函数、bfc、增加结构等来实现布局
> 自适应包括两种情况：一种是宽度由内容撑开，一种是宽度自动撑满父元素剩余宽度
> 可实现宽度由内容撑开的属性有： float、inline、inline-block、table、table-cell、absolute、fixed 和 flex
> 可实现宽度自动撑满父元素剩余宽度的属性有： overflow(配合 float)、table、flex

## flex 的布局

就是可以自动调整，计算元素在容器空间中的大小。属性

### flex 容器属性

flex-direction || flex-wrap || flex-flow || justify-content || align-items || align-content

```javascript
flex-direction:row|| column|| row-reverse|| column-reverse;
flex-wrap:wrap|| nowrap|| wrap-reverse
flex-flow:是flex-direction和flex-wrap两个属性的速记属性；
flex-flow:row wrap;
justify-content :flex-start||flex-end||center||space-between||space-around;//主轴的对齐方式
align-items:flex-start||flex-end||center||stretch||baseline
align-content:flex-start||flex-end||center||stretch;多行flex项目的排列方式；
```

### flex 项目属性

order || flex-grow || flex-shrink || flex-basis

```(javascript)
order:number;Flex项目在一个Flex容器中重新排序。
flex-grow：0 和 flex-shrink：1属性控制Flex项目在容器有多余的空间如何放大（扩展），在没有额外空间又如何缩小。
他们可能接受0或者大于0的任何正数。0 || positive number。
flex-basis：auto;属性可以指定Flex项目的初始大小。意味着Flex项目的初始宽度计算是基于内容的大小
速记：
flex:flex-grow flex-shrink flex-basis;
/* 这是一个绝对的Flex项目 */
 li { flex: 1 1; /*flex-basis 默认值为 0*/ }
  /* 这是一个相对的Flex项目 */
li { flex-basis: 200px; /* 只设置了flex-basis的值 */ }
align-self: auto || flex-start || flex-end || center || baseline || stretch
```

### 那绝对和相对 Flex 项目之间到底有啥区别呢？二者之间主要的区别在于间距及如何计算间距.

一个相对 Flex 项目内的间距是根据它的内容大小来计算的。而在绝对 Flex 项目中，只根据 flex 属性来计算，而不是内容。
flex：auto //flex:1 1 auto;相对项目
flex:1 //flex:1 1 0;绝对项目绝对 Flex 项目的宽度只基于 flex 属性，而相对 Flex 项目的宽度基于内容大小。

### margin：auto

当在 Flex 项目上使用 margin: auto 时，值为 auto 的方向（左、右或者二者都是）会占据所有剩余空间。当在一个 Flex 项目上使用自动外边距（margin: auto）时，justify-content 属性就不起作用了

### FFC

1; Flexbox 布局 和 Block 布局是有细微区别的
2; Flexbox 不支持 ::first-line 和 ::first-letter 这两种伪元素
3. vertical-align 对 Flexbox 中的子元素 是没有效果的
4. float 和 clear 属性对 Flexbox 中的子元素是没有效果的，也不会使子元素脱离文档流(但是对 Flexbox 是有效果的！)
5. 多栏布局（column-\*） 在 Flexbox 中也是失效的，就是说我们不能使用多栏布局在 Flexbox 排列其下的子元素（鱼和熊掌不可得兼嘛）
6. Flexbox 下的子元素不会继承父级容器的宽

### flex 子元素

   > 规范中把这种盒子 称为 flex item，而子元素中包括了 标签节点 以及 文本节点。标签节点很容易理解，需要注意的是文本节点。默认情况下，flex 会将 连续的文本节点 装进 flex-item 之中，使文本可以和标签节点一起排序和定位。值得注意的是，空格也是文本节点，所以 white-space 会影响 Flexbox 中的布局：

### flex-item-size 计算

item-size（尺寸）为主轴方向上 item 的 content 再加上自身的 margin 、 border 和 padding 就是这个 item 的尺寸。

1. flex-basis 的优先级比 width[height]: 非 auto; 高 2.元素存在默认宽高：如果子元素有默认固定宽高（例如 input 标签）、并且设置了 flex-basis，那么它的 content 以 固定宽高为下限，如果 flex-basis 超过了固定宽高，那么 flex-basis 则成为其 content，如果 flex-basis 比固定宽高小，那么以固定宽高为 content。
2. 3.元素存在 min-width[height] 或者 max-width[height]。
   > * 如果 flex-item 有 min-width[min-height] 的限制，那么 flex-item content 按照 **min-width **值为下限，
   >   *如果 flex-basis 的值大于 min-width[min-height] 那么 flex-item content 以 **flex-basis** 计算。
   >   *如果 flex-basis 的值小于 min-width[min-height] 那么 flex-item content 以**min-width[min-height]** 计算：
   >   *如果 min-width[min-height] 的值已经超出了容器的尺寸，那么即使设置了 flex-shrink。 CSS 解析器也不会进行将这个 item 的 content shrink，而是坚持保留它的 min-width[min-height]：
   >   *如果 Flexbox 设置的 min-width 超出了 flex container 的范围, 不会对其进行压缩。 \*反之，如果设置了 max-width[height] 的值，那么设置 flex-basis 无法超过这个值，对于 flex-grow 也仅仅只会增长到 max-width[height] 这个上限。
   >   4.width[height]: auto; 优先级等于 flex-basis。前面提到，如果给 item 同时设置了 width[height] 和 flex-basis 的话。flex-item content 以 flex-basis 来决定。但是实际上默认的 width[height]: auto; 优先级是等于 flex-basis 的。
   >   CSS 解析器对比两者的值，两者谁大取谁 作为 item 的基本尺寸，如果一个 item 没有内容，flex-item content 就会以 flex-basis 来决定。
3. 隐藏属性对 items-size 的影响如果设置了 visibility: hidden; | visibility: collapse; | transform: scale;的 flex-item content 依然被算进主轴尺寸，CSS 解析器依然会以他们 flex-grow | flex-shrink 将可用空间 或者 负可用空间 分配给他们如果设置了 display: none; CSS 解析器不会对该 item 的空间进行计算，也不会对其 grow 空间.

4. 关于 position: absolute 对 item 影响
   > 设置了 absolute 的子元素重叠在了一起，但是依然会受到 align-items: center; 的影响而居中。对于 Flexbox 来说，设置了 position: absolute;并不会对其下的子元素产生任何影响。flexbox 下设置了 absolute 的子元素的位置受 3 个方面的影响：

(1). flexbox 流下面的 justify-content 和 align-items
(2). 单个子元素的 top、left、right、bottom
(3). 单个子元素的 margin

### 计算

1.不换行
flex-grow
可用空间：flex-size-item-size 总和/比例份数
flex-shrink
(1)加权和= 比例份数*item-size
(2)shrink 比例 = flex-shrink * item-size / 加权和
(3)超出值：flex-size - item-size 总和
(4)缩后值：item-size - 超出值\* shrink 比例

2; 换行:由于在一行内 如果 item-size 累加超过了 Flexbox 的尺寸就会另起一行进行排列，所以在这种情况下，不会存在 shrink 的情况，而只有 grow 的情况。
3. max-width[height] 情况下 flex-grow 的计算流程由于可能存在某一个或多个 item 设置了有 max-width[height]。所以，CSS 引擎会先进行一次分配，分配后，统计那些有 max-width[height]的 items, 分配后是否有超出的剩余空间，然后对这些剩余空间再分配给那些没有设置 max-width[height]的 item
4. min-width[height] 情况下 flex-shrink 的计算流程.由于可能存在某一个或多个 item 设置了有 min-width[height]。所以，CSS 引擎会先进行一次 shrink， shrink 后，统计那些有 min-width[height]的 items, shrink 后是否有的剩余的未 shrink 空间，然后对这些剩余空间再分配给那些没有设置 min-width[height]的 item。
