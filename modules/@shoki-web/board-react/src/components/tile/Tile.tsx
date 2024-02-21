import React, { useRef } from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { ClickBoardTileEvent } from "../../events";

type TileProps = {
	x: number;
	y: number;
	tileSizePx: number;
	onClick?: (event: ClickBoardTileEvent) => void;
};

// eslint-disable-next-line no-bitwise
const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;

const useStyles = createUseStyles({
	tile: {
		position: "relative",
		display: "inline-block",
		boxSizing: "border-box",
		userSelect: "none",
	},
	tileInner: {
		width: "100%",
		height: "100%",
	},
});

export const Tile = React.forwardRef<any, TileProps>(
	({ x, y, tileSizePx, onClick }, ref) => {
		const tileInnerRef = useRef<HTMLDivElement>(null);

		const styles = useStyles();
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
				style={{
					width: `${tileSizePx}px`,
					height: `${tileSizePx}px`,
				}}
			>
				<div ref={tileInnerRef} className={styles.tileInner} />
			</div>
		);
	}
);
