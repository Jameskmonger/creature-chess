import * as React from "react";
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "../store/store";

interface Props {
    gameId: string;
}

const GameIdUnconnected: React.FunctionComponent<Props> = ({ gameId }) => {
    return <div className="game-id">Game ID: {gameId}</div>;
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    gameId: state.game.gameId
});

const GameId = connect(mapStateToProps)(GameIdUnconnected);

export { GameId };
