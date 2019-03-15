import * as React from "react";
import { PokemonPiece, PiecePosition, isSamePiece } from "../models/pokemon-piece";
import { Board } from "./board";

const makeEnemy = (pokemonId: number, position: PiecePosition) =>
    ({ pokemonId, facingAway: false, friendly: false, maxHealth: 100, currentHealth: 80, position });

const makeFriendly = (pokemonId: number, position: PiecePosition) =>
    ({ pokemonId, facingAway: true, friendly: true, maxHealth: 100, currentHealth: 80, position });

interface GameState {
    pieces: PokemonPiece[];
}

export class Game extends React.Component<{}, GameState> {
    constructor(props) {
        super(props);

        this.state = {
            pieces: []
        };

        this.onMovePiece = this.onMovePiece.bind(this);
    }

    public componentDidMount() {
        const pieces: PokemonPiece[] = [
            makeEnemy(77, [0, 0]),
            makeEnemy(15, [1, 0]),
            makeEnemy(123, [4, 0]),
            makeEnemy(58, [5, 0]),
            makeEnemy(6, [2, 1]),
            makeEnemy(11, [3, 1]),

            makeFriendly(129, [1, 6]),
            makeFriendly(62, [2, 6]),
            makeFriendly(9, [6, 6]),
            makeFriendly(70, [7, 6]),
            makeFriendly(67, [2, 7]),
            makeFriendly(89, [5, 7]),
        ];

        this.setState({ pieces });
    }

    public render() {
        const { pieces } = this.state;

        return (
            <div className="board-container">
                <Board pieces={pieces} onMovePiece={this.onMovePiece} />
            </div>
        );
    }

    private onMovePiece(piece: PokemonPiece, position: PiecePosition) {
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
}
