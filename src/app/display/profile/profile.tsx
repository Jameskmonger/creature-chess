import * as React from "react";
import { ProgressBar } from "../progressBar";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@app/store";
import { getXpToNextLevel } from "@common/utils";
import { GamePhase, Constants } from "@common/models";
import { PieceCount } from "./pieceCount";
import { PlayerActions } from "@common/player";

const renderProgressBar = (current: number, max: number) => `${current} / ${max} xp`;

const Profile: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const gameStarted = useSelector<AppState, boolean>(state => state.game.phase !== GamePhase.WAITING);
    const name = useSelector<AppState, string>(state => state.localPlayer.name);
    const level = useSelector<AppState, number>(state => state.localPlayer.level);
    const xp = useSelector<AppState, number>(state => state.localPlayer.xp);

    if (gameStarted === false) {
        return null;
    }

    const xpForNextLevel = getXpToNextLevel(level);

    const onBuyXp = () => dispatch(PlayerActions.buyXpAction());

    return (
        <div className="profile">
            <p className="item name">{name}</p>

            <p className="item level">Level {level}</p>

            <div className="item">
                <PieceCount />
            </div>

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
