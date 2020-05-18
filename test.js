let a = {},
  defaultName = "value 2";
Object.defineProperty(a, "name", {
  get() {
    return defaultName;
  },
  set(value) {
    defaultName = value;
  },
});

// console.log(a.name)

// a.name = 'test2'
// console.log(a.name)

let b = {},
  bValue = 1;
Object.defineProperty(b, "arr", {
  set: function (value) {
    bValue = value;
    console.log("setted", bValue);
  },
  get: function () {
    return bValue;
  },
});

console.log(b.arr)
b.arr = []
b.arr = [1,2,3]
b.arr[1] = 10
b.arr.push(90)
b.arr.length = 5
console.log(b.arr)