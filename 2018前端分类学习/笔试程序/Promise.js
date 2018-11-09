function Promise(fn) {
  var state = "pending",
    value = null,
    callbacks = [];
  this.then = function(onFulfilled, onRejected) {
    console.log(55);

    return new Promise(function(resolve, reject) {
      handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject
      });
    });
  };
  function handle(callback) {
    if (state === "pending") {
      callbacks.push(callback);
      return;
    }
    var cb = state === "fulfilled" ? callback.onFulfilled : callback.onRejected,
      ret;
    if (cb === null) {
      cb = state === "fulfilled" ? callback.resolve : callback.reject;
      cb(value);
      return;
    }
    try {
      ret = cb(value);
      callback.resolve(ret);
    } catch (e) {
      callback.reject(e);
    }
  }
  function resolve(newValue) {
    console.log(44);

    if (
      newValue &&
      (typeof newValue === "object" || typeof newValue === "function")
    ) {
      var then = newValue.then;
      if (typeof then === "function") {
        then.call(newValue, resolve, reject);
        return;
      }
    }
    state = "fulfilled";
    value = newValue;
    execute();
  }
  function reject(reason) {
    state = "rejected";
    value = reason;
    execute();
  }
  function execute() {
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        handle(callback);
      });
    }, 0);
  }
  fn(resolve, reject);
}
new Promise(resolve => {
  console.log(11);

  setTimeout(() => {
    resolve(1);
  }, 0);
})
  .then(function(val) {
    console.log(22);

    new Promise(resolve => {
      console.log(val);
      setTimeout(() => {
        resolve(2);
      }, 0);
    });
  })
  .then(resul => {
    console.log(33);

    console.log(333, resul);
  });

// then :是为了注册后续需要执行的代码，真正执行是在 resolve,
// 现在回顾下Promise的实现过程，其主要使用了设计模式中的观察者模式：

// 通过Promise.prototype.then和Promise.prototype.catch方法将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以链式调用。
// 被观察者管理内部pending、fulfilled和rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。
