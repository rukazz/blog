// 实现一个继承
// 1. 类式继承
// 缺点：
// 1. 父对象的引用类型被某一实例修改后会影响到别的实例
// 2. 无法为不同的实例初始化继承来的属性
function Animal() {
  this.name = "Animal";
  this.type = ["dog", "pig", "cat"];
}

Animal.prototype.hi = function (sound) {
  console.log(sound);
};

function Dog() {
  this.name = "dog";
}

Dog.prototype = new Animal();

let dog = new Dog();

dog.hi("wang");

// console.log(dog.name);

// 2. 构造函数继承
// 缺点： 不能使用父类的共有方法
function Animal2(color) {
  this.name = "animal";
  this.type = ["pig", "cat"];
  this.color = color;
}

Animal2.prototype.greet = function (sound) {
  console.log(sound);
};

function Dog2(color) {
  // 构造函数继承
  Animal2.apply(this, arguments);
}

let dog2 = new Dog2("white");
let dog3 = new Dog2("black");

// console.log(dog2.color)

// 3.组合继承
// 缺点是实例化父类函数两次
function Animal3(color) {
  this.name = "animal";
  this.type = ["pig", "cat"];
  this.color = color;
}

Animal3.prototype.greet = function (sound) {
  console.log(sound);
};

function Dog3(color) {
  // 构造函数继承
  Animal3.apply(this, arguments);
}
// 类式继承
Dog3.prototype = new Animal3();

// let dog4 = new Dog3("white");
// let dog5 = new Dog3("black");

// console.log(dog2.color)

// 4.寄生组合式继承
function Animal4(color) {
  this.name = "animal";
  this.type = ["pig", "cat"];
  console.log("here???");
  this.color = color;
}

Animal4.prototype.greet = function (sound) {
  console.log(sound);
};

function Dog4(color) {
  // 构造函数继承
  Animal4.apply(this, arguments);
}
// important
Dog3.prototype = Object.create(Animal4.prototype);

Dog3.prototype.constructor = Dog3;

let dog6 = new Dog4("white");

// 5.extends
class Animal5 {
  // 构造函数
  constructor(color) {
    this.color = color
  }
  greet(sound) {
    console.log(sound)
  }
}

class Dog5 extends Animal5 {
  // 构造函数
  constructor(color) {
    // super表示父类的构造函数，继承父类的this对象
    super(color)
    this.color = color
  }
}

let dog7 =  new Dog5('white or black')
dog7.greet('wangwang ~~~')
console.log(dog7.color)