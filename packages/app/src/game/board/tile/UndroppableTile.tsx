import * as React from "react";
import { useDrop } from "react-dnd";
import { getOverlayClassName } from "./getOverlayClassName";

const UndroppableTile: React.FunctionComponent<{ className: string }> = ({ className }) => {
    const [{ isDragging }, drop] = useDrop({
        accept: "Piece",
        collect: monitor => ({
            isDragging: !!monitor.getItem(),
        }),
    });

    return (
        <div
            ref={drop}
            className={`tile ${className} style-default`}
            touch-action="none"
        >
            <div className={`${getOverlayClassName(isDragging, false)}`} />
        </div>
    );
};

export { UndroppableTile }
