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
https://juejin.im/post/5c25faf3f265da61380f4b17

## 1.函数
### 1.1 函数的3种定义方法**
   1.1.1 函数声明
   ```javascript
    function getSum() {}
    function () {} //匿名函数

    () => {}
   ```
   1.1.2 函数表达式 (函数字面量)
   ```javascript
    var sum = function() {}

    let sum = () => {}
   ```
   1.1.3 构造函数
   ```javascript
   const sum = new Function('a', 'b', 'return a + b')
   ```
1.1.4 三种方式对比
