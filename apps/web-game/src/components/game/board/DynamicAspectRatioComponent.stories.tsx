import React from "react";

import { Meta, StoryFn } from "@storybook/react";

import { DynamicAspectRatioComponent } from "./DynamicAspectRatioComponent";

export default {
	title: "@creature-chess / game / Board / DynamicAspectRatioComponent",
	component: DynamicAspectRatioComponent,
} as Meta;

const Template: StoryFn = (args) => {
	const containerRef = React.useRef<HTMLDivElement>(null);

	return (
		<div
			style={{
				width: args.width + "px",
				height: args.height + "px",
				border: "2px solid red",
			}}
			ref={containerRef}
		>
			<DynamicAspectRatioComponent
				aspectRatio={args.aspectRatio}
				containerRef={containerRef}
			>
				<div style={{ width: "100%", height: "100%", background: "lightblue" }}>
					wawa
				</div>
			</DynamicAspectRatioComponent>
		</div>
	);
};

export const Portrait_FullBoard = Template.bind({});
Portrait_FullBoard.args = {
	width: 300,
	height: 500,
	aspectRatio: 7 / 7.2,
};

export const Portrait_HalfBoard = Template.bind({});
Portrait_HalfBoard.args = {
	width: 300,
	height: 500,
	aspectRatio: 7 / 4.2,
};

export const Landscape_FullBoard = Template.bind({});
Landscape_FullBoard.args = {
	width: 500,
	height: 300,
	aspectRatio: 7 / 7.2,
};

export const Landscape_HalfBoard = Template.bind({});
Landscape_HalfBoard.args = {
	width: 500,
	height: 300,
	aspectRatio: 7 / 4.2,
};

export const Square_FullBoard = Template.bind({});
Square_FullBoard.args = {
	width: 400,
	height: 400,
	aspectRatio: 7 / 7.2,
};

export const Square_HalfBoard = Template.bind({});
Square_HalfBoard.args = {
	width: 400,
	height: 400,
	aspectRatio: 7 / 4.2,
};
