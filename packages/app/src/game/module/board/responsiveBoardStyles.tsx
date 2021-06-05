import * as React from "react";
import { Constants } from "@creature-chess/models";
import { useWindowSize } from "./use-window-size";

const inPortraitMode = (width: number, height: number) => (height >= width);

const getBoardInformation = (width: number, height: number) => {
	if (inPortraitMode(width, height)) {
		// board + spacing
		const colsRequired = Constants.GRID_SIZE.width;

		// in portrait mode, use full width
		const tileWidth = width / colsRequired;

		return {
			tileSize: tileWidth,
			boardHeight: `${tileWidth * (Constants.GRID_SIZE.height + 1 + 0.5)}px`,
			boardWidth: `${tileWidth * Constants.GRID_SIZE.width}px`
		};
	}

	// board + bench + spacing
	const rowsRequired = Constants.GRID_SIZE.height + 1 + 0.5;

	// in landscape mode, use full height
	const tileHeight = height / rowsRequired;

	return {
		tileSize: tileHeight,
		boardHeight: "100%",
		boardWidth: `${tileHeight * Constants.GRID_SIZE.width}px`
	};
};

const ResponsiveBoardStyles: React.FunctionComponent = () => {
	const { width, height } = useWindowSize();

	const { tileSize, boardHeight, boardWidth } = getBoardInformation(width, height);

	// todo this is ugly
	const boardContainerStyle =
		inPortraitMode(width, height)
			? `{ width: ${boardWidth}; margin: 0 auto; }`
			: `{ height: ${boardHeight}; width: ${boardWidth}; }`;

	return (
		<style
			dangerouslySetInnerHTML={{
				__html: `
            #approot { height: 100%; }
            .tile { width: ${tileSize}px; height: ${tileSize}px; }
            .positionable-piece { width: ${tileSize}px; height: ${tileSize}px; }
            .piece { width: ${tileSize}px; height: ${tileSize}px; }

            .board-container ${boardContainerStyle}

            .chessboard { height: ${tileSize * Constants.GRID_SIZE.height}px; }

            .bench { height: ${tileSize}px; }

			.spectating-overlay { height: ${tileSize}px; }

            .opponent-board-placeholder { height: ${tileSize * Constants.GRID_SIZE.height / 2}px; }
            `}}
		/>
	);
};

export { ResponsiveBoardStyles };
