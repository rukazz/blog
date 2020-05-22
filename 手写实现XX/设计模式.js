// 抽象工厂
class User {
  constructor(name = "", viewPage = []) {
    if (new.target === "User") {
      throw new Error("不能实例化抽象类");
    }
    this.name = name;
    this.viewPage = viewPage;
  }
}

class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage);
  }
  create(role) {
    switch (role) {
      case "superAdmin":
        return new UserFactory("superAdmin");
        break;
      default:
        break;
    }
  }
}

let user = new UserFactory();
let superAdmin = user.create("superAdmin");

console.log(superAdmin);

// 单例模式
class Singleton {
  login() {}

  static getInstance = (function () {
    let instance = null;
    return function (name) {
      if (instance) {
        instance = new Singleton();
      }
      return instance;
    };
  })();
}

// Singleton.getInstance = (function(){
//   let instance = null;
//   return function(name) {
//     if (instance) {
//       instance = new Singleton()
//     }
//     return instance
//   }
// })()

const a = Singleton.getInstance("a");
const b = Singleton.getInstance("b");

console.log(a === b);
