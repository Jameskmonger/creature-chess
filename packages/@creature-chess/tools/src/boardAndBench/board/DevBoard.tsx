import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BoardGrid } from "@shoki/board-react";
import { BoardState } from "@shoki/board";
import { DevState, Overlay } from "../../store/store";
import { UninteractablePiece } from "../../uninteractablePiece/uninteractablePiece";
import { CardSelectionOverlay } from "../CardSelectionOverlay.tsx/cardSelectionOverlay";
import { BoardType, uiActions } from "../../store/ui";

const renderUninteractablePiece = (id: string) => (<UninteractablePiece id={id} />);

const DevBoard: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const board = useSelector<DevState, BoardState>(state => state.scenario.board);

	const onClick = (one: number, two: number) => {
		const boardPosition = {
			one,
			two
		};
		const boardType = BoardType.BOARD;
		const boardParameters = {
			boardPosition,
			boardType
		};
		dispatch(uiActions.openCardSelectionOverlay(boardParameters));
		console.log("yes");
	};
	return (
		<div className="dev-board">
			<CardSelectionOverlay />
			<BoardGrid
				state={board}
				renderItem={renderUninteractablePiece}
				onClick={onClick}
			/>
		</div>
	);
};


export { DevBoard };
