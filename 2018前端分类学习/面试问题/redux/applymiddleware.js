function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    let store = createStore(...args);
    let dispatch = () => {
      throw new Error("dddd");
    };
    const middlewareApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };
    const chain = middlewares.map(middleware => middleware(middlewareApi));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}
function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
