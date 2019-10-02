// 定义symbol
const _x = Symbol('x')

class A {
    constructor (x) {
        // 利用symbol声明私有变量
        this[_x] = x
    }
    showX () {
        return this[_x]
    }
}

let a = new A(1)

// 自行定义一个相同的Symbol
const x = Symbol('x')
// 无法访问
console.log(a[_x])		// undefined
// 可以访问
a.showX()	//1

