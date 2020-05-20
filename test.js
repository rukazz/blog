let a = Math.max.apply(this, [2, 6, 7, 10]);
let d = [2, 10, 45].reduce((prev, cur) => {
  return prev + cur;
});

function sum(arr) {
  if (arr.length == 0) {
    return 0;
  } else if (arr.length == 1) {
    return arr[0];
  } else {
    return arr[0] + sum(arr.slice(1));
  }
}
let arr = [1, 2, 3, 4];
console.log(arr.slice(0));
