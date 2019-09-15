export enum ConnectionStatus {
    NOT_CONNECTED,
    CONNECTED,
    DISCONNECTED_WILL_RECONNECT,
    RECONNECTED_NEED_AUTHENTICATION,
    RECONNECTED,
    DISCONNECTED_FINAL
}