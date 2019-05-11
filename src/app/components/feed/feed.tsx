import * as React from "react";
import { FeedMessage } from "@common/feed-message";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../store/store";
import { ChatInput } from "../chat/chatInput";

interface FeedStateProps {
    messages: (FeedMessage & { fromName?: string })[];
}

const FeedUnconnected: React.FunctionComponent<FeedStateProps> = (props) => (
    <div className="feed">
        <ChatInput />
        {props.messages.map(message =>
            <p key={message.id}>
                <span className="message-sender">{message.fromName && `${message.fromName}: `}</span>
                <span className={message.fromName ? "player-chat-message" : "info-feed-message"}>{message.text}</span>
            </p>
        )}
    </div>
);

const mapStateToProps: MapStateToProps<FeedStateProps, {}, AppState> = state => ({
    messages: state.feedMessages.map(m => {
        const messageFrom = m.ownMessage ? state.localPlayer : state.playerList.find(p => p.id === m.fromId);
        return { ...m, fromName: messageFrom && messageFrom.name };
    })
});

const Feed = connect(mapStateToProps)(FeedUnconnected);

export { Feed };
