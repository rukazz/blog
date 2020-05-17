(function(){
    Array.prototype.push.call(arguments, '3')
    // console.log(arguments)
})('1', '2')
let arr1 = [1, 2]
let arr2 = [3, 4, 6,7]
Array.prototype.push.apply(arr1, arr2)


console.log(Object.prototype.toString.call([]))