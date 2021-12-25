import React from "react";
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

const piece = Builders.buildPieceModel();

const Template: Story<any> = (args) => (
	<Board>
		<PieceContextProvider value={{ piece, viewingPlayerId: piece?.ownerId }}>
			<AnimatedPiece />
		</PieceContextProvider>
	</Board>
);

export const Default = Template.bind({});
Default.args = {
};
