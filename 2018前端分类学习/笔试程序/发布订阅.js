class EventEmitter {
  constructor() {
    this._events = this._events || new Map();
  }
  emit(type, ...args) {
    let handler = this._events.get(type);
    if (!handler) return;
    for (let i = 0; i < handler.length; i++) {
      handler[i].apply(this, args);
    }
  }
  add(type, func) {
    let handler = this._events.get(type);
    if (!handler) {
      this._events.set(type, [func]);
      return;
    }
    handler.push(func);
  }
  remove(type, func) {
    let handler = this._events.get(type);
    if (!handler) return;
    for (let i = handler.length; i > 0; i--) {
      if (handler[i] === func) {
        handler.splice(i - 1, 1);
      }
    }
  }
}
