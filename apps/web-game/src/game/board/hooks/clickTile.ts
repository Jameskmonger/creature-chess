import { useDispatch } from "react-redux";

import { PlayerPieceLocation } from "@creature-chess/models";
import { GameBoardLocation } from "@creature-chess/ui";

import { playerClickTileAction } from "../sagas/clickTileSaga";

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
