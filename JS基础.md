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