import React from "react";
import { Layout } from "@creature-chess/ui";

interface Props {
	runScenario: () => void;
}

const Header: React.FunctionComponent<Props> = ({ runScenario }) => (

	<Layout.Layout
		className="inputs-header"
		direction="row"
		justifyContent="space-between"
	>
		<h1>Inputs</h1>
		<button onClick={runScenario}>RUN</button>
	</Layout.Layout>
);


export { Header };
