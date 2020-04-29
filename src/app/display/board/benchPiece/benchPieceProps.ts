import { Piece } from "@common/models";

export interface BenchPieceProps {
    piece: Piece;
}

export interface BenchPieceStateProps {
    canDrag: boolean;
}

export type Props = BenchPieceProps & BenchPieceStateProps;
