import { PokemonPiece } from "@common";

export interface BoardPieceOwnProps {
    piece: PokemonPiece;
}

export interface BoardPieceStateProps {
    localPlayerId: string;
    canDrag: boolean;
}

export interface BoardPieceDispatchProps {
    onPieceSelected: () => void;
}

export const isFriendly = (props: BoardPieceProps) => props.localPlayerId === props.piece.ownerId;

export type BoardPieceProps = BoardPieceOwnProps & BoardPieceStateProps & BoardPieceDispatchProps;
