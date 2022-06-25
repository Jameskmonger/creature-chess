import React from "react";

import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import { getAllDefinitions } from "@creature-chess/gamemode";

import { Overlay, DevState, boardSlice, benchSlice } from "../../store/store";
import { BoardType, uiActions } from "../../store/ui";
import "./_overlay.scss";

const BoardOverlay: React.FunctionComponent<{ children: React.ReactNode }> = ({
	children,
}) => {
	const parentSelector = () =>
		document.querySelector(".dev-tools") as HTMLElement;
	const isOpen = useSelector<DevState, boolean>(
		(state) => state.ui.overlay === Overlay.CARD_SELECTION
	);

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

const CardSelectionOverlay: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const definitions = getAllDefinitions();

	const boardParameters = useSelector<DevState, any>(
		(state) => state.ui.boardParameters
	);

	const displayOverlay = useSelector<DevState, boolean>(
		(state) => state.ui.overlay === Overlay.CARD_SELECTION
	);

	const createPiece = (definition) => {
		const stats = definition.stages[0];
		return {
			id: uuid(),
			ownerId: "local",
			definitionId: definition.id,
			definition,
			facingAway: false,
			maxHealth: stats.hp,
			currentHealth: stats.hp,
			stage: 0,
		};
	};

	const closeOverlay = (definition) => {
		const piece = createPiece(definition);
		if (boardParameters.boardType === BoardType.BENCH) {
			dispatch(
				benchSlice.commands.addBoardPieceCommand({
					piece,
					x: boardParameters.boardPosition.one,
					y: boardParameters.boardPosition.two,
				})
			);
		}
		if (boardParameters.boardType === BoardType.BOARD) {
			dispatch(
				boardSlice.commands.addBoardPieceCommand({
					piece,
					x: boardParameters.boardPosition.one,
					y: boardParameters.boardPosition.two,
				})
			);
		}
		dispatch(uiActions.closeOverlay());
	};

	if (!displayOverlay) {
		return null;
	}

	return (
		<BoardOverlay>
			{definitions.map((definition) => (
				<button key={definition.id} onClick={() => closeOverlay(definition)}>
					<img
						src={`https://creaturechess.com/images/front/${definition.id.toString()}.png`}
						alt="creature-avatar"
					/>
				</button>
			))}
		</BoardOverlay>
	);
};

export { CardSelectionOverlay };
