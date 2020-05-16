// 手写bind，call，apply

let Person = {
  name: "Tome",
  say(arg1, arg2) {
    console.log("here", arg1, arg2);
    console.log(`我叫${this.name}+${arg1}+${arg2}`);
  },
};

let person1 = { name: "Jerry" };

// 手写apply
Function.prototype.myApply = function (context, args) {
  context = context || window;
  const key = Symbol();
  context[key] = this;
  console.log("this and context", this, context[key]);
  const result = context[key](...args);
  delete context[key];
  return result;
};

// 手写call
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

// 手写bind
Function.prototype.myBind = function (context) {
  context = context || window;
  return (...args) => {
    console.log(context, this, args);
    this.call(context, ...args);
  };
};

let bindResult = Person.say.myBind(person1);
