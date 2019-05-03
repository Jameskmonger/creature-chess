import * as React from "react";
import { compose } from "recompose";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { MapStateToProps, connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PokemonPiece } from "@common";
import { Board } from "../board";
import { Bench } from "../bench/bench";
import { CardSelector } from "../cardSelector";
import { AppState } from "../../store/store";
import { SelectedPieceInfoPanel } from "../selectedPieceInfo/selectedPieceInfoPanel";
import { PlayerList } from "../playerList/playerList";

const boardSize = 8;

interface Props {
    pieces: PokemonPiece[];
}

class GameStageUnconnected extends React.Component<Props> {
    public render() {
        const boardContainerStyle = {
            height: window.innerHeight + "px",
            width: ((window.innerHeight / (boardSize + 1)) * boardSize) + "px"
        };

        return (
            <div className="game">
                <ToastContainer />

                <div className="column">
                    <PlayerList />

                    <CardSelector />
                </div>
                <div className="board-container" style={boardContainerStyle}>
                    <div className="chessboard">
                        <Board boardSize={boardSize} />
                        <Bench boardSize={boardSize} />
                    </div>
                </div>
                <div className="column">
                    <SelectedPieceInfoPanel />
                </div>
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    pieces: state.pieces
});

const GameStage = compose(
    connect(mapStateToProps),
    DragDropContext(HTML5Backend)
)(GameStageUnconnected);

export {
    GameStage
};
