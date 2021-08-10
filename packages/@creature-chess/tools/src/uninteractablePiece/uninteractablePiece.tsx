import React from "react";
import { Piece } from "@creature-chess/ui";
import { BoardSelectors } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";
import { useSelector } from "react-redux";
import { DevState } from "../store/store";
import { useDrag } from "react-dnd";
import { BoardType } from "../store/ui";

type Props = {
	id: string;
};
type PieceDragObject = { piece: PieceModel };
const UninteractablePiece: React.FunctionComponent<Props> = ({ id }) => {

	const piece: PieceModel = useSelector<DevState, PieceModel>((state: DevState) => {
		console.log(state.ui);
		if (state.ui?.boardParameters?.boardType === BoardType.BOARD) {
			return (BoardSelectors.getPiece(state.scenario.board, id));
		}
		return (BoardSelectors.getPiece(state.scenario.bench, id));
	});
	const onClick = () => {
		console.log("Yay!");
	};
	const className = "piece";

	const [{ }, drag] = useDrag<PieceDragObject, void, {}>({
		type: "Piece",
		item: { piece }
	});
	if (!piece) {
		console.log("no InteractablePiece found for id ", id);
		return null;
	} else {
		console.log(piece);
	}
	return (
		<div className="uninteractable-piece">
			<h1 >piece</h1>
			<Piece
				className={className}
				piece={piece}
				ref={drag}
				healthbar="none"
				// eslint-disable-next-line react/jsx-no-bind
				onClick={onClick}
			/>
		</div>
	);
};


export { UninteractablePiece };
