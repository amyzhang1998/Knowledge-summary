function wrapper(fn) {
	const temp = function() {
		return fn.apply(this, arguments);
	};
	temp.wrap = function(callback) {
		const pre = fn;
		fn = function() {
			return callback.apply(pre, this.arguments);
		};
	};
	return temp;
}
var html = function(str) {
	//原函数数
	return '<p>' + str + '</p>';
};

console.log(html('段落'));
var p = wrapper(html); //第一次包装
console.log(p('段落'));

p.wrap(function(str) {
	//第二次包装
	return '<div>' + this(str) + '</div>';
});

console.log(p('段落'));

p.wrap(function(str) {
	//第三次包装
	return '<body>' + this(str) + '</body>';
});
console.log(p('段落'));
