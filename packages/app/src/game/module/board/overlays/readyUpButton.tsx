import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../store";
import { GamePhase } from "@creature-chess/models";
import { PlayerGameActions } from "@creature-chess/gamemode";

const ReadyUpButton: React.FunctionComponent = () => {
    const canReadyUp = useSelector<AppState, boolean>(
        state => state.game.roundInfo.phase === GamePhase.PREPARING && state.game.playerInfo.ready === false);

    const dispatch = useDispatch();

    if (!canReadyUp) {
        return null;
    }

    const onReadyUp = () => dispatch(PlayerGameActions.readyUpPlayerAction());

    return <button className="ready-up" onClick={onReadyUp}>Ready</button>;
};

export { ReadyUpButton };
