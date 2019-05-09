import * as React from "react";
import { FeedMessage } from "@common/feed-message";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../store/store";

interface FeedStateProps {
    messages: FeedMessage[];
}

const FeedUnconnected: React.FunctionComponent<FeedStateProps> = (props) => (
    <div className="feed">
        {props.messages.map(message =>
            <p key={message.id}>{message.text}</p>
        )}
    </div>
);

const mapStateToProps: MapStateToProps<FeedStateProps, {}, AppState> = state => ({
    messages: state.feedMessages
});

const Feed = connect(mapStateToProps)(FeedUnconnected);

export { Feed };
