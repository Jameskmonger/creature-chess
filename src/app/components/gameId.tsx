import * as React from "react";
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "../store/state";

interface Props {
    gameId: string;
}

const GameIdUnconnected: React.FunctionComponent<Props> = ({ gameId }) => {
    // currently unused, will be used for spectator mode
    return null; // <div className="game-id">Game ID: {gameId}</div>;
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    gameId: state.game.gameId
});

const GameId = connect(mapStateToProps)(GameIdUnconnected);

export { GameId };
