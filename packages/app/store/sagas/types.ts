export type Socket = SocketIOClient.Socket;

export type ActionWithPayload<T> = {
    type: string,
    payload: T
};
