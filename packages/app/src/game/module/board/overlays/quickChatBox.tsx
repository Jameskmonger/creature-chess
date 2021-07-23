import { AppState } from "../../../../store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuickChatOption } from "@creature-chess/models";

const QuickChatBox: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const currentQuickChat = useSelector<AppState, any | null>(state => state.game.playerInfo.quickChat);
	const chatIsValid = Date.now() - currentQuickChat.receivedAt > 5000 ? false : true;


	return (
		<div className="quick-chat-box">
			{
				chatIsValid &&
				<div>
					<p>{currentQuickChat.value}</p>
				</div>
			}
		</div>
	);
};
export { QuickChatBox };
