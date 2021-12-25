import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { Builders, GRID_SIZE, PieceModel } from "@creature-chess/models";

import { GameBoard } from "./GameBoard";
import { GameBoardContextProvider } from "./GameBoardContext";
import { createInitialBoardState } from "@shoki/board";

export default {
	title: "GameBoard",
	component: GameBoard,
	argTypes: {

	}
} as Meta;


const Template: Story<any> = (args) => {
	const context = {
		board: createInitialBoardState<PieceModel>(
			"board",
			{ width: GRID_SIZE.width, height: GRID_SIZE.height }
		),
		bench: createInitialBoardState<PieceModel>(
			"bench",
			{ width: GRID_SIZE.width, height: 1 }
		)
	};

	return (
		<DndProvider options={HTML5toTouch}>
			<div style={{ width: "500px", height: "800px" }}>
				<GameBoardContextProvider value={context}>
					<GameBoard />
				</GameBoardContextProvider>
			</div>
		</DndProvider>
	);
};

export const Default = Template.bind({});
Default.args = {
};
