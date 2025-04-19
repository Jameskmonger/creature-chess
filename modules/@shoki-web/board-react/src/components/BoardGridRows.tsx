import React from "react";

import { useBoardState } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { TileRow } from "./TileRow";

type BoardGridRowsProps = {
	tileSizePx: number;
	dragDrop: boolean;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
};

export const BoardGridRows: React.FunctionComponent<BoardGridRowsProps> = ({
	tileSizePx,
	onDropItem,
	onClickTile,
}) => {
	const {
		size: { height },
	} = useBoardState();
	const rows = [];

	for (let y = 0; y < height; y++) {
		rows.push(
			<TileRow
				y={y}
				tileSizePx={tileSizePx}
				dragDrop={true}
				onDropItem={onDropItem}
				onClickTile={onClickTile}
			/>
		);
	}

	return <>{rows}</>;
};
