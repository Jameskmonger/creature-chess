import React from "react";

import { Layout } from "@creature-chess/ui";

type Props = {
	runScenario: () => void;
};

const Header: React.FunctionComponent<Props> = ({ runScenario }) => (
	<Layout
		className="inputs-header"
		direction="row"
		justifyContent="space-between"
	>
		<h1>Inputs</h1>
		<button onClick={runScenario}>RUN</button>
	</Layout>
);

export { Header };
