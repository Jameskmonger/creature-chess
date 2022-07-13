import React from "react";

import { useDispatch } from "react-redux";
import { v4 } from "uuid";

import { BoardSelectors } from "@shoki/board";

import { makePiece } from "../piece";
import { board, definitions, useAppSelector } from "../state";

export function PiecePicker() {
	const dispatch = useDispatch();
	const tile = useAppSelector((state) => state.controls.selectedTile);
	const selectedPiece = useAppSelector((state) => {
		if (!tile) {
			return null;
		}

		return BoardSelectors.getPieceForPosition(state.board, tile.x, tile.y);
	});

	const [selectorOpen, setSelectorOpen] = React.useState(false);

	const onClickChoose = React.useCallback(() => {
		setSelectorOpen(!selectorOpen);
	}, [setSelectorOpen, selectorOpen]);

	const onClickRemove = React.useCallback(() => {
		if (!selectedPiece) {
			return;
		}

		dispatch(board.commands.removeBoardPiecesCommand([selectedPiece.id]));
	}, [selectedPiece]);

	React.useEffect(() => {
		if (selectedPiece) {
			setSelectorOpen(false);
		}
	}, [selectedPiece, setSelectorOpen]);

	const onChoosePiece = React.useCallback(
		(definitionIndex: number) => {
			if (!tile) {
				return;
			}

			const topHalf = tile.y < 3;

			const piece = makePiece(
				v4(),
				topHalf ? "A" : "B",
				definitionIndex,
				!topHalf
			);

			dispatch(
				board.commands.addBoardPieceCommand({ x: tile.x, y: tile.y, piece })
			);
		},
		[dispatch, tile]
	);

	if (!tile) {
		return null;
	}

	return (
		<>
			{!selectedPiece && <button onClick={onClickChoose}>Choose Piece</button>}
			{selectedPiece && <button onClick={onClickRemove}>Remove Piece</button>}

			{selectorOpen && (
				<div
					style={{
						border: "2px solid grey",
						height: "300px",
						overflow: "scroll",
					}}
				>
					{definitions.map((d, index) => (
						<div
							key={d.id}
							onClick={() => onChoosePiece(index)}
							style={{ cursor: "pointer", margin: "0.2em 0" }}
						>
							{d.name}
						</div>
					))}
				</div>
			)}
		</>
	);
}
