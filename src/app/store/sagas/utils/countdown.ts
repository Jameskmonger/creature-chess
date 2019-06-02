import { eventChannel, END } from "redux-saga";

// https://stackoverflow.com/a/49295122/1916362

export const countdown = (secs: number) => {
    return eventChannel(emitter => {
        const interval = setInterval(() => {
            secs -= 1;
            if (secs > 0) {
                emitter(secs);
            } else {
                // this causes the channel to close
                emitter(END);
            }
        }, 1000);

        // The subscriber must return an unsubscribe function
        return () => clearInterval(interval);
    }
    );
};
