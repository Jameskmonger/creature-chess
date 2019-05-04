import { DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";
import { BenchPieceProps } from "./benchPieceProps";
import { BenchPieceUnconnected } from "./benchPieceUnconnected";

const selectedPiece = {
    beginDrag(props: BenchPieceProps) {
        return props.piece;
    },
    isDragging(props: BenchPieceProps, monitor: DragSourceMonitor) {
        return props.piece === monitor.getItem();
    },
    canDrag() {
        return true;
    }
};

const collect = (connectToDragSource: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connectToDragSource.dragSource(),
    isDragging: monitor.isDragging()
});

export const benchPieceDragSource = DragSource<BenchPieceProps>(typeof BenchPieceUnconnected, selectedPiece, collect);
