import { AppState } from "../../../../store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuickChatOption } from "@creature-chess/models";

const QuickChatBox: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const currentQuickChat = useSelector<AppState, any | null>(state => state.game.playerInfo.quickChat);

	return (
		<div className="quick-chat-box">
			<h1>Quick Chat</h1>
			<div>
				<p>{currentQuickChat.value}</p>
			</div>

		</div>
	);
};
export { QuickChatBox };
