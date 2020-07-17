import * as React from "react";
import { Constants, GamePhase } from "@common/models";
import { useWindowSize } from "../../use-window-size";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";

const inPortraitMode = (width: number, height: number) => (height >= width);

const getBoardInformation = (width: number, height: number) => {
    if (inPortraitMode(width, height)) {
        // board + spacing
        const colsRequired = Constants.GRID_SIZE;

        // in portrait mode, use full width
        const tileWidth = width / colsRequired;

        return {
            tileSize: tileWidth,
            boardHeight: `${tileWidth * (Constants.GRID_SIZE + 1 + 0.5)}px`,
            boardWidth: `${tileWidth * Constants.GRID_SIZE}px`
        };
    }

    // board + bench + spacing
    const rowsRequired = Constants.GRID_SIZE + 1 + 0.5;

    // in landscape mode, use full height
    const tileHeight = height / rowsRequired;

    return {
        tileSize: tileHeight,
        boardHeight: "100%",
        boardWidth: `${tileHeight * Constants.GRID_SIZE}px`
    };
};

const getTilePosition = (tileSize: number, x: number, y: number) => {
    return {
        left: (x * tileSize),
        top: (y * tileSize)
    };
};

const getPositionablePieceStyles = (tileSize: number) => {
    const styles = [];
    const TILE_BASE_Z_INDEX = 10;

    for (let x = 0; x < Constants.GRID_SIZE; x++) {
        for (let y = 0; y < Constants.GRID_SIZE; y++) {
            const { left, top } = getTilePosition(tileSize, x, y);

            styles.push(`.positionable-piece.x-${x} { left: ${left}px; }`);
            styles.push(`.positionable-piece.y-${y} { top: ${top}px; z-index: ${TILE_BASE_Z_INDEX + y + 1}; }`);
        }
    }

    return styles.join("\n");
};

const ResponsiveBoardStyles: React.FunctionComponent = () => {
    const { width, height } = useWindowSize();

    const { tileSize, boardHeight, boardWidth } = getBoardInformation(width, height);

    // todo this is ugly
    const boardContainerStyle =
        inPortraitMode(width, height)
            ? `{ width: ${boardWidth}; margin: 0 auto 0.5rem; }`
            : `{ height: ${boardHeight}; width: ${boardWidth}; }`;

    const positionablePieceStyles = getPositionablePieceStyles(tileSize);

    return (
        <style
            dangerouslySetInnerHTML={{
            __html: `
            .tile { width: ${tileSize}px; height: ${tileSize}px; }
            .positionable-piece { width: ${tileSize}px; height: ${tileSize}px; }
            .piece { width: ${tileSize}px; height: ${tileSize}px; }

            .board-container ${boardContainerStyle}

            ${positionablePieceStyles}

            .chessboard { height: ${tileSize * Constants.GRID_SIZE}px; }

            .bench { height: ${tileSize}px; }

            .opponent-board-placeholder { height: ${tileSize * Constants.GRID_SIZE / 2}px; }
            `}}
        />
    );
};

export { ResponsiveBoardStyles };
