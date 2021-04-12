import * as React from "react";
import { ProgressBar } from "../../../ui/display/progressBar";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Constants, getXpToNextLevel } from "@creature-chess/models";
import { PieceCount } from "./pieceCount";
import { PlayerActions, getPlayerLevel, getPlayerXp, getPlayerMoney, PlayerSelectors } from "@creature-chess/gamemode";
import { MAX_PLAYER_LEVEL } from "@creature-chess/models";

const renderProgressBar = (current: number, max: number) => `${current} / ${max} xp`;

const Profile: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const level = useSelector<AppState, number>(state => getPlayerLevel(state.game));
    const xp = useSelector<AppState, number>(state => getPlayerXp(state.game));
    const money = useSelector<AppState, number>(state => getPlayerMoney(state.game));
    // todo reselect
    const health = useSelector<AppState, number | null>(state => {
        const player = state.game.playerList.find(p => p.id === state.user.user.id);

        return player ? player.health : null;
    });

    if (health === null) {
        return null;
    }

    return (
        <div className="profile">
            <div className="row">
                <p className="item level">Level {level} <span className="highlight">${money}</span></p>
                {
                    level !== MAX_PLAYER_LEVEL
                    && (
                        <ProgressBar
                            className="xp-progress"
                            current={xp}
                            max={getXpToNextLevel(level)}
                            renderContents={renderProgressBar}
                        />
                    )
                }
            </div>

            <div className="row">
                <PieceCount />
                {
                    level !== MAX_PLAYER_LEVEL
                    && (
                        <button
                            className="buy-xp"
                            onClick={() => dispatch(PlayerActions.buyXpAction())}
                        >Buy {Constants.BUY_XP_AMOUNT} xp (${Constants.BUY_XP_COST})</button>
                    )
                }
            </div>

            <ProgressBar
                className="healthbar player-health"
                current={health}
                max={100}
                renderContents={current => current.toString()}
            />
        </div>
    );
};

export {
    Profile
};
