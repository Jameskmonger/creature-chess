import * as React from "react";
import { compose } from "recompose";
import delay from "delay";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { PokemonCard, getTotalHealthByTeam, PokemonPiece } from "@common";
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

const boardSize = 8;

interface StateProps {
    pieces: PokemonPiece[];
    cards: PokemonCard[];
}

interface GameStageDispatchProps {
    onPiecesUpdated: (pieces: PokemonPiece[]) => void;
    onShuffle: () => void;
}

type Props = StateProps & GameStageDispatchProps;

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

                    <CardSelector cards={this.props.cards} onShuffle={this.props.onShuffle} />
                </div>
                <div className="board-container" style={boardContainerStyle}>
                    <div className="chessboard">
                        <Board boardSize={boardSize} />
                        <Bench boardSize={boardSize} />
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
    pieces: state.pieces,
    cards: state.cards
});

const mapDispatchToProps: MapDispatchToProps<GameStageDispatchProps, {}> = dispatch => ({
    onPiecesUpdated: (pieces: PokemonPiece[]) => dispatch(piecesUpdated(pieces)),
    onShuffle: () => dispatch(sendPacket(ClientToServerPacketOpcodes.REFRESH_CARDS))
});

const GameStage = compose(
    connect(mapStateToProps, mapDispatchToProps),
    DragDropContext(HTML5Backend)
)(GameStageUnconnected);

export {
    GameStage
};
