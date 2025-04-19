import React from "react";

import { Meta, Story } from "@storybook/react";

import { LandscapeGameScreen } from "./LandscapeGameScreen";

export default {
	title: "@creature-chess / game / Layouts / LandscapeGameScreen",
	component: LandscapeGameScreen,
	argTypes: {},
} as Meta;

const Expander = ({ background }: { background: string }) => (
	<div style={{ width: "100%", height: "100%", background }} />
);

const Template: Story<any> = (args) => (
	<div
		style={{
			width: args.width,
			height: args.height,
			border: "2px solid red",
		}}
	>
		<LandscapeGameScreen
			leftColumnContent={<Expander background="#566c86" />}
			middleColumnContent={<Expander background="#566c86" />}
			rightColumnContent={<Expander background="#566c86" />}
		/>
	</div>
);

export const Portrait = Template.bind({});
Portrait.args = {
	width: "300px",
	height: "500px",
};

export const Landscape = Template.bind({});
Landscape.args = {
	width: "500px",
	height: "300px",
};

export const Hallam = Template.bind({});
Hallam.args = {
	width: "1280px",
	height: "720px",
};

export const Hallam2 = Template.bind({});
Hallam2.args = {
	width: "700px",
	height: "720px",
};
