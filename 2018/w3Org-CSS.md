# CSS Positioned Layout Module Level 3 定位布局模块

https://www.w3.org/TR/css-position-3/#fixed-pos

## 包含块

1.  static 和 relative 的包含快是自身的生存环境。相对于内容区域计算。
2.  fixed 的包含块 ，相对于浏览器窗口进行定位。
3.  absolute 的包含快是父级元素定位不是 static 的元素。

    > 1.  如果包含快是块级元素，则定位从 padding 开始算。

    2.如果包含快是行内元素。与文档流方向有关

    > 1.  如果 'direction' 是 'ltr'，包含块的顶、左边是祖先元素生成的第一个框的顶、左内边距边界(padding edges) ，右、下边是祖先元素生成的最后一个框的右、下内边距边界(padding edges).

    3.  如果没有找到，就相对于 html 或者 body 元素定位。

## 定位体系

### 相对定位(relative&static)

如果是百分比就是相对于父级块级元素的内容区域计算。如果是数值就是相对于自身移动，并不会影响其他元素

1.  当 position 为 relative 时，如果 top 和 bottom 都是 auto，则它们的计算值是 0，right 和 left 亦然；
2.  如果 top 和 bottom 其中一个为 auto，则 auto 相当于另一个的负值，即 top = -bottom，right 和 left 亦然；
3.  如果 top 和 bottom 的值都不为 auto，则忽略 bottom，如果 right 和 left 的值都不为 auto，则忽略 right。（**与文档流方向有关**）

###粘性（sticky）定位粘性定位的定位与相对定位类似。但是偏移量的计算是根据父级中有 overflow：scroll 的元素计算。若是没有，相对于初始包含快。

#### 规则

position:sticky 的生效是有一定的限制的，总结如下：

1.  须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。并且 top 和 bottom 同时设置时，top 生效的优先级高，left 和 right 同时设置时，left 的优先级高。
2.  设定为 position:sticky 元素的任意父节点的 overflow 属性必须是 visible，否则 position:sticky 不会生效。这里需要解释一下：
3.  如果 position:sticky 元素的任意父节点定位设置为 overflow:hidden，则父容器无法进行滚动，所以 position:sticky 元素也不会有滚动然后固定的情况。
4.  如果 position:sticky 元素的任意父节点定位设置为 position:relative | absolute | fixed，则元素相对父元素进行定位，而不会相对 viewprot 定位。
5.  达到设定的阀值。这个还算好理解，也就是设定了 position:sticky 的元素表现为 relative 还是 fixed 是根据元素是否达到设定了的阈值决定的。

### 绝对定位(absolute)

### fixed 定位

除了包含块规则与 absolute 不一样，其他都一样。

### boxes positions

只要设置的值不是 static，元素就会产生一个定位盒子。就可以使用 top left ...属性。
value: auto | <length> | <percentage>

# CSS Display Module Level

### Outer Display Roles

#### display:inline (产生 BFC)

#### display:block (产生 BFC)

#### display:run-in; (产生 BFC)chrome 不支持，这个声明实现效果是需要条件的：如果 display:run-in 的 box 后面跟着一个 display 为 block 水平的 box，那么这个应用了 display:run-in 的 box 将会变成 display:inline 属性，同时内容嵌入到后面的 display 为 block 的 box 中；否则这个 display:run-in 的 box 维持其本身的 block 属性。

### Inner Display Layout

#### display:flow-root (产生 BFC)

#### display:table (产生 BFC)

#### display:flex(产生 BFC)

#### display:grid

### Marker Boxes

#### display:list-item (产生 BFC)

### Inline-level Display

inline-block inline-table inline-grid inline-flex

# 弹性伸缩布局  display:flex

> 一个 Flexbox 布局是由一个伸缩容器（flex containers）和在这个容器里的伸缩项目（flex items）组成。

## 任何元素都可以指定为 flex;

块状元素 ：display:flex;

> 设为 flex 后，其子元素的**float ，clear 和 vertical-aligent ，::first-line ::first-letter**属性都会失效。

行内元素：display:inline-flex;//表现比较奇怪

### 属性

1.  flex-direction:row|row-reverse|column|column-reverse
2.  flex-wrap:nowrap(单行属性)|wrap（多行属性）|wrap-reverse（多行属性）
3.  flex-flow:flex-direction|flex-wrap(write-mode 敏感)
4.  order:0|数字（>0 是正序，<0 是倒序）

## Flex Items

> 子元素表现的的是 flex-level ,不是块级元素属性。

1.  相邻子元素的 margin 不会合并。
2.  避免使用百分比设置 padding 和 magin.因为浏览器的计算规则不一致。（自己的坐标或者行内的坐标）

### 属性

1.  flex:0 1 auto|[flex-grow flex-shrink?flex-basis]|none（0 0 auto）
    flex-grow:项目的放大比例
    flex-shrink:项目的缩小比例
    flex-basis:再分配多余空间之前，项目占据的主轴空间。auto(项目的本来大小)，width(具体大小),如果没有写 flex-basis,默认是 0;

#### 绝对定位的 items.

> 会脱离标准流，不参与 flex 布局。

### Aligning

# BFC

## 布局规则

1.  内部的 Box 会在垂直方向，一个接一个地放置。
2.  Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
3.  BFC 的区域不会与 float box 重叠。
4.  BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
5.  计算 BFC 的高度时，浮动元素也参与计算。

## 哪些元素产生 bfc

1.  根元素
2.  float 属性不为 none
3.  position 为 absolute 或 fixed
4.  display 为 inline-block, table-cell, table-caption, flex, inline-flex
5.  overflow 不为 visible

## 作用和原理

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

# FFC

# GFC

# IFC
