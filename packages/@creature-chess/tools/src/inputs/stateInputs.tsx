import React from "react";
import { CardShopInputs } from "./components/cardShopInputs";
import { PlayerInfo } from "./components/playerInfoInputs";

type Props = {
	stateFields: {
		label: string;
		value: any;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	}[];
};

const StateInputs: React.FunctionComponent<Props> = ({ stateFields }) => (
	<section className="state-inputs">
		<div className="state-inputs-header">
			<h1>State</h1>
		</div>
		<ul>
			<PlayerInfo
				stateFields={stateFields}
			/>
			<CardShopInputs />
		</ul>
	</section >
);

export { StateInputs };
