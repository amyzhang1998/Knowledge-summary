# 第二部分 设计模式
将不变的部分和变化的部分隔开，是每个设计模式的主题
## 单例模式
> 定义：保证一个类只有一个实例，并提供一个访问它的全局访问点。
好处：单例模式是一种简单但非常实用的模式，特别是惰性单例技术，在合适的时候才创建对象，并且只创建唯一的一个，更奇妙的是
创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合起来才具有单例的威力；
1. 不透明的单例模式
```
var Singleton = function(name){
	this.name = name;
};
Singleton.prototype.getName = function(){
	console.log(this.name);
};
Singleton.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton(name);
		}
		return instance;
	}
})();
var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
console.log(a === b);
```
> 缺点：上面这种方式增加了不透明性，使用它必须知道这是一个单例类。
2. 透明的单例模式
缺点：混乱，不易懂，不符合单一职责模式

```
var CreateDiv = (function(){
	var instance;
	var CreateDiv = function(html){
		if(instance){
			return instance;
		}
		this.html = html;
		this.init();
		return instance  = this;
	};
	CreateDiv.prototype.init = function(){
		var div = document.createElement('div');
		div.innerHTML = this.html;
		document.body.appendChild(div);
	};
	return CreateDiv;
})();
var a = new CreateDiv('sven1');
var b = new CreateDiv('sven2');

```
3. 用代理实现单例模式
> 缓存代理。把createDiv独立出来

```
var CreateDiv = function(html){
		
		this.html = html;
		this.init();
	};
	CreateDiv.prototype.init = function(){
		var div = document.createElement('div');
		div.innerHTML = this.html;
		document.body.appendChild(div);
	};
	//引入代理类
	var ProxySingletonCreateDiv =(function(){
		var instance;
		return function(html){
			if(!instance){
				instance = new CreateDiv(html);
			}
			return instance;
		}
	})()



var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
```
### 4.4 
> 全局变量不是单例模式.但是经常被用来做单例模式，缺点是，容易造成污染。一下几种方式可以相对降低全局变量带来的命名污染。
1. 使用命名空间。

```
//var namespace={
    a:function(){}
}
//
var MyApp={};
MyApp.namespace=function(){}
```
2. 使用闭包封装私有变量

```
var user =(function(){
    var __name = 'sven';
    var __age = 29;
    ...
})()
```
### 惰性单例
>  在需要的时候才创建对象实例。
基于类的单例模式在js中并不适合。

```
var creteLoginLayer = (function(){
	var div;
	return function(){
		if(!div){
			 div = document.createElement('div');
			div.innerHTML = 'i am log in window';
			div.style.display = 'none';
			document.body.appendChild(div)
		}
		return div
	}
})();
document.getElementById('loginBtn').onclick = function(){
	var loginLayer = creteLoginLayer();
	loginLayer.style.display = 'block'
}

```
> 这段代码将创建对象和管理单例的逻辑都放在函数 createLoginLayer中，不通用
### 4.6 通用的单例模式

```
var getSingle = function(fn){
	var result ;
	return function(){
		return result || (result = fn.apply(this,arguments))
	}
}
var creteLoginLayer = function(){
	var div;
	return function(){
		if(!div){
			 div = document.createElement('div');
			div.innerHTML = 'i am log in window';
			div.style.display = 'none';
			document.body.appendChild(div)
		}
		return div
	}
};
var createSingleLoginLayer = getSingle(creteLoginLayer);
document.getElementById('loginBtn').onclick = function(){
	var loginLayer = createSingleLoginLayer();
	loginLayer.style.display = 'block'
}
```
## 策略模式
> 定义：定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换。也就是：定义一系列的算法，把他们各自封装成策略类，
算法被封装在策略类内部的方法里。
可以清除程序中大量的 判断语句。
>优点：1. 策略模式利用组合，委托，和多态等 技术和思想，可以有效的避免多重条件选择语句；
2. 提供了对开放-封闭原则的完美支持，将算法封装在独立的strategy中，使得他们易于切换，易于理解，易于扩展；
3. 算法可以复用
4. 利用组合和委托来让CONTEXT拥有执行算法的能力，这也是继承更轻便的替代方案。
缺点：
1. 必须要了解所有的strategy和他们之间的不同点；

>一等函数对象与策略模式
在函数作为一等函数对象的语言中，策略模式是隐形的。strategy就是值为函数的变量。

1. 面向对象的策略模式。

```
var performanceS = function(){};
performanceS.prototype.calculate = function(salary){
	return salary * 4;
}
var performanceA = function(){};
performanceA.prototype.calculate = function(salary){
	return salary * 3
}
var performanceB = function(){};
performanceB.prototype.calculate = function(salary){
	return salary * 2;
}
var Bouns = function(){
	this.salary = null;
	this.strategy = null;
};
//以上是一组策略类:包括具体的算法，并负责具体的计算过程。
// 以下是环境类Context：Context接受客户的请求，随后把请求委托给某一个策略类。
Bouns.prototype.setSalary = function(salary){
	this.salary = salary;
}
Bouns.prototype.setStrategy = function(strategy){
	this.strategy = strategy;
}
Bouns.prototype.getBouns = function(){
	return this.strategy.calculate(this.salary);
}
var bouns  = new Bouns();
bouns.setSalary(10000);
bouns.setStrategy(new performanceS());
console.log(bouns.getBouns())
bouns.setStrategy(new performanceA());
console.log(bouns.getBouns())
```
2. js 版本的策略模式

```
var strategies = {
 	"S":function(salary){
 		return salary * 4;
 	},
 	"A":function(salary){
 		return salary * 3
 	},
 	"B":function(salary){
 		return salary * 2
 	}
 };
 var calculateBonus = function(level,salary){
 	return strategies[level](salary)
 }
 console.log(calculateBonus("S",20000))
```
### 5.6表单验证（策略模式用于表单验证）

1. 单个校验规则
```
var Validator = function(){
	this.catch =[];
}
Validator.prototype.add = function(dom,rule,errorMsg){
	var ary = rule.split(':');
	this.catch.push(function(){
		var strategy = ary.shift();
		ary.unshift(dom.value);
		ary.push(errorMsg);
		return strategies[strategy].apply(dom,ary)
	});
}
Validator.prototype.start = function(){
	for(var i =0,validateFunc;validatorFunc =this.cache[i++];){
		var msg = validatorFunc();
		if(msg){
			return msg;
		}
	}
};
var strategies = {
	isNonEmpty:function(value,errorMsg){
		if(value == ''){
			return errorMsg
		}
	},
	minLength:function(value,length,errorMsg){
		if(value.length < length){
			return errorMsg;
		}
	},
	isMobile:function(value,errorMsg){
		if(!/(^1[3|5|8][0-9]{9})/.test(value)){
			return errorMsg;
		}
	}
}
var validateFunc = function(){
	var validator = new Validator();

	validator.add(registerForm.userName,'isNonEmpty',' can not be empty');
	var errorMsg  = validator.start();
	return errorMsg;
}
var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function(){
	var errorMsg = validateFunc();
	if(errorMsg){
		console.log(errorMsg);
		return false;
	}
}
```
2. 一个文本框的多个校验规则

```
validator.add(registerForm.userName,
[{strategy:'isNonEmpty,errorMsg:'用户名不能为空'},
{strategy:'minLength:6',errorMsg:'用户名长度不能小于10位'}])

//....
var Validator = function(){
	this.catch =[];
}
Validator.prototype.add = function(dom,rules){
	var self = this;

	for(var i = 0,rule;rule = rules[i++];){
		(function(rule){
			var strategyAry = rule.strategy.split(':");
			var errorMsg = rule.errorMsg;

			self.cache.push(function(){
				var strategy = strategyAry.shift();
				strategyAry.unshift(dom.value);
				strateguAry.push(errorMsg);
				return strategies[strategy].apply(dom,strategyAry);
			});
		})(rule)
	}
}
```
## 代理模式
> 定义：是为一个对象提供一个代用品或占位符，以便控制对它的访问。

### 6.2 保护代理和虚拟代理
> 保护代理：代理可以帮目标对象过滤一些条件；用于控制不同权限的对象对目标对象的访问（js中不容易实现保护代理，因为我们无法判断谁访问了某个对象）；
虚拟代理：代理可以将一些开销很大的对象，延迟到真正需要的时候才去创建。

### 6.3 虚拟代理实现图片的预加载

```
var myImage = (function(){
	var imgNode = document.createElement('img');
	document.body.appendChild(imgNode);

	return {
		setSrc : function(src){
			imgNode.src = src
		}
	}
})();
var proxyImage =(function(){
	var img = new Image;
	img.onload = function(){
		
		console.log(22)
		myImage.setSrc(this.src);
	}
	return {
		setSrc:function(src){
		console.log(22,myImage)

			myImage.setSrc('./image/th.jpeg')
			img.src = src;
		}
	}
})()
proxyImage.setSrc('./image/img3.jpg')
```
>纵观上面程序，我们通过代理对象，实际上给系统增加了新的行为。这是符合 开放-封闭原则的。给img 节点设置src 和图片预加载这两个功能，被隔离在两个对象里，
他们可以各自变化而不影响对方，

### 6.4 代理的意义
> 为了说明代理的意义，引入一个面向对象设计的原则--单一职责原则。
**单一职责原则**：就一个类（通常也包括对象和函数等）而言。应该仅有一个引起它改变的原因。（避免强耦合性）
大多数情况下若违反其他任何原则，同时将违反开放-封闭原则。

### 代理和本体接口的一致性
1. 用户可以放心的请求代理，它只关心能否得到想要的结果，
2，在任何使用本体的地方都可以替换成使用代理

### 虚拟代理 合并 HTTP 请求

```
var syncFile = function(id){
	console.log('开始同步文件，id为：'+id)
}
var proxySyncFile =(function(){
	var cache = [],timer;

	return function(id){
		cache.push(id);
		if(timer){
			return ;
		}

		timer = setTimeout(function(){
			syncFile(cache.join(','));
			clearTimeout(timer);
			timer = null;
			cache.length = 0;
		},2000)
	}
})();
var checkbox = document.getElementsByTagName('input');
for(var i = 0,c;c = checkbox[i++];){
	c.onclick = function(){
		if(this.checked == true){
			proxySyncFile(this.id)
		}
	}
}

```
### 6.8 缓存代理

```
var mult = function(){
	console.log('开始计算乘机');
	var a = 1;
	for(var i = 0,l=arguments.length;i<l;i++){
		a = a * arguments[i];
	}
	return a ;
}
var proxyMult = (function(){
	var cache ={};
	return function(){
		var args = Array.prototype.join.call(arguments,',');
		if(args in cache ){
			return cache[args];
		}
		return cache[args] = mult.apply(this,arguments)
	}
})()
console.log(proxyMult(1,2,3))
```
### 用高阶函数动态创建代理

```
var createProxyFactory = function(fn){
	var cache ={};
	return function(){
		var args = Array.prototype.join.call(arguments,',');
		if(args in cache){
			return cache[args];
		}
		return cache[ args ] = fn.apply(this,arguments)
	}
}
```

## 迭代器模式
> 定义：是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

### 7.3 内部迭代器和外部迭代器
> 内部迭代器：内部已经定义好了规则，外部只需要一次初始调用。但这也是内部迭代器的缺点

```
var each = function(ary,callback){
	for(var i=0,l=ary.length;i<l;i++){
		callback.call(ary[i],i,ary[i])
	}
}
each([1,2,3],function(i,n){
	console.log([i,n])
})
```
> 外部迭代器：必须显示的请求迭代下一个元素。增加了调用的复杂度，但也增强了迭代器的灵活性。可以手工控制迭代的过程或者顺序。

```
var Iterator = function(obj){
	var current = 0;
	var next = function(){
		current +=1;
	};

	var isDone = function(){
		return current >= obj.length;
	};

	var getCurritem = function(){
		return obj[current]
	};

	return {
		next:next,
		isDone:isDone,
		getCurritem:getCurritem
	}
}
var compare = function(iterator1,iterator2){
	while(!iterator1.isDone() && !iterator2.isDone() ){
		if(iterator1.getCurritem() !== iterator2.getCurritem() ){
			throw new Error('iterator1 和iterator2 不相等');
		}
		iterator1.next();
		iterator2.next();
	}
	console.log('iterator1 和iterator2 相等')
}
var iterator1 = Iterator([1,2,3]);
var iterator2 = Iterator([1,2,3]);
compare(iterator1,iterator2)
```

### 7.5倒序迭代器

```
var reverseEach = function(ary,callback){
	for(var l = ary.length-1;l>=0;l--){
		callback(l,ary[l]);
	};
}
reverseEach([0,1,2],function(i,n){
	console.log(n)
})

```

### 7.6中止迭代器

```
var each = function(ary,callback){
	for(var i=0,l=ary.length;i<l;i++){
		if(callback(i,ary[i]) === false){
			break;
		}
	}
}
each([1,2,3,4,5],function(i,n){
	if(n > 3){
		return false;
	}
	console.log(n)
})
```
## 发布-订阅模式（观察者模式）
> 定义：它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都将得到通知。 在js中我们一般用事件模型来替代一般的
发布订阅模式。








