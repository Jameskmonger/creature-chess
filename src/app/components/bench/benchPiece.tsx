import * as React from "react";
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";
import { compose } from "recompose";
import { BenchPokemonPiece } from "@common/pokemon-piece";
import { connect, MapDispatchToProps } from "react-redux";
import { PokemonImage } from "../pokemonImage";
import { benchPieceSelected } from "../../actions/benchPieceActions";

interface BenchPieceProps {
    piece: BenchPokemonPiece;
}

interface BenchPieceDispatchProps {
    onPieceSelected: () => void;
}

type Props = BenchPieceProps & BenchPieceDispatchProps;

interface DragSourceProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

class BenchPieceUnconnected extends React.Component<Props & DragSourceProps> {
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

const mapDispatchToProps: MapDispatchToProps<BenchPieceDispatchProps, BenchPieceProps> = (dispatch, ownProps) => ({
    onPieceSelected: () => dispatch(benchPieceSelected(ownProps.piece))
});

const BenchPiece = compose<Props, BenchPieceProps>(
    connect(null, mapDispatchToProps),
    DragSource<BenchPieceProps>(typeof BenchPieceUnconnected, selectedPiece, collect)
)(BenchPieceUnconnected);

export {
    BenchPieceUnconnected,
    BenchPiece
};
