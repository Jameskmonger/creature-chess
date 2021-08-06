import React from "react";
import { Piece } from "../../../ui/src/piece/piece";
import { BoardSelectors } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";
import { useSelector } from "react-redux";
import { DevState } from "@creature-chess/tools";
import { useDrag } from "react-dnd";

type Props = {
	id: string;
};
type PieceDragObject = { piece: PieceModel };
const UninteractablePiece: React.FunctionComponent<Props> = ({ id }) => {

	const piece: PieceModel = useSelector<DevState, PieceModel>((state: DevState) => BoardSelectors.getPiece(state.board, id));
	const onClick = () => {
		console.log("Yay!");
	};
	const className = "piece";

	const [{ }, drag] = useDrag<PieceDragObject, void, {}>({
		type: "Piece",
		item: { piece }
	});
	return (
		<Piece
			className={className}
			piece={piece}
			ref={drag}
			healthbar="none"
			// eslint-disable-next-line react/jsx-no-bind
			onClick={onClick}
		/>
	);
};


export { UninteractablePiece };
