import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BoardState } from "@shoki/board";
import { ClickBoardTileEvent, DndProvider, DropBoardItemEvent } from "@shoki-web/board-react";

import { BoardGrid } from "./BoardGrid";

type ChessBoardStoryTemplateProps = {
	board: BoardState;
	draggable: boolean;
	containerWidthPx: number;
	containerHeightPx: number;
};

function ChessBoardStoryTemplate({
	board,
	draggable,
	containerWidthPx = 500,
	containerHeightPx = 500,
}: ChessBoardStoryTemplateProps) {
	return (
		<div style={{
			width: `${containerWidthPx}px`,
			height: `${containerHeightPx}px`,
			border: "2px solid black"
		}}>
			<ExampleStyling />
			<DndProvider>
				<BoardGrid
					state={board}
					renderItem={(item) => ({
						item: (
							<span style={{ background: "#FF0000" }}>
								{item.id}
							</span>
						),
						draggable
					})}
					onDropItem={(event: DropBoardItemEvent) => { /* ... */}}
					onClickTile={(event: ClickBoardTileEvent) => { /* ... */}}
				/>
			</DndProvider>
		</div>
	);
}

function ExampleStyling() {
	return (
		<style
			dangerouslySetInnerHTML={{
				__html: `
					.tile {
						border: 1px solid black;
					}

					.tile.dark {
						background-color: #d18b47;
					}

					.tile.light {
						background-color: #ffce9e;
					}
				`,
			}}
		/>
	);
}

const meta: Meta<typeof ChessBoardStoryTemplate> = {
	title: "@shoki-web / board-react / ChessBoard",
	component: ChessBoardStoryTemplate,
};
export default meta;

/**
 * Example board state with pieces in all directions
 */
const exampleBoardState: BoardState = {
	id: "test-board",
	pieceLimit: null,
	pieces: {
		// vertical
		["0-0"]: { id: "0-0" },
		["0-1"]: { id: "0-1" },
		["0-2"]: { id: "0-2" },
		["0-3"]: { id: "0-3" },
		["0-4"]: { id: "0-4" },
		["0-5"]: { id: "0-5" },
		["0-6"]: { id: "0-6" },
		["0-7"]: { id: "0-7" },

		// horizontal
		["1-0"]: { id: "1-0" },
		["2-0"]: { id: "2-0" },
		["3-0"]: { id: "3-0" },
		["4-0"]: { id: "4-0" },
		["5-0"]: { id: "5-0" },
		["6-0"]: { id: "6-0" },
		["7-0"]: { id: "7-0" },

		// diagonal
		["1-1"]: { id: "1-1" },
		["2-2"]: { id: "2-2" },
		["3-3"]: { id: "3-3" },
		["4-4"]: { id: "4-4" },
		["5-5"]: { id: "5-5" },
		["6-6"]: { id: "6-6" },
		["7-7"]: { id: "7-7" },
	},
	piecePositions: {
		// vertical
		["0,0"]: "0-0",
		["0,1"]: "0-1",
		["0,2"]: "0-2",
		["0,3"]: "0-3",
		["0,4"]: "0-4",
		["0,5"]: "0-5",
		["0,6"]: "0-6",
		["0,7"]: "0-7",

		// horizontal
		["1,0"]: "1-0",
		["2,0"]: "2-0",
		["3,0"]: "3-0",
		["4,0"]: "4-0",
		["5,0"]: "5-0",
		["6,0"]: "6-0",
		["7,0"]: "7-0",

		// diagonal
		["1,1"]: "1-1",
		["2,2"]: "2-2",
		["3,3"]: "3-3",
		["4,4"]: "4-4",
		["5,5"]: "5-5",
		["6,6"]: "6-6",
		["7,7"]: "7-7",
	},
	size: { width: 8, height: 8 },
	locked: false,
};

type Story = StoryObj<typeof ChessBoardStoryTemplate>;
export const NotDraggable: Story = {
	args: {
		board: exampleBoardState,
	},
};

export const Draggable: Story = {
	args: {
		board: exampleBoardState,
		draggable: true,
	},
};

export const SquareContainer: Story = {
	args: {
		board: exampleBoardState,
		containerWidthPx: 500,
		containerHeightPx: 500,
	},
};

export const PortraitContainer: Story = {
	args: {
		board: exampleBoardState,
		containerWidthPx: 300,
		containerHeightPx: 500,
	},
};

export const LandscapeContainer: Story = {
	args: {
		board: exampleBoardState,
		containerWidthPx: 500,
		containerHeightPx: 300,
	},
};
