import React from "react";

import { useGlobalStyles } from "@cc-web/ui";
import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";

import { createMockStore } from "../layouts/stories-utils";
import { BoardContainer } from "./BoardContainer";

export default {
	title: "@game / BoardContainer",
	component: BoardContainer,
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => {
	useGlobalStyles();

	const store = createMockStore(false);

	return (
		<div
			style={{
				width: "500px",
				height: "400px",
				border: "2px solid red",
			}}
		>
			<Provider store={store}>
				<BoardContainer />
			</Provider>
		</div>
	);
};

export const Scale_Height = Template.bind({});
Scale_Height.args = {
	scaleMode: "height",
};

export const Scale_Width = Template.bind({});
Scale_Width.args = {
	scaleMode: "width",
};
