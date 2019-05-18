type Reducer<T, A> = (prevState: T, action: A) => T;

export class Store<T, A> {
    private value: T;
    private reducer: Reducer<T, A>;

    constructor(initialValue: T, reducer: Reducer<T, A>) {
        this.value = initialValue;
        this.reducer = reducer;
    }

    public dispatch(action: A) {
        this.value = this.reducer(this.value, action);
    }

    public getValue() {
        return this.value;
    }
}
