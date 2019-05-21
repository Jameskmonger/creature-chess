import * as React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { sendChatMessage } from "../../actions/chatActions";

interface ChatInputProps {
    onSend: (message: string) => void;
}

const ChatInputUnconnected: React.FunctionComponent<ChatInputProps> = (props) => {

    const [message, setMessage] = React.useState("");

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!message) {
            return;
        }
        props.onSend(message);
        setMessage("");
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    return (
        <form onSubmit={onSubmit} className="chat-input">
            <input className="text-input" value={message} onChange={onChange} />
            <button className="send-button">Send</button>
        </form>
    );
};

const mapDispatchToProps: MapDispatchToProps<ChatInputProps, {}> = dispatch => ({
    onSend: (message: string) => dispatch(sendChatMessage(message))
});

const ChatInput = connect(null, mapDispatchToProps)(ChatInputUnconnected);

export { ChatInput };
