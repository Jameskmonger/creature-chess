import * as React from "react";
import { PieceModel } from "@creature-chess/models";
import { StageIndicator } from "./stageIndicator";
import { TypeIndicator } from "../display";
import { Healthbar } from "./healthbar";
import { createUseStyles } from "react-jss";
import { Layout } from "../layout";

type Props = {
	piece: PieceModel;
	className?: string;
	healthbarColor?: "none" | "friendly" | "enemy" | "spectating";
};

const useStyles = createUseStyles({
	"meta": {

	},
	"typeIndicator": {
		marginBottom: "0.25em",
		width: "100%",
	},
	"healthbarContainer": {
		flex: 1,
		position: "relative",
	},
	"stage": {
		"position": "absolute",
		"top": "10%",
		"left": "7%",
		"width": "86%",
		"height": "80%",

		"& > img": {
			width: "100%",
		}
	},
	"metaTop": {
		flex: 1,
		boxSizing: "border-box",
		textAlign: "center",
	},
	"@media only screen and (max-width: 799px)": {
		meta: {
			width: "30%",
		},
		metaTop: {
			height: "30%",
		}
	},
	"@media only screen and (min-width: 800px)": {
		meta: {
			width: "22%",
		},
		metaTop: {
			height: "22%",
		}
	}
});

const PieceMeta: React.FunctionComponent<Props> = ({ piece, className, healthbarColor = "none" }) => {
	const classes = useStyles();

	return (
		<Layout direction="row" className={className} noSpacer>
			<Layout direction="column" className={classes.meta} noSpacer>
				<TypeIndicator className={classes.typeIndicator} type={piece.definition.type} />

				<div className={classes.healthbarContainer}>
					{
						healthbarColor !== "none"
						&& (
							<Healthbar
								color={healthbarColor}
								current={piece.currentHealth}
								max={piece.maxHealth}
							>
								<StageIndicator className={classes.stage} stage={piece.stage} />
							</Healthbar>
						)
					}

					{
						healthbarColor === "none"
						&& <StageIndicator className={classes.stage} stage={piece.stage} />
					}
				</div>
			</Layout>
			<div className={classes.metaTop} />
		</Layout>
	);
};

export { PieceMeta };
