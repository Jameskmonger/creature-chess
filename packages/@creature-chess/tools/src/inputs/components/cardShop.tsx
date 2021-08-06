import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDefinitions } from "../../../../gamemode/lib";
import { v4 as uuid } from "uuid";
import { DevState } from "../../store/store";
import { Card } from "@creature-chess/models";

import { removeCardCommand, replaceCardCommand } from "../../store/cardShop";


const CardShop: React.FunctionComponent = () => {

	const dispatch = useDispatch();

	const creatureDefinitions = getAllDefinitions();
	const [hidden, setHidden] = useState("hidden");


	const hideOrDisplay = () => {
		if (hidden === "hidden") {
			setHidden("displayed");
			return;
		}
		setHidden("hidden");
	};

	const oldCard = useSelector<DevState, Card>(state => state.cardShop.cards[0]);
	const setCardTo = (id: number) => {
		const newCard = returnCard(creatureDefinitions[id.toString()]);
		dispatch(replaceCardCommand({ oldCard, newCard }));
	};

	const returnCard = (definition) => ({
		id: uuid(),
		definitionId: definition.id,
		cost: definition.cost,
		name: definition.name,
		type: definition.type,
		class: definition.class
	});


	return (
		<li>Card Shop:
			<ul>
				<li onClick={hideOrDisplay}>
					Change available cards:
				</li>
				<div className={hidden}>

					{
						creatureDefinitions.map(definition => (

							<button
								key={definition.id}
								onClick={() => setCardTo(definition.id - 1)}>
								<img
									src={`https://creaturechess.jamesmonger.com/images/front/${definition.id.toString()}.png`}
									alt="creature-avatar"
								/>
							</button>
						))
					}
					<button onClick={() => dispatch(removeCardCommand("test"))}>
						Remove card
					</button>
				</div>

			</ul>
		</li>
	);
};


export { CardShop };
