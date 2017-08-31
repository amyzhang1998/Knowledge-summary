## 命令模式
> 命令模式中的命令指的是一个执行某些特定事情的指令。
应用场景：有时候需要向某些对象发送请求，但是并不知道请求的接受者是谁，也不知道被请求的操作是什么， 此时希望用一种松耦合的方式来设计软件，使得请求
发送者和请求接受者能够清除彼此间的耦合关系。

js可以用高阶函数非常方便的实现命令模式；

### js 中的命令模式
>命令模式的由来其实是回调函数的一个面向对象的替代品。

```
var setCommand = function(button,func){
    button.onclick = function(){
        func()
    }
}
var MenuBar = {
    refresh:function(){
        console.log('refresh page');
    }
}
var RefreshMenuBarCommand = function(receiver){
    return function(){
        receiver.refresh();
    }
}
var refreshMenuBarCommand = RefreshMenuBarCommand (MenuBar);

setCommand(btn1,refreshMenuBarCommand)
```
### 撤销和重做
>撤销是命令模式里一个非常有用的功能。

```
var Ryu = {
	attack:function(){
		console.log('attack');
	},
	defense:function(){
		console.log('防御')
	},
	jump:function(){
		console.log('jump');
	},
	crouch:function(){
		console.log('down')
	}
};
var makeCommand = function(receiver,state){
	return function(){
		receiver[state]();
	};
}
var commands = {
	'119':'jump',
	'115':'crouch',
	'97':'defense',
	'100':'attack'
};
var commandStack = [];
document.onkeypress = function(ev){
	var keyCode = ev.keyCode,
	command = makeCommand(Ryu,commands[keyCode]);
	if(command){
		command();
		commandStack.push(command);
	}
};
document.getElementById('replay').onclick = function(){
	var command;
	while(command = commandStack.shift()){
		command();
	}
}
```
### 命令队列
>把命令加入队列，当一个命令结束后，在取第一个队列。
### 宏命令
>宏命令是一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令。
### 智能命令和傻瓜命令

## 组合模式
> 事物是由相似的子事物构成。
组合模式将对象组合成树形结构，以表示‘部分--整体’的层次结构，除了用来表示树形结构外，组合模式的另一个好处是通过对象的多态性表现，使得用户对单个对象
和组合对象的使用具有一致性。

何时使用此模式
1. 表示对象的部分-整体层次结构
2. 客户希望统一对待树中的所有对象。
### 更强大的宏命令

```
var MacroCommand = function(){
	return{
		commandList:[],
		add:function(command){
			this.commandList.push(command);
		},
		execute:function(){
			for(var i =0,command;command = this.commandList[i++];){
				command.execute();
			}
		}
	}
};
var openAcCommand ={
	execute:function(){
		console.log('打开空调')
	}
}
var openTvCommand ={
	execute:function(){
		console.log('打开电视')
	}
}
var openSoundCommand ={
	execute:function(){
		console.log('打开音响')
	}
}
var  macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);
var closeDoorCommand ={
	execute:function(){
		console.log('关门')
	}
};
var openPcCommand = {
	execute:function(){
		console.log('开电脑')
	}
};
var openQQCommand ={
	execute:function(){
		console.log('登录QQ');
	}
};
var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

var macroCommand = MacroCommand();
macroCommand.add(openAcCommand)
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)


 var setCommand = (function(command){
 	document.getElementById('button').onclick = function(){
 		command.execute();
 	}
 })(macroCommand)
```
### 透明性带来的安全问题
> 组合模式的透明性使得发起请求的客户不用去顾忌树中组合对象和叶对象的区别，但是他们本质上是有区别的，叶子对象不可以添加子节点，解决方案通常是给叶子对象
也添加add()方法，并在调用的时候，抛出一个异常。

```
var openTvComannd = function(){
    execute:function(){
        console.log('打开电视');
    },
    add:function(){
        throw new Error('叶子对象不能添加子节点')
    }
}
```
### 引用父对象

```
var Folder = function(name){
	this.name = name;
	this.parent =null;
	this.files =[];
}

Folder.prototype.add = function(file){
	file.parent = this;
	this.files.push(file)
}

Folder.prototype.scan =function(){
	console.log('开始扫描文件夹：'+this.name);
	for(var i=0,file,files = this.files;file = files[i++];){
		file.scan();
	}
};

Folder.prototype.remove = function(){
	if(!this.parent){
		return;
	}
	for(var files =this.parent.files,l = files.length-1;l>=0;l--){
		var file = files[l];
		if(file === this){
			files.splice(l,1)
		}
	}
}

var File = function(name){
	this.name = name;
	this.parent =null;
}
File.prototype.add =function(){
	throw new Error('can not add below file')
}
File.prototype.scan = function(){
	console.log('开始扫描文件:'+this.name)
}
File.prototype.remove = function(){
	if(!this.parent){
		return;
	}
	for(var files = this.parent.files,l =files.length-1;l>=0;l--){
		var file = files[l];
		if(file === this){
			files.splice(l,1);
		}
	}
}

var folder = new Folder('学习资料');
var folder1 = new Folder('javascript');
var file1 = new Folder('深入浅出NOde.js');

folder1.add(new File('js 设计模式与开发实践'));
folder.add(folder1);
folder.add(file1);

folder1.remove();
folder.scan()
```
## 模板方法模式
> 这是一种基于继承的设计模式
子类的方法种类和执行顺序都是不变的，而子类的方法种类和执行顺序都是可变的。
```
var Beverage = function(){};
  Beverage.prototype.boilWater = function(){
  	console.log('把水煮沸');
  }
  Beverage.prototype.brew = function(){};
  Beverage.prototype.pourInCup = function(){};
  Beverage.prototype.addCondiments = function(){};
  Beverage.prototype.init = function(){
  	this.boilWater();
  	this.brew();
  	this.pourInCup();
  	this.addCondiments();
  }

  var Coffee = function(){};
  Coffee.prototype = new Beverage();

  Coffee.prototype.brew = function(){
  	console.log('用沸水冲泡咖啡')
  }
  Coffee.prototype.pourInCup = function(){
  	console.log('把咖啡倒进杯子')
  }
  Coffee.prototype.addCondiments = function(){
  	console.log('加糖和牛奶')
  }

  var Coffee = new Coffee();
  Coffee.init()
```
> 在上面这个例子中 ，Beverage.prototype.init才是真正的模板方法，该方法中封装了子类的算法框架，它作为一个算法的模板，指导子类以何种顺序去执行
哪些方法。
### 抽象类
>需要说明的是，模板方法模式是一种严重依赖抽象类的设计模式，js 在语言层面并没有提供对抽象类的支持，我们也很难模拟抽象类的实现。
### js中没有抽象类的缺点和解决方案
1. 使用鸭子类型来模拟接口检查，以便确保子类中确实重写了父类的方法。会带来复杂性。
2. 如果忘记写init（）中的某一个方法，直接抛出一个异常。缺点是的到错误信息的时间点靠后。

```
Beverage.prototype.brew = function(){
    throw new Error('子类必须重写brew方法')
}
```
### 钩子方法
> 通过模板方法模式，我们在父类中封装了子类的算法框架。这些算法框架在正常状态下，是实用于大多数子类的。但如果有一些特别‘个性’的子类呢？
钩子方法可以用来解决这个问题。放置钩子是隔离变化的一种常见手段。
在父类中容易变化的地方放置钩子，钩子可以有一个默认的实现，究竟要不要‘挂钩子’，这由子类自行决定，钩子方法的返回结果决定了模板方法后面部分的执行
步骤，这样一来程序就拥有了变化的可能。

```
Beverage.prototype.customerWantsCondiments = function(){
  	return true;
  }
  Beverage.prototype.init = function(){
  	this.boilWater();
  	this.brew();
  	this.pourInCup();
  	if(this.customerWantsCondiments){
  		this.addCondiments();
  	}
  }
  .....
  Coffee.prototype.customerWantsCondiments = function(){
  	return window.confirm('请问需要调料吗')
  }
```
### 好莱坞原则
> 允许底层组件将自己挂钩到高层组件中，而高层组件会决定什么时候，以何种方式去使用这些底层组件。高层组件对待底层组件的方式都是“别调用我们，我们会调用你”
模板方法是这个原则的一个典型使用场景。用模板方法的时候，就意味这个 子类放弃了对自己的控制权。而是改为父类通知子类。
好莱坞原则还应用于 发布-订阅模式 和回调函数。
### 真的需要继承吗？

```
var Beverage = function(param){
  	var boilWater = function(){
  		console.log('把水煮沸')
  	};

  	var brew = param.brew ||function(){
  		throw new Error('必须传递brew方法')
  	}
  	var F = function(){};
  	F.prototype.init = function(){
  		boilWater();
  		brew();
  	};
  	return F;
  }
  var Coffee = Beverage({
  	brew:function(){
  		console.log('用沸水冲泡咖啡')
  	}
  })

  var coffee = new Coffee();
  coffee.init()
```
## 享元模式(flyweight)
> 此模式是一种用于性能优化的模式（用时间换空间），fly 在这里是苍蝇的意思，意为蝇量级。此模式的核心是运用共享技术来有效支持大量细粒度的对象。
要求：将对象的属性划分为内部状态与外部状态（状态在这里通常分为属性），此模式的目标是尽量减少共享对象的数量
1. 内部状态存储于对象内部，
2. 内部状态可以被一些对象共享
3. 内部状态独立于具体的场景，通常不会改变。
4. 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

剥离了外部状态的对象成为共享对象。

```
//剥离外部状态

	var Upload = function(uploadType){
		this.uploadType = uploadType;
	}
	Upload.prototype.delFile = function(id){
		uploadManager.setExternalState(id,this);
		if(this.fileSize < 3000){
			return this.dom.parentNode.removeChild(this.dom)
		}
		if(window.confirm('确定要删除此文件？'+this.fileName)){
			return this.dom.parentNode.removeChild(this.dom)
		}
	}
	//工厂进行对象实例化

	var UploadFactory= (function(){
		var createdFlyWeightObjs = {};
		return {
			create:function(uploadType){
				if(createdFlyWeightObjs[uploadType]){
					return createdFlyWeightObjs[uploadType]
				}
				return createdFlyWeightObjs[uploadType]  = new Upload(uploadType)
			}
		}
	})();
	//管理器封装外部状态

	var uploadManager = (function(){
		var uploadDatabase = {};

		return {
			add : function(id,uploadType,fileName,fileSize){
				var flyWeightObj = UploadFactory.create(uploadType);

				var dom = document.createElement('div');
				dom.innerHTML ='dd';
				dom.querySelector('.delFile').onclick = function(){
					flyWeightObj.delFile(id)
				}
				document.body.appendChild(dom);
				uploadDatabase[id]{
					fileName:fileName,
					fileSize:fileSize,
					dom:dom
				}
				return flyWeightObj;

			},
			setExternalState:function(id,flyWeightObj){
				var uploadData = uploadDatabase[id];
				for(var i in uploadData){
					flyWeightObj[i] = uploadData[i]
				}
			}

		}
	})()

	var id = 0;
	window.startUpload = function(upload,files){
		for(var i =0,file;file=files[i++];){
			var uploadObj = uploadManager.add(++id,uploadType,file.fileName,file.fileSize);
		}
	}

	startUpload('plugin',[
	{
		fileName:'1.txt',
		fileSize:1000
	},{

		fileName:'2.txt',
		fileSize:1000
	}
	])
    //需要创建的对象是2
```
### 享元模式的适用性
>此模式带来的好处很大程度上取决于如何使用以及何时使用，
1. 一个程序中使用了大量相似的对象。
2. 由于使用了大量对象，造成了很大的内存开销
3. 对象的大多数状态都可以变为外部状态
4. 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。

### 对象池

```
var toolTipFactory = (function(){
	var toolTipPool =[];

	return {
		create:function(){
			if(toolTipPool.length === 0){
				var div = document.createElement('div');
				document.body.appendChild(div);
				return div;
			}else{
				return toolTipPool.shift()
			}
		},
		recover:function(tooltipDom){
			return toolTipPool.push(tooltipDom)
		}
	}
})();
var ary =[];
for(var i =0,str;str=['A','B'][i++];){
	var toolTip = toolTipFactory.create();
	toolTip.innerHTML = str;
	ary.push(toolTip)
}
for(var i=0,toolTip;toolTip=ary[i++];){
	toolTipFactory.recover(toolTip);
}
for(var i =0,str;str=['A','B','C','D','E'][i++];){
	var toolTip = toolTipFactory.create();
	toolTip.innerHTML = str;
	ary.push(toolTip)
}
```
### 通用对象池

```
var objectPoolFactory = function(createObjFn){
	var objectPool = [];
	return {
		create:function(){
			var obj = objectPool.length ===0? createObjFn.apply(this,arguments):objectPool.shift();
			return obj;
		},
		recover:function(obj){
			objectPool.push(obj)
		}
	}
}

var iframeFactory = objectPoolFactory(function(){
	var iframe = document.createElement('iframe');
	document.body.appendChild(iframe);
	iframe.onload = function(){
		iframe.onload = null;
		iframeFactory.recover(iframe);
	}
	return iframe;
})

var iframe1 = iframeFactory.create();
iframe1.src = 'http://baicd.com'
```
## 职责链模式
>定义：使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
优点：请求发送者只需要知道链中的第一个节点，从而弱化了发送者和接受者之间的请联系，
1. 可以手动指定起始节点
缺点：
1. 不能保证请求一定会被处理
2. 链太长可能会影响性能

```
var order500 = function(orderType,pay,stock){
	if(orderType === 1 && pay === true){
		console.log('500元定金预购，得到100优惠券')
	}else{
		order200(orderType,pay,stock)
	}
}
var order200 = function(orderType,pay,stock){
	if(orderType === 2 && pay === true){
		console.log('200元定金预购，得到50优惠券')
	}else{
		orderNormal(orderType,pay,stock);
	}
}
var orderNormal = function(orderType,pay,stock){
	if(stock > 0){
		console.log('普通用户')
	}else{
		console.log('手机库存不足')
	}
}
order500(1,true,500)
order500(1,false,500)
order500(2,true,500)
order500(2,false,500)
order500(3,false,0)
缺点：请求链中的传递非常僵硬，传递请求的代码被耦合在业务代码中了。违反了，开放-封闭原则。
```
### 更灵活可拆分的职责链节点

```
var Chain = function(fn){
	this.fn = fn;
	this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor){
	return this.successor = successor;
}
Chain.prototype.passRequest = function(){
	var ret = this.fn.apply(this,arguments);
	if(ret === 'nextSuccessor'){
		return this.successor && this.successor.passRequest.apply(this.successor,arguments)
	}
	return ret;
}


var order500 = function(orderType,pay,stock){
	if(orderType === 1 && pay === true){
		console.log('500元定金预购，得到100优惠券')
	}else{
		return 'nextSuccessor'
	}
}
var order200 = function(orderType,pay,stock){
	if(orderType === 2 && pay === true){
		console.log('200元定金预购，得到50优惠券')
	}else{
		return 'nextSuccessor'

	}
}
var orderNormal = function(orderType,pay,stock){
	if(stock > 0){
		console.log('普通用户')
	}else{
		console.log('手机库存不足')
	}
}

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1,true,500)
chainOrder500.passRequest(2,true,500)
chainOrder500.passRequest(3,true,500)
chainOrder500.passRequest(1,false,0)
```
### 异步的职责链

```
var Chain = function(fn){
	this.fn = fn;
	this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor){
	return this.successor = successor;
}
Chain.prototype.passRequest = function(){
	var ret = this.fn.apply(this,arguments);
	if(ret === 'nextSuccessor'){
		return this.successor && this.successor.passRequest.apply(this.successor,arguments)
	}
	return ret;
}
Chain.prototype.next = function(){
	return this.successor && this.successor.passRequest.apply(this.successor,arguments)
}



var fn1 = new Chain(function(){
	console.log(1);
	return 'nextSuccessor';
});

var fn2 = new Chain(function(){
	console.log(2);
	var self = this;
	setTimeout(function(){
		self.next()
	},1000)
})

var fn3 = new Chain(function(){
	console.log(3)
})
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest()
```
## 中介者模式
>作用:就是接触对象与对象之间的紧耦合关系

### 例子-泡泡糖游戏
  ```
  var players =[]
function Player(name,teamColor){
	this.name = name;

	this.partners=[];
	this.enemies =[]
	this.state= 'live'
	this.teamColor = teamColor;
};
Player.prototype.win = function(){
	console.log(this.name+'won')
};
Player.prototype.lose = function(){
	console.log(this.name +'lost')
}
Player.prototype.die = function(){

	var all_dead = true;
	this.state ='dead'

	for(var i=0,partner;partner =this.partners[i++];){
		if(partner.state !== 'dead'){
			all_dead = false;
			break;
		}
	}
	if(all_dead === true){
		this.lose();
		for(var i =0,partner;partner = this.partners[i++];){
			partner.lose()
		}
		for(var i =0,enemy;enemy = this.enemies[i++];){
			enemy.win()
		}
	}
}

var playerFactory = function(name,teamColor){
	var newPlayer = new Player(name,teamColor);
	for(var i =0,player;player = players[i++];){
		if(player.teamColor === newPlayer.teamColor){
			player.partners.push(newPlayer);
			newPlayer.partners.push(player);
		}else{
			player.enemies.push(newPlayer);
			newPlayer.enemies.push(player)
		}
	}
	players.push(newPlayer);
	return newPlayer;
}


var player1 = playerFactory('one','red')
var player2 = playerFactory('two','red')

var player3 = playerFactory('three','blue')
var player4 = playerFactory('four','blue')

player1.die()
player2.die()

 ```
 ### 用中介者模式改造泡泡糖游戏
