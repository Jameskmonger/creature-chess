export enum FeedMessageType {
    BATTLE,
    CHAT
}

export interface ChatFeedMessage {
    id: string;
    ownMessage?: boolean;
    fromId?: string;
    text: string;
}

export type FeedMessage =
    ({ type: FeedMessageType.BATTLE, payload: { home: string, away: string, homeScore: number, awayScore: number }})
    | ({ type: FeedMessageType.CHAT, payload: ChatFeedMessage});
