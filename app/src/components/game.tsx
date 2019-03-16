import * as React from "react";
import delay from "delay";
import { PokemonPiece, PiecePosition, isSamePiece, initialCoolDown } from "../models/pokemon-piece";
import { Board } from "./board";
import { simulateTurn } from "../models/fighting-turn-simulator";

const makeEnemy = (pokemonId: number, position: PiecePosition) =>
    ({ pokemonId, facingAway: false, friendly: false, maxHealth: 100, currentHealth: 100, position, coolDown: initialCoolDown });

const makeFriendly = (pokemonId: number, position: PiecePosition) =>
    ({ pokemonId, facingAway: true, friendly: true, maxHealth: 100, currentHealth: 100, position, coolDown: initialCoolDown });

const isATeamDefeated = (pieces: PokemonPiece[]) => {
    return !(pieces.some(p => p.friendly && p.currentHealth > 0) && pieces.some(p => !p.friendly && p.currentHealth > 0));
};

interface GameState {
    pieces: PokemonPiece[];
}

export class Game extends React.Component<{}, GameState> {

    public state = {
        pieces: []
    };

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
                <button onClick={(this.startRound)}>Fight!</button>
            </div>
        );
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
        const turnDurationMs = 10;
        let pieces = this.state.pieces;
        while (!isATeamDefeated(pieces)) {
            await delay(turnDurationMs);
            pieces = simulateTurn(pieces);
            this.setState({ pieces });
        }
    }
}
