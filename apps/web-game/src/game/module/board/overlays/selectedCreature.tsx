import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { getPiece, PlayerActions } from "@creature-chess/gamemode";
import { AppState } from "../../../../store";

const selectedPieceSelector = (state: AppState) =>
	state.game.ui.selectedPieceId
		? getPiece(state.game, state.game.ui.selectedPieceId)
		: null;

const SellPieceButton: React.FunctionComponent<{ pieceId: string }> = ({ pieceId }) => {
	const dispatch = useDispatch();
	const [areYouSure, setAreYouSure] = React.useState<boolean>(false);

	const onClick = (
		areYouSure
			? () => {
				dispatch(PlayerActions.sellPiecePlayerAction({ pieceId }));
			}
			: () => {
				setAreYouSure(true);
			}
	);

	React.useEffect(() => {
		setAreYouSure(false);
	}, [pieceId]);

	if (!areYouSure) {
		return <button className="ready-up" onClick={onClick}>Sell Piece</button>;
	}

	return <button className="ready-up" onClick={onClick}>Confirm?</button>;
};

const SelectedCreature: React.FunctionComponent = () => {
	const selectedPiece = useSelector<AppState, PieceModel | null>(selectedPieceSelector);

	if (!selectedPiece) {
		return null;
	}

	return (
		<>
			<SellPieceButton pieceId={selectedPiece.id} />
		</>
	);
};

export { SelectedCreature };
