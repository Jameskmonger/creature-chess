import { PokemonPiece } from "@common";

export interface BenchPieceProps {
    piece: PokemonPiece;
}

export interface BenchPieceStateProps {
    canDrag: boolean;
}

export type Props = BenchPieceProps & BenchPieceStateProps;
