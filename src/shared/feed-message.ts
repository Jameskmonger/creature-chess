export interface FeedMessage {
    id: string;
    ownMessage?: boolean;
    fromId?: string;
    text: string;
}
