import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { DynamicAspectRatioComponent } from "./DynamicAspectRatioComponent";

const meta: Meta<any> = {
	title: "@creature-chess / game / Board / DynamicAspectRatioComponent",
	component: DynamicAspectRatioComponent,
	render: (args) => {
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
					<div
						style={{ width: "100%", height: "100%", background: "lightblue" }}
					>
						wawa
					</div>
				</DynamicAspectRatioComponent>
			</div>
		);
	},
};
export default meta;

type Story = StoryObj<any>;

export const Portrait_FullBoard: Story = {
	args: {
		width: 300,
		height: 500,
		aspectRatio: 7 / 7.2,
	},
};

export const Portrait_HalfBoard: Story = {
	args: {
		width: 300,
		height: 500,
		aspectRatio: 7 / 4.2,
	},
};

export const Landscape_FullBoard: Story = {
	args: {
		width: 500,
		height: 300,
		aspectRatio: 7 / 7.2,
	},
};

export const Landscape_HalfBoard: Story = {
	args: {
		width: 500,
		height: 300,
		aspectRatio: 7 / 4.2,
	},
};

export const Square_FullBoard: Story = {
	args: {
		width: 400,
		height: 400,
		aspectRatio: 7 / 7.2,
	},
};

export const Square_HalfBoard: Story = {
	args: {
		width: 400,
		height: 400,
		aspectRatio: 7 / 4.2,
	},
};
