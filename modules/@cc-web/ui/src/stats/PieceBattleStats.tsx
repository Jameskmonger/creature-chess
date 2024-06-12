import React, { useMemo } from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { getDefinitionById } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";

import { CreatureImage } from "../display";

type Props = {
	pieces: PieceModel[];
	stats: Record<
		string,
		{
			damageDealt: number;
			damageTaken: number;
			turnsSurvived: number;
		}
	>;
};

const useStyles = createUseStyles({
	container: {
		padding: "0.5em 0.25em",
	},
	table: {
		width: "100%",
	},
	headerCell: {
		fontWeight: "bold",
		padding: "0.5em 0",
	},
	cell: {
		paddingBottom: "0.25em",
		verticalAlign: "middle",
	},
	imageContainer: {
		width: "1px",
		paddingRight: "0.5em",
	},
	image: {
		width: "32px",
		height: "32px",
	},
});

export function PieceBattleStats(props: Props) {
	const classes = useStyles();

	const piecesWithStats = useMemo(
		() =>
			props.pieces.map((piece) => ({
				piece,
				stats: props.stats[piece.id] ?? null,
			})),
		[props.pieces, props.stats]
	);

	const sortedPieces = useMemo(
		() =>
			[...piecesWithStats].sort(
				(a, b) => (b.stats?.damageDealt ?? 0) - (a.stats?.damageDealt ?? 0)
			),
		[piecesWithStats]
	);

	return (
		<div className={classes.container}>
			<table className={classes.table}>
				<thead>
					<tr>
						<td className={classes.headerCell} />
						<td className={classes.headerCell}>Piece</td>
						<td className={classes.headerCell}>d d</td>
						<td className={classes.headerCell}>d t</td>
						<td className={classes.headerCell}>t s</td>
					</tr>
				</thead>
				<tbody>
					{sortedPieces.map(({ piece, stats }) =>
						stats ? (
							<tr key={piece.id}>
								<td
									className={classNames(classes.imageContainer, classes.cell)}
								>
									<CreatureImage
										definitionId={piece.definitionId}
										className={classes.image}
									/>
								</td>
								<td className={classes.cell}>
									{getDefinitionById(piece.definitionId)?.name}
								</td>
								<td className={classes.cell}>{stats.damageDealt}</td>
								<td className={classes.cell}>{stats.damageTaken}</td>
								<td className={classes.cell}>{stats.turnsSurvived}</td>
							</tr>
						) : (
							<tr key={piece.id}>
								<td
									className={classNames(classes.imageContainer, classes.cell)}
								>
									<CreatureImage
										definitionId={piece.definitionId}
										className={classes.image}
									/>
								</td>
								<td className={classes.cell}>
									{getDefinitionById(piece.definitionId)?.name}
								</td>
								<td className={classes.cell}>-</td>
								<td className={classes.cell}>-</td>
								<td className={classes.cell}>-</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
}
