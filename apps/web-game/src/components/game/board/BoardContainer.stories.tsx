import React from "react";

import { Meta, Story } from "@storybook/react";

import { BoardContainer } from "./BoardContainer";

export default {
	title: "@creature-chess / game / Board / BoardContainer",
	component: BoardContainer,
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => (
	<div
		style={{
			width: "500px",
			height: "400px",
			border: "2px solid red",
		}}
	>
		<BoardContainer />
	</div>
);

export const Scale_Height = Template.bind({});
Scale_Height.args = {
	scaleMode: "height",
};

export const Scale_Width = Template.bind({});
Scale_Width.args = {
	scaleMode: "width",
};
