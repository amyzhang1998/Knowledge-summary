# 背景与边框
## 半透明边框

```
border:10px solid hsla(0,0%,100%,.5);
background:white
//这个不会看到边框颜色，因为默认情况下，背景会延伸到边框所在的区域下层。
使用
background-clip:padding-box;
这样浏览器会在内边距的外延将背景切掉
```
## 多重边框
 1. box-shadow方案 只能产生实线边框
box-shadow支持逗号语法，可以创建任意数量的投影，需要注意的是，需要按规律调整扩张半径，

```
background:pink;
box-shadow:0 0 0 10px #655,0 0 0 15px deepPink,0 2px 5px 15px rgba(0,0,0,.5);
```
2. outline方案  可以产生虚线边框 两层边框 描边是支教的

```
background:red;
border:1px solid #54;
outline:4px solid deeppink
```
## 灵活的背景定位
1. 方案一：
backgroung-position:right 20px bottom 10px;
background-origin :
>每个元素身上都有三个矩形框，border-box/padding-box/Content-box;默认情况下，background-position是根据padding-box定位的，
background-origin 可以改变这种行为。
2. 方案二：calc()
实现一个距离右边20px 距离下面10px的位置
background-position:calc(100% - 20px) calc(100% - 10px);
## 边框内圆角
1. 方案一：可以借助两个元素完成
2. 方案二：使用一个元素 借助box-shadow outline
background:tan;
border-radius:.8em;
padding:1em;
box-shadow:0 0 0.6em #655;
outline:.6em solid #655;
注意：这个阴影半径要有一定的限制》比描边的宽度小，比(sqrt2 -1)r的值大。
## 条纹背景  线性渐变 background-size
### 水平条纹

```
background:linear-gradient(#fb3 30%,#58a 0);
background-size:100% 30px;
//多色
background:linear-gradient(#fb3 30%,#58a 0,#58a 60%,yellowgreen 0);
background-size:100% 30px;

```
### 垂直条纹

```
background:linear-gradient(to right/* 或90deg*/,#fb3 30%,#58a 0);
background-size:30px 100%;
```
### 斜向条纹

```
实现无缝连接 只有45deg可以
background:linear-gradient(45deg,#fb3 25%,#58a 0，#68a 50%,#fb3 0,#fb3 75%,#58a 0);
background-size:30px 30px;

更好的斜向
repeating-linear-gradient、repeating-radial-gradient:色标无限循环,可以随意指定角度，也可以直接指定渐变的长度，不需要使用background-size.
background:repeating-linear-gradient(45deg,#fb3, #58a 30px)

```
### 灵活的同色系条纹

```
background:repeating-linear-gradient(30deg, #79b,#79b 15px,#58a 0,#58a 30px);
如果需要改主色调，需要改三处地方
//改进
background:#58a;
background-image:repeating-linear-gradient(30deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1) 15px, transparent 0,transparent 30px);
```
## 复杂图案
### 网格

```
background:#58a;
background-image: linear-gradient(white 2px, transparent 0),
                  linear-gradient(90deg ,white 2px, transparent 0),
                  linear-gradient(hsla(0,0%,100%,.3) 1px, transparent 0),
                  linear-gradient(90deg, hsla(0,0%,100%,.3) 1px, transparent 0),
background-size:75px 75px,75px 75px,
                15px 15px,15px,15px
```
### 波点 （径向渐变）

```
background:#58a;
background-image: radial-gradient(tan 30%, transparent 0),
                  radial-gradient(90deg ,tan 30%, transparent 0),
background-size:30px 30px;
background-position:0 0,15px 15px
偏移量必须是贴片高度的一半。
```
### 棋盘
## 伪随机图案；
产生不重复规律

```
    background: hsl(20, 40%, 90%);
            background-image: linear-gradient(90deg, #fb3 10px, transparent 0),
            linear-gradient(90deg, #ab4 20px, transparent 0),
            linear-gradient(90deg, #655 20px, transparent 0);
            background-size: 80px 100%,60px 100%,40px 100;
            颜色循环长度是background-size的最小公倍数，所以想让随机更真实，要使用质数，41px 61px 83px;
            这个技巧称之为“蝉规则”；有很多应用之处，比如，让动画的规律更随机。。。
```
## 连续的图像边框 （border-image）
1. 虚线

```
div {
	border: 1em solid transparent;
	background: linear-gradient(white, white) padding-box,
	            url(http://csssecrets.io/images/stone-art.jpg) border-box  0 / cover;
	
	/* Styling & enable resize */
	width: 21em;
	padding: 1em;
	overflow: hidden;
	resize: both;
	font: 100%/1.6 Baskerville, Palatino, serif;
}
```
2. 蚂蚁线

```
@keyframes ants { to { background-position: 100% 100% } }

div {
	padding: 1em;
	border: 1px solid transparent;
	background: linear-gradient(white, white) padding-box,
	            repeating-linear-gradient(-45deg, black 0, black 25%, transparent 0, transparent 50%) 0 / .6em .6em;
	animation: ants 12s linear infinite;
	
	max-width: 20em;
	font: 100%/1.6 Baskerville, Palatino, serif;
}
```
3.头注

```
.footnote {
	border-top: .15em solid transparent;
	border-image: 100% 0 0 linear-gradient(90deg, currentColor 4em, transparent 0);
	padding-top: .5em;
	font: 220%/1.4 Baskerville, Palatino, serif;
}
```
>>>>不能理解background-size,border-iamge,background-clip background-origin linear-gradient的原理？？？？？？
# 形状
border-rasius:有四个展开属性，分横轴和纵轴
border-top-left-radius
border-top-right-radius
border-bottom-right-radius
border-bottom-left-radius
上半椭圆：
border-radius:50% /100% 100% 0 0;展开就是：
border-top-left-radius:50% 100%;
border-top-right-radius:50% 100%;
border-bottom-right-radius:50% 0;
border-bottom-left-radius:50% 0;
## 平行四边形 基本的css变形 skew()
1. 利用两个元素实现
2. 利用伪元素实现

为了实现伪元素和元素同宽高，使用position:absolute;top: 0; right: 0; bottom: 0; left: 0;
让伪元素不覆盖元素，使用z-index:-1;

```
.button {
	position: relative;
	display: inline-block;
	padding: .5em 1em;
	border: 0; margin: .5em;
	background: transparent;
	color: white;
	text-transform: uppercase;
	text-decoration: none;
	font: bold 200%/1 sans-serif;
}

.button::before {
	content: ''; /* To generate the box */
	position: absolute;
	top: 0; right: 0; bottom: 0; left: 0;
	z-index: -1;
	background: #58a;
	transform: skew(45deg);
}
```
## 菱形   clip-path
1. 使用transform 和 rotate;

```
.diamond {
	width: 250px;
	height: 250px;
	transform: rotate(45deg);
	overflow: hidden;
	margin: 100px;
}

.diamond img {
	max-width: 100%;
	transform: rotate(-45deg) scale(1.42);
	z-index: -1;
	position: relative;
}
```
2. 使用clip-path

```
img {
	max-width: 250px;
	margin: 20px;
	-webkit-clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
	clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
	/*transition: 1s;*/
}

img:hover {
	-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```
## 切角效果
1. 使用渐变：
切一角
background: linear-gradient(45deg, transparent 15px, #58a 0) top left；
切四角
background: linear-gradient(135deg, transparent 15px, #58a 0) top left,
	            linear-gradient(-135deg, transparent 15px, #58a 0) top right,
	            linear-gradient(-45deg, transparent 15px, #58a 0) bottom right,
	            linear-gradient(45deg, transparent 15px, #58a 0) bottom left;
	background-size: 50% 50%;
	background-repeat: no-repeat;
## 弧形切角 使用径向渐变取代线性渐变
	background: #58a;
	background:	radial-gradient(circle at top left, transparent 15px, #58a 0) top left,
	            radial-gradient(circle at top right, transparent 15px, #58a 0) top right,
	            radial-gradient(circle at bottom right, transparent 15px, #58a 0) bottom right,
	            radial-gradient(circle at bottom left, transparent 15px, #58a 0) bottom left;
	background-size: 50% 50%;
	background-repeat: no-repeat;
实现圆角的技术还有很多

## 梯形 使用3D变形 perspective(.5em)

```
nav > a {
	position: relative;
	display: inline-block;
	
} 
nav a::before {
	content: ''; /* To generate the box */
	position: absolute;
	top: 0; right: 0; bottom: 0; left: 0;
	z-index: -1;
	border-bottom: none;
	border-radius: .5em .5em 0 0;
	background: #ccc linear-gradient(hsla(0,0%,100%,.6), hsla(0,0%,100%,0));
	box-shadow: 0 .15em white inset;
	transform: scale(1.1, 1.3) perspective(.5em) rotateX(5deg);
	transform-origin: bottom;
}
nav.left > a::before {
	transform: scale(1.2, 1.3) perspective(.5em) rotateX(5deg);
	transform-origin: bottom left;
}
nav.right > a::before {
	transform: scale(1.2, 1.3) perspective(.5em) rotateX(5deg);
	transform-origin: bottom right;
}
```
## 饼图 
1. 使用伪元素
2. 使用svg
3. 角向渐变 conic-gradient






# 视觉效果
1. 投影 box-shadow 2px(右) 3px（下） 4px（4px的模糊半径处理） rgba(0,0,0,.5)
2. box-shadow 右第四个参数，可以扩大或者缩小投影的尺寸；
两侧 投影：
box-shadow: 5px 0 5px -5px black,
	           -5px 0 5px -5px black;

3. 滤镜
CSS 滤镜最大的好处在于，它们可以平稳退化:
-webkit-filter: sepia() saturate(4) hue-rotate(295deg);
	filter: sepia() saturate(4) hue-rotate(295deg);

4.  染色效果：
第一个滤镜是 sepia()，它会给图片增加一种降饱和度的 橙黄色 色效果，几乎所有像素的色相值会被收敛到 35~40;如果我们想要的主色调的饱和度比这更高，可以用 saturate() 滤 镜来给每个像素提升饱和度。假设我们想要的主色调是 hsl(335, 100%, 50%)，那就需要把饱和度提升一些，于是我们将饱和度参数设置为 4。具体 取值取决于实际情况.
因此，我们还需要再添加一个 hue-rotate() 滤镜，把每 个像素的色相以指定的度数进行偏移
5. 混合模式
“混合模式”控制了上层元素的颜色 与下层颜色进行混合的方式。用它来实现染色效果时，需要用到的混合模式 是 luminosity。这种 luminosity 混合模式会保留上层元素的 HSL 亮度信 息，并从它的下层吸取色相和饱和度信息。
要对一个元素设置混合模式，有两个属性可以派上用场:mix-blend- mode 可以为整个元素设置混合模式，background-blend-mode 可以为每层 背景单独指定混合模式。

有一件事情需要注意，滤镜是可动画的，而混合模式则不是。
6. 毛玻璃效果
由于我们不能直接对元素本身进行模糊处理，就 对一个伪元素进行处理，然后将其定位到元素的下层，它的背景将会无缝匹 配 <body> 的背景。main {

模糊效果在 中心区域看起来非常完美，但在接近边缘处会逐渐消退。这是因为模糊效果 会削减实色像素所能覆盖的范围，削减的幅度正是模糊半径的长度
为了补偿这种情况，我们需要让伪元素相对其宿主元素的尺寸再向 外扩大至少 20px(即它的模糊半径)。可以通过 -20px 的外边距来达到目 的，由于不同浏览器的模糊算法可能存在差异，用一个更大的绝对值(比 如 -30px)会更保险一些
body, main::before {
background: url("tiger.jpg") 0 / cover fixed;
}
main {
position: relative;
background: hsla(0,0%,100%,.3); overflow: hidden;
}
main::before { content: '';
position: absolute;
top: 0; right: 0; bottom: 0; left: 0; filter: blur(20px);
margin: -30px;
}
7. 折角效果
45度角
background: #58a; /* 回退样式 */ background:
    linear-gradient(to left bottom,
        transparent 50%, rgba(0,0,0,.4) 0)
        no-repeat 100% 0 / 2em 2em,
    linear-gradient(-135deg,
        transparent 1.5em, #58a 0);

35度角:因为要旋转折过来的三角，所以用伪元素实现
.note {
position: relative;
background: #58a; /* 回退样式 */ background:
        linear-gradient(-150deg,
            transparent 1.5em, #58a 0);
    border-radius: .5em;
} 
.note::before {
content: '';
position: absolute;
top: 0; right: 0;
background: linear-gradient(to left bottom,
transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4))
100% 0 no-repeat; width: 1.73em;
height: 3em;
transform: translateY(-1.3em) rotate(-30deg); transform-origin: bottom right; border-bottom-left-radius: inherit;
box-shadow: -.2em .2em .3em -.1em rgba(0,0,0,.15);
}
# 字体排印

