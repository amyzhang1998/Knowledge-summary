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




