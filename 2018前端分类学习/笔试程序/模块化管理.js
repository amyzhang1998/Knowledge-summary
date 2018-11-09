class MyModule {
  constructor() {
    this._module = {};
  }
  define(name, deps, impl) {
    for (let i = 0; i < deps.length; i++) {
      deps[i] = this._module[deps[i]];
    }
    this._module[name] = impl.apply(impl, deps);
  }
  get(name) {
    return this._module[name];
  }
}

// define('name',['foo'],()=>{})
