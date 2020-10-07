import * as React from "react";
import { ProgressBar } from "../../../ui/display/progressBar";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Constants } from "@creature-chess/models";
import { PieceCount } from "./pieceCount";
import { PlayerActions, getPlayerLevel, getPlayerXp, getXpToNextLevel } from "@creature-chess/shared";
import { MAX_PLAYER_LEVEL } from "@creature-chess/models";

const renderProgressBar = (current: number, max: number) => `${current} / ${max} xp`;

const Profile: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const level = useSelector<AppState, number>(getPlayerLevel);
    const xp = useSelector<AppState, number>(getPlayerXp);

    return (
        <div className="profile">
            <p className="item level">Level {level}</p>

            <PieceCount />

            {
                level !== MAX_PLAYER_LEVEL
                && (
                    <div className="level-bar">
                        <ProgressBar
                            className="xp-progress"
                            current={xp}
                            max={getXpToNextLevel(level)}
                            renderContents={renderProgressBar}
                        />
                        <button
                            className="buy-xp"
                            onClick={() => dispatch(PlayerActions.buyXpAction())}
                        >Buy {Constants.BUY_XP_AMOUNT} xp (${Constants.BUY_XP_COST})</button>
                    </div>
                )
            }
        </div>
    );
};

export {
    Profile
};
