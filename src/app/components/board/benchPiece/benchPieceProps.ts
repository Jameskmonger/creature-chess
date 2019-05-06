import { PokemonPiece } from "@common";

export interface BenchPieceProps {
    piece: PokemonPiece;
}

export interface BenchPieceStateProps {
    canDrag: boolean;
}

export interface BenchPieceDispatchProps {
    onPieceSelected: () => void;
}

export type Props = BenchPieceProps & BenchPieceStateProps & BenchPieceDispatchProps;
