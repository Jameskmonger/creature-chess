import { Piece } from "@common/models";

export interface BoardPieceOwnProps {
    piece: Piece;
}

export interface BoardPieceStateProps {
    localPlayerId: string;
    canDrag: boolean;
    showDamagePerTurn: boolean;
    showHealthbar: boolean;
    animate: boolean;
}

export interface BoardPieceDispatchProps {
    onBeginDrag: () => void;
}

export const isFriendly = (props: BoardPieceProps) => props.localPlayerId === props.piece.ownerId;

export type BoardPieceProps = BoardPieceOwnProps & BoardPieceStateProps & BoardPieceDispatchProps;
