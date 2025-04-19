import { useDispatch } from "react-redux";

import { PlayerPieceLocation } from "@creature-chess/models";

import { playerClickTileAction } from "../../../../sagas/board/clickTileSaga";
import { GameBoardLocation } from "../GameBoard";

export const useOnClickTile = ({
	canClickBoard = true,
}: { canClickBoard?: boolean } = {}) => {
	const dispatch = useDispatch();

	return ({ location }: { location: GameBoardLocation }) => {
		if (location.locationType === "board" && !canClickBoard) {
			return;
		}

		const tile: PlayerPieceLocation = {
			type: location.locationType,
			location: {
				x: location.x,
				y: (location as any).y || 0,
			},
		};

		dispatch(playerClickTileAction({ tile }));
	};
};
