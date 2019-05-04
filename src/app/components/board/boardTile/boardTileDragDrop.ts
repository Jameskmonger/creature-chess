import { DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTarget } from "react-dnd";
import { BoardTileUnconnected } from "./boardTileUnconnected";
import { BoardTileProps } from "./boardTileProps";

const boxTarget: DropTargetSpec<BoardTileProps> = {
    drop(props: BoardTileProps, monitor: DropTargetMonitor) {
        props.onMovePiece(monitor.getItem());
    },
    canDrop(props: BoardTileProps) {
        return props.friendly && props.pieces.length === 0;
    }
};

const collect = (connector: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});

export const boardTileDropTarget = DropTarget<BoardTileProps>(typeof BoardTileUnconnected, boxTarget, collect);
