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
