import * as React from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { PieceModel } from "@creature-chess/models";
import { CreatureImage } from "../display";
import { PieceMeta } from "./meta";

interface Props {
	piece: PieceModel;
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
			"position": "absolute",
			"bottom": 0,
			"right": 0,
			"width": "80%",
		}
	},
	metaContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		display: "flex",
		flexDirection: "row",
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		padding: "2%",
	}
});

const Piece = React.forwardRef((props: Props, ref) => {
	const classes = useStyles();
	const { piece, healthbar, children, className, onClick } = props;

	return (
		<div
			className={classNames(classes.piece, className)}
			ref={ref as any /* todo what to do here? */}
			onClick={onClick}
		>
			<PieceMeta piece={piece} healthbarColor={healthbar} className={classes.metaContainer} />

			<CreatureImage definitionId={piece.definitionId} facing={piece.facingAway ? "back" : "front"} baseUrl="https://creaturechess.com" />

			{children}
		</div>
	);
});

export {
	Piece
};
