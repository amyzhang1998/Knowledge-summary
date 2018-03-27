# position

## absolute

1.  absolute 和 margin 的关系？（为什么正常的块级元素的 margin：auto，只能水平居中，而绝对定位后的元素配合 margin：auto 就可以水平垂直居中）答：margin:auto ,可以作用的前提是，块级元素在此方向上有伸缩性（比如，如果不设自身宽度，其宽度与父级元素同宽。）

## relative:

> 当 position 为 relative 时，如果 top 和 bottom 都是 auto，则它们的计算值是 0，right 和 left 亦然；如果 top 和 bottom 其中一个为 auto，则 auto 相当于另一个的负值，即 top = -bottom，right 和 left 亦然；如果 top 和 bottom 的值都不为 auto，则忽略 bottom，如果 right 和 left 的值都不为 auto，则忽略 right。

## 特性

# float

何为包含块， 浮动元素的包含块是其最近的块级祖先元素使父级元素高度塌陷

## 特性

# margin

margin 可以影响元素的内部尺寸和外部尺寸。外部尺寸主要用来布局。

## 百分比值

> 相对于包含快的宽度进行计算

## auto 值

> 水平方向 auto 值计算决定于剩余空间；

## margin:0 auto 与 margin:auto 区别？

> margin 的 top 和 bottom 的值 与书写模式和文档流方向有关。默认是：writing-mode:horizontal-tb 和 direction:ltr;此时，top 和 bottom 的 auto 值，是 0；

## margin 和相对偏移量的异同？

> margin-top 和 position:relative.都是**以自身作为参照物**进行偏移的。而 absolute 偏移是相对于包含块，并且其偏移值是从包含快的 padding 区域开始计算。意思很明白，margin 是用来增加自身与它人之间的空白，而 top, right, bottom, left 是用来对自身进行排版，作用完全不同。也就是说 margin 是互动的，因为它要**影响**它人；而 top, right, bottom, left 是孤独的，它只是自己一个人玩，不**影响**它人。

# 布局

## 等高布局（伪等高和真等高）

### 伪等高---border 模拟
