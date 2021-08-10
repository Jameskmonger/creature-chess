import React from "react";
import { Card } from "@creature-chess/models";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Overlay, DevState, boardSlice, benchSlice } from "../../store/store";

import "./_overlay.scss";
import { BoardType, uiActions } from "../../store/ui";
import { getAllDefinitions } from "../../../../gamemode/lib";
import { v4 as uuid } from "uuid";
import { BoardState } from "../../../../../@shoki/board/lib";


const BoardOverlay: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
	const parentSelector = () => document.querySelector(".dev-tools") as HTMLElement;
	const isOpen = useSelector<DevState, boolean>(state => state.ui.overlay === Overlay.CARD_SELECTION);

	return (
		<ReactModal
			isOpen={isOpen}
			className="modal"
			overlayClassName="modal-overlay"
			parentSelector={parentSelector}
			ariaHideApp={false}
		>
			{children}
		</ReactModal>
	);
};


const returnCard = (definition) => ({
	id: uuid(),
	definitionId: definition.id,
	cost: definition.cost,
	name: definition.name,
	type: definition.type,
	class: definition.class
});

const CardSelectionOverlay: React.FunctionComponent = () => {

	const definitions = getAllDefinitions();

	const boardParameters = useSelector<DevState, any>(state => state.ui.boardParameters);


	const dispatch = useDispatch();

	const displayOverlay = useSelector<DevState, boolean>(state => state.ui.overlay === Overlay.CARD_SELECTION);

	const makePieceFromCard = (card: Card) => {
		console.log(card);
		return {
			piece: 1
		};
	};

	const createPiece = (definition) => {
		const stats = definition.stages[0];
		console.log(definition);
		return {
			id: uuid(),
			ownerId: "local",
			definitionId: definition.id,
			definition,
			facingAway: false,
			maxHealth: stats.hp,
			currentHealth: stats.hp,
			stage: 0
		};
	};

	const closeOverlay = (definition) => {
		const piece = createPiece(definition);
		if (boardParameters.boardType === BoardType.BENCH) {
			dispatch(benchSlice.commands.addBoardPieceCommand({ piece, x: boardParameters.boardPosition.one, y: boardParameters.boardPosition.two }));
		}
		if (boardParameters.boardType === BoardType.BOARD) {
			dispatch(boardSlice.commands.addBoardPieceCommand({ piece, x: boardParameters.boardPosition.one, y: boardParameters.boardPosition.two }));
		}
		dispatch(uiActions.closeOverlay());
	};
	if (!displayOverlay) {
		console.log("No overlay");
		return null;
	}
	return (

		<BoardOverlay>
			<h1>OVERLAY</h1>
			{
				definitions.map(definition => (

					<button
						key={definition.id}
						onClick={() => closeOverlay(definition)}>
						<img
							src={`https://creaturechess.jamesmonger.com/images/front/${definition.id.toString()}.png`}
							alt="creature-avatar"
						/>
					</button>
				))
			}
		</BoardOverlay>
	);
};


export { CardSelectionOverlay };
;
