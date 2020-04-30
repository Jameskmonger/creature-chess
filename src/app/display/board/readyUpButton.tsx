import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@app/store";
import { GamePhase } from "@common/models";
import { PlayerActions } from '@common/player';

const ReadyUpButton: React.FunctionComponent = () => {
    const canReadyUp = useSelector<AppState, boolean>(
        state => state.game.phase === GamePhase.PREPARING && state.localPlayer.ready === false);

    const dispatch = useDispatch();

    if (!canReadyUp) {
        return null;
    }

    const onReadyUp = () => dispatch(PlayerActions.readyUpAction());

    return <button className="ready-up" onClick={onReadyUp}>Click to Ready Up</button>;
};

export { ReadyUpButton };
