// tslint:disable:jsx-ban-props
import * as React from "react";
import { compose } from "recompose";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { PokemonCard, getTotalHealthByTeam, PokemonPiece, Constants } from "@common";
import { Board } from "../board/board";
import { Bench } from "../bench/bench";
import { CardShop } from "../cards/cardShop";
import { AppState } from "../../store/store";
import { SelectedPieceInfoPanel } from "../selectedPieceInfo/selectedPieceInfoPanel";
import { PlayerList } from "../playerList/playerList";

interface Props {
    pieces: PokemonPiece[];
}

class GameStageUnconnected extends React.Component<Props> {
    public render() {
        const boardContainerStyle = {
            height: window.innerHeight + "px",
            width: ((window.innerHeight / (Constants.GRID_SIZE + 1)) * Constants.GRID_SIZE) + "px"
        };

        return (
            <div className="game">
                <ToastContainer />

                <div className="column">
                    <PlayerList />

                    <CardShop />
                </div>
                <div className="board-container" style={boardContainerStyle}>
                    <div className="chessboard">
                        <Board />
                        <Bench />
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
