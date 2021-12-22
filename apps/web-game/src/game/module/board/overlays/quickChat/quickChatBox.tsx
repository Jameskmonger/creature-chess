import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../store";


const QuickChatBox: React.FunctionComponent<{ sendingPlayerId: string }> = ({ sendingPlayerId }) => {

	const currentChat = useSelector<AppState, any>(state => state.game.quickChat[sendingPlayerId]);
	return (
		<div className="quick-chat-box">

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
