export class EventBus {
  listeners: Record<string, Function[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function) {
    const listener = this.listeners[event];
    if (!Array.isArray(listener)) {
      this.listeners[event] = [callback];
      return;
    }
    listener.push(callback);
  }

  off(event: string, callback: Function) {
    let listener = this.listeners[event];
    if (!Array.isArray(listener)) {
      return;
    }
    listener = listener.filter(l => l !== callback);
    if (listener.length === 0) {
      delete this.listeners[event];
    }
  }

  emit(event: string, ...args: any[]) {
    const listener = this.listeners[event];
    if (!Array.isArray(listener)) {
      throw new Error(`No event: ${event}`);
    }
    listener.forEach(callback => callback(...args));
  }
}
