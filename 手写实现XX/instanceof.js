function myInstance(a, b) {
  while (a) {
    console.log(a.__proto__, b.prototype);
    if (a.__proto__ === b.prototype) return true;
    a = a.__proto__;
  }
  return false;
}

let a = { name: "Tom" };

console.log(myInstance(a, Object));
