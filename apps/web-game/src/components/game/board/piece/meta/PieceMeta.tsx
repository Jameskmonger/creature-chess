import * as React from "react";

import { createUseStyles } from "react-jss";

import { PieceModel } from "@creature-chess/models";

import { TraitIcon } from "../../../../ui/TraitIcon";

type Props = {
	piece: PieceModel;
};

const useStyles = createUseStyles({
	typeIndicatorContainer: {
		width: "100%",
	},
	traitIcon: {
		"&:not(:last-child)": {
			marginBottom: "4px",
		},
	},
});

const PieceMeta: React.FunctionComponent<Props> = ({ piece }) => {
	const classes = useStyles();

	return (
		<div className={classes.typeIndicatorContainer}>
			{piece.traits.map((trait) => (
				<TraitIcon key={trait} trait={trait} className={classes.traitIcon} />
			))}
		</div>
	);
};

export { PieceMeta };
