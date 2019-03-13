import * as React from "react";

const isTileDark = (x, y) => ((y ^ x) & 1) !== 0;

const Tile: React.FunctionComponent<{ dark: boolean }> = (props) => {
    return <div className={`tile ${props.dark ? "dark" : "light"}`} />;
};

const TileRow: React.FunctionComponent<{ y: number }> = (props) => {
    const tiles = [];

    for (let x = 0; x < 6; x++) {
        tiles.push(<Tile key={`tile-${x}`} dark={isTileDark(x, props.y)} />);
    }

    return <div className="tile-row">{tiles}</div>;
};

const Board: React.FunctionComponent = (props) => {
    const tileRows = [];

    for (let y = 0; y < 6; y++) {
        tileRows.push(<TileRow key={`tile-row-${y}`} y={y}/>);
    }

    return (
        <div className="chessboard">
            {tileRows}
        </div>
    );
};

export { Board };
