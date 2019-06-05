import { Models } from "@common";

export interface BoardPieceOwnProps {
    piece: Models.Piece;
}

export interface BoardPieceStateProps {
    localPlayerId: string;
    canDrag: boolean;
    showDamagePerTurn: boolean;
    showHealthbar: boolean;
    animate: boolean;
}

export const isFriendly = (props: BoardPieceProps) => props.localPlayerId === props.piece.ownerId;

export type BoardPieceProps = BoardPieceOwnProps & BoardPieceStateProps;
