import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDefinitions } from "@creature-chess/gamemode";
import { v4 as uuid } from "uuid";

import { removeCardCommand, addCardCommand } from "../../store/devCardShop";

const CardShopInputs: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const creatureDefinitions = getAllDefinitions();
	const [hidden, setHidden] = useState(false);

	const toggleHidden = () => {
		setHidden(!hidden);
	};

	const addCardToShop = (id: number) => {
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
		<li>
			Card Shop:
			<ul>
				<li onClick={toggleHidden}>
					Change available cards:
				</li>
				<div className={hidden ? "hidden" : "displayed"}>
					{
						creatureDefinitions.map(definition => (

							<button
								key={definition.id}
								onClick={() => addCardToShop(definition.id - 1)}>
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

export { CardShopInputs };
