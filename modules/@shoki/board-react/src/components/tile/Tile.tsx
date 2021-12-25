import React, { useRef } from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { useBoard } from "../../context";
import { useTileWidth } from "./useTileWidth";

type TileProps = {
	x: number;
	y: number;
	onClick?: (x: number, y: number) => void;
};

// eslint-disable-next-line no-bitwise
const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;

const useStyles = createUseStyles<string, { boardWidth: number; tileWidth: number }>({
	tile: props => ({
		width: `${(100 / props.boardWidth).toFixed(2)}%`,
		height: `${props.tileWidth}px`,

		position: "relative",
		display: "inline-block",
		boxSizing: "border-box",
		userSelect: "none",
	}),
	tileInner: {
		width: "100%",
		height: "100%",
	}
});

export const Tile = React.forwardRef<any, TileProps>(({ x, y, onClick }, ref) => {
	const { size: { width: boardWidth } } = useBoard();

	const tileInnerRef = useRef<HTMLDivElement>(null);
	const tileWidth = useTileWidth(tileInnerRef);

	const styles = useStyles({ boardWidth, tileWidth });
	const isDark = isBoardTileDark(x, y);

	const handleClick = onClick ? () => onClick(x, y) : undefined;

	const className = classNames(
		styles.tile,
		"tile",
		{
			dark: isDark,
			light: !isDark
		}
	);

	return (
		<div
			ref={ref}
			className={className}
			touch-action="none"
			onPointerUp={handleClick}
		>
			<div ref={tileInnerRef} className={styles.tileInner} />
		</div>
	);
});
