import * as React from "react";

import { useSelector } from "react-redux";

import { AppState } from "../../store";
import { InfoChip } from "./InfoChip";

const RoundIndicator: React.FunctionComponent = () => {
	const round = useSelector<AppState, number | null>(
		(state) => state.game.roundInfo.round
	);

	if (round === null) {
		return null;
	}

	return <InfoChip>Round {round}</InfoChip>;
};

export { RoundIndicator };
