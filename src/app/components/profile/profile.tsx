import * as React from "react";
import { ProgressBar } from "../progressBar";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { AppState } from "../../store/store";
import { GamePhase, getXpToNextLevel, Constants } from "@common";
import { ownedPieceSelector } from "../../selectors/pieceSelectors";
import { buyXpAction, readyUpAction } from "../../actions/localPlayerActions";

const renderProgressBar = (current: number, max: number) => `${current} / ${max} xp`;

interface ProfileStateProps {
    name: string;
    level: number;
    xp: number;
    pieceCount: number;
    gameStarted: boolean;
    canReadyUp: boolean;
}

interface ProfileDispatchProps {
    onBuyXp: () => void;
    onReadyUp: () => void;
}

type ProfileProps = ProfileStateProps & ProfileDispatchProps;

const ProfileUnconnected: React.FunctionComponent<ProfileProps> = (props) => {
    const { name, level, xp, pieceCount, gameStarted, canReadyUp, onBuyXp, onReadyUp } = props;

    if (gameStarted === false) {
        return null;
    }

    const xpForNextLevel = getXpToNextLevel(level);

    return (
        <div className="profile">
            <p className="item name">{name}</p>

            <p className="item level">Level {level}</p>

            <p className="item pieces">{pieceCount} / {level} pieces</p>

            <div className="level-bar">
                <ProgressBar className="xp-progress" current={xp} max={xpForNextLevel} renderContents={renderProgressBar} />
                <button onClick={onBuyXp} className="buy-xp">Buy {Constants.BUY_XP_AMOUNT} xp (${Constants.BUY_XP_COST})</button>
            </div>

            {
                canReadyUp
                && <button onClick={onReadyUp} className="ready-up">Ready Up</button>
            }
        </div>
    );
};

const mapStateToProps: MapStateToProps<ProfileStateProps, {}, AppState> = state => ({
    name: state.localPlayer.name,
    level: state.localPlayer.level,
    xp: state.localPlayer.xp,
    gameStarted: state.game.phase !== GamePhase.WAITING,
    canReadyUp: (state.game.phase === GamePhase.PREPARING && state.localPlayer.ready === false),
    pieceCount: ownedPieceSelector(state).length
});

const mapDispatchToProps: MapDispatchToProps<ProfileDispatchProps, {}> = dispatch => ({
    onBuyXp: () => dispatch(buyXpAction()),
    onReadyUp: () => dispatch(readyUpAction())
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileUnconnected);

export {
    Profile
};
