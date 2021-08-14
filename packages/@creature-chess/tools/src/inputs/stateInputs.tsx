import React from "react";
import { CardShop } from "./components/cardShop";
import { PlayerInfo } from "./components/playerInfoInputs";

interface Props {
	stateFields: {
		label: string;
		value: any;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	}[];
}

const StateInputs: React.FunctionComponent<Props> = ({ stateFields }) => (

	<section className="state-inputs">
		<div className="state-inputs-header">
			<h1>State</h1>
		</div>
		<ul>
			<PlayerInfo
				stateFields={stateFields}
			/>
			<CardShop />
		</ul>
	</section >
);


export { StateInputs };
