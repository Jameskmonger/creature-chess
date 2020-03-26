import { Piece } from "@common/models";
import { DropTargetProps } from "@app/draggable/drop-target-props";

export interface DropToSellDispatchProps {
    onDropPiece: (piece: Piece) => void;
}

export type DropToSellProps = DropToSellDispatchProps & DropTargetProps;
