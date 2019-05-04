import * as React from "react";
import { PokemonImage } from "../../pokemonImage";
import { DragSourceProps } from "../../draggable/drag-source-props";
import { Props } from "./benchPieceProps";

export class BenchPieceUnconnected extends React.Component<Props & DragSourceProps> {
    public render() {
        const { piece, connectDragSource} = this.props;
        const { pokemonId } = piece;

        return connectDragSource(
            <div
                className="piece"
                onClick={this.props.onPieceSelected}
            >
                <PokemonImage pokemonId={pokemonId} />
            </div>
        );
    }
}
