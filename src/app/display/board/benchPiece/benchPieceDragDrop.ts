import { DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";
import { Props } from "./benchPieceProps";
import { BenchPieceUnconnected } from "./benchPieceUnconnected";

const selectedPiece = {
    beginDrag(props: Props) {
        return props.piece;
    },
    isDragging(props: Props, monitor: DragSourceMonitor) {
        return props.piece === monitor.getItem();
    },
    canDrag(props: Props) {
        return props.canDrag;
    }
};

const collect = (connectToDragSource: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connectToDragSource.dragSource(),
    isDragging: monitor.isDragging()
});

export const benchPieceDragSource = DragSource<Props>(typeof BenchPieceUnconnected, selectedPiece, collect);
