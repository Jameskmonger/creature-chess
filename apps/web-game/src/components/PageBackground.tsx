import React from "react";

import { createUseStyles } from "react-jss";
import { getRandomBoardState } from "~/utils/getRandomBoardState";

import { PieceModel } from "@creature-chess/models";

import { ThemedBoard } from "./game/board/ThemedBoard";
import { PieceContextProvider, Piece } from "./game/board/piece";

const useBackgroundStyles = createUseStyles({
	root: {
		"position": "absolute",
		"height": "200%",
		"top": "-25%",
		"left": "-25%",
		"aspectRatio": "1 / 1",
		"zIndex": -1,
		"transform": "rotate(-11deg)",
		"filter": "saturate(1.2) blur(2px)",

		// todo rework to use aspect ratio queries
		"@media (orientation: landscape)": {
			width: "140%",
			height: "auto",
		},

		"@media (orientation: portrait)": {
			height: "140%",
			width: "auto",
		},

		// support for large portrait screens e.g. iPad Pro
		"@media (orientation: portrait) and (min-width: 720px)": {
			height: "180%",
			width: "auto",
			transform: "rotate(-17deg)",
		},
	},
	segment: {
		position: "absolute",
		width: "50%",
		height: "50%",
	},
});

const renderItem = (boardId: string) => (piece: PieceModel) => ({
	item: (
		<PieceContextProvider
			value={{
				piece: {
					id: piece.id,
					definitionId: piece.definitionId,
					facingAway: piece.facingAway,
					traits: piece.traits,
					currentHealth: piece.currentHealth,
					maxHealth: piece.maxHealth,
				} as unknown as PieceModel,
				viewingPlayerId: boardId,
			}}
		>
			<Piece healthbar={piece.ownerId === "home" ? "friendly" : "enemy"} />
		</PieceContextProvider>
	),
	draggable: false,
});

export function PageBoardBackground() {
	const classes = useBackgroundStyles();

	const state1 = React.useMemo(() => getRandomBoardState("1"), []);
	const render1 = React.useMemo<any>(() => renderItem("1"), []);

	const state2 = React.useMemo(() => getRandomBoardState("2"), []);
	const render2 = React.useMemo<any>(() => renderItem("2"), []);

	const state3 = React.useMemo(() => getRandomBoardState("3"), []);
	const render3 = React.useMemo<any>(() => renderItem("3"), []);

	const state4 = React.useMemo(() => getRandomBoardState("4"), []);
	const render4 = React.useMemo<any>(() => renderItem("4"), []);

	return (
		<div className={classes.root}>
			<div className={classes.segment} style={{ top: 0, left: 0 }}>
				<ThemedBoard state={state1} renderItem={render1} dragDrop={false} />
			</div>
			<div className={classes.segment} style={{ top: 0, right: 0 }}>
				<ThemedBoard state={state2} renderItem={render2} dragDrop={false} />
			</div>
			<div className={classes.segment} style={{ bottom: 0, left: 0 }}>
				<ThemedBoard state={state3} renderItem={render3} dragDrop={false} />
			</div>
			<div className={classes.segment} style={{ bottom: 0, right: 0 }}>
				<ThemedBoard state={state4} renderItem={render4} dragDrop={false} />
			</div>
		</div>
	);
}
