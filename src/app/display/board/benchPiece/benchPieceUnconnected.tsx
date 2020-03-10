import * as React from "react";
import { CreatureImage } from "../../../display/creatureImage";
import { DragSourceProps } from "../../../draggable/drag-source-props";
import { Props } from "./benchPieceProps";

export class BenchPieceUnconnected extends React.Component<Props & DragSourceProps> {
    public render() {
        const { piece, connectDragSource} = this.props;
        const { definitionId, stage } = piece;

        return connectDragSource(
            <div className="piece">
                <CreatureImage definitionId={definitionId} />

                <div className="piece-stage">{stage + 1}</div>
            </div>
        );
    }
}
