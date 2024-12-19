import * as React from "react";

import classNames from "classnames";

import { PiecePosition } from "@shoki/board";

// eslint-disable-next-line no-bitwise
const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;

export function useDefaultRenderer() {
	return React.useCallback((position: PiecePosition): React.ReactNode => {
		const isDark = isBoardTileDark(position.x, position.y);

		const className = classNames({
			dark: isDark,
			light: !isDark,
		});

		return (
			<div style={{ width: "100%", height: "100%" }} className={className} />
		);
	}, []);
}
