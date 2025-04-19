import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { CreatureImage } from "../src/display";
import { usePiece } from "./PieceContext";
import { PieceMeta } from "./meta";
import { PieceHealthbar } from "./meta/PieceHealthbar";
import { PieceStageIndicator } from "./meta/PieceStageIndicator";

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
	metaContainer: {
		"position": "absolute",
		"top": 0,
		"left": 0,
		"display": "flex",
		"flexDirection": "row",
		"width": "35%",
		"height": "100%",
		"boxSizing": "border-box",

		"padding": "2%",

		"@container (max-width: 36px)": {
			width: "44%",
			paddingTop: "2px",
			paddingLeft: "2px",
		},
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
		right: "4%",
		top: "4%",
		height: "92%",
		width: "28%",
	},
	stage: {
		"position": "absolute",
		"top": "10%",
		"left": "7%",
		"width": "86%",
		"height": "80%",

		"& > img": {
			width: "100%",
		},
	},
});

export function Piece(props: Props) {
	const classes = useStyles();
	const { piece } = usePiece();
	const { healthbar, children, className, onClick } = props;

	const stageIndicator = (
		<div className={classes.stage}>
			<PieceStageIndicator stage={piece.stage} />
		</div>
	);

	return (
		<div className={classNames(classes.piece, className)} onClick={onClick}>
			<div className={classes.metaContainer}>
				<PieceMeta piece={piece} />
			</div>

			<div className={classes.healthbarContainer}>
				{healthbar !== "none" && (
					<PieceHealthbar
						color={"enemy"}
						current={piece.currentHealth}
						max={piece.maxHealth}
					>
						{stageIndicator}
					</PieceHealthbar>
				)}

				{healthbar === "none" && <>{stageIndicator}</>}
			</div>

			<div className={classes.imageContainer}>
				<CreatureImage
					definitionId={piece.definitionId}
					facing={piece.facingAway ? "back" : "front"}
				/>
			</div>

			{children}
		</div>
	);
}
