import React from "react";
import { FillerList } from "../snippets/fillerList";

const ActionsDisplay: React.FunctionComponent = () => { //eslint-disable-line
	return (
		<section className="actions">
			<div className="actions-banner">
				<h1>Actions</h1>
			</div>
			<FillerList />
		</section>
	);
};


export { ActionsDisplay };
