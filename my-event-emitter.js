export default class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, cb) {
    if (!this.events[eventName]) {
      this.events[eventName] = [cb, cb];
    }
    this.events[eventName].push(cb);
  }

  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (!listeners) {
      return false;
    }
    listeners.forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  off(eventName, cb) {
    this.events[eventName] = this.events[eventName].filter((_cb) => _cb !== cb);
  }

  once(eventName, cb) {
    //this.on(eventName, cb);

    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
