## 作用域

一般考察let和const区别
关键词： 变量提升；函数作用域；快作用域；闭包

## 引用传递

值传递还是引用传递。基本类型按值传递，对象按引用传递。
关键词： 深浅拷贝

## 内存释放

引用类型是在没有引用后，通过v8的GC自动回收。如果基本类型是闭包的话，闭包没有引用才会被回收。非闭包的情况下等待V8的新生代（new space）切换的时候回收。
V8，内存快找，V8不同类型的数据存储在不同的位置，在内存释放的时候不同区域的策略不同。

## weakset和set的区别

weakSet的成员只能是对象。而且WeakSet里的对象都是弱引用，不计入垃圾回收装置。当其他对象不引用，自动回收。

## Symbol

1. 不能new
2. 可以用字符串
3. 对象表示也会用toString()转为字符串。
4. 作为属性名独一无二，但是是公开变量不是私有变量，但是使用for 。。in什么遍历不出来
5. 写单例模式

```
// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
```

## JS私有变量

<https://juejin.im/post/5c25faf3f265da61380f4b17>

## 1.函数

### 1.1 函数的3种定义方法**

---

#### 1.1.1 函数声明

   ```javascript
    function getSum() {}
    function () {} //匿名函数

    () => {}
   ```

#### 1.1.2 函数表达式 (函数字面量)

   ```javascript
    var sum = function() {}

    let sum = () => {}
   ```

#### 1.1.3 构造函数

   ```javascript
   const sum = new Function('a', 'b', 'return a + b')
   ```

#### 1.1.4 三种方式对比

> 1.函数声明有预解析,而且函数声明的优先级高于变量;
> 2.使用Function构造函数定义函数的方式是一个函数表达式,这种方式会导致解析两次代码，影响性能。第一次解析常规的JavaScript代码，第二次解析传入构造函数的字符串

### 1.2 ES5中函数的四种调用

---
在es5中函数内容的this指向和调用方法有关

#### **1.2.1 函数调用模式**

包括函数名和匿名函数调用，this都指向window

```javascript
 function getSum() {
    console.log(this) //这个属于函数名调用，this指向window
 }
 getSum()

 (function() {
    console.log(this) //匿名函数调用，this指向window
 })()

 var getSum=function() {
    console.log(this) //实际上也是函数名调用，window
 }
 getSum()

```

#### **1.2.2 方法调用**

对象，方法名（），this指向对象

```javascript
var objList = {
   name: 'methods',
   getSum: function() {
     console.log(this) //objList对象
   }
}
objList.getSum()
```

#### **1.2.3 构造器调用**

new构造函数名（），this指向实例化的对象

```javascript
function Person() {
  console.log(this); //是构造函数调用，指向实例化的对象personOne
}
var personOne = new Person();

```

#### **1.2.4 间接调用**

利用call和apply来实现，this就是call/apply对应的第一个参数，如果不传值或第一个值为null/undefined的this指向window

```javascript
function foo() {
   console.log(this);
}
foo.apply('我是apply改变的this值');//我是apply改变的this值
foo.call('我是call改变的this值');//我是call改变的this值

```

### 1.3 ES6中函数的调用

---
箭头函数不可以当作构造函数使用，也就是不能用new命令实例化一个对象，否则会跑出一个错误箭头函数的this是和定义时有关和调用无关，调用就是函数调用模式。箭头函数没有自己的arguments，this, super等

```javascript
(() => {
   console.log(this)//window
})()

let arrowFun = () => {
  console.log(this)//window
}
arrowFun()

let arrowObj = {
  arrFun: function() {
   (() => {
     console.log(this)//this指向的是arrowObj对象
   })()
   }
 }
 arrowObj.arrFun();
```

#### 1.4 call,apply和bind

 ---
 1.IE5之前不支持call和apply,bind是ES5出来的; 2.call和apply可以调用函数,改变this,实现继承和借用别的对象的方法;

##### 1.4.1 call和apply的定义

调用方法,用一个对象替换掉另一个对象(this) 对象.call(新this对象,实参1,实参2,实参3.....) 对象.apply(新this对象,[实参1,实参2,实参3.....])

#### 1.4.2 call和apply的用法

1.间接调用函数,改变作用域的this值 2.劫持其他对象的方法

```javascript
var foo = {
  name:"张三",
  logName:function(){
    console.log(this.name);
  }
}
var bar={
  name:"李四"
};
foo.logName.call(bar);//李四
实质是call改变了foo的this指向为bar,并调用该函数

```

3.两个函数实现继承

```javascript
function Animal(name){
  this.name = name;
  this.showName = function(){
    console.log(this.name);
  }
}
function Cat(name){  
  Animal.call(this, name);  
}
var cat = new Cat("Black Cat");
cat.showName(); //Black Cat

```

4.为类数组(arguments和nodeList)添加数组方法push,pop

```javascript
(function(){
  Array.prototype.push.call(arguments,'王五');
  console.log(arguments);//['张三','李四','王五']
})('张三','李四')
```

5.合并数组

```javascript
let arr1=[1,2,3];
let arr2=[4,5,6];
Array.prototype.push.apply(arr1,arr2); //将arr2合并到了arr1中
```

6.求数组最大值

```javascript
Math.max.apply(null, arr)
```

7.判断字符类型

```javascript
Object.prototype.toString.call([])
```

#### 1.4.3 bind

bind是function的一个函数扩展方法，
bind以后代码重新绑定了func内部的this指向,返回一个函数,不会调用方法,不兼容IE8

```javascript
var name = '李四'
 var foo = {
   name: "张三",
   logName: function(age) {
   console.log(this.name, age);
   }
 }
 var fooNew = foo.logName;
 var fooNewBind = foo.logName.bind(foo);
 fooNew(10)//李四,10
 fooNewBind(11)//张三,11  因为bind改变了fooNewBind里面的this指向

```

#### 1.4.4 call, apply和bind的原生实现

[手写实现](./手写实现XX/bind.js)

#### 1.4.5 三者异同

同:都是改变this指向,都可接收参数 异:bind和call是接收单个参数,apply是接收数组

### 1.5 函数的节流和防抖

---
 类型 | 概念 | 应用
---- | ---- | -----
防抖|在事件被触发n秒后执行回调，如果在n秒内又触发，则重新计时 |scroll，resize事件触发完之后触发回调函数
节流|每隔一段时间，只执行一次函数|scroll,resize事件一段时间触发多次

#### 1.5.1 防抖

[防抖](./手写实现XX/debounce.html)

#### 1.5.2 节流

[节流](./手写实现XX/throttle.html)

## 1.6 原型链

---
对象继承属性的一个链条

### 1.6.2构造函数,实例与原型对象的关系

![构造函数,实例与原型对象的关系](../blog/asserts/16df35ccb827f1e8)

```javascript
var Person = function (name) { this.name = name; }//person是构造函数
var o3personTwo = new Person('personTwo')//personTwo是实例

```

![构造函数,实例与原型对象的关系](../blog/asserts/16df35d0ab151801)
原型对象都有一个默认的constructor属性指向构造函数

### 1.6.3 创建实例的方法

1.字面量

```javascript
let obj={'name':'张三'}
```

2.Object构造函数创建

```javascript
let obj = new Object()
obj.name = 'Tom';
```

3.使用工厂模式创建对象

```javascript
function Person(name){
  this.name = name
}
let person1 = new Person('Tom')
```

### 1.6.4 new运算符

1. 创建了一个新对象
2. this指向构造函数
3. 构造函数有返回会替换new出来的对象，如果没有就是new出来的对象
4. 手动封装一个new运算符

[手写new](./手写实现XX/new.js)

### 1.6.5 对象的原型链

![对象的原型链](../blog/asserts/16df35e34dc568b9)

## 1.7 继承的方式

---
JS是一门弱类型动态语言,封装和继承是他的两大特性

### 1.7.1 原型链继承

将父类的实例作为子类的原型 1.代码实现 定义父类:

```javascript
// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};

```

子类

```javascript
function Cat(){
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

//&emsp;Test Code
var cat = new Cat();
console.log(cat.name);//cat
console.log(cat.eat('fish'));//cat正在吃：fish  undefined
console.log(cat.sleep());//cat正在睡觉！ undefined
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat); //true

```

2.优缺点 简单易于实现,但是要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行,无法实现多继承

### 1.7.2 构造继承

实质是利用call来改变Cat中的this指向 1.代码实现 子类:

```javascript
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
```

2.优缺点 可以实现多继承,不能继承原型属性/方法

### 1.7.3 实例继承

为父类实例添加新特性，作为子类实例返回 1.代码实现 子类

```javascript
function Cat(name){
  var instance = new Animal();
  instance.name = name || 'Tom';
  return instance;
}
```

2.优缺点 不限制调用方式,但不能实现多继承

### 1.7.4 拷贝继承

将父类的属性和方法拷贝一份到子类中 1.子类:

```javascript
function Cat(name){
  var animal = new Animal();
  for(var p in animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || 'Tom';
}

```

2.优缺点 支持多继承,但是效率低占用内存

### 1.7.5 组合继承

通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用 1.子类

```javascript
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

```

### 1.7.6 寄生组合继承

```javascript
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
})();

```

### 1.7.7 ES6的extends继承

ES6 的继承机制是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this

```javascript
//父类
class Person {
    //constructor是构造方法
    constructor(skin, language) {
        this.skin = skin;
        this.language = language;
    }
    say() {
        console.log('我是父类')
    }
}

//子类
class Chinese extends Person {
    constructor(skin, language, position) {
        //console.log(this);//报错
        super(skin, language);
        //super();相当于父类的构造函数
        //console.log(this);调用super后得到了this，不报错，this指向子类，相当于调用了父类.prototype.constructor.call(this)
        this.position = position;
    }
    aboutMe() {
        console.log(`${this.skin} ${this.language}  ${this.position}`);
    }
}


//调用只能通过new的方法得到实例,再调用里面的方法
let obj = new Chinese('红色', '中文', '香港');
obj.aboutMe();
obj.say();

```

## 1.8.高阶函数

---

### 1.8.1定义

函数的参数是函数或返回函数

### 1.8.2 常见的高阶函数

map, reduce, filter, sort

### 1.8.3 柯里化

1.定义:只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

```javascript
fn(a,b,c,d)=>fn(a)(b)(c)(d)
```

2.代码实现:

```javascript
const currying = fn => {
const len = fn.length
return function test (...args1) {
    if (args1.length >= len) {
         return fn(...args1)
    }
    return (...args2) => test(...args1, ...args2)
    }
}

```

### 1.8.4 反柯里化

1.定义:

```javascript
obj.func(arg1, arg2)=>func(obj, arg1, arg2)

```

2.代码实现:

```javascript
Function.prototype.unCurrying = function() {
  var that = this;
  return function() {
    return Function.prototype.call.apply(that, arguments);
  }
};

function sayHi () {
  return "Hello " + this.value +" "+[].slice.call(arguments);
}
let sayHiUnCurrying=sayHi.unCurrying();
console.log(sayHiUnCurrying({value:'world'},"hahaha"));

```

### 1.8.5偏函数

1.定义:指定部分参数来返回一个新的定制函数的形式 2.例子:

```javascript
function foo(a, b, c) {
  return a + b + c;
}
function func(a, b) {
  return foo(a,b,8);
}

```

2.偏函数的应用

例如bind函数可以让我们传入一个或多个想要预设的参数，之后返回一个新函数，并拥有指定的this值和预设参数。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

```javascript
function addition(x, y) {
   return x + y;
}
const plus5 = addition.bind(null, 5)
plus5(10) // output -> 15
plus5(20) // output -> 25

```

我们预先传入了参数5，并返回了一个新函数赋值给plus5，此函数可以接受剩余的参数。调用plus5传入剩余参数10得出最终结果15，如传入20得出25。偏函数通过设定预设值，帮我们实现代码上的复用。

# 2.对象
## 2.1.对象的声明方法
---
### 2.1.1 字面量
```javascript
var test2 = {x:123,y:345};
console.log(test2);//{x:123,y:345};
console.log(test2.x);//123
console.log(test2.__proto__.x);//undefined
console.log(test2.__proto__.x === test2.x);//false

```
### 2.1.2 构造函数
```javascript
var test1 = new Object({x:123,y:345});
console.log(test1);//{x:123,y:345}
console.log(test1.x);//123
console.log(test1.__proto__.x);//undefined
console.log(test1.__proto__.x === test1.x);//false
```
new的作用: 1.创了一个新对象; 2.this指向构造函数; 3.构造函数有返回,会替换new出来的对象,如果没有就是new出来的对象

### 2.1.3 内置方法
Obejct.create(obj,descriptor),obj是对象,describe描述符属性(可选)
```javascript
let test = Object.create({x:123,y:345});
console.log(test);//{}
console.log(test.x);//123
console.log(test.__proto__.x);//3
console.log(test.__proto__.x === test.x);//true

```

### 2.1.4 三种方法的优缺点

1. 功能:都能实现对象的声明,并能够赋值和取值
2. 继承性:内置方法创建的对象继承到__proto__属性上
3. 隐藏属性:三种声明方法会默认为内部的每个成员（属性或方法）生成一些隐藏属性，这些隐藏属性是可以读取和可配置的,属性分类见下面
4. 属性读取:Object.getOwnPropertyDescriptor()或getOwnPropertyDescriptor()
5. 属性设置:Object.definePropertype或Object.defineProperties


## 2.2.对象的属性
---
2.2.1 属性分类
1. 数据属性4个特性:
configurable(可配置),enumerable(可枚举),writable(可修改),value(属性值)
2. 访问器属性2个特性:
get(获取),set(设置)
3. 内部属性
由JavaScript引擎内部使用的属性;
不能直接访问,但是可以通过对象内置方法间接访问,如:[[Prototype]]可以通过Object.getPrototypeOf()访问;
内部属性用[[]]包围表示,是一个抽象操作,没有对应字符串类型的属性名,如[[Prototype]].

### 2.2.2 属性描述符
1.定义:将一个属性的所有特性编码成一个对象返回
2.描述符的属性有:数据属性和访问器属性
3.使用范围:
作为方法Object.defineProperty, Object.getOwnPropertyDescriptor, Object.create的第二个参数,

### 2.2.3 属性描述符的默认值
1.访问对象存在的属性
特性名|默认值|
--|--
value|对应属性值
get|对应属性值
set|undefined
writable|true
enumerable|true
configurable|true
所以通过上面三种声明方法已存在的属性都是有这些默认描述符 

2.访问对象不存在的属性
特性名|默认值|
--|--
value|undefined
get|undefined
set|undefined
writable|false
enumerable|false
configurable|false

### 2.2.3 描述符属性的使用规则
get,set与writable,value是互斥的,如果有交集设置会报错

### 2.2.4 属性定义

1.定义属性的函数有两个:Object.defineProperty和Object.defineProperties.例如: Object.defineProperty(obj, propName, desc)

2.在引擎内部,会转换成这样的方法调用: obj.[[DefineOwnProperty]](propName, desc, true)

### 2.2.5 属性赋值
1.赋值运算符(=)就是在调用[[Put]].比如: obj.prop = v;

2.在引擎内部,会转换成这样的方法调用: obj.[[Put]]("prop", v, isStrictModeOn)

### 2.2.6 判断对象的属性
名称|含义|用法
--|--|--
in|如果指定的属性在指定对象或其原型链中，则in运算符返回true|’name‘ in test //true
hasOwnProperty()|只判断自身属性｜test.hasOwnProperty('name') //true
.或[]|对象或原型链上不存在该属性，则会返回undefined|test.name // 'lei' test['name'] //lei

## 2.3.Symbol
---
### 2.3.1概念
是一种数据类型; 不能new,因为Symbol是一个原始类型的值，不是对象。

### 2.3.2 定义方法
Symbol(),可以传参 var s1 = Symbol(); var s2 = Symbol(); s1 === s2 // false

```javascript
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false

```
### 2.3.3 用法

1. 不能与其他类型的值进行运算; 
2. 作为属性名

```javascript
let mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

```

3.作为对象属性名时，不能用点运算符,可以用[]
```javascript
let a = {};
let name = Symbol();
a.name = 'lili';
a[name] = 'lucy';
console.log(a.name,a[name]); 

```

4.遍历不会被for...in、for...of和Object.keys()、Object.getOwnPropertyNames()取到该属性

### 2.3.4 Symbol.for

1.定义:在全局中搜索有没有以该参数作为名称的Symbol值，如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值 2.举例:
```javascript
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
s1 === s2 // true

```
### 2.3.5 Symbol.keyFor

1.定义:返回一个已登记的Symbol类型值的key 2.举例:

```javascript
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined 

```
## 2.4.遍历
---
### 2.4.1 一级对象遍历方法
方法|特性
--|--
for...in|遍历自身对象和继承的可枚举属性（不含Symbol属性）
Object.keys()|返回一个数组，包括对象自身（不含继承的）所有可枚举属性（不含Symbol属性）
Object.getOwnPropertyNames(obj)|返回一个数组，包括对象自身的所有可枚举和不可枚举属性（不含Symbol属性）
Object.getOwnPropertySymbols(obj)|返回一个数组,包含对象自身的所有Symbol属性
Reflect.ownKeys(obj)|返回一个数组,包含对象自身的所有(不枚举、可枚举和Symbol)属性
Reflect.enumerate(obj)|返回一个Iterator对象,遍历对象自身的和继承的所有可枚举属性(不含Symbol属性)


总结:1.只有Object.getOwnPropertySymbols(obj)和Reflect.ownKeys(obj)可以拿到Symbol属性 2.只有Reflect.ownKeys(obj)可以拿到不可枚举属性

### 2.4.2 多级对象遍历
数据模型:

```javascript
var treeNodes = [
    {
     id: 1,
     name: '1',
     children: [
       {
        id: 11,
        name: '11',
        children: [
         {
          id: 111,
          name: '111',
          children:[]
          },
          {
            id: 112,
            name: '112'
           }
          ]
         },
         {
          id: 12,
          name: '12',
          children: []
         }
         ],
         users: []
        },
      ];

```
递归:

```javascript
var parseTreeJson = function(treeNodes){
      if (!treeNodes || !treeNodes.length) return;

       for (var i = 0, len = treeNodes.length; i < len; i++) {

            var childs = treeNodes[i].children;

            console.log(treeNodes[i].id);

            if(childs && childs.length > 0){
                 parseTreeJson(childs);
            }
       }
    };

    console.log('------------- 递归实现 ------------------');
    parseTreeJson(treeNodes);

```

## 2.5.深度拷贝
---
### 2.5.1 Object.assign
1.定义:将源对象（source）的所有可枚举属性，复制到目标对象（target） 2.用法:
```javascript
合并多个对象
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);

```
3.注意: 这个是伪深度拷贝,只能拷贝第一层

### 2.5.2 JSON.stringify
1.原理:是将对象转化为字符串,而字符串是简单数据类型

### 2.5.3 递归拷贝
```javascript
function deepClone(source){
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for(let keys in source){ // 遍历目标
    if(source.hasOwnProperty(keys)){
      if(source[keys] && typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      }else{ // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}  

```

## 2.6 数据拦截
---
定义:利用对象内置方法,设置属性,进而改变对象的属性值

### 2.6.1 Object.defineProperty

1.ES5出来的方法; 2.三个参数:对象(必填),属性值(必填),描述符(可选); 3.defineProperty的描述符属性

```
数据属性:value,writable,configurable,enumerable
访问器属性:get,set
注:不能同时设置value和writable,这两对属性是互斥的

```
4.拦截对象的两种情况:

```javascript
let obj = {name:'',age:'',sex:''  },
    defaultName = ["这是姓名默认值1","这是年龄默认值1","这是性别默认值1"];
  Object.keys(obj).forEach(key => {
    Object.defineProperty(obj, key, {
      get() {
        return defaultName;
      },
      set(value) {
        defaultName = value;
      }
    });
  });

  console.log(obj.name);
  console.log(obj.age);
  console.log(obj.sex);
  obj.name = "这是改变值1";
  console.log(obj.name);
  console.log(obj.age);
  console.log(obj.sex);

  let objOne={},defaultNameOne="这是默认值2";
  Object.defineProperty(obj, 'name', {
      get() {
        return defaultNameOne;
      },
      set(value) {
        defaultNameOne = value;
      }
  });
  console.log(objOne.name);
  objOne.name = "这是改变值2";
  console.log(objOne.name);

```

5.拦截数组变化的情况
```javascript
let a={};
bValue=1;
Object.defineProperty(a,"b",{
    set:function(value){
        bValue=value;
        console.log("setted");
    },
    get:function(){
        return bValue;
    }
});
a.b;//1
a.b=[];//setted
a.b=[1,2,3];//setted
a.b[1]=10;//无输出
a.b.push(4);//无输出
a.b.length=5;//无输出
a.b;//[1,10,3,4,undefined];

```

结论:defineProperty无法检测数组索引赋值,改变数组长度的变化; 但是通过数组方法来操作可以检测到

多级嵌套对象监听
```javascript
    let info = {};
  function observe(obj) {
    if (!obj || typeof obj !== "object") {
      return;
    }
    for (var i in obj) {
      definePro(obj, i, obj[i]);
    }
  }

  function definePro(obj, key, value) {
    observe(value);
    Object.defineProperty(obj, key, {
      get: function() {
        return value;
      },
      set: function(newval) {
        console.log("检测变化", newval);
        value = newval;
      }
    });
  }
  definePro(info, "friends", { name: "张三" });
  info.friends.name = "李四";

```

6.存在的问题
> 不能监听数组索引赋值和改变长度的变化
> 必须深层遍历嵌套的对象,因为defineProperty只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择


