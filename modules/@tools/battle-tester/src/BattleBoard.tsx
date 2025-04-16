import React from "react";

import { astar, Graph } from "javascript-astar";
import { useDispatch } from "react-redux";

import { BoardSelectors, PiecePosition } from "@shoki/board";
import { rotateGridPosition } from "@shoki/board/src/utils/rotateGridPosition";

import { DndProvider } from "@shoki-web/board-react";

import {
	Path,
	Pathfinder,
	sortPaths,
} from "@creature-chess/battle/src/pathfinding";
import { getTargetAttackPositions } from "@creature-chess/battle/src/utils/getTargetAttackPositions";
import { PieceModel, TileCoordinates } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import {
	GameBoardContextProvider,
	GameBoardContext,
	GameBoard,
	PieceContextProvider,
	MatchPiece,
	GameBoardLocation,
} from "@cc-web/ui";

import { PathfinderControls } from "./controls/PathfinderControls";
import { controlSlice, useAppSelector } from "./state";

const renderPiece = (onClickPiece: any) => (piece: PieceModel) => (
	<PieceContextProvider value={{ piece, viewingPlayerId: "A" }}>
		<div
			style={{ width: "100%", height: "100%", position: "relative" }}
			onClick={() => onClickPiece(piece.id)}
		>
			<MatchPiece />

			<span
				style={{
					position: "absolute",
					bottom: 0,
					right: 0,
					zIndex: 1001,
					background: "white",
					padding: "0.1em",
				}}
			>
				{piece.id.substring(0, 4)}
			</span>
		</div>
	</PieceContextProvider>
);

function TileBackground({
	type,
	x,
	y,
	boardSize,
}: {
	type: "selected" | "path_shortest" | "path_other" | null;
	x: number;
	y: number;
	boardSize: { width: number; height: number };
}) {
	const color =
		type === null
			? "gray"
			: type === "selected"
				? "rgba(255, 165, 0, 0.9)"
				: type === "path_shortest"
					? "rgba(0, 255, 0, 0.5)"
					: "rgba(255, 0, 0, 0.5)";

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				background: color,
				border: "1px solid black",
				position: "relative",
			}}
		>
			<span
				style={{
					position: "absolute",
					top: "0.25em",
					right: "0.25em",
					background: "white",
					padding: "0.5em 0.25em",
					zIndex: 1001,
				}}
			>
				{rotateGridPosition(boardSize, { x, y }).x},
				{rotateGridPosition(boardSize, { x, y }).y}
			</span>
			<span
				style={{
					position: "absolute",
					bottom: "0.25em",
					left: "0.25em",
					background: "white",
					padding: "0.5em 0.25em",
					zIndex: 1001,
				}}
			>
				{x},{y}
			</span>
		</div>
	);
}

export function BattleBoard() {
	const dispatch = useDispatch();
	const board = useAppSelector((state) => state.board);
	const pathfinderControlState = useAppSelector(
		(state) => state.controls.pathfinder
	);

	const context: GameBoardContext = {
		board,
		bench: {
			id: "",
			locked: false,
			size: { width: GamemodeSettingsPresets["default"].benchSize, height: 1 },
			pieces: {},
			piecePositions: {},
			pieceLimit: 0,
		},
	};

	const renderTileBackground = React.useCallback(
		(position: PiecePosition) => {
			const isSelected =
				(pathfinderControlState.start &&
					position.x === pathfinderControlState.start.x &&
					position.y === pathfinderControlState.start.y) ||
				(pathfinderControlState.end &&
					position.x === pathfinderControlState.end.x &&
					position.y === pathfinderControlState.end.y);

			const isPath = pathfinderControlState.path
				? pathfinderControlState.path.some(
						(p) => p.x === position.x && p.y === position.y
					)
				: false;

			const isOtherPath = pathfinderControlState.otherPaths
				? pathfinderControlState.otherPaths.some((p) =>
						p.some((pp) => pp.x === position.x && pp.y === position.y)
					)
				: false;

			const type = isSelected
				? "selected"
				: isPath
					? "path_shortest"
					: isOtherPath
						? "path_other"
						: null;

			return (
				<TileBackground
					type={type}
					x={position.x}
					y={position.y}
					boardSize={board.size}
				/>
			);
		},
		[
			board.size,
			pathfinderControlState.end,
			pathfinderControlState.otherPaths,
			pathfinderControlState.path,
			pathfinderControlState.start,
		]
	);

	const handlePathfinder = React.useCallback(
		(event: { location: GameBoardLocation }) => {
			if (!pathfinderControlState.enabled) {
				return;
			}

			if (pathfinderControlState.end) {
				dispatch(
					controlSlice.actions.setPathfinderStart({
						start: { x: event.location.x, y: (event.location as any).y },
					})
				);
			} else if (pathfinderControlState.start) {
				const end = { x: event.location.x, y: (event.location as any).y };

				dispatch(
					controlSlice.actions.setPathfinderEnd({
						end,
					})
				);

				const pathfinder = new Pathfinder(board.size);

				const attackerPieceId =
					board.piecePositions[
						`${pathfinderControlState.start.x},${pathfinderControlState.start.y}`
					];
				const attackerPiece = board.pieces[attackerPieceId];
				const targetPieceId = board.piecePositions[`${end.x},${end.y}`];
				if (targetPieceId) {
					const targetTiles = getTargetAttackPositions(
						board.size,
						end,
						// todo configurable range
						1
					);

					const paths = targetTiles
						.map((pos) =>
							pathfinder.getPath(board, pathfinderControlState.start!, pos)
						)
						.filter((p): p is TileCoordinates[] => p !== null)
						.map((p) => ({ stepCount: p.length, firstStep: p[0], path: p }));

					if (paths.length === 0) {
						dispatch(
							controlSlice.actions.setPathfinderPath({
								path: null,
							})
						);
						return;
					}

					sortPaths(
						paths,
						pathfinderControlState.start,
						attackerPiece?.facingAway ?? false
					);

					const [shortest, ...others] = paths;

					dispatch(
						controlSlice.actions.setPathfinderPath({
							path: shortest.path,
							otherPaths: others.map((p) => p.path),
						})
					);
				} else {
					const path = pathfinder.getPath(
						board,
						pathfinderControlState.start,
						end
					);

					dispatch(
						controlSlice.actions.setPathfinderPath({
							path,
						})
					);
				}
			} else {
				dispatch(
					controlSlice.actions.setPathfinderStart({
						start: { x: event.location.x, y: (event.location as any).y },
					})
				);
			}
		},
		[board, dispatch, pathfinderControlState]
	);

	const onClickTile = React.useCallback(
		(event: { location: GameBoardLocation }) => {
			if (event.location.locationType === "bench") {
				return;
			}

			dispatch(
				controlSlice.actions.setSelectedTile({
					tile: { x: event.location.x, y: (event.location as any).y },
				})
			);

			handlePathfinder(event);
		},
		[dispatch, handlePathfinder]
	);

	const onClickPiece = React.useCallback(
		(pieceId: string) => {
			const piecePosition = BoardSelectors.getPiecePosition(board, pieceId);

			if (!piecePosition) {
				return;
			}

			dispatch(
				controlSlice.actions.setSelectedTile({
					tile: {
						x: piecePosition.x,
						y: piecePosition.y,
					},
				})
			);

			handlePathfinder({
				location: {
					locationType: "board",
					x: piecePosition.x,
					y: piecePosition.y,
				},
			});
		},
		[board, dispatch, handlePathfinder]
	);

	return (
		<DndProvider>
			<GameBoardContextProvider value={context}>
				<GameBoard
					renderBoardPiece={renderPiece(onClickPiece)}
					renderBenchPiece={renderPiece(onClickPiece)}
					renderTileBackground={renderTileBackground}
					onClick={onClickTile}
					onDropPiece={() => {
						/* empty */
					}}
				/>
			</GameBoardContextProvider>
		</DndProvider>
	);
}
