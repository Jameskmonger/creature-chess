import * as React from "react";
import { useDrop } from "react-dnd";
import { useBoard } from "../../context";
import { getOverlayClassName } from "./getOverlayClassName";

const UndroppableTile: React.FunctionComponent<{ isDark: boolean }> = ({ isDark }) => {
	const { id } = useBoard();
	const [{ isDragging }, drop] = useDrop({
		accept: "Piece",
		collect: monitor => ({
			isDragging: !!monitor.getItem(),
		}),
	});

	return (
		<div
			ref={drop}
			className={`board-${id}-tile tile ${isDark ? "dark" : "light"} style-default`}
			touch-action="none"
		>
			<div className={`${getOverlayClassName(isDragging, false)}`} />
		</div>
	);
};

export { UndroppableTile };
