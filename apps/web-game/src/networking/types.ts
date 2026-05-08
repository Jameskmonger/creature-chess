export type Dispatch = (action: any) => void;

export enum ConnectionStatus {
	NOT_CONNECTED = 1,
	CONNECTED = 2,
	DISCONNECTED = 3,
}
