import * as React from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { PieceModel } from "@creature-chess/models";
import { CreatureImage } from "../src/display";
import { PieceMeta } from "./meta";
import { usePiece } from ".";

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
		}
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
	}
});

const Piece = React.forwardRef((props: Props, ref) => {
	const classes = useStyles();
	const { piece } = usePiece();
	const { healthbar, children, className, onClick } = props;

	return (
		<div
			className={classNames(classes.piece, className)}
			ref={ref as any /* todo what to do here? */}
			onClick={onClick}
		>
			<div className={classes.metaContainer}>
				<PieceMeta piece={piece} healthbarColor={healthbar} />
			</div>

			<div className={classes.imageContainer}>
				<CreatureImage definitionId={piece.definitionId} facing={piece.facingAway ? "back" : "front"} baseUrl="https://creaturechess.com" />
			</div>

			{children}
		</div>
	);
});

export {
	Piece
};
