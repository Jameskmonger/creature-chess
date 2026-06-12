import { PlayerActions } from "@creature-chess/models";
import { useDispatch, useStore } from "react-redux";
import { AppState } from "~/store";
import { clearSelectedPiece, UIActions } from "~/store/game/ui";

export const useOnClickPiece = () => {
	const dispatch = useDispatch();
	const store = useStore<AppState>();

	return (pieceId: string) => {
		const selectedPieceId = store.getState().game.ui.selectedPieceId;

		if (selectedPieceId === null) {
			dispatch(UIActions.selectPiece(pieceId));
			return;
		}

		dispatch(
			PlayerActions.swapPiecePlayerAction({
				pieceAId: selectedPieceId,
				pieceBId: pieceId,
			})
		);
		dispatch(clearSelectedPiece());
	};
};
