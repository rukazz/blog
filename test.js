function Parent(name) {
    this.name = name
}
 Parent.prototype.sayName = function () {
     console.log(this.name)
 }

 function Child(name, age) {
     Parent.call(this, name)
     this.age = age
 }
Child.prototype = Object.create(Parent.prototype)
let child = new Child('mike', 11)
child.sayName()