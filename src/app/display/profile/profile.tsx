import * as React from "react";
import { ProgressBar } from "../progressBar";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { AppState } from "@app/store";
import { getXpToNextLevel } from "@common/utils";
import { GamePhase, Constants } from "@common/models";
import { PieceCount } from "./pieceCount";
import { PlayerActions } from '@common/player';

const renderProgressBar = (current: number, max: number) => `${current} / ${max} xp`;

interface ProfileStateProps {
    name: string;
    level: number;
    xp: number;
    gameStarted: boolean;
}

interface ProfileDispatchProps {
    onBuyXp: () => void;
}

type ProfileProps = ProfileStateProps & ProfileDispatchProps;

const ProfileUnconnected: React.FunctionComponent<ProfileProps> = (props) => {
    const { name, level, xp, gameStarted, onBuyXp } = props;

    if (gameStarted === false) {
        return null;
    }

    const xpForNextLevel = getXpToNextLevel(level);

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

const mapStateToProps: MapStateToProps<ProfileStateProps, {}, AppState> = state => ({
    name: state.localPlayer.name,
    level: state.localPlayer.level,
    xp: state.localPlayer.xp,
    gameStarted: state.game.phase !== GamePhase.WAITING
});

const mapDispatchToProps: MapDispatchToProps<ProfileDispatchProps, {}> = dispatch => ({
    onBuyXp: () => dispatch(PlayerActions.buyXpAction())
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileUnconnected);

export {
    Profile
};
