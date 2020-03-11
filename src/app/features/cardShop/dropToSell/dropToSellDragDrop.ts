import { DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTarget } from "react-dnd";
import { DropTargetProps } from "@app/draggable/drop-target-props";
import { DropToSellProps } from "./dropToSellProps";
import { DropToSellUnconnected } from "./dropToSellUnconnected";

const boxTarget: DropTargetSpec<DropToSellProps> = {
    drop(props: DropToSellProps, monitor: DropTargetMonitor) {
        props.onDropPiece(monitor.getItem());
    }
};

const collect = (connector: DropTargetConnector, monitor: DropTargetMonitor): DropTargetProps => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isDragging: !!(monitor.getItem())
});

export const dropToSellDropTarget = DropTarget<DropToSellProps>(typeof DropToSellUnconnected, boxTarget, collect);
