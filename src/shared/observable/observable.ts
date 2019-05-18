import { EventEmitter } from "events";

enum ObservableEvents {
    CHANGE = "CHANGE"
}

export class Observable<T> {
    private value: T;
    private events = new EventEmitter();

    constructor(initialValue: T) {
        this.value = initialValue;
    }

    public onChange(callback: (newValue: T, oldValue: T) => void) {
        this.events.on(ObservableEvents.CHANGE, callback);

        callback(this.value, undefined);
    }

    public setValue(value: T) {
        const oldValue = this.value;

        if (value === oldValue) {
            return;
        }

        this.value = value;
        this.events.emit(ObservableEvents.CHANGE, value, oldValue);
    }

    public getValue() {
        return this.value;
    }

    public setMaxListeners(count: number) {
        this.events.setMaxListeners(count);
    }
}
