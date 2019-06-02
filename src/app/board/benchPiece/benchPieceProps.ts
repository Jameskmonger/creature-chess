import { Models } from "@common";

export interface BenchPieceProps {
    piece: Models.Piece;
}

export interface BenchPieceStateProps {
    canDrag: boolean;
}

export type Props = BenchPieceProps & BenchPieceStateProps;
