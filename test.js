Promise.prototype.myThen = function (onResolve, onRejected) {
  let self = this;
  let newPromise;
  // 如果then的参数不是function，我们可以忽略
  onResolve = typeof onResolve === "function" ? onResolve : function (x) {};
  onRejected = typeof onRejected === "function" ? onRejected : function (y) {};
  if (self.status === "resolved") {
    return (newPromise = new Promise(function (resolve, reject) {}));
  }
  if (self.status === "rejected") {
    return (newPromise = new Promise(function (resolve, reject) {}));
  }
  if (self.status === "pending") {
    return (newPromise = new Promise(function (resolve, reject) {}));
  }
};

