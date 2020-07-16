import * as React from "react";
import { FeedMessage } from "@common/models/feed-message";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "@app/store";
import { ChatInput } from "../chat/chatInput";

interface FeedStateProps {
    messages: FeedMessage[];
    getMessageAuthor: (message: FeedMessage) => string;
}

const ChatFeedMessage: React.FunctionComponent<{
    message: FeedMessage,
    getMessageAuthor: (message: FeedMessage) => string;
}> = ({ message, getMessageAuthor }) => (
    <p className="chat-feed-message">
        <span className="sender">{getMessageAuthor(message)}: </span>
        <span className="message">{message.text}</span>
    </p>
);

const FeedUnconnected: React.FunctionComponent<FeedStateProps> = ({ messages, getMessageAuthor }) => {
    return (
        <div className="feed">
            <ChatInput />
            {messages.map(message => {
                return <ChatFeedMessage key={message.id} message={message} getMessageAuthor={getMessageAuthor} />;
            })}
        </div>
    );
};

const mapStateToProps: MapStateToProps<FeedStateProps, {}, AppState> = state => ({
    messages: state.feedMessages,
    getMessageAuthor: ({ fromId }) => state.playerList.find(p => p.id === fromId).name
});

const Feed = connect(mapStateToProps)(FeedUnconnected);

export { Feed };
