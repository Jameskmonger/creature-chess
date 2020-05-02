import { Piece } from "@common/models";

export interface BoardPieceOwnProps {
    piece: Piece;
}

export interface BoardPieceStateProps {
    localPlayerId: string;
    canDrag: boolean;
    showHealthbar: boolean;
    animate: boolean;
}

export const isFriendly = (props: BoardPieceProps) => props.localPlayerId === props.piece.ownerId;

export type BoardPieceProps = BoardPieceOwnProps & BoardPieceStateProps;
