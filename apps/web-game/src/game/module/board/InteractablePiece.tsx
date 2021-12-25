import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { Piece, Projectile, usePiece } from "@creature-chess/ui";
import { AppState } from "../../../store";
import { useDrag } from "react-dnd";
import { playerClickPieceAction } from "../../module/board/sagas/clickPieceSaga";
import { createUseStyles } from "react-jss";
import classNames from "classnames";

type PieceDragObject = { piece: PieceModel };

const useStyles = createUseStyles({
	pieceContainer: {
		width: "100%",
		height: "100%",
	},
	selected: {
		boxSizing: "border-box",
		border: "2px solid #ff5200"
	}
});

export const InteractablePiece: React.FC = () => {
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

	const className = classNames(
		styles.pieceContainer,
		{ [styles.selected]: isSelected }
	);

	return (
		<div className={className}>
			<Piece
				ref={drag}
				piece={piece}
				healthbar="none"
				onClick={onClick}
			>
				<Projectile />
			</Piece>
		</div>
	);
};
