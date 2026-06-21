import React from "react";

import { SessionIdentity, SessionSource } from "@cc-plugins/api";
import type { Decorator, Meta, StoryObj } from "@storybook/react";

import { registerClientPlugin } from "~/plugins";

import { MenuStateProvider } from "../../.storybook/MenuStateProvider";
import { MenuPage } from "./menu";

let storyIdentity: SessionIdentity | null = null;
const listeners = new Set<() => void>();

const storySource: SessionSource = {
	id: "story-session",
	priority: 100,
	isAvailable: () => storyIdentity !== null,
	createHandshake: async () => null,
	getIdentity: () => storyIdentity,
	subscribe: (fn) => {
		listeners.add(fn);
		return () => {
			listeners.delete(fn);
		};
	},
};

registerClientPlugin({ id: "@story/session", sessionSources: [storySource] });

const withIdentity =
	(identity: SessionIdentity | null): Decorator =>
	function(Story) {
		storyIdentity = identity;
		listeners.forEach((fn) => fn());
		return (
			<MenuStateProvider>
				<Story />
			</MenuStateProvider>
		);
	};

const meta: Meta<typeof MenuPage> = {
	title: "@creature-chess / menu / MenuPage",
	component: MenuPage,
};
export default meta;

type Story = StoryObj<typeof MenuPage>;

export const SignedOut: Story = {
	decorators: [withIdentity(null)],
};

export const SignedIn: Story = {
	decorators: [
		withIdentity({ id: "1", name: "jkm", picture: "/images/ui/logo.png" }),
	],
};

export const SignedInLongName: Story = {
	decorators: [
		withIdentity({
			id: "2",
			name: "averyverylongnickname",
			picture: "/images/ui/logo.png",
		}),
	],
};
