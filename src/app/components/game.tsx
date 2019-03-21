import * as React from "react";
import delay from "delay";
import { PokemonPiece, PiecePosition, isSamePiece, initialCoolDown, makeFriendly } from "@common/pokemon-piece";
import { Board } from "./board";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { Bench } from "./bench";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { PokemonCard } from "@common";
import { CardSelector } from "./cardSelector";
import { shuffle } from "lodash";
import io = require("socket.io-client");
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "../store/store";
import { SelectedPieceInfo } from "./selectedPieceInfo";

const isATeamDefeated = (pieces: PokemonPiece[]) => {
    return !(pieces.some(p => p.friendly && p.currentHealth > 0) && pieces.some(p => !p.friendly && p.currentHealth > 0));
};

const boardSize = 8;

interface StateProps {
    pieces: PokemonPiece[];
}

type Props = StateProps;

interface GameState {
    pieces: PokemonPiece[];
    benchPieces: PokemonPiece[];
    cards: PokemonCard[];
}

class GameUnconnected extends React.Component<Props, GameState> {
    public state: GameState = {
        pieces: [],
        benchPieces: [],
        cards: []
    };

    private socket = io("http://localhost:3000");

    public componentDidMount() {
        const { pieces } = this.props;
        const benchPieces: PokemonPiece[] = [
            makeFriendly(9, [8, 2]),
            makeFriendly(70, [8, 5]),
            makeFriendly(67, [8, 6])
        ];

        this.setState({ pieces, benchPieces });

        this.socket.on("cardsUpdate", (cards: PokemonCard[]) => {
            this.setState({ cards });
        });
    }

    public render() {
        const { pieces, benchPieces, cards } = this.state;

        return (
            <div className="board-container">
                <div className="chessboard">
                    <Board boardSize={boardSize} pieces={pieces} onMovePiece={this.onMovePiece} />
                    <Bench boardSize={boardSize} pieces={benchPieces} />
                </div>
                <SelectedPieceInfo />
                <CardSelector cards={cards} onShuffle={this.onShuffle} />
                <button onClick={(this.startRound)}>Fight!</button>
            </div>
        );
    }

    private onShuffle = () => {
        this.socket.emit("refreshCards");
    }

    private onMovePiece = (piece: PokemonPiece, position: PiecePosition) => {
        this.setState(({ pieces }) => {
            const updatedPieces = pieces.map(p =>
                isSamePiece(p, piece)
                ? { ...p, position }
                : p
            );

            return {
                pieces: updatedPieces
            };
        });
    }

    private startRound = async () => {
        const turnDurationMs = 50;
        let pieces = this.state.pieces;
        while (!isATeamDefeated(pieces)) {
            await delay(turnDurationMs);
            pieces = simulateTurn(pieces);
            this.setState({ pieces });
        }

        this.setState({ pieces: pieces.map(piece => ({ ...piece, celebrating: true }))});
    }
}

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
    pieces: state.pieces
});

const GameConnectedToStore = connect(mapStateToProps)(GameUnconnected);

const Game = DragDropContext(HTML5Backend)(GameConnectedToStore);

export {
    Game
};
