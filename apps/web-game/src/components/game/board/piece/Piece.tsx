import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { CreatureImage } from "../../../ui/creatureImage";
import { usePiece } from "./PieceContext";
import { PieceHealthbar } from "./meta/PieceHealthbar";
import { PieceStageIndicator } from "./meta/PieceStageIndicator";
import { TraitIcon } from "~/components/ui/TraitIcon";

interface Props {
	healthbar: "none" | "friendly" | "enemy" | "spectating";

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
		position: "absolute",
		top: "4%",
		left: "4%",
		height: "10%",
		width: "92%",
	},
	stage: {
		"position": "absolute",
		"bottom": "4%",
		"right": "4%",
		"height": "8%",
		"padding": "2px",
		"background": "rgba(0, 0, 0, 0.5)",

		"& > img": {
			width: "100%",
		},
	},
	traits: {
		position: "absolute",
		left: "4%",
		bottom: "4%",
		height: "12%",
		display: "flex",
		flexDirection: "row",
		gap: "2px",
	},
});

export function Piece(props: Props) {
	const classes = useStyles();
	const { piece } = usePiece();
	const { healthbar, children, className, onClick } = props;

	return (
		<div className={classNames(classes.piece, className)} onClick={onClick}>
			<div className={classes.healthbarContainer}>
				{healthbar !== "none" && (
					<PieceHealthbar
						color={healthbar}
						current={piece.currentHealth}
						max={piece.maxHealth}
					/>
				)}
			</div>

			<div className={classes.imageContainer}>
				<CreatureImage
					definitionId={piece.definitionId}
					facing={piece.facingAway ? "back" : "front"}
				/>
			</div>

			{
				piece.stage > 0
				&& (
					<div className={classes.stage}>
						<PieceStageIndicator stage={piece.stage} />
					</div>
				)
			}

			{
				piece.traits.length > 0
				&& (
					<div className={classes.traits}>
						{piece.traits.map((trait) => (
							<TraitIcon key={trait} trait={trait} />
						))}
					</div>
				)
			}

			{children}
		</div>
	);
}
