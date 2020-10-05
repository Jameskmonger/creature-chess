import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../store";
import { GamePhase } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/shared/player";

const ReadyUpButton: React.FunctionComponent = () => {
    const canReadyUp = useSelector<AppState, boolean>(
        state => state.game.phase === GamePhase.PREPARING && state.localPlayer.ready === false);

    const dispatch = useDispatch();

    if (!canReadyUp) {
        return null;
    }

    const onReadyUp = () => dispatch(PlayerActions.readyUpAction());

    return <button className="ready-up" onClick={onReadyUp}>Ready</button>;
};

export { ReadyUpButton };
