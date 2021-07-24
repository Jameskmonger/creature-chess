import { AppState } from "../../../../store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuickChatOption } from "@creature-chess/models";

const QuickChatBox: React.FunctionComponent<{ sendingPlayerId: string }> = ({ sendingPlayerId }) => {

	const currentChat = useSelector<AppState, any>(state => state.game.quickChat.find(chat =>
		chat.id === sendingPlayerId));
	return (
		<div className="quick-chat-box">
			<h1>Quick Chat</h1>
			<div>
				{
					currentChat ?
						<p>{currentChat?.value?.phrase}</p>
						:
						<div className="emoji-spacer" />
				}
			</div>

		</div>
	);
};
export { QuickChatBox };
