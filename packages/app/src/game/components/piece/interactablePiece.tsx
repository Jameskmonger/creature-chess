import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { Piece } from "@creature-chess/ui";
import { AppState } from "../../../store";
import { Projectile } from "../projectile";
import { DragObjectWithType, useDrag } from "react-dnd";
import { selectPiece } from "../../ui/actions";

type PieceDragObject = DragObjectWithType & { piece: PieceModel };

const InteractablePiece: React.FunctionComponent<{ id: string }> = (props) => {
	const { id } = props;
	const dispatch = useDispatch();
	const isSelected = useSelector<AppState, boolean>(state => state.game.ui.selectedPieceId === id);
	const piece = useSelector<AppState, PieceModel>(state => getPiece(state.game, id));

	const [{ }, drag] = useDrag<PieceDragObject, void, {}>({
		item: { type: "Piece", piece }
	});

	const onClick = () => {
		dispatch(selectPiece(id));
	};

	const className = `piece ${isSelected ? "selected" : ""}`;

	if (!piece) {
		console.log("no InteractablePiece found for id ", id);
		return null;
	}

	return (
		<Piece
			ref={drag}
			className={className}
			piece={piece}
			healthbar="none"
			// eslint-disable-next-line react/jsx-no-bind
			onClick={onClick}
		>
			<Projectile />
		</Piece>
	);
};

export { InteractablePiece };
