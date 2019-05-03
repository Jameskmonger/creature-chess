import * as React from "react";
import { PokemonPiece, BenchPokemonPiece } from "@common/pokemon-piece";
import { BenchTile } from "./benchTile";
import { AppState } from "../../store/store";
import { MapStateToProps, connect } from "react-redux";
import { benchPiecesSelector } from "../../selectors/pieceSelectors";
import { Constants } from "../../../shared";

interface BenchProps {

    pieces: BenchPokemonPiece[];
}

const BenchUnconnected: React.FunctionComponent<BenchProps> = ({ pieces }) => {
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE; x++) {
        const piece = pieces.find(p => p.slot === x);

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

const mapStateToProps: MapStateToProps<BenchProps, {}, AppState> = state => ({
    pieces: benchPiecesSelector(state)
});

const Bench = connect(mapStateToProps)(BenchUnconnected);

export {
    Bench
};
