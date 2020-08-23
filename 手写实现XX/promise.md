```javascript
function ownPromise(executer) {
  this.state = "pending";
  this.value = undefined;
  this.reason = undefined;
  let resolve = (value) => {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
    }
  };
  let reject = (reason) => {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
    }
  };
  try {
    executer(resolve, reject);
  } catch (err) {
    reject(err);
  }
}f
```
# 实现then方法
Promise对象有一个then方法，用来注册在这个Promise状态确定后的回调。当Promise的状态发生了改变，不论是成功或是失败都会调用then方法.
then 方法使用方法如下：
```javascript
// then 方法传入两个方法作为参数，一个是fn1方法，一个是 fn2 方法
p1.then(function fn1(data){
    // fn1 方法的参数，用于获取promise对象的值
}, function fn2(err){
    // fn1 方法的参数，用于获取失败的原因
})
```
 - then方法可以在 p1 实例上调用。因此then 方法的实现是在Promise的 prototype上。
 - then方法会返回一个Promise，而且是返回一个新的Promise(详情)对象。
 - 可以多次调用then方法，也就是链式调用，并且每次会返回一个新Promise对象，Promise 状态是不确定的，可能是 fullfilled, 也可能是 resolve， 取决于那一次调用then时， fn1 的返回值。
  
所以，then方法的实现也很简单，根据Promise 状态来调用不同的回调函数即可.
![](../asserts/16e43ba967fbcce3)

