import { DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTarget } from "react-dnd";
import { TileUnconnected } from "./tileUnconnected";
import { TileProps } from "./tileProps";
import { DropTargetProps } from "../../../draggable/drop-target-props";
import { Piece } from "@common/models";

const boxTarget: DropTargetSpec<TileProps> = {
    drop(props: TileProps, monitor: DropTargetMonitor) {
        const item: Piece = monitor.getItem();

        return props.onDropPiece(item);
    },
    canDrop(props: TileProps, monitor: DropTargetMonitor) {
        const item: Piece = monitor.getItem();

        return props.canDropPiece(item);
    }
};

const collect = (connector: DropTargetConnector, monitor: DropTargetMonitor): DropTargetProps => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isDragging: !!(monitor.getItem())
});

export const tileDropTarget = DropTarget<TileProps>(typeof TileUnconnected, boxTarget, collect);
