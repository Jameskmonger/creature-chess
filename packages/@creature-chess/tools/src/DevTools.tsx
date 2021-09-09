import React from "react";

import { BoardAndBench } from "./boardAndBench/BoardAndBench";
import { Layout } from "@creature-chess/ui";
import { Inputs } from "./inputs/Inputs";
import { ActionsDisplay } from "./actionsDisplay/ActionsDisplay";

import "./devTools.scss";

const DevTools: React.FunctionComponent = () => { // eslint-disable-line

	return (
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
				<BoardAndBench />
				<div className="spacer" />
				<ActionsDisplay />
			</Layout.Layout>
		</Layout.Layout>
	);
};

export { DevTools };
