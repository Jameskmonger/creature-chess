import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { ICON_FOR_TRAIT } from "~/components/ui/TraitIcon";

import { PieceModel } from "@creature-chess/models";

import { CreatureImage } from "../../../ui/creatureImage";
import { PieceHealthbar } from "./meta/PieceHealthbar";

interface Props {
	piece: PieceModel;
	healthbar?: { color: "friendly" | "enemy"; current: number };
	facing?: "front" | "back";

	className?: string;
	children?: React.ReactNode | React.ReactNode[];
	onClick?: () => void;
}

const useStyles = createUseStyles({
	piece: {
		"position": "relative",
		"width": "100%",
		"height": "100%",

		"& > img": {
			position: "absolute",
			bottom: 0,
			right: 0,
			width: "80%",
		},

		"containerName": "piece",
		"containerType": "size",
	},
	imageContainer: {
		position: "absolute",
		bottom: "0",
		left: "14%",
		width: "80%",
		height: "80%",
	},
	healthbarContainer: {
		"position": "absolute",
		"top": "4%",
		"left": "4%",
		"height": "10%",
		"width": "70%",

		"@container piece (max-width: 64px)": {
			height: "18%",
			width: "66%",
		},
	},
	traits: {
		"display": "flex",
		"flexDirection": "column",
		"gap": "2px",
		"position": "absolute",
		"top": "4%",
		"right": "4%",
		"background": "rgb(49 54 56 / 50%)",
		"width": "16%",
		"padding": "2px",

		"@container piece (max-width: 64px)": {
			width: "14%",
		},
	},
	stage: {
		display: "flex",
		flexDirection: "row",
		gap: "2px",
		position: "absolute",
		bottom: "4%",
		right: "4%",

		background: "rgb(49 54 56 / 50%)",
		height: "14%",
		padding: "2px",
	},
});

export function Piece({
	piece,
	healthbar,
	facing = "front",
	className,
	children,
	onClick,
}: Props) {
	const classes = useStyles();

	return (
		<div className={classNames(classes.piece, className)} onClick={onClick}>
			<div className={classes.healthbarContainer}>
				{healthbar && (
					<PieceHealthbar
						color={healthbar.color}
						current={healthbar.current}
						max={piece.maxHealth}
					/>
				)}
			</div>

			<div className={classes.imageContainer}>
				<CreatureImage
					definitionId={piece.definitionId}
					facing={facing === "back" ? "back" : "front"}
				/>
			</div>

			{piece.stage > 0 && (
				<div className={classes.stage}>
					{Array.from({ length: piece.stage + 1 }, (_, i) => (
						<img key={i} src={`${APP_IMAGE_ROOT}/ui/star.svg`} />
					))}
				</div>
			)}

			{piece.traits.length > 0 && (
				<div className={classes.traits}>
					{piece.traits.map((trait) => (
						<img
							key={trait}
							src={ICON_FOR_TRAIT[trait]}
							alt={`${trait} trait`}
						/>
					))}
				</div>
			)}

			{children}
		</div>
	);
}
