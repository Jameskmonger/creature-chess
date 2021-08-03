import React, { useState } from "react";
import { Layout } from "@creature-chess/ui/lib/layout";
import { v4 as uuid } from "uuid";
import { FillerList } from "../snippets/fillerList";
import { InputListItem } from "./inputListItem";
import { botInfoActions } from "../store/botInfo";
import { Card, StreakType } from "@creature-chess/models";
import { getDefinitionById, PlayerActions, PlayerEvents } from "../../../gamemode/lib";
import { PlayerInfoUpdateCommandActionTypesArray } from "../../../gamemode/lib/entities/player/state/commands";
import { useDispatch, useSelector } from "react-redux";
import { getAllDefinitions } from "@creature-chess/gamemode";
import { DevState } from "../store/store";
import { removeCardCommand, replaceCardCommand } from "../store/cardShop";
import { Card as CardUi } from "@creature-chess/ui";
import { CardDeck } from "@creature-chess/gamemode";

const returnCard = (definition) => {
	return ({
		id: uuid(),
		definitionId: definition.id,
		cost: definition.cost,
		name: definition.name,
		type: definition.type,
		class: definition.class
	});
};

const Inputs: React.FunctionComponent = () => {
	const dispatch = useDispatch();


	const [healthValue, setHealthValue] = useState("100");
	const [streakTypeValue, setStreakTypeValue] = useState("Win");
	const [streakAmountValue, setStreakAmountValue] = useState("0");
	const [moneyValue, setMoneyValue] = useState("3");
	const [levelValue, setLevelValue] = useState("1");
	const [xpValue, setXpValue] = useState("0");

	const [ambitionValue, setAmbitionValue] = useState("100");
	const [composureValue, setComposureValue] = useState("100");
	const [competencyValue, setCompetencyValue] = useState("100");
	const [visionValue, setVisionValue] = useState("100");

	const [hidden, setHidden] = useState("hidden");

	const creatureDefinitions = getAllDefinitions();

	const hideOrDisplay = () => {
		console.log("changed");
		if (hidden === "hidden") {
			setHidden("displayed");
			return;
		}
		setHidden("hidden");
	};

	const runScenario = () => {
		console.log(creatureDefinitions);
		dispatch({ type: "updateHealthCommand", payload: Number(healthValue) });
		dispatch({ type: "updateMoneyCommand", payload: Number(moneyValue) });
		dispatch({ type: "updateLevelCommand", payload: { level: Number(levelValue), xp: Number(xpValue) } });
		dispatch({ type: "updateStreakCommand", payload: { amount: streakAmountValue, type: streakTypeValue } });

		dispatch(botInfoActions.updateAmbitionCommand(Number(ambitionValue)));
		dispatch(botInfoActions.updateCompetencyCommand(Number(competencyValue)));
		dispatch(botInfoActions.updateComposureCommand(Number(composureValue)));
		dispatch(botInfoActions.updateVisionCommand(Number(visionValue)));
	};
	const oldCard = useSelector<DevState, Card>(state => state.cardShop.cards[0]);

	const setCardTo = (id: number, index: number) => {

		const newCard = returnCard(creatureDefinitions[id.toString()]);
		console.log(newCard, oldCard);
		dispatch(replaceCardCommand({ oldCard, newCard }));
	};
	return (
		<section className="inputs-container">
			<Layout
				className="inputs-header"
				direction="row"
				justifyContent="space-between"
			>
				<h1>Inputs</h1>
				<button onClick={runScenario}>RUN</button>


			</Layout>

			<Layout
				className="inputs"
				direction="column"
				justifyContent="space-evenly"
			>
				<section className="state-inputs">
					<div className="state-inputs-header">
						<h1>State</h1>
					</div>
					<ul>
						<li>

							<li>Player Info:
								<ul>
									<InputListItem
										heading="Health"
										value={healthValue}
										onChange={(e) => setHealthValue(e.target.value)}
									/>
									<InputListItem
										heading="Streak-Type"
										value={streakTypeValue}
										onChange={(e) => setStreakTypeValue(e.target.value)}
									/>
									<InputListItem
										heading="Streak-Amount"
										value={streakAmountValue}
										onChange={(e) => setStreakAmountValue(e.target.value)}
									/>
									<InputListItem
										heading="Money"
										value={moneyValue}
										onChange={(e) => setMoneyValue(e.target.value)}
									/>
									<InputListItem
										heading="Level"
										value={levelValue}
										onChange={(e) => setLevelValue(e.target.value)}
									/>
									<InputListItem
										heading="XP"
										value={xpValue}
										onChange={(e) => setXpValue(e.target.value)}
									/>
								</ul>
							</li>
							<li>Card Shop:
								<ul>
									<li onClick={hideOrDisplay}>Change available cards:</li>
									<div className={hidden}>

										{creatureDefinitions.map(definition => {
											return (
												<button
													onClick={() => setCardTo(definition.id - 1, 0)}>
													<img src={`https://creaturechess.jamesmonger.com/images/front/${definition.id.toString()}.png`}
													/></button>
											)
										})}
										<button onClick={() => dispatch(removeCardCommand("test"))}>
											Remove card
										</button>
									</div>

								</ul>
							</li>

						</li>
					</ul>
				</section>
				<div className="spacer" />
				<section className="trait-inputs">
					<div className="trait-inputs-header">
						<h1>Traits</h1>
					</div>
					<ul>
						<InputListItem
							heading="Ambition"
							value={ambitionValue}
							onChange={(e) => setAmbitionValue(e.target.value)}
						/>
						<InputListItem
							heading="Composure"
							value={composureValue}
							onChange={(e) => setComposureValue(e.target.value)}
						/>
						<InputListItem
							heading="Competency"
							value={competencyValue}
							onChange={(e) => setCompetencyValue(e.target.value)}
						/>
						<InputListItem
							heading="Vision"
							value={visionValue}
							onChange={(e) => setVisionValue(e.target.value)}
						/>

					</ul>
				</section>
			</Layout>

		</section >
	);
};


export { Inputs };
