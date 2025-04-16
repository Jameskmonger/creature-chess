import * as React from "react";

import { useDrop } from "react-dnd";

import { Tile } from "./Tile";

export function UndroppableTile() {
	const [{}, drop] = useDrop({
		accept: "Piece",
		collect: (monitor) => ({
			isDragging: !!monitor.getItem(),
		}),
	});

	return <div ref={drop} style={{ width: "100%", height: "100%" }} />;
}
