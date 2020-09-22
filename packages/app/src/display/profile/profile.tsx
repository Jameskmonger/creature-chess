import * as React from "react";
import { ProgressBar } from "../progressBar";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { getXpToNextLevel } from "@creature-chess/shared/utils";
import { GamePhase, Constants } from "@creature-chess/models";
import { PieceCount } from "./pieceCount";
import { PlayerActions } from "@creature-chess/shared/player";
import { getPlayerLevel, getPlayerXp } from "@creature-chess/shared/player/playerSelectors";

const renderProgressBar = (current: number, max: number) => `${current} / ${max} xp`;

const Profile: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const gameStarted = useSelector<AppState, boolean>(state => state.game.phase !== GamePhase.WAITING);
    const level = useSelector<AppState, number>(getPlayerLevel);
    const xp = useSelector<AppState, number>(getPlayerXp);

    if (gameStarted === false) {
        return null;
    }

    const xpForNextLevel = getXpToNextLevel(level);

    const onBuyXp = () => dispatch(PlayerActions.buyXpAction());

    return (
        <div className="profile">
            <p className="item level">Level {level}</p>

            <PieceCount />

            <div className="level-bar">
                <ProgressBar className="xp-progress" current={xp} max={xpForNextLevel} renderContents={renderProgressBar} />
                <button onClick={onBuyXp} className="buy-xp">Buy {Constants.BUY_XP_AMOUNT} xp (${Constants.BUY_XP_COST})</button>
            </div>
        </div>
    );
};

export {
    Profile
};
