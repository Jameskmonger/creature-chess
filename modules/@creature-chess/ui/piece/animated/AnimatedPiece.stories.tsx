import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Builders } from "@creature-chess/models";

import { AnimatedPiece } from "./AnimatedPiece";
import { PieceContextProvider } from "../PieceContext";

export default {
	title: "Piece/AnimatedPiece",
	component: AnimatedPiece,
	argTypes: {

	}
} as Meta;

const Board: React.FC = ({ children }) => (
	<>
		<div style={{ width: "480px", display: "flex" }}>
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }} />
			<div style={{ width: "160px", height: "160px", background: "#38b764" }} />
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }} />
		</div>
		<div style={{ width: "480px", display: "flex" }}>
			<div style={{ width: "160px", height: "160px", background: "#38b764" }} />
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }}>
				{children}
			</div>
			<div style={{ width: "160px", height: "160px", background: "#38b764" }} />
		</div>
		<div style={{ width: "480px", display: "flex" }}>
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }} />
			<div style={{ width: "160px", height: "160px", background: "#38b764" }} />
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }} />
		</div>
	</>
);

const Template: Story<any> = (args) => {
	const [piece, setPiece] = useState(Builders.buildPieceModel());
	const handleKillClick = () => setPiece({ ...piece, currentHealth: 0 });
	const handleRestoreClick = () => setPiece(Builders.buildPieceModel());

	return (
		<>
			<Board>
				<PieceContextProvider value={{ piece, viewingPlayerId: piece?.ownerId }}>
					<AnimatedPiece />
				</PieceContextProvider>
			</Board>

			<div>
				<button onClick={handleKillClick}>Kill</button>
			</div>

			<div>
				<button onClick={handleRestoreClick}>Restore</button>
			</div>
		</>
	);
};

export const Default = Template.bind({});
Default.args = {
};
