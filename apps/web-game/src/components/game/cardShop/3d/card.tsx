import * as React from "react";

import { createUseStyles } from "react-jss";

import { Card as CardModel } from "@creature-chess/models";

import { TraitIcon } from "../../../ui/TraitIcon";
import { CreatureImage } from "../../../ui/creatureImage";
import { Layout } from "../../../ui/layout";

type Props = {
	card: CardModel;
	alreadyOwned: boolean;
	onClick?: () => void;
	disabled?: boolean;
};

const useStyles = createUseStyles({
	card: {
		boxSizing: "border-box",
		color: "#fff",
		textAlign: "center",
		userSelect: "none",
		background: ({ alreadyOwned }: Props) =>
			alreadyOwned ? "#587261" : "#303030",
		borderColor: ({ alreadyOwned }: Props) =>
			alreadyOwned ? "#587261" : "#303030",
		paddingBottom: "0.5em",
		borderWidth: "10px",
		borderStyle: "solid",
		borderRadius: "10px",
	},
	name: {
		marginBottom: 0,
		marginTop: "-0.5em",
		paddingTop: "0.25em",
		paddingBottom: "0.25em",
		paddingLeft: "1em",
		paddingRight: "1em",
		background: "rgb(48, 48, 48)",
		borderRadius: "5px",
		fontSize: "1em",
		fontWeight: 700,
	},
	typeIndicator: {
		zIndex: 20,
		marginTop: "-0.5em",
		marginLeft: "-0.5em",
		width: "24px",
		height: "24px",
	},
	cost: {
		position: "absolute",
		padding: "0.25em 0.5em",
		top: "-5%",
		right: "5%",
		background: "#38b764",
		borderRadius: "3px",
		lineHeight: "1.5em",
	},
	cardMeta: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
	},
	metaItem: {
		fontSize: "0.75rem",
		fontWeight: 700,
		textTransform: "uppercase",
		marginBottom: "0.25em",
	},
	cardImage: {
		width: "80%",
		height: "80%",
		position: "relative",
		left: "10%",
		paddingBottom: "1em",
	},
	cardInfo: {
		background: "#808080",
		paddingBottom: "1em",
		borderRadius: "4px",
		marginTop: "-0.5em",
	},
	cardInfoTopBar: {
		marginLeft: "1em",
		marginRight: "1em",
		marginBottom: "0.5em",
	},
});

export function Card3D(props: Props) {
	const classes = useStyles(props);

	const {
		card: { name, definitionId, cost, traits },
		onClick,
		disabled = false,
	} = props;

	return (
		<div
			className={classes.card}
			onClick={!disabled ? onClick || undefined : undefined}
		>
			<Layout direction="column" noSpacer>
				<div className={classes.cost}>
					<span>${cost}</span>
				</div>
				<CreatureImage
					definitionId={definitionId}
					className={classes.cardImage}
				/>
				<div className={classes.cardInfo}>
					<Layout direction="row" noSpacer className={classes.cardInfoTopBar}>
						<div className={classes.typeIndicator}>
							{traits.map((trait) => (
								<TraitIcon key={trait} trait={trait} />
							))}
						</div>
						<h2 className={classes.name}>{name}</h2>
					</Layout>
					<div className={classes.cardMeta}>
						{traits.map((trait) => (
							<TraitIcon key={trait} trait={trait} />
						))}
					</div>
				</div>
			</Layout>
		</div>
	);
}
