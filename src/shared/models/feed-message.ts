export enum FeedMessageType {
    BATTLE,
    CHAT
}

export interface ChatFeedMessage {
    ownMessage?: boolean;
    fromId?: string;
    text: string;
}

export interface BattleFeedMessage {
    home: string;
    away: string;
    homeScore: number;
    awayScore: number;
}

type BaseFeedMessage<T extends FeedMessageType, TPayload> = ({ id: string, type: T, payload: TPayload });

export type FeedMessage =
    BaseFeedMessage<FeedMessageType.BATTLE, BattleFeedMessage>
    | BaseFeedMessage<FeedMessageType.CHAT, ChatFeedMessage>;
