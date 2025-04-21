import React from "react";

import { createUseStyles } from "react-jss";

import { BoardState, HasId, PiecePosition } from "@shoki/board";

import {
	BoardGrid,
	ClickBoardTileEvent,
	DropBoardItemEvent,
} from "@shoki-web/board-react";

import { PieceModel } from "@creature-chess/models";

type Props = {
	theme?: "default";
	state: BoardState<PieceModel>;
	renderItem: (piece: HasId) => {
		item: React.ReactNode | React.ReactNode[];
		draggable?: boolean;
	};
	renderTileBackground?: (position: PiecePosition) => React.ReactNode;
	dragDrop?: boolean;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
	flipDarkLight?: boolean;
};

const useStyles = createUseStyles<string, Props>({
	lightTile: {
		background: ({ theme = "default" }) => {
			switch (theme) {
				case "default":
					return "#a7f070";
				default:
					return "#fff";
			}
		},
	},
	darkTile: {
		background: ({ theme = "default" }) => {
			switch (theme) {
				case "default":
					return "#38b764";
				default:
					return "#000";
			}
		},
	},
});

export function ThemedBoard(props: Props) {
	const styles = useStyles(props);

	return (
		<BoardGrid
			state={props.state}
			renderItem={props.renderItem}
			renderTileBackground={props.renderTileBackground}
			dragDrop={props.dragDrop}
			onDropItem={props.onDropItem}
			onClickTile={props.onClickTile}
			lightTileClassName={
				props.flipDarkLight ? styles.darkTile : styles.lightTile
			}
			darkTileClassName={
				props.flipDarkLight ? styles.lightTile : styles.darkTile
			}
		/>
	);
}
