import * as React from "react";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { BoardState } from "@shoki/board";
import { BoardContextProvider } from "../context";
import { BoardItems } from "./items/BoardItems";
import { createUseStyles } from "react-jss";
import { BoardGridRows } from "./BoardGridRows";
import { BoardItemRenderFn } from "./items/renderItem";

type BoardGridProps = {
	state: BoardState;
	scaleMode?: "width";
	renderItem: BoardItemRenderFn;
	onDrop?: (id: string, x: number, y: number) => void;
	onClick?: (x: number, y: number) => void;
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
	const { state, scaleMode = "width", renderItem, onDrop, onClick } = props;

	return (
		<div className={styles.boardGrid}>
			<DndProvider options={HTML5toTouch}>
				<BoardContextProvider value={state}>
					<BoardGridRows onDrop={onDrop} onClick={onClick} />

					<BoardItems render={renderItem} />
				</BoardContextProvider>
			</DndProvider>
		</div>
	);
};

export { BoardGrid };
