import React from "react";

import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { useDispatch, useSelector } from "react-redux";

import { BoardSelectors, BoardState } from "@shoki/board";
import { BoardGrid } from "@shoki/board-react";

import { PieceModel } from "@creature-chess/models";
import { Layout, Piece } from "@creature-chess/ui";

import { DevState } from "../store/store";
import { BoardType, uiActions } from "../store/ui";
import "./_board.scss";
import { CardSelectionOverlay } from "./cardSelection/cardSelectionOverlay";
import { CardShop } from "./cardShop/CardShop";

const Board: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const board = useSelector<DevState, BoardState<PieceModel>>(
		(state) => state.scenario.board
	);
	const renderBoardPiece = (id: string) => {
		const piece = BoardSelectors.getPiece(board, id);

		return piece ? <Piece piece={piece} healthbar="none" /> : null;
	};

	const bench = useSelector<DevState, BoardState<PieceModel>>(
		(state) => state.scenario.bench
	);
	const renderBenchPiece = (id: string) => {
		const piece = BoardSelectors.getPiece(bench, id);

		return piece ? <Piece piece={piece} healthbar="none" /> : null;
	};

	const onTileClick = (boardType: BoardType) => (one: number, two: number) => {
		const boardPosition = {
			one,
			two,
		};

		const boardParameters = {
			boardPosition,
			boardType,
		};

		dispatch(uiActions.openCardSelectionOverlay(boardParameters));
	};

	return (
		<DndProvider backend={MultiBackend} options={HTML5toTouch}>
			<Layout.Layout className="board-and-bench" direction="column">
				<CardSelectionOverlay />
				<div className="board-container bot-board">
					<BoardGrid
						state={board}
						renderItem={renderBoardPiece}
						onClick={onTileClick(BoardType.BOARD)}
					/>
				</div>
				<div className="board-container bot-bench">
					<CardSelectionOverlay />
					<BoardGrid
						state={bench}
						renderItem={renderBenchPiece}
						onClick={onTileClick(BoardType.BENCH)}
					/>
				</div>
				<div className="card-shop-container">
					<CardShop />
				</div>
			</Layout.Layout>
		</DndProvider>
	);
};

export { Board };
