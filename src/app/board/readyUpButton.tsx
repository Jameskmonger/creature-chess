import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/state';
import { GamePhase } from '@common';
import { readyUpAction } from '../store/actions/localPlayerActions';

const ReadyUpButton: React.FunctionComponent = () => {
    const canReadyUp = useSelector<AppState, boolean>(
        state => state.game.phase === GamePhase.PREPARING && state.localPlayer.ready === false);
        
    const dispatch = useDispatch();

    if (!canReadyUp) {
        return null;
    }

    const onReadyUp = () => dispatch(readyUpAction());

    return (
        <div className="ready-up">
            <button className="button" onClick={onReadyUp}>Click to Ready Up</button>
        </div>
    )
};

export { ReadyUpButton };