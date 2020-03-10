import { Models } from "@common";
import { DropTargetProps } from "../../../draggable/drop-target-props";

export interface DropToSellDispatchProps {
    onDropPiece: (piece: Models.Piece) => void;
}

export type DropToSellProps = DropToSellDispatchProps & DropTargetProps;
