import * as React from "react";
import delay from "delay";
import { PokemonPiece, PiecePosition, isSamePiece, initialCoolDown } from "@common/pokemon-piece";
import { Board } from "./board";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { Bench } from "./bench";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { CardDeck, PokemonCard } from "@common/cardDeck";
import { CardSelector } from "./cardSelector";
import { shuffle } from "lodash";

let count = 0;

const makeEnemy = (pokemonId: number, position: PiecePosition) =>
    ({ id: count++, pokemonId, facingAway: false, friendly: false, maxHealth: 100, currentHealth: 100, position, coolDown: initialCoolDown });

const makeFriendly = (pokemonId: number, position: PiecePosition) =>
    ({ id: count++, pokemonId, facingAway: true, friendly: true, maxHealth: 100, currentHealth: 100, position, coolDown: initialCoolDown });

const isATeamDefeated = (pieces: PokemonPiece[]) => {
    return !(pieces.some(p => p.friendly && p.currentHealth > 0) && pieces.some(p => !p.friendly && p.currentHealth > 0));
};

const boardSize = 8;

interface GameState {
    pieces: PokemonPiece[];
    benchPieces: PokemonPiece[];
    cards: PokemonCard[];
}

class GameUnconnected extends React.Component<{}, GameState> {

    public state: GameState = {
        pieces: [],
        benchPieces: [],
        cards: new CardDeck().shuffle()
    };

    public componentDidMount() {
        const pieces: PokemonPiece[] = [
            makeEnemy(77, [0, 0]),
            makeEnemy(15, [1, 0]),
            makeEnemy(123, [4, 0]),
            makeEnemy(58, [5, 0]),
            makeEnemy(6, [4, 3]),
            makeEnemy(11, [3, 1]),

            makeFriendly(129, [1, 6]),
            makeFriendly(62, [2, 6]),
            makeFriendly(9, [4, 4]),
            makeFriendly(70, [7, 6]),
            makeFriendly(67, [3, 3]),
            makeFriendly(89, [5, 3])
        ];

        const benchPieces: PokemonPiece[] = [
            makeFriendly(9, [8, 2]),
            makeFriendly(70, [8, 5]),
            makeFriendly(67, [8, 6])
        ];

        this.setState({ pieces, benchPieces });
    }

    public render() {
        const { pieces, benchPieces, cards } = this.state;

        return (
            <div className="board-container">
                <div className="chessboard">
                    <Board boardSize={boardSize} pieces={pieces} onMovePiece={this.onMovePiece} />
                    <Bench boardSize={boardSize} pieces={benchPieces} />
                </div>
                <CardSelector cards={cards} onShuffle={this.onShuffle} />
                <button onClick={(this.startRound)}>Fight!</button>
            </div>
        );
    }

    private onShuffle = () => {
        this.setState(prevState => {
            return {
                cards: shuffle(prevState.cards)
            };
        });
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

const Game = DragDropContext(HTML5Backend)(GameUnconnected);

export {
    Game
};
