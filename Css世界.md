# CSS 世界（css2.1）

http://demo.cssworld.cn
cascading style sheets
**css 的诞生就是为图文信息展示服务的**

## 一：概述

> 为什么 css 的图文显示能力很强？答：流（文档流（是 css 中一种基本的定位和布局机制）

> 流是如何影响整个世界的？

1. 擒贼先擒王。html 默认的表现符合‘流’。
2. 特殊布局与流的破坏。
3. 流向的布局。

> 什么是流体布局？（属于自适应布局的一种）利用元素流的特性实现的各类布局效果。因为流本身具有自适应效果，所以，‘流体布局’往往具有自适应性。（表格布局也有自适应性，但不属于流式布局）

> tabel 比 css 还老。有自己的属性世界不属于流。
> css 新世界 css3

1. 布局更丰富
   > 1. 移动端的崛起，催生了 css3 媒体查询和响应式布局特性的出现。
   2. 弹性盒子布局
   3. 格栅布局
2. 视觉表现长足发展
   > 1. 圆角 阴影 和渐变 2. transform 变换 3. filter 滤镜 和混合模式 4. animation

## 二：术语

### 长度单位

1. 相对长度单位
   (1):相对字体长度单位:如 em ex。还有 css3 里的 rem ch;
   (2):相对视区长度单位:如 vh vm vmin vmax.
1. 绝对长度单位最常见的就是 px ,还有 pt cm mm pc

### 功能符

值以函数的形式指定。如 rgba(0,0,0,.2),hsla() url calc() attr scale

### 声明：属性名加属性值： color:transparent;

### 规则集

```
.val{
    height:90px
}
```

### 选择器

1. 类选择器
2. Id 选择器
3. 属性选择器
4. 伪类选择器
5. 伪元素选择器

### 关系选择器

1. 后代选择器
2. 相邻后代选择器 >
3. 兄弟选择器 ~
4. 相邻兄弟选择器 +

## 三：流，元素，基本尺寸

### 块级元素(block-level element)li div table

1. 块级元素和‘display:block’的元素不是一个概念。
   > li 默认 display:list-item,table 默认 display:table;
   > 由于块级元素具有换行特性，理论上都可以配合 clear 属性来清除浮动。

```
.clear:after{
    content:'';
    display:table;
    clear:both;
}
```

2. 实际项目中 会使用 table 或 block 清除浮动，不使用 list-item,有三个原因。
   (1):1 个字符的比较多，其他都是五个字符。？？？？
   (2):会出现不需要的项目符号（使用 list-style:none;去掉）
   (3):IE 不支持伪元素的 display 值伪 list-item.兼容性不好。

3. 为什么 IE 浏览器不支持伪元素的 dispay 值为 list-item.(为什么 list-item 元素会出现项目符号)。
   > 因为需要。元素都有内外两个盒子。比如 dispaly:inline-block:外在是‘内联盒子’，内在是‘块级容器盒子’。
4. width height 作用在哪个盒子上？
   > 内在盒子（也就是容器盒子）。
5. width/height 作用的细节？

(1):width:auto 在不同场景下宽度表现的简介。

> 1):充分利用可用空间。（外部尺寸）

> 2）：收缩与包裹：代表：浮动，绝对定位，inline-block 元素和 table 元素。（内部尺寸）

> 3）：收缩到最小：代表：table-layout :auto 的表格中。（内部尺寸）

> 4）：超出容器限制。代表：内容很长的数字和英文。或者内联元素被设置为（内部尺寸）white-space:nowrap;

6. 外部尺寸与流体特性。

(1):正常流宽度。**表现为外部尺寸的元素一旦设置宽度，流特性就消失了。（流特性是指 margin/padding/border/content 区域自动分配水平空间的机制。会计元素的流体特性是体现在里面的容器盒子上的）**

(2):格式化宽度。仅出现在‘绝对定位模型中。（position 值为 absolute,fixed）.默认情况下，绝对定位元素的宽度表现师’包裹性‘，有一种特殊情况是当 left/right,top/bottom,对立方位的属性存在的时候，元素宽度表现为’格式化宽度‘。**其宽度大小相对于最近的具有定位特性（position 的值不是 static）的祖先元素计算**。具有完全的流体性。

7. 内部尺寸与流体特性
    如何判断一个元素使用的是内部尺寸？假如这个元素里面没有内容，宽度就是 0.

(1):包裹性。

> 自适应性是什么？元素尺寸由内部元素决定，永远小于’包裹快‘的尺寸。

> '包裹性'是为谁设计的呢？代表性：button 元素（dispaly:inline-block）,文字过多会换行;**input 标签按钮，默认 white-space:pre;不会换行。**

```
需求：文字少的时候居中，文字多的时候居左显示。
.box{
    text-align:center
}
.content{
    display:inline-block;
    text-align:left;
}
```

(2):首选最小宽度

**css 中，文字和图片的权重要远大于布局**
如果想让中文和英文字符都用最小宽度单位，可以试试 css 中的 word-break:break-all。

```
连续英文单词不换行的特性实现凹凸；
.ao{
    display:inline-block;
    width:0;
    }
.ao:before{
    content:"love 你 love"; //凸："我 love 你"
    outline:2px solid #cd0000;
    color:#fff;
}
```

(3):最大宽度:最大的连续内联盒子的宽度

```
实现自定义滚动：一种是原生的，scrollLeft;一种是iScroll(根据内部元素的尺寸跟容器的关系，通过修改内部元素的位置实现滚动效果。)
```

8. width 值作用细节。

> width 作用于'内在盒子'，内在盒子包括：content box,padding box border box margin box;
> 缺点：
>
> 1. 流动性丢失

2. 于现实表现不一致（会加上 border 和 padding 的宽度）；避免出现这种情况，方法之一就是采用“宽度分离原则”，（书写方式约束）

(1):宽度分离原则

```
.father{
    width:180px;
}
.child{
    margin:0 20px;
    padding:20px;
    border:1px solid;
}
```

(2)改变 width/height 作用细节的 box-sizing

> box-sizing:content-box|padding-box|border-box;
> 为什么没有 margin-box;margin 的背景永远都是透明的。

> box-sizing 的初衷；解决替换元素宽度自适应问题。
> **替换元素**：尺寸由内部元素决定 。且无论  他的 display 属性如何设置。

```
input,textare,img,viedo,object{
    box-sizing:border-box;
}
```

9.关于 width:100%;
如果父元素的 height:auto;只要子元素在文档流中，其百分比值就会被忽略；

(1):为何父元素有具体的高度值时，height ：100% 会被忽略；如果包含快的高度没有显示指定，并且该元素不是绝对定位。则计算值为 auto;

(2):如何让元素支持 100%；

1. 设置显式高度
2. 使用绝对定位：**绝对定位元素的宽高  百分比是相对于 paddingbox 的**。

10) 为流体而生的 min-width/max-width;
    他们是具有边界行为的属性。

```
网页宽度在1200-1400像素自适应；
.container{
    min-width:1200px;
    max-width:1400px;
}
```

> min-width/min-height 初始值是 auto,max-width/max-height 初始值 none;

> min-width>max-width>width !important

```
需求： 展开效果
.element{
    max-height:0;
    overflow:hidden;
    transition:max-height .25s;
}
.element.active{
    max-height:666px
}
缺点：如果max-height的值过大，收起的时候就会效果延迟。所以max-height要设置一个安全的最大值
```

### 内联元素 

css 中，内联元素是最为重要的，这些 css 属性往往具有继承属性。需要对内联元素特性。 内联盒模型 和 css 属性都了解，才能明白原因。

1. 什么元素是内联的；（1）： 定义
   > 内联元素的内联特指外在盒子，和 dispaly:inline 的元素不是一个概念。button 元素 display:inline-block;img 元素默认 display:inline;

（2）：行为

> 可以和文字在一行元素中显示。所以，文字，图片，按钮，输入框，下拉框，等都是内联元素。

2. **内联盒模型**
   > 1. 内容区域（字符盒子）
3. 内联盒子：指的是元素的外在盒子，用来决定元素是内联还是块级。该盒子分为’内联盒子‘和’匿名内联盒子（匿名块级盒子）‘
4. 行框盒子：由内联盒子组成。每一行就是。
5. 包含块；

3）幽灵空白节点 只有 html5 文档声明才有。

> 内联元素的所有解析和渲染表现就如同每个行框盒子的前面有一个’ 空白节点‘，有高度无宽度，透明。

## 四：盒尺寸四大家族

### content

#### 替换元素

1.什么是替换原素；

> 内容可以通过属性修改被替换的。比如，img,object,video,iframe input...

2. 特性

(1). 内容外观不受外部 css 的影响。
(2). 有自己的默认尺寸。
(3). 某些 css 属性有自己的表现规则

3. 替换元素都是内联水平元素。
4. 替换元素的尺寸计算规  则
   (1)固有尺寸（图片的原始宽高）
   (2)html 尺寸
   (3)css 尺寸

> 规则：
> 1). 级别 css>html >固有
> 2). 如果固有  含有固定的宽高比，同时只设置了宽度或高度，则实际宽高按同等比例计算。
> 3). 如果条件都不符合。则最终宽高 2：1，宽度 300px 高度 150px
> 4). 内联替换元素和块级替换元素规则一样

```
需求：首屏以下内容通过滚屏加载，使用透明图片占位。
使用   <img>  //没有src,不会发生任何请求

img{
    visibility:hidden;
}
img[src]{
    visibility:visible;
}
**我们无法改变这个替换元素的固有尺寸**
div:before{
    content:url(1.jpg);
    display:block;
    width:200px;
    height:200px;
}
//最终图片呈现的宽高不是200px；而是图片的实际宽高；

那为什么我们设置图片的宽高会影响图片呢？？？
因为图片content替换内容的默认方式是fill；（也就是外部设定的尺寸是多少我就填满）；在css3里可以更改这个属性。object-fill:none|fill|contain;
none:表现非替换元素一样；contain:会保持
```

5).替换元素与非替换元素的距离有多远？相差一个 src 或者是 content;

基于伪元素的图片内容生成技术(img 没有 src ,就是普通元素)

```
img:after{
    content:attr(alt);
    position:absolute;
    bottom:0;
    width:100%;
    backround-color:rgba(0,0,0,.2);
    transform:translateY(100%)
    transition:transform .2s;
}
img:hover:after{
    transform:translateY(0)

}
当我们给图片添加src时，元素就不具有伪元素功能。
```

使用 content 属性可以  将非替换元素编程替换元素，

```
h1{
    content:url(logo.png)
}
```

6). content 与替换元素关系剖析

> （1）content 属性生成的内容都是替换元素。生成的内容无法被选中，无法被搜索引擎抓取。替换的仅仅是视觉层。（2）：不能左右:empty 伪类（3）：content 动态生成值无法获取。

#### content 内容生成技术

1.content 辅助元素生成

```
1. 清除浮动
.clear:after{
    content:'';
    display:table;
    clear:both
}
2. 辅助实现两端对齐以及垂直居中、上边缘、下边缘
//一定不能换行
<div class='box'><i class='bar'></i>
    <i class='bar'></i>
    <i class='bar'></i>
    <i class='bar'></i>
</div>
.box{
    width:256px;
    height:256px;
    /*两端对齐关键*/
    text-align:justify;
}
.box:before{
    content:'';
    display:inline-block;
    height:100%;
}
.box:after{
  content:'';
    display:inline-block;
    width:100%;
}
.bar {
    dispaly:inline-block;
    width:20px;
}
```

2. content 字符内容生成
   > 辅助@font-dave 规则实现图标字体效果。生成动态的...
3. content 图片生成
4. content 开启闭合符号生成

```
.ask:before{
    content:"提问：‘";
}
.answer:before{
    content:"回答：‘";
}
.ask:after,.answer:after{
    content:'’';
}
```

5. content attr 声明。
6. 深入理解 content 计数器
   > 两个属性一个方法：counter-reset 和 counter-increment counter()/counters()

### padding

1.  对于内联元素，垂直 padding 不影响布局，但是起效果。 2.**padding 的百分比值是相对于宽度计算的，无论水平还是垂直。对于内联元素，效果比较特殊，其 padding 实会断行的。内联元素的垂直 padding 会让幽灵空白节点出现，内联元素默认高度完全受 font-size 影响**

2. 标签元素内置 padding

3. padding 与图形内置

### margin

### border

## 五：内联元素与流

## 六：流的破坏与保护

## 七：CSS 的层叠规则

## 八：文本处理

## 九：元素装饰喝美化

## 十：元素显示隐藏

## 十一：用户界面样式

## 十二：流向的改变
