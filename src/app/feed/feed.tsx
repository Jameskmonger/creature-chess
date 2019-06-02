import * as React from "react";
import { FeedMessage, BattleFeedMessage, ChatFeedMessage, FeedMessageType } from "@common/feed-message";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../store/store";
import { ChatInput } from "../chat/chatInput";

interface FeedStateProps {
    messages: FeedMessage[];
    getMessageAuthor: (message: ChatFeedMessage) => string;
}

const BattleFeedMessage: React.FunctionComponent<{ message: BattleFeedMessage }> = ({ message }) => (
    <p className="battle-feed-message">
        <span className="player-name home">{message.home}</span> <span className="score">{message.homeScore}</span>
        <span className="vs"> vs </span>
        <span className="score">{message.awayScore}</span> <span className="player-name away">{message.away}</span>
    </p>
);

const ChatFeedMessage: React.FunctionComponent<{
    message: ChatFeedMessage,
    getMessageAuthor: (message: ChatFeedMessage) => string;
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
                if (message.type === FeedMessageType.BATTLE) {
                    return <BattleFeedMessage key={message.id} message={message.payload} />;
                }

                if (message.type === FeedMessageType.CHAT) {
                    return <ChatFeedMessage key={message.id} message={message.payload} getMessageAuthor={getMessageAuthor} />;
                }
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
