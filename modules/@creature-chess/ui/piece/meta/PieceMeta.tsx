import * as React from "react";
import { PieceModel } from "@creature-chess/models";
import { TypeIndicator } from "../../src/display";
import { createUseStyles } from "react-jss";
import { Layout } from "../../src/layout";
import { PieceHealthbar } from "./PieceHealthbar";
import { PieceStageIndicator } from "./PieceStageIndicator";

type Props = {
	piece: PieceModel;
	className?: string;
	healthbarColor?: "none" | "friendly" | "enemy" | "spectating";
};

const useStyles = createUseStyles({
	typeIndicatorContainer: {
		marginBottom: "0.25em",
		width: "100%",
	},
	healthbarContainer: {
		flex: 1,
		position: "relative",
	},
	stage: {
		"position": "absolute",
		"top": "10%",
		"left": "7%",
		"width": "86%",
		"height": "80%",

		"& > img": {
			width: "100%",
		}
	}
});

const PieceMeta: React.FunctionComponent<Props> = ({ piece, healthbarColor = "none" }) => {
	const classes = useStyles();

	const stageIndicator = (
		<div className={classes.stage}>
			<PieceStageIndicator stage={piece.stage} />
		</div>
	);

	return (
		<Layout direction="column" noSpacer>
			<div className={classes.typeIndicatorContainer}>
				<TypeIndicator type={piece.definition.type} />
			</div>

			<div className={classes.healthbarContainer}>
				{
					healthbarColor !== "none"
					&& (
						<PieceHealthbar
							color={healthbarColor}
							current={piece.currentHealth}
							max={piece.maxHealth}
						>
							{stageIndicator}
						</PieceHealthbar>
					)
				}

				{
					healthbarColor === "none"
					&& stageIndicator
				}
			</div>
		</Layout>
	);
};

export { PieceMeta };
