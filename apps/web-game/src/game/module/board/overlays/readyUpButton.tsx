import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../store";
import { GamePhase } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/gamemode";

const ReadyUpButton: React.FC = () => {
	const dispatch = useDispatch();

	const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);
	const notReady = useSelector<AppState, boolean>(state => state.game.playerInfo.ready === false);

	const canReadyUp = inPreparingPhase && notReady;

	if (!canReadyUp) {
		return null;
	}

	const onReadyUp = () => dispatch(PlayerActions.readyUpPlayerAction());

	return <button className="ready-up" onClick={onReadyUp}>Ready</button>;
};

export { ReadyUpButton };
