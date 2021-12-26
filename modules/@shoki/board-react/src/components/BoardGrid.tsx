import * as React from "react";
import { createUseStyles } from "react-jss";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { BoardState } from "@shoki/board";
import { BoardContextProvider } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { BoardItems } from "./items/BoardItems";
import { BoardGridRows } from "./BoardGridRows";
import { BoardItemRenderFn } from "./items/renderItem";

type BoardGridProps = {
	state: BoardState;
	scaleMode?: "width";
	renderItem: BoardItemRenderFn;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
};

const useStyles = createUseStyles<string, BoardGridProps>({
	boardGrid: props => ({
		position: "relative",
		width: (props.scaleMode || "width") === "width" ? "100%" : "inherit",
		height: (props.scaleMode || "height") === "height" ? "100%" : "inherit",
	})
});

const BoardGrid: React.FunctionComponent<BoardGridProps> = (props) => {
	const styles = useStyles(props);
	const { state, scaleMode = "width", renderItem, onDropItem, onClickTile } = props;

	return (
		<div className={styles.boardGrid}>
			<DndProvider options={HTML5toTouch}>
				<BoardContextProvider value={state}>
					<BoardGridRows onDropItem={onDropItem} onClickTile={onClickTile} />

					<BoardItems render={renderItem} />
				</BoardContextProvider>
			</DndProvider>
		</div>
	);
};

export { BoardGrid };
