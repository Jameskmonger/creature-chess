import { useDispatch } from "react-redux";
import { playerClickTileAction } from "~/sagas/board/clickTileSaga";

import { PlayerPieceLocation } from "@creature-chess/models";

import { GameBoardLocation } from "../GameBoard";
import { packPosition } from "@creature-chess/board";

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
			location: packPosition(location.x, (location as any).y || 0),
		};

		dispatch(playerClickTileAction({ tile }));
	};
};
