class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        const listener = this.listeners[event];
        if (!Array.isArray(listener)) {
            this.listeners[event] = [callback]
            return;
        }
        listener.push(callback);
    }

    off(event, callback) {
        let listener = this.listeners[event];
        if (!Array.isArray(listener)) {
            return;
        }
        listener = listener.filter(l => l !== callback);
        if (listener.length === 0) {
            delete this.listeners[event];
        }
        this.listeners[event] = listener;
    }

    emit(event, ...args) {
        const listener = this.listeners[event];
        if (!Array.isArray(listener)) {
            throw new Error(`Нет события: ${event}`);
        }

        listener.forEach(callback => callback(...args));
    }
}
