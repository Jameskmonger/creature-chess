import { Piece } from "@common/models";

export interface BenchPieceProps {
    piece: Piece;
}

export interface BenchPieceStateProps {
    canDrag: boolean;
}

export interface BenchPieceDispatchProps {
    onBeginDrag: () => void;
}

export type Props = BenchPieceProps & BenchPieceStateProps & BenchPieceDispatchProps;
