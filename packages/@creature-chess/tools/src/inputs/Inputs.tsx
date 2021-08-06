import React from "react";
import { useDispatch } from "react-redux";

import { Layout } from "@creature-chess/ui/src/layout";
import { StreakType } from "@creature-chess/models";
import { Header } from "./components/header";
import { useField } from "../hooks/useField";
import { StateInputs } from "./stateInputs";
import { TraitInputs } from "./traitInputs";
import { runScenarioEvent } from "../store/events";


const Inputs: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const health = useField("Health", 100);
	const streakType = useField("Streak-Type", StreakType.WIN);
	const streakAmount = useField("Streak-Amount", 0);
	const money = useField("Money", 3);
	const level = useField("Level", 1);
	const xp = useField("XP", 0);

	const stateFields = [
		health,
		streakType,
		streakAmount,
		money,
		level,
		xp
	];

	const ambition = useField("Ambition", 100);
	const competency = useField("Competency", 100);
	const composure = useField("Composure", 100);
	const vision = useField("Vision", 100);

	const traitFields = [
		ambition,
		competency,
		composure,
		vision
	];

	const runScenario = () => {
		dispatch(runScenarioEvent({
			health: Number(health.value),
			xp: Number(xp.value),
			level: Number(level.value),
			streakAmount: Number(streakAmount.value),
			streakType: streakType.value,
			money: Number(money.value),
			ambition: Number(ambition.value),
			composure: Number(composure.value),
			competency: Number(competency.value),
			vision: Number(vision.value)
		}));
	};

	return (
		<section className="inputs-container">
			<Header
				runScenario={runScenario}
			/>
			<Layout
				className="inputs"
				direction="column"
				justifyContent="space-evenly"
			>
				<StateInputs
					stateFields={stateFields}
				/>

				<div className="spacer" />

				<TraitInputs
					traitFields={traitFields}
				/>
			</Layout>

		</section >
	);
};


export { Inputs };
