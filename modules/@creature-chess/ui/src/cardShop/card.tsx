import * as React from "react";
import { createUseStyles } from "react-jss";
import { Card as CardModel } from "@creature-chess/models";
import { CreatureImage, TypeIndicator } from "../display";
import { Layout } from "../layout";

type Props = {
	card: CardModel;
	onClick?: () => void;
	disabled?: boolean;
};

const useStyles = createUseStyles({
	card: {
		boxSizing: "border-box",
		fontFamily: "Arial, sans-serif",
		color: "#fff",
		textAlign: "center",
		cursor: ({ disabled = false }: Props) => disabled ? "not-allowed" : "pointer",
		userSelect: "none",
		background: "#4e4e4e",
		paddingBottom: "0.5em",
	},
	name: {
		fontSize: "0.8em",
		fontWeight: 700,
	},
	typeIndicator: {
		zIndex: 20,
		marginTop: "-0.5em",
		marginLeft: "-0.125em",
		width: "24px",
		height: "24px"
	},
	cost: {
		padding: "0.125em",
		marginTop: "-0.5em",
		marginRight: "-0.1em",
		background: "rgb(128, 128, 128)",
	},
	cardMeta: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
	},
	metaItem: {
		fontSize: "0.6rem",
		fontWeight: 700,
		textTransform: "uppercase",
	}
});

const Card: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);

	const {
		card: { name, definitionId, type, cost, class: cardClass },
		onClick,
		disabled = false
	} = props;

	return (
		<div className={classes.card} onClick={!disabled ? onClick || undefined : undefined}>
			<Layout direction="column" noSpacer>
				<Layout direction="row" noSpacer>
					<div className={classes.typeIndicator}>
						<TypeIndicator type={type} />
					</div>
					<div className={classes.cost}>
						<span>${cost}</span>
					</div>
				</Layout>
				<CreatureImage definitionId={definitionId} baseUrl="https://creaturechess.com/" />
				<h2 className={classes.name}>{name}</h2>
				<div className={classes.cardMeta}>
					<span className={classes.metaItem}>{cardClass}</span>
					<span className={classes.metaItem}>{type}</span>
				</div>
			</Layout>
		</div>
	);
};

export { Card };
