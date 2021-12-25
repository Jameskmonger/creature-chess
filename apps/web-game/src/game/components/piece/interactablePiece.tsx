import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { Piece, Projectile, usePiece } from "@creature-chess/ui";
import { AppState } from "../../../store";
import { useDrag } from "react-dnd";
import { playerClickPieceAction } from "../../module/board/sagas/clickPieceSaga";
import { createUseStyles } from "react-jss";

type PieceDragObject = { piece: PieceModel };

const useStyles = createUseStyles({
	selected: {
		boxSizing: "border-box",
		border: "2px solid #ff5200"
	}
});

const InteractablePiece: React.FunctionComponent<{ id: string }> = (props) => {
	const styles = useStyles();

	const { piece } = usePiece();

	const dispatch = useDispatch();
	const selectedPieceId = useSelector<AppState, string | null>(state => state.game.ui.selectedPieceId);

	const [{ }, drag] = useDrag<PieceDragObject, void, {}>({
		type: "Piece",
		item: { piece: piece as PieceModel }
	});

	const onClick = () => {
		dispatch(playerClickPieceAction({ pieceId: piece.id }));
	};

	const isSelected = selectedPieceId === piece.id;

	if (!piece) {
		return null;
	}

	return (
		<Piece
			ref={drag}
			className={isSelected ? styles.selected : ""}
			piece={piece}
			healthbar="none"
			onClick={onClick}
		>
			<Projectile />
		</Piece>
	);
};

export { InteractablePiece };
