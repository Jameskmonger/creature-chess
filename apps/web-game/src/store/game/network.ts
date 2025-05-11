import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NetworkState = {
	pingMs: number;
	lastPingTimestamp: number;
};

const initialState: NetworkState = {
	pingMs: 0,
	lastPingTimestamp: 0,
};

export const {
	reducer: networkReducer,
	actions: { setPing },
} = createSlice({
	name: "network",
	initialState,
	reducers: {
		setPing: (state, { payload: ping }: PayloadAction<number>) => {
			state.pingMs = ping;
			state.lastPingTimestamp = Date.now();
		},
	},
});
