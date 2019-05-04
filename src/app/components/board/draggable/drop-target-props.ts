import { ConnectDropTarget } from "react-dnd";

export interface DropTargetProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
}
