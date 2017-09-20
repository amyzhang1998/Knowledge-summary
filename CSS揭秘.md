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
