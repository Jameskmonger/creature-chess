import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Meta, Story } from "@storybook/react";
import { attackTypes, Builders, Directions, PieceModel, TileCoordinates } from "@creature-chess/models";

import { AnimatedPiece } from "./AnimatedPiece";
import { PieceContextProvider } from "../PieceContext";

export default {
	title: "Piece/AnimatedPiece",
	component: AnimatedPiece,
	argTypes: {

	}
} as Meta;

const Board: React.FC = ({ children }) => (
	<>
		<div style={{ width: "480px", display: "flex" }}>
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }} />
			<div style={{ width: "160px", height: "160px", background: "#38b764" }} />
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }} />
		</div>
		<div style={{ width: "480px", display: "flex" }}>
			<div style={{ width: "160px", height: "160px", background: "#38b764" }} />
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }}>
				{children}
			</div>
			<div style={{ width: "160px", height: "160px", background: "#38b764" }} />
		</div>
		<div style={{ width: "480px", display: "flex" }}>
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }} />
			<div style={{ width: "160px", height: "160px", background: "#38b764" }} />
			<div style={{ width: "160px", height: "160px", background: "#a7f070" }} />
		</div>
	</>
);

const useStyles = createUseStyles({
	control: {
		"marginBottom": "1em",
		"border": "2px solid #eee",
		"padding": "0.5rem",

		"& button": {
			padding: "1rem",
		},

		"& h3": {
			marginTop: 0,
		},
	},
	buttonGroup: {
		"display": "flex",
		"flexDirection": "row",

		"&:not(:last-child)": {
			marginBottom: "1rem",
		},

		"& button": {
			marginRight: "1rem",
		},
	},
	label: {
		marginRight: "1rem",
	},
});

const useBasicAttackButtons = (piece: PieceModel, setPiece: (value: React.SetStateAction<PieceModel>) => void, damage: number) => {
	const createClickHandler = (direction: TileCoordinates) =>
		() => {
			setPiece({
				...piece,
				attacking: {
					attackType: attackTypes.basic,
					damage,
					direction,
					distance: 0,
				},
			});

			setTimeout(() => {
				setPiece({
					...piece,
					attacking: null,
				});
			}, 100);
		};

	return {
		onClickUp: createClickHandler(Directions.UP),
		onClickDown: createClickHandler(Directions.DOWN),
		onClickLeft: createClickHandler(Directions.LEFT),
		onClickRight: createClickHandler(Directions.RIGHT),
	}
};

const Template: Story<any> = (args) => {
	const styles = useStyles();

	const [piece, setPiece] = useState(Builders.buildPieceModel());
	const handleKillClick = () => setPiece({ ...piece, currentHealth: 0 });
	const handleRestoreClick = () => setPiece(Builders.buildPieceModel());

	const [damage, setDamage] = useState("5");

	const { onClickUp, onClickDown, onClickLeft, onClickRight } = useBasicAttackButtons(piece, setPiece, parseInt(damage || "0", 10));

	return (
		<div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
			<div style={{ flex: 1 }}>
				<Board>
					<PieceContextProvider value={{ piece, viewingPlayerId: piece?.ownerId }}>
						<AnimatedPiece />
					</PieceContextProvider>
				</Board>
			</div>
			<div style={{ flex: 1 }}>
				<div className={styles.control}>
					<div className={styles.buttonGroup}>
						<button onClick={handleRestoreClick}>Restore</button>
						<button onClick={handleKillClick}>Kill</button>
					</div>
				</div>

				<div className={styles.control}>
					<h3>Basic Attack</h3>

					<div className={styles.buttonGroup}>
						<span className={styles.label}>Damage</span>
						<input value={damage} onChange={event => setDamage(event.target.value)} />
					</div>


					<div className={styles.buttonGroup}>
						<button onClick={onClickUp}>Up</button>
						<button onClick={onClickDown}>Down</button>
						<button onClick={onClickLeft}>Left</button>
						<button onClick={onClickRight}>Right</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
};
