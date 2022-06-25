import React from "react";

import { Layout } from "@creature-chess/ui";

import { Board } from "./board";
import "./devTools.scss";
import { Inputs } from "./inputs/Inputs";

const DevTools: React.FunctionComponent = () => (
	<Layout.Layout className="dev-tools" direction="row" justifyContent="center">
		<Layout.Layout className="left-hand-side" direction="column">
			<Inputs />
		</Layout.Layout>
		<Layout.Layout className="right-hand-side" direction="column">
			<Board />
		</Layout.Layout>
	</Layout.Layout>
);

export { DevTools };
