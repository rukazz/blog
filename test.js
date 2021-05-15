// Promise.prototype.myThen = function (onResolve, onRejected) {
//   let self = this;
//   let newPromise;
//   // 如果then的参数不是function，我们可以忽略
//   onResolve = typeof onResolve === "function" ? onResolve : function (x) {};
//   onRejected = typeof onRejected === "function" ? onRejected : function (y) {};
//   if (self.status === "resolved") {
//     return (newPromise = new Promise(function (resolve, reject) {}));
//   }
//   if (self.status === "rejected") {
//     return (newPromise = new Promise(function (resolve, reject) {}));
//   }
//   if (self.status === "pending") {
//     return (newPromise = new Promise(function (resolve, reject) {}));
//   }
// };
function handleFetchQueue(urls, max, callback) {
  const urlCount = urls.length;
  const requestsQueue = [];
  const results = [];
  let i = 0;
  const handleRequest = (url) => {
    const req = fetch(url).then(res => {
      // console.log('当前并发： '+requestsQueue);
      const len = results.push(res);
      if (len < urlCount && i + 1 < urlCount) {
        requestsQueue.shift();
        handleRequest(urls[++i])
      } else if (len === urlCount) {
        'function' === typeof callback && callback(results)
      }
    }).catch(e => {
      results.push(e)
    });
    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i])
    }
  };
  handleRequest(urls[i])
}


const urls = Array.from({length: 10}, (v, k) => k);

const fetch1 = function (idx) {
  return new Promise(resolve => {
    console.log(`start request ${idx}`);
    const timeout = parseInt(Math.random() * 1e4);
    setTimeout(() => {
      console.log(`end request ${idx}`);
      resolve(idx)
    }, timeout)
  })
 };

const max = 4;

const callback = () => {
  console.log('run callback');
};

// handleFetchQueue(urls, max, callback);

// let str = '[abc[bcd[def]]]'

// let arr = str.match(/\w+/g)
// let result = {}
// let sum = arr.reduce((acc, cur, index, arr) => {
//   // acc.value = cur;
//   //  acc.children = {} 
//   //  return acc
//   // return acc + cur.length
//   arr.length > 1 ? (acc.children = sum(arr.slice(1))) : "";
//   acc.value = cur;
//   return acc;
// }, {})
// console.log("arr", sum, result)

const test  = (headSum, footerSum) => {
  let a = 0, b = 0;
  for (a; a < headSum;a++) {
    let j = headSum - a
    if (a*2 + j*4 < footerSum) {
      j++
    }
    if (a*2 + j*4 == footerSum) {
      return [a, j]
    } 
  }
  return { a, b }
}

console.log(test(30, 72))
let pm = new Promise(function(resolve,reject){
  // resolve("this is data");

});
console.log("go on");
pm.then(function(data){
  console.log("异步完成",data);
});

function deepClone(p, c) {

  for (let prop in p) {

      if (typeof p[prop] === 'object') {

          c[prop] = p[prop] instanceof Array ? [] : {}

          deepClone(p[prop], v[prop])

      } else {

          c[prop] = p[prop]

      }

  }

}

let testA = { "1": [1,2,3] }

// console.log(deepClone(testA))


var fetch = url => new Promise((resolve, reject) => {
    setTimeout(() => { 
        resolve(url);
    }, 2000);
})
var createFetchFactory = count => {
    let urls = [];
    let current = 0;
    const self = url => {
        return new Promise((resolve, reject) => {
            // console.log('outer current', current, url)
            if (current >= count) {
              // console.log('here current', current, url)
                urls.unshift({
                    url,
                    resolve,
                })
            } else {
                current++;
                console.log("current", current, urls)
                fetch(url).then(res => {
                    resolve(res);
                    current--;
                    const pop = urls.pop();
                    console.log("inner", current, urls, pop)
                    if (!pop) return;
                    self(pop.url).then(res => pop.resolve(res))
                })
            }
        })
    }
    
    return self;
}

const proxyFetch = createFetchFactory(2)

proxyFetch('/v1/test/name') 

proxyFetch('/v1/test/age') 

proxyFetch('/v1/test/sexy') 
proxyFetch('/v1/test/4') 

// var proxyFetch = createFetchFactory(2);

// proxyFetch('/v1/test/name').then(res => console.log('one: ', new Date()))
// proxyFetch('/v1/test/age').then(res => console.log('two: ', new Date()))
// proxyFetch('/v1/test/sexy').then(res => console.log('three: ', new Date()))
// proxyFetch('/v1/test/body').then(res => console.log('four: ', new Date()))
// proxyFetch('/v1/test/bra').then(res => console.log('five: ', new Date()))

// const multiFetch = maxCount => {
//   let urls = [], current = 0;
  
//   const self = new Promise((resolve, reject) => {
//     if (current >=count) {
//       urls.unshift({
//         url, 
//         resolve
//       })
//     } else {
//       current++;
//       testFetch(url).then(res => {
//         resolve(res)
//         current--
//         const top = urls.pop()
//         if (!top) return 
//         self(top.url).then(res => resolve(res))
//       })
//     }
//   })
//   return self
// }



let testFetch = url => new Promise((resolve, reject) => setTimeout(() => {resolve(url)}, 2000)) 

Promise.prototype.testAll = (arg) => {
  let current = 0;
  let length = arg.length
  let result = []
  return new Promise((resolve, reject) => {
   for (let i = 0 ; i< length; i++) {
     Promise.resolve(arg[i]).then((res) => {
       result[i] = res
       if (++current == length) {
         console.log('test')
         resolve(result)
       } 
     })
   }
  })
}

const tetFetch = maxCount => {
  let urls = []
  let current= 0
  const self = url => {
    return new Promise((resolve, reject) => {
      if (current >= maxCount) {
        urls.unshift({
          url, 
          resolve
        })
      } else {
        current++
        testFetch(url).then(res => {
          resolve(res);
          current--;
          const pop = urls.pop()
          if (!pop)return
          self(pop.url).then(res => pop.resolve(res))
        })
      }
    })
  }
  return self
}


const common = (str1, str2) => {
  if (!str1 && !str2) return null
  if (!str1 || !str2) return 0;
  let result = 0, ans = "", res= 0;
  let dp = Array.from({length: str1.length}, () => new Array(str2.length).fill(0))
  for (let i = 0; i< str1.length;i++) {
    for (let j = 0; j<str2.length; j++) {
      if(str1[i] === str2[j]) {
        dp[i][j] = i ==0 || j ==0 ? 1: dp[i-1][j-1] + 1;
        // console.log('111', str1[i], i, j)
        // if (str1.slice(i, j))
        result = Math.max(result, dp[i][j])
      } else {
        dp[i][j] = 0;
      }
    }
  }
  // let m= str1.length, n = str2.length;
  // for (let i = 1; i <= m; i++) {
  //   for (let j = i; j <= n; j++) {
  //       if (str1[i - 1] === str2[j - 1]) {
  //           dp[i][j] = dp[i - 1][j - 1] + 1;
  //           res = Math.max(res, dp[i][j])
  //       } else {
  //           dp[i][j] = 0;
  //       }
  //   }
  // }
  console.log('111', dp)
  return result
}

// console.log("here ",common("aabcde","abcdf"))

const sum = (a, b, c) => a+b+c



Function.prototype.myApply = function(context, ...args) {
  const self = context || window
  const result = self[fn] 
  delete self[fn]
  return result(...args)
}

Function.prototype.myBind = function(context) {
  const self = context || window

  return function(...args) {
    return fn.apply(context, args)
  }
}

function  curry(fn, ...args1) {
  if (args1.length >= fn.length) {
    return fn(...args1)
  }
  return function test(...args2) {
    return curry(fn, ...args1, ...args2)
  }
}

let a = curry(sum)

// console.log('a', a(1)(2))