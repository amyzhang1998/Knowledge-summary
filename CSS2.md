# 标签的 offset client scroll 和 currentStyle 属性

> clientWidth = width clientHeight = height (内容宽高不包括滚动条的宽高)
> clientTop = borderTopWidth clientLeft = borderLeftWidth
> offsetTop=top. offsetLeft = left (内容区域的偏移不包括 margin)
> offsetHeight = borderTopWidth + clientHeight + scrollbarWidth + borderBottomWidth;
> offsetWidth = borderLeftWidth + clientWidth + scrollbarWidth + borderRightWidth;
> scrollHeight scrollWidth 内容实际宽高
> scrollTop scrollLeft 滚动条滚过的距离
>
> http://www.cnblogs.com/quanhai/archive/2010/04/19/1715231.html

元素内部实际可用区域(高) = clientHeight - paddingTopWidth - paddingBottomWidth;

元素内部实际可用区域(宽) = clientWidth - paddingLeftWidth - paddingRightWidth;

scrollHeight：文章的实际高度，不管是否已经用纵向滚动条浏览过。

scrollWidth：文章的实际宽度，不管是否已经用横向滚动条浏览过。

scrollTop：用纵向滚动条滚过的高度。

scrollLeft：用横向滚动条滚过的宽度。

文章未滚过部分(高) = scrollHeight - scrollTop - clientHeight;

文章未滚过部分(宽) = scrollWidth - scrollLeft - clientWidth;

offsetTop：如果 position 是 absolute，则是相对于 body（纵向滚动条滚到最上面，横向滚动条滚到最左面）左上角那个点 y 轴之间的差。如果是 relative，则是相对于上方或外层元素 y 轴上的差值。如果是 static（position 的默认值），则该属性没有意义。

offsetLeft：如果 position 是 absolute，则是相对于 body（纵向滚动条滚到最上面，横向滚动条滚到最左面）左上角那个点 x 轴之间的差。如果是 relative，则是相对于上方或外层元素 x 轴上的差值。如果是 static（position 的默认值），则该属性没有意义。

clientTop：等同于 borderTopWidth。

clientLeft：等同于 borderLeftWidth。

currentStyle：

    height：等同于clientHeight。

    width：等同于clientWidth。

    left：等同于offsetLeft。

    top：等同于offsetTop。

    padding：共有4个，可以单独指定，也可以一起指定。该值是指元素border距元素内可用区域之间的距离。

    margin：共有4个，可以单独指定，也可以一起指定。该值是指距相邻/周围元素之间的距离。当元素position为relative时，其4个值分别等同于top、right、bottom和left

### css 中哪些元素可以继承

1. 不可继承的：display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-bread-before 和 unicode-bidi。
2. 所有元素可继承：visibility 和 cursor。
3. 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
4. 终端块状元素可继承：text-indent 和 text-align。
5. 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。
6. 表格元素可继承：border-collapse。
