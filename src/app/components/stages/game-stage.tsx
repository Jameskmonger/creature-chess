import * as React from "react";
import { compose } from "recompose";
import delay from "delay";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { PokemonCard, getTotalHealthByTeam, PokemonPiece, Constants } from "@common";
import { Board } from "../board";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { Bench } from "../bench/bench";
import { CardSelector } from "../cardSelector";
import { AppState } from "../../store/store";
import { SelectedPieceInfoPanel } from "../selectedPieceInfo/selectedPieceInfoPanel";
import { piecesUpdated } from "../../actions/pieceActions";
import { PlayerList } from "../playerList/playerList";
import { ClientToServerPacketOpcodes } from "../../../shared/packet-opcodes";
import { sendPacket } from "../../actions/networkActions";

const isATeamDefeated = (pieces: PokemonPiece[]) => {
    const healthByTeam = getTotalHealthByTeam(pieces);

    return healthByTeam.some(x => x.totalHealth === 0);
};

interface StateProps {
    pieces: PokemonPiece[];
}

interface GameStageDispatchProps {
    onPiecesUpdated: (pieces: PokemonPiece[]) => void;
}

type Props = StateProps & GameStageDispatchProps;

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

                    <CardSelector />
                </div>
                <div className="board-container" style={boardContainerStyle}>
                    <div className="chessboard">
                        <Board />
                        <Bench />
                    </div>
                </div>
                <div className="column">
                    <button onClick={(this.startRound)}>Fight!</button>
                    <SelectedPieceInfoPanel />
                </div>
            </div>
        );
    }

    private startRound = async () => {
        const turnDurationMs = 50;
        let pieces = this.props.pieces;
        while (!isATeamDefeated(pieces)) {
            await delay(turnDurationMs);
            pieces = simulateTurn(pieces);
            this.props.onPiecesUpdated(pieces);
        }

        this.props.onPiecesUpdated(pieces.map(piece => ({ ...piece, celebrating: true })));
    }
}

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
    pieces: state.pieces
});

const mapDispatchToProps: MapDispatchToProps<GameStageDispatchProps, {}> = dispatch => ({
    onPiecesUpdated: (pieces: PokemonPiece[]) => dispatch(piecesUpdated(pieces))
});

const GameStage = compose(
    connect(mapStateToProps, mapDispatchToProps),
    DragDropContext(HTML5Backend)
)(GameStageUnconnected);

export {
    GameStage
};
