import React from "react";

import { createUseStyles } from "react-jss";

import { PackedPosition, SubscribableBoard } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ClickBoardTileEvent, DropBoardItemEvent } from "~/components/board/events";
import { BoardGrid } from "~/components/board";

type Props = {
	theme?: "default";
	state: SubscribableBoard;
	renderItem: (piece: PieceModel["id"]) => {
		item: React.ReactNode | React.ReactNode[];
		draggable?: boolean;
	};
	renderTileBackground?: (position: PackedPosition) => React.ReactNode;
	dragDrop?: boolean;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
	canDropItem?: (id: string, x: number, y: number) => boolean;
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
			canDropItem={props.canDropItem}
			lightTileClassName={
				props.flipDarkLight ? styles.darkTile : styles.lightTile
			}
			darkTileClassName={
				props.flipDarkLight ? styles.lightTile : styles.darkTile
			}
		/>
	);
}
