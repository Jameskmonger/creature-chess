import React, { useRef } from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { useBoardState } from "../../context";
import { ClickBoardTileEvent } from "../../events";

type TileProps = {
	x: number;
	y: number;
	onClick?: (event: ClickBoardTileEvent) => void;
};

// eslint-disable-next-line no-bitwise
const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;

const useStyles = createUseStyles<string, { boardWidth: number }>({
	tile: (props) => ({
		width: `${(100 / props.boardWidth).toFixed(2)}%`,
		height: `100%`,

		position: "relative",
		display: "inline-block",
		boxSizing: "border-box",
		userSelect: "none",
	}),
	tileInner: {
		width: "100%",
		height: "100%",
	},
});

export const Tile = React.forwardRef<any, TileProps>(
	({ x, y, onClick }, ref) => {
		const {
			size: { width: boardWidth },
		} = useBoardState();

		const tileInnerRef = useRef<HTMLDivElement>(null);

		const styles = useStyles({ boardWidth });
		const isDark = isBoardTileDark(x, y);

		const handleClick = onClick ? () => onClick({ x, y }) : undefined;

		const className = classNames(styles.tile, "tile", {
			dark: isDark,
			light: !isDark,
		});

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
	}
);
