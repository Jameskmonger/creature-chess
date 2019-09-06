import { DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTarget } from "react-dnd";
import { TileUnconnected } from "./tileUnconnected";
import { TileProps } from "./tileProps";
import { DropTargetProps } from "../../draggable/drop-target-props";
import { Models } from "@common";
import { canDropPiece } from "@common/board";

const boxTarget: DropTargetSpec<TileProps> = {
    drop(props: TileProps, monitor: DropTargetMonitor) {
        props.onDropPiece(monitor.getItem());
    },
    canDrop(props: TileProps, monitor: DropTargetMonitor) {
        const item: Models.Piece = monitor.getItem();

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
