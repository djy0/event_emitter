const Emitter = function () {
    this.events = {};
};

const Subscription = function (event, callback, event_listeners, key) {
    this.event = event;
    this.callback = callback;
    this.event_listeners = event_listeners;
    this.key = key;
};

Emitter.prototype.subscribe = function (event_name, callback) {
    if (!this.events.hasOwnProperty(event_name)) {
        this.events[event_name] = [];
    }
    const subscription = new Subscription(event_name, callback, this.events[event_name], this.events[event_name].length);
    this.events[event_name].push(subscription);
    return subscription;
};

Subscription.prototype.release = function () {
    let ret = false;
    if (this.event_listeners[this.key]) {
        delete this.event_listeners[this.key];
        ret = true;
    }
    return ret;
};

Emitter.prototype.emit = function (event_name, ...params) {
    const subs = this.events[event_name];
    return subs.forEach(function (sub) {
        return sub.callback.call(sub, params);
    });
}

