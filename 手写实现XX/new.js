let a = { name: "Tom" };
console.log(a.__proto__ === Object.prototype);
// 对象proto属性指向自己构造函数的prototype，obj.__proto__.__proto__的原型链由此产生
// 模拟new的 1.访问该对象的构造函数的属性 2.访问对象的prototype的属性

function myNew(fun, ...args) {
  if (typeof fun !== 'function') {
    return new Error('parameter must be function')
  }
  let obj = Object.create(fun.prototype)
  let result = fun.call(obj, ...args)
  if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
    return result
  }
  return obj
}

function Dog(color) {
  this.color = color
}

Dog.prototype.greet = function(sound) {
  console.log(sound)
}
let b = myNew(Dog, 'white');
b.greet('wangwnag wang')