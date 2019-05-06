import { DragSourceMonitor, DragSourceConnector, DragSource } from "react-dnd";
import { BoardPieceProps, isFriendly, BoardPieceOwnProps } from "./boardPieceProps";
import { BoardPieceUnconnected } from "./boardPieceUnconnected";

const selectedPiece = {
    beginDrag(props: BoardPieceProps) {
        return props.piece;
    },
    isDragging(props: BoardPieceProps, monitor: DragSourceMonitor) {
        return props.piece === monitor.getItem();
    },
    canDrag(props: BoardPieceProps, monitor: DragSourceMonitor) {
        return props.canDrag && isFriendly(props);
    }
};

const collect = (connectToDragSource: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connectToDragSource.dragSource(),
    isDragging: monitor.isDragging()
});

export const boardPieceDragSource = DragSource<BoardPieceOwnProps>(typeof BoardPieceUnconnected, selectedPiece, collect);
