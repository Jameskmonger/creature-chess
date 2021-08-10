import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DevState } from "../../store/store";
import { BoardGrid } from "@shoki/board-react";
import { BoardState } from "@shoki/board";
import { UninteractablePiece } from "../../uninteractablePiece/uninteractablePiece";
import { uiActions } from "../../store/ui";
import { BoardType, BoardParameters } from "../../store/ui";
import { CardSelectionOverlay } from "../CardSelectionOverlay.tsx/cardSelectionOverlay";

const renderUninteractablePiece = (id: string) => (<UninteractablePiece id={id} />);

const DevBench: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const bench = useSelector<DevState, BoardState>(state => state.scenario.bench);
	const onClick = (one: number, two: number) => {
		const boardPosition = {
			one,
			two
		};
		const boardType = BoardType.BENCH;
		const boardParameters: BoardParameters = {
			boardPosition,
			boardType
		};
		dispatch(uiActions.openCardSelectionOverlay(boardParameters));
	};
	return (
		<div className="bench">
			<CardSelectionOverlay />
			<BoardGrid
				state={bench}
				renderItem={renderUninteractablePiece}
				onClick={onClick}
			/>
		</div>
	);
};


export { DevBench };
