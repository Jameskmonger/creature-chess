import { AppState } from "../../../../store";
import React from "react";
import { useSelector } from "react-redux";


const QuickChatBox: React.FunctionComponent<{ sendingPlayerId: string }> = ({ sendingPlayerId }) => {

	const currentChat = useSelector<AppState, any>(state => state.game.quickChat[sendingPlayerId]);
	return (
		<div className="quick-chat-box">
			<h1>Quick Chat</h1>
			<div>
				{
					currentChat ?
						<p>{currentChat.value}</p>
						:
						<div className="emoji-spacer" />
				}
			</div>

		</div>
	);
};
export { QuickChatBox };
