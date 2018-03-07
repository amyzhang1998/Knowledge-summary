# css3

# background

## background:image postion size repeat origin clip attchment color ；

1. background-color:transparent|
2. background-image:
3. background-repeat:repeat-x,repeat-y,repeat,space,round,no-repeat;
   4.background-attachment:fixed,local,scroll
4. background-position: [ [ left | center | right | top | bottom | <length-percentage> ]
    > 两个值：background-position:x% y%;第一个水平，第二个是垂直。左上角是 0% 0%。右下角是 100% 100%。如果您仅规定了一个值，另一个值将是 50%。计算公式：background-postion:x y;
    > x：{容器(container)的宽度—背景图片的宽度}*x 百分比，超出的部分隐藏。
    > y：{容器(container)的高度—背景图片的高度}*y 百分比，超出的部分隐藏。

如果您仅规定了一个关键词，那么第二个值将是"center"。

> 大于 2 个值：background-position: left 10px top 15px;如果是三个值，缺少的就是 0

6.background-clip：border-box|padding-box|content-box

> Determines the background painting area,
> 7,background-origin:padding-box|border-box|content-box
> 如果 attchment 是 fixed 这个属性没影响
> 8:background-size:contain|cover|<length-percentage>
> 以设定背景图像的尺寸
> cover:把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
> contain:把图像扩展至最大尺寸，以使宽度和高度 完全适应内容区域。
> length:该属性值是设置背景图像的宽度和高度的，第一个值是宽度，第二个值是设置高度的。如果只设置第一个值，那么第二个值会自动转换为 “auto”;

> percentage:该属性是以父元素的百分比来设置图片的宽度和高度的，第一个值是宽度，第二个值是高度。如果只设置一个值，那么第二个值会被设置为 “auto”;
> 9:border-radius:从 border 开始算
> 10：border-image:source,round,width,style
> 11.box-shadow:对象选择器 {box-shadow:投影方式 X 轴偏移量 Y 轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色}

### animation

animation:name duration time-function delay iteration-count(应该播放的次数) direction（是否应该轮流反向执行动画）;
@keyframe 创建规则
@keyframes myfirst
{
from {background: red;}
to {background: yellow;}
}
当您在 @keyframes 中创建动画时，请把它捆绑到某个选择器，否则不会产生动画效果。通过规定至少以下两项 CSS3 动画属性，即可将动画绑定到选择器：规定动画的名称规定动画的时长

### 多列

-moz-,-webkit- ,
column-count:
column-gap:
column-rule:width|style|color

### 过度 transition

transtion: property | duration| timing-function|delay

### background

background-size;background-origin

### 边框

border-radius
box-shadow
border-image

### 文本效果

text-shadow：水平阴影、垂直阴影、模糊距离，以及阴影的颜色：
word-wrap

### 字体

@font-face{
font-family:
src:
font-weight:
font-style:
font-stretch:

}

### 2d 转换

transform
translate()
rotate()
scale()
skew()
matrix()
div
{
transform: rotate(30deg);
-ms-transform: rotate(30deg); /_ IE 9 _/
-webkit-transform: rotate(30deg); /_ Safari and Chrome _/
-o-transform: rotate(30deg); /_ Opera _/
-moz-transform: rotate(30deg); /_ Firefox _/
}

### 3d 转换

rotateX()
rotateY()
div
{
transform: rotateX(120deg);
-webkit-transform: rotateX(120deg); /_ Safari 和 Chrome _/
-moz-transform: rotateX(120deg); /_ Firefox _/
}

### 用户界面

resize
box-sizing
outline-offset
