import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDefinitions } from "../../../../gamemode/lib";
import { v4 as uuid } from "uuid";

import { removeCardCommand, addCardCommand } from "../../store/cardShop";


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

	const setCardTo = (id: number) => {
		const newCard = returnCard(creatureDefinitions[id.toString()]);
		dispatch(addCardCommand({ newCard }));
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
