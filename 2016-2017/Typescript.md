# TypeScript
## Basic Types
>### 1,Boolean.
>let isDone :boolean = false;
>### 2,Number
>let decimal:number = 6;
>### 3,String
>let color :string = 'blue'
>let sentence:string = `Hello,myname id ${fullName}`.
>### 4,Array
>let list: number[] =[1,2,3]
>let list: Array<number> =[1,2,3]
>let x: [string,number];
>### 5,Enum
>enum Color {Red,Green,Blue}
>let c:Color = Color.Green
>
```
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
```
>### 6,Any
>let notSure:any = 4
>### 7,Void:与Any相反，只能付值undefined ，null
>function warnUser(): void {
>. alert("this is my warning message")
>}
>### 8,NULL 和Undefined
>let u: undefined = undefined;
>let n: null = null;
>### 9,Never
>### 10.Type Assertions
>第一种：let value:any = "this is a string";
>let str:number = (<string>value).length
>第二种：let value:any = "this is a string";
> let str: number = (value as string).length

## Variable Declarations
>

## Interfaces
### 1,Optional Prperties
>interface squareConfig{
> color?: string;
> width?: number
>}
### 2,Readonly properties
>interface squareConfig{
>readonly x:number;
>readonly y :number}
>let ro:ReadonlyArray<T> =a;
### 3,Excess Property Checks
>·``as``字符可以去除一些不必要的警告。
>let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
>更好的体验是把接口声明为
>``interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}``
### 4,Function Types
>
>```
>interface SearchFunc{
>   (source:string,subString:string): boolean
>}
>1,let mySearch: SearchFunc;
>mySearch = function(source:string,subString:string){
>let result = source.search(subString);
>return result > -1;}
>2.let mySearch:SearchFunc;
>mySearch = function(src,sub){
>let result = src.search(subString);
>return result >-1}
>```
### 5,Indexable Types:index签名只能是number,string
>
```
>interface StringArray{
>   [index:number]: string}
> let myArray:StringArray;
> myArray = ['dd','dd']
> let myStr:string = myArray[0];
>2,
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}
// Error: indexing with a 'string' will sometimes get you a Dog!
interface NotOkay {
    [x: number]: Animal;//父必须是string类型
    [x: string]: Dog;//子可以是number类型，但是定义的两个index类型不能相同
}
> 3,interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;   //设置类型必须是index类型的返回值类型   // error, the type of 'name' is not a subtype of the indexer
}
```

### 5,Class Types

```
>interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}
class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

### 6，Extending Interfaces
>
>```
> interface Shape{
>   color:string;
> }
> interface Square extends Shape{
>   sideLength: number;
> }
> let square = <Square>{};
> square.color ='blue';
> 
> //可以同时继承多个接口；
> interface Shape{
> color: string;
> }
> interface PenStroke{
> penWidth: number
> 
>}
>interface Square extends Shape,PenStroke{
>slideLength:number}
>let square = <Square>{};
>```
>
### 7,Hybrid Types

>```
>interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
>```

### 8,Interfaces Extending Classes
## Classes
### Inheritance
>
>```
>class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");//tom定义成Animal但还是调用Horse的方法
sam.move();
tom.move(34);
>```

### Public Private and Protected modifiers

>private和protected的区别是：protected声明的属性可以在子类中用this引用到。
```
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}
// Employee can extend Person
class Employee extends Person {
    private department: string;
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
let howard = new Employee("Howard", "Sales");
howard.name //error
howard.department //error
let john = new Person("John"); // Error: The 'Person' constructor is protected
```
>
### Readonly modifier

```
class Octopus{
     readonly numberOfLegs:number = 8;
     constructor(readonly name: string){
     }
}
```
### Accessors

```
let passcode = "secret passcode";
class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```
### Static Properties
>类属性和类方法，static 声明。
### Abstract Classes
>声明抽象方法时，不实现。
>继承抽象类时，要实现抽象类里面的抽象方法，抽象类里的非抽象方法，可以不实现。
>
>```
> abstarct class Animal{
>   abstact makeSound():void;
>   move():void{
>   console.log('ddd')
> }
> }
>```
### Advanced Techniques
>1,constructor function
> let greetMaker:typeof Greeter = Greeter;
> 使用typeof 关键字，可以获取类本身，而不仅仅是类的类型，从而可以修改类的静态属性；

### Using a class as an interface
## Functions
### Function Types
>// myAdd has the full function type
>let myAdd = function(x: number, y: number): number { return  x + y; };
>// The parameters 'x' and 'y' have the type number
>let myAdd: (baseValue:number, increment:number) ``参数``=> number``返回值`` =
>    function(x, y) { return x + y; };
>

### Optional and Default Paramerters
>用？参数可以选择是否输入
>function buildName(firstName:string,lastName?:string){}
>
>默认值:
>function buildName(firstName:string,lastName='smith'){}

### Rest Parameters
>function buildName(firstName:string,...restOfName:string[]){}
>let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

### this
>this and arrow function;
>箭头函数保存自己的this值；
>在typescript中可以设置this 的参数,将this设为void，在上下文内this,就不可用了.
>function f(this: void) {
    // make sure `this` is unusable in this standalone function
>}
>也可以显示指定this的指向
>interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
但是这么写也只是明确this现在的指向，不会绑定this;

### overloads(重载)
>let suits = ["hearts", "spades", "clubs", "diamonds"];
>function pickCard(x: {suit: string; card: number; }[]): number;
>function pickCard(x: number): {suit: string; card: number; };
>function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
>let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
>let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

## Generics(泛型)
>组件可以使用不同的类型，重复利用；
>
>```
>   function identity<T>(arg:T):T{
>       return arg; 
>   }
> //调用;string是返回值类型；
>   let output = identity<string>('myString');
> //or
>   let output = identity('myString');
>```

### Working with Generic Type Variables
>
>```
>   function loggingIdentity<T>(arg:T[]):T[]{
>       console.log(arg.length)
>       return arg;}
>
>```
### Generics Types

>赋值：
>
>```
>   function identity<T>(arg:T):T{
>       return arg
> }
> let myIdentity:<T>(arg:T) =>T = identity;
> //等同于
> let myIdentity:{<T>(arg:T):T} = identity;
> //泛型接口
> interface GenericIdentityFn{
>   <T>(arg:T):T
> }
> let myIdentity:GenericIdentityFn = identity;
> 
> //也可以定义接口的 参数
> interface GenericIdentityFn<T>{
>   (arg:T):T;
> }
> //调用
> let myIdentity:GenericIdentityFn<number> = identity;
>```

### Generic Classes
>
>```
>   class GenericNumber<T>{
>       zeroValue: T;
>       add:(x:T,y:T)=>T; 
>   }
> 
> let myGenericNumber = new GenericNumber<number>();
> myGenericNumber.zero = 0;
> myGenericNumber.add = function(x,y){return x+y;}
>```

### Generic Constraints
>
>```
>   interface Lengthwise{
>       length:number;
> }
> function loggingIdentity<T extends Lengthwise >(arg:T):T{
>   console.log(arg.length);
>   return arg;
> }
> //加入的参数，需要具有length属性。
> loggingIdentity({ length: 10, value: 3 });
loggingIdentity([3]);
>```

### Using Type Parameters in Generic Constraints
>
>```
>   function getProperty<T,K extends keyof T>(obj:T,key:K){
>       return obj[key];
> }
> let x = {a:1,b:2,c:3,d:4};
> get Property(x:'a');
>```

### Using Class Types in Generics
>
>```
>   function create<T>(c:{new():T}):T{
>       return new c();
> }
> //其他形式
> function createInstance<A extends Animal>(c:new () =>A):A{
> return new c();}
>```

## Enums
>enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
>}

## Type Inference
## Type Compatibility

## Advances Types
## Symbols (原始类型)
>
>```
>//1,使用Symbol构造器
>let sym= Symbol()
>//2:symbol变量都是唯一的
>Symbol('key')!= Symbol('key')
>//symbols 可以用来做对象属性的key;
>let getClassName=Symbol();
> let obj ={
> [sym]:'value',
> 
> }
> class C {
> [getClassName](){
>   return 'C';
>   }
> }
>  console.log(obj[sym])
> let c = new C();
> let className = c[getClassName]();
>```

## Iterators ang Generators
>for ... of vs. for ... in
>for ..of 返回可枚举的属性值，for..in 返回key值；
>
>```
>let pets = new Set(["Cat","Dog"]);
>pets["species"] = "mammals";
>
>for(let pet in pets){
>console.log(pet)//'species'
>}
>
>for(let pet of pets){
>console.log(pet)//'Cat''Dog'
>}
>```

## Modules
## Namespaces





