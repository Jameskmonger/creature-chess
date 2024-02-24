import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { CreatureImage } from "../src/display";
import { usePiece } from "./PieceContext";
import { PieceMeta } from "./meta";

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
	},
	metaContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		display: "flex",
		flexDirection: "row",
		width: "20%",
		height: "100%",
		boxSizing: "border-box",
		padding: "2%",
	},
	imageContainer: {
		position: "absolute",
		bottom: "0",
		left: "14%",
		width: "80%",
		height: "80%",
	},
});

export function Piece(props: Props) {
	const classes = useStyles();
	const { piece } = usePiece();
	const { healthbar, children, className, onClick } = props;

	return (
		<div className={classNames(classes.piece, className)} onClick={onClick}>
			<div className={classes.metaContainer}>
				<PieceMeta piece={piece} healthbarColor={healthbar} />
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
