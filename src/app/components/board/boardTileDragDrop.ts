import { DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTarget, ConnectDropTarget } from "react-dnd";
import { BoardTileProps, BoardTileUnconnected } from "./boardTile";

export interface DropTargetProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
}

const boxTarget: DropTargetSpec<BoardTileProps> = {
    drop(props: BoardTileProps, monitor: DropTargetMonitor) {
        props.onMovePiece(monitor.getItem());
    },
    canDrop(props: BoardTileProps, monitor: DropTargetMonitor) {
        return props.friendly && props.pieces.length === 0;
    }
};

const collect = (connector: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});

export const dropTarget = DropTarget<BoardTileProps>(typeof BoardTileUnconnected, boxTarget, collect);
