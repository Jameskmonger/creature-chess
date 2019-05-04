import { PokemonPiece } from "@common";
import { ConnectDragSource } from "react-dnd";

export interface BoardPieceOwnProps {
    piece: PokemonPiece;
}

export interface BoardPieceStateProps {
    localPlayerId: string;
}

export interface BoardPieceDispatchProps {
    onPieceSelected: () => void;
}

export interface DragSourceProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

export const isFriendly = (props: BoardPieceProps) => props.localPlayerId === props.piece.ownerId;

export type BoardPieceProps = BoardPieceOwnProps & BoardPieceStateProps & BoardPieceDispatchProps;
