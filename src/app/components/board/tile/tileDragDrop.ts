import { DropTargetSpec, DropTargetMonitor, DropTargetConnector, DropTarget } from "react-dnd";
import { TileUnconnected } from "./tileUnconnected";
import { TileProps } from "./tileProps";
import { TileCoordinates, TileType } from "@common/position";

const benchOrFriendly = ({ y }: TileCoordinates) => y === null || y > 3;

const boxTarget: DropTargetSpec<TileProps> = {
    drop(props: TileProps, monitor: DropTargetMonitor) {
        props.onMovePiece(monitor.getItem());
    },
    canDrop(props: TileProps, monitor: DropTargetMonitor) {
        return props.pieces.length === 0 && benchOrFriendly(props.position);
    }
};

const collect = (connector: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});

export const tileDropTarget = DropTarget<TileProps>(typeof TileUnconnected, boxTarget, collect);
