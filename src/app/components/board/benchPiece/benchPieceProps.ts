import { PokemonPiece } from "@common";

export interface BenchPieceProps {
    piece: PokemonPiece;
}

export interface BenchPieceDispatchProps {
    onPieceSelected: () => void;
}

export type Props = BenchPieceProps & BenchPieceDispatchProps;
