import React from "react";

import { Layout } from "@creature-chess/ui";

import { Board } from "./board";
import { Inputs } from "./inputs/Inputs";
import { ActionsDisplay } from "./actionsDisplay/ActionsDisplay";

import "./devTools.scss";

const DevTools: React.FunctionComponent = () => (
	<Layout.Layout
		className="dev-tools"
		direction="row"
		justifyContent="center"
	>
		<Layout.Layout
			className="left-hand-side"
			direction="column"
		>
			<Inputs />
		</Layout.Layout>
		<Layout.Layout
			className="right-hand-side"
			direction="column"
		>
			<Board />
			<div className="spacer" />
			<ActionsDisplay />
		</Layout.Layout>
	</Layout.Layout>
);

export { DevTools };
