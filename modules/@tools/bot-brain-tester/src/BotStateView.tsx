import React from "react";

import { DndProvider } from "@shoki-web/board-react";

import { PieceModel } from "@creature-chess/models";

import { GameBoard } from "@creature-chess-app/web-game/src/components/game/board/GameBoard";
import {
	GameBoardContext,
	GameBoardContextProvider,
} from "@creature-chess-app/web-game/src/components/game/board/GameBoardContext";
import {
	PieceContextProvider,
	Piece,
} from "@creature-chess-app/web-game/src/components/game/board/piece";

import { useBotBrain } from "./context";
import { useAppSelector } from "./state";

const renderPiece = () => (piece: PieceModel) => (
	<PieceContextProvider value={{ piece, viewingPlayerId: "A" }}>
		<div
			style={{ width: "100%", height: "100%" }}
			onClick={() => {
				/* empty */
			}}
		>
			<Piece healthbar="none" />
		</div>
	</PieceContextProvider>
);

function BotMetaState() {
	const {
		state: { health, money, level, xp, cards },
	} = useBotBrain();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<table>
				<tbody>
					<tr>
						<td>Health</td>
						<td>{health}</td>
					</tr>
					<tr>
						<td>Money</td>
						<td>{money}</td>
					</tr>
					<tr>
						<td>Level</td>
						<td>{level}</td>
					</tr>
					<tr>
						<td>XP</td>
						<td>{xp}</td>
					</tr>
				</tbody>
			</table>

			<table>
				<thead>
					<tr>
						<td>Card</td>
						<td>Cost</td>
					</tr>
				</thead>
				<tbody>
					{cards.map((card, index) => (
						<tr key={index}>
							<td>{card.name}</td>
							<td>${card.cost}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function BotStateView() {
	const board = useAppSelector((state) => state.board);
	const bench = useAppSelector((state) => state.bench);

	const context: GameBoardContext = {
		board,
		bench,
	};

	return (
		<DndProvider>
			<GameBoardContextProvider value={context}>
				<BotMetaState />
				<GameBoard
					renderBoardPiece={renderPiece()}
					renderBenchPiece={renderPiece()}
					onClick={() => {
						/* empty */
					}}
					onDropPiece={() => {
						/* empty */
					}}
				/>
			</GameBoardContextProvider>
		</DndProvider>
	);
}
