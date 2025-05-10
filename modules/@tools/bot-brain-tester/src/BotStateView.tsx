import React, { useCallback } from "react";

import { DndProvider } from "@shoki-web/board-react";

import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
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
		value: { state },
		setState,
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
						<td style={{ width: "32px" }}>{state.health}</td>
						<td>
							<input
								type="range"
								min="0"
								max="100"
								value={state.health}
								onChange={(e) => {
									const value = parseInt(e.target.value, 10);
									setState({
										...state,
										health: value,
									});
								}}
							/>
						</td>
					</tr>
					<tr>
						<td>Money</td>
						<td>{state.money}</td>
						<td>
							<input
								type="range"
								min="0"
								max="100"
								value={state.money}
								onChange={(e) => {
									const value = parseInt(e.target.value, 10);
									setState({
										...state,
										money: value,
									});
								}}
							/>
						</td>
					</tr>
					<tr>
						<td>Level</td>
						<td>{state.level}</td>
						<td>
							<input
								type="range"
								min="1"
								max="10"
								value={state.level}
								onChange={(e) => {
									const value = parseInt(e.target.value, 10);
									setState({
										...state,
										level: value,
									});
								}}
							/>
						</td>
					</tr>
					<tr>
						<td>XP</td>
						<td>{state.xp}</td>
						<td>
							<input
								type="range"
								min="0"
								max={getXpToNextLevel(state.level)}
								value={state.xp}
								onChange={(e) => {
									const value = parseInt(e.target.value, 10);
									setState({
										...state,
										xp: value,
									});
								}}
							/>
						</td>
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
					{state.cards.map((card, index) => (
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
