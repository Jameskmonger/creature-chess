import React from "react";
import * as constants from "@creature-chess/models";
import { BoardAndBench } from "./boardAndBench/BoardAndBench";
import "./devTools.scss";
import { Layout } from "@creature-chess/ui/lib/layout";
import { FillerList } from "./snippets/fillerList";
import { Inputs } from "./inputs/Inputs";

const DevTools: React.FunctionComponent = () => {
	const one = 1;

	return (
		<Layout
			className="dev-tools"
			direction="row"
			justifyContent="center"
		>
			<Layout
				className="left-hand-side"
				direction="column"
			>
				<Inputs />
			</Layout>
			<Layout
				className="right-hand-side"
				direction="column"
			>
				<BoardAndBench />
				<div className="spacer" />
				<section className="actions">
					<div className="actions-banner">
						<h1>Actions</h1>
					</div>

					<FillerList />
				</section>
			</Layout>
		</Layout>
	);
};

export { DevTools };
