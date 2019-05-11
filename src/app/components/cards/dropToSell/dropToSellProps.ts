import { PokemonPiece } from "@common";
import { DropTargetProps } from "../../draggable/drop-target-props";

export interface DropToSellDispatchProps {
    onDropPiece: (piece: PokemonPiece) => void;
}

export type DropToSellProps = DropToSellDispatchProps & DropTargetProps;
