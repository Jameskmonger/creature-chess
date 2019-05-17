import { Observable } from "./observable";

type Reducer<T, A> = (prevState: T, action: A) => T;

export class ObservableWithReducer<T, A> extends Observable<T> {
    private reducer: Reducer<T, A>;

    constructor(initialValue: T, reducer: Reducer<T, A>) {
        super(initialValue);

        this.reducer = reducer;
    }

    public dispatch(action: A) {
        const value = this.getValue();
        const newValue = this.reducer(value, action);

        this.setValue(newValue);
    }
}
