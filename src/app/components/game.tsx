import * as React from "react";
import { compose } from "recompose";
import delay from "delay";
import { PokemonPiece, makeFriendly } from "@common/pokemon-piece";
import { Board } from "./board";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { Bench } from "./bench/bench";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { PokemonCard } from "@common";
import { CardSelector } from "./cardSelector";
import io = require("socket.io-client");
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { AppState } from "../store/store";
import { SelectedPieceInfoPanel } from "./selectedPieceInfo/selectedPieceInfoPanel";
import { piecesUpdated } from "../actions/pieceActions";

const isATeamDefeated = (pieces: PokemonPiece[]) => {
    return !(pieces.some(p => p.friendly && p.currentHealth > 0) && pieces.some(p => !p.friendly && p.currentHealth > 0));
};

const boardSize = 8;

interface StateProps {
    pieces: PokemonPiece[];
}

interface GameDispatchProps {
    onPiecesUpdated: (pieces: PokemonPiece[]) => void;
}

type Props = StateProps & GameDispatchProps;

interface GameState {
    benchPieces: PokemonPiece[];
    cards: PokemonCard[];
}

class GameUnconnected extends React.Component<Props, GameState> {
    public state: GameState = {
        benchPieces: [],
        cards: []
    };

    private socket = io("http://localhost:3000");

    public componentDidMount() {
        const benchPieces: PokemonPiece[] = [
            makeFriendly(9, [8, 2]),
            makeFriendly(70, [8, 5]),
            makeFriendly(67, [8, 6])
        ];

        this.setState({ benchPieces });

        this.socket.on("cardsUpdate", (cards: PokemonCard[]) => {
            this.setState({ cards });
        });

        this.socket.on("boardUpdate", (packet: { friendly: PokemonPiece[], opponent: PokemonPiece[] }) => {
            const pieces = [ ...packet.friendly, ...packet.opponent ];
            this.props.onPiecesUpdated(pieces);
        });
    }

    public render() {
        const { benchPieces, cards } = this.state;

        return (
            <div className="board-container">
                <div className="chessboard">
                    <Board boardSize={boardSize} />
                    <Bench boardSize={boardSize} pieces={benchPieces} />
                </div>
                <SelectedPieceInfoPanel />
                <CardSelector cards={cards} onShuffle={this.onShuffle} />
                <button onClick={(this.startRound)}>Fight!</button>
            </div>
        );
    }

    private onShuffle = () => {
        this.socket.emit("refreshCards");
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

const mapDispatchToProps: MapDispatchToProps<GameDispatchProps, {}> = dispatch => ({
    onPiecesUpdated: (pieces: PokemonPiece[]) => dispatch(piecesUpdated(pieces))
});

const Game = compose(
    connect(mapStateToProps, mapDispatchToProps),
    DragDropContext(HTML5Backend)
)(GameUnconnected);

export {
    Game
};
