class Emitter {
    private readonly events: {};

    constructor() {
        this.events = {};
    }

    subscribe(event_name: string, callback: (params) => any) {
        if (!this.events.hasOwnProperty(event_name)) {
            this.events[event_name] = [];
        }
        const subscription = new Subscription(event_name, callback, this.events[event_name], this.events[event_name].length);
        this.events[event_name].push(subscription);
        return subscription;
    }

    emit(event_name: string, ...params: Array<any>) {
        const subs = this.events[event_name];
        return subs.forEach(function (sub) {
            return sub.callback.call(sub, params);
        });
    }
}

class Subscription {
    private event: Function;
    private callback: Function;
    private readonly event_listeners: object;
    private readonly key: string;

    constructor(event, callback, event_listeners, key) {
        this.event = event;
        this.callback = callback;
        this.event_listeners = event_listeners;
        this.key = key;
    }

    release() {
        let ret = false;
        if (this.event_listeners[this.key]) {
            delete this.event_listeners[this.key];
            ret = true;
        }
        return ret;
    }
}
