# 移动端WEB开发
https://www.zhihu.com/question/20269059
兼容性：
操作系统： Android ios 内核是webkit 
使用手势操作代替鼠标输入输出事件
移动端要处理各种分辨率。 响应式布局
CSS3代替 DOM animation
CSS3 动画使用设备本身的GPU渲染，效率更好

### 手机的屏幕尺寸适配
http://colachan.com/post/3435
。实际像素除以倍率，就得到逻辑像素尺寸。只要两个屏幕逻辑像素相同，它们的显示效果就是相同的。
Android的解决方法类似，但更复杂一些。因为Android屏幕尺寸实在太多，分辨率高低跨度非常大，不像苹果只有那么几款固定设备、固定尺寸。所以Android把各种设备的像素密度划成了好几个范围区间，给不同范围的设备定义了不同的倍率，来保证显示效果相近。像素密度概念虽然重要，但用不着我们自己算，iOS与Android都帮我们算好了。
### 需要考虑的
>需要考虑webkit内核的浏览器和chrome,uc，qq,小米手机浏览器
### 移动端web app开发与套壳程序开发区别
>移动端web app ,移动端网页，Hybrid开发（套壳开发工程师）
>移动端web app是什么呢？简单理解就是页面头部加入了下面这一句话的东西：<meta name="apple-mobile-web-app-capable" content="yes">
>这个meta的作用是让普通移动网页被添加到主屏幕后，拥有一些类native的功能，很多同学应该都很熟悉了。就是类似隐藏ios的上下状态栏，实现全屏，禁止弹性拖拽，全屏，修改顶部颜色等。
>之后我来说下套壳的吧。这部分如果没有开发过phonegap或者类似和native连调过webview的同学，可能觉得很陌生，其实不是，这种套壳开发和开发普通的网页没什么区别，只不过资源大部分是file开头的，本地资源，网络资源分为使用js异步接口获取和native获取，再和js的接口交互，类似ios中，可以直接在oc或者swift可以直接在webview中执行js，android同理，但是js想调用native功能怎么办呢？我们这边的做法是有一个负责通讯的iframe，我们通过修改这个iframe的url，来让native来监控一系列特殊的url地址请求，再在native中调用对应的功能，比如摄像头，特殊交互，呼起，或者提供接口数据。数据的提供方式类似jsonp的原理，在执行函数的参数中传回来。理解了这块，其实做套壳的比做普通web app和网页都简单，因为在native的webview中是可以指定是什么版本的webview，用什么内核，拥有什么等级的安全权限等等，ios和android做法不一样，但是原理一致，对于前端开发工程师来说是无差的。而且套壳开发还有个好处就是，因为资源是本地化的，所以可以使用比较重的框架，如angular，react，一些三方框架，因为最终都是通过和native代码捆绑发布的。套壳native的静态前端部分的更新，我们可以使用远程下载静态资源包的方法实现，不发布大版本而修改webview中逻辑的需求，这一点也是大部分公司选择一半native一半h5来开发的原因。都知道ios审核发版很慢。

###移动端开发框架和库    
>> 轻和效率
>> 框架：jquery mobile.  angular mobile 
>> 库：zepto.js

###touch事件
touchstart --- touchchmove----touchend

touchcancel

zepto 的 touch.js

### why use touch?
click事件300s延迟
touch事件支持多点触摸
手势操作
### canvas and GPU render
优化技巧
1.使用canvas代替Image标签：原因：通常 是用浏览器渲染 展示图片，应该触发物理设备的GPU渲染
第四象限 
drawImage API。
drawImage(image ,x,y);在canvas上绘制图片
drawImage(image,x,y,width,height);在canvas上缩放并绘制图片
### Image对象【Image Obeject】 可以提前获得image的宽高
>预加载图片
>图片的按比例缩放

### CSS3 Animation
@keyframes关进针
>animation-name animation-duration animation-delay 
>animation-timing-function 动画形变函数指定
> animation-paly-state播放状态制定
>动画事件 WebkitAnimationEnd
>css3框架。 animate.css

### 宽高比例缩放 （对于宽高不一样的图片）
### 动态计算 图片的宽高 以及padding margin
### 事件代理。给父元素加事件

