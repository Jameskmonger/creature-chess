export interface LobbyPlayer {
    id: string;
    name: string;
    isBot: boolean;
    title: {
        className: string;
        text: string;
    } | null;
}
