// 业务场景
// 我们需要一个健全的架构捕获所有同步、异步的异常。业务方不处理异常时，中断函数执行并启用默认处理，业务方也可以随时捕获异常自己处理。

// 优雅的异常处理方式就像冒泡事件，任何元素可以自由拦截，也可以放任不管交给顶层处理。

// Decorator
// 类装饰器，方法装饰器，属性装饰器

// 在浏览器端，记得监听 window 全局错误，兜住漏网之鱼：

// window.addEventListener('unhandledrejection', (event: any) => {
//     logger.error('unhandledrejection', event)
// })
// window.addEventListener('onrejectionhandled', (event: any) => {
//     logger.error('onrejectionhandled', event)
// })

const asyncClass = errorHandler => target => {
  Object.getOwnPropertyNames(target.prototype).forEach(key => {
    const func = target.prototype[key];
    target.prototype[key] = async (...args) => {
      try {
        await func.apply(this, args);
      } catch (error) {
        errorHandler && errorHandler(error);
      }
    };
  });
};

const successRequest = () => Promise.resolve("a");
const failRequest = () => Promise.reject("b");

const iAsyncClass = asyncClass(error => {
  console.log("统一异常处理", error); // 统一异常处理 b
});
class Action {
  async successRequest() {
    const result = await successRequest();
    console.log("successRequest", "处理返回值", result);
  }
  async failRequest() {
    const result = await failRequest();
    console.log("never run");
  }

  async allRequest() {
    const result1 = await successRequest();
    console.log("run");
    const result2 = await failRequest();
    console.log("never run");
  }
}
const action = new Action();
console.log(
  22,
  Action,
  Action.prototype,
  Object.getOwnPropertyNames(Action),
  Action.prototype["failRequest"]
);
action.successRequest();
action.failRequest();
action.allRequest();
