import * as React from "react";
import { PokemonPiece } from "@common/pokemon-piece";
import { BenchTile } from "./benchTile";
import { AppState } from "../../store/store";
import { MapStateToProps, connect } from "react-redux";
import { benchedPiecesSelector } from "../../selectors/pieceSelectors";

interface BenchOwnProps {
    boardSize: number;
}

interface BenchStateProps {

    pieces: PokemonPiece[];
}

type BenchProps = BenchOwnProps & BenchStateProps;

const BenchUnconnected: React.FunctionComponent<BenchProps> = ({ boardSize, pieces }) => {
    const tiles = [];

    for (let x = 0; x < boardSize; x++) {
        const piece = pieces.find(p => p.position.x === x && p.benched);

        tiles.push(
            <BenchTile
                key={`tile-${x}`}
                piece={piece}
            />
        );
    }

    return (
        <div className="tile-row">{tiles}</div>
    );
};

const mapStateToProps: MapStateToProps<BenchStateProps, {}, AppState> = state => ({
    pieces: benchedPiecesSelector(state)
});

const Bench = connect(mapStateToProps)(BenchUnconnected);

export {
    Bench
};
