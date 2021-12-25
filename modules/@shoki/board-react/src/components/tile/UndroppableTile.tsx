import * as React from "react";
import { useDrop } from "react-dnd";
import { Tile } from "./Tile";

const UndroppableTile: React.FC<{ x: number; y: number }> = ({ x, y }) => {
	const [{ }, drop] = useDrop({
		accept: "Piece",
		collect: monitor => ({
			isDragging: !!monitor.getItem(),
		}),
	});

	return <Tile ref={drop} x={x} y={y} />;
};

export { UndroppableTile };
