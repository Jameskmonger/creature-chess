import * as React from "react";

import { createUseStyles } from "react-jss";

import { BoardState } from "@shoki/board";

import { BoardContextProvider, BoardContextValue } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { useElementSize } from "../useElementSize";
import { BoardGridRows } from "./BoardGridRows";
import { BoardItems } from "./items/BoardItems";
import { BoardItemRenderFn } from "./items/renderItem";

type BoardGridProps = {
	state: BoardState;
	scaleMode?: "width" | "height";
	renderItem: BoardItemRenderFn;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
};

const useStyles = createUseStyles<
	string,
	{ scaleMode: "width" | "height"; width: string }
>({
	boardGrid: ({ scaleMode, width }) => ({
		position: "relative",
		width,
		height: (scaleMode || "height") === "height" ? "100%" : "inherit",
	}),
	boardGridInner: {
		width: "100%",
		height: "100%",
	},
});

function useResponsiveStyles(context: BoardContextValue) {
	const {
		state: {
			size: { width, height },
		},
		ui: { scaleMode },
	} = context;

	const { ref, size } = useElementSize();

	const styleWidth =
		(scaleMode || "width") === "width"
			? "100%"
			: `${(size.height / height) * width}px`;

	const styles = useStyles({ scaleMode, width: styleWidth });

	return {
		styles,
		ref,
	};
}

export const BoardGrid = React.forwardRef<HTMLDivElement, BoardGridProps>(
	(props, forwardRef) => {
		const {
			state,
			scaleMode = "width",
			renderItem,
			onDropItem,
			onClickTile,
		} = props;

		const boardContext = {
			state,
			ui: {
				scaleMode,
			},
		};

		const { styles, ref } = useResponsiveStyles(boardContext);

		return (
			<div className={styles.boardGrid} ref={forwardRef}>
				<div className={styles.boardGridInner} ref={ref}>
					<BoardContextProvider value={boardContext}>
						<BoardGridRows onDropItem={onDropItem} onClickTile={onClickTile} />

						<BoardItems render={renderItem} />
					</BoardContextProvider>
				</div>
			</div>
		);
	}
);
