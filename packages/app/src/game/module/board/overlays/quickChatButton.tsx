import React from "react";
import { QuickChatOption } from "@creature-chess/models";
import { useDispatch, useSelector } from "react-redux";
import { PlayerActions } from "../../../../../../gamemode/lib";
import { usePlayerId } from "../../../../auth";
import { AppState } from "../../../../store";

const QuickChatButton: React.FunctionComponent<QuickChatOption>
	= (chatOption) => {
		const dispatch = useDispatch();

		const sendingPlayerId = usePlayerId();
		const receivingPlayerId = useSelector<AppState, string>(state => state.game.playerInfo.opponentId);

		const chatValue = {
			phrase: chatOption
		};
		const onClick = () => {
			dispatch(PlayerActions.quickChatPlayerAction({
				sendingPlayerId,
				receivingPlayerId,
				chatValue
			}));
		};
		return (
			<>
				<button onClick={onClick}>{chatOption.toString()}</button>
			</>
		);
	};
export { QuickChatButton };
