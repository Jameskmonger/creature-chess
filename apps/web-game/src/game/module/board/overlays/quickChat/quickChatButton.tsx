/* eslint-disable react/jsx-no-bind */
import React from "react";
import { useDispatch } from "react-redux";
import { usePlayerId } from "@creature-chess/auth-web";
import { QuickChatOption } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/gamemode";

const QuickChatButton: React.FunctionComponent<{ chatOption: QuickChatOption }>
	= ({ chatOption }) => {
		const dispatch = useDispatch();

		const sendingPlayerId = usePlayerId();

		const onClick = () => {
			dispatch(PlayerActions.quickChatPlayerAction({
				sendingPlayerId,
				chatValue: chatOption
			}));
		};
		return (<button onClick={onClick}>{chatOption.toString()}</button>);
	};
export { QuickChatButton };
