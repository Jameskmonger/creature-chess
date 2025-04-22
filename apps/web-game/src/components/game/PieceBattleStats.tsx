import React, { useMemo } from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "~/store";
import { UIActions, closeOverlay } from "~/store/game/ui";

import { getDefinitionById } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";

import { CreatureImage } from "../ui/creatureImage";

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
	selected: {
		boxSizing: "border-box",
		border: "2px solid #ff5200",
	},
});

export function PieceBattleStats(props: Props) {
	const dispatch = useDispatch();
	const classes = useStyles();

	const selectedPieceId = useSelector<AppState, string | null>(
		(state) => state.game.ui.selectedPieceId
	);

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

	const onClickPiece = (pieceId: string) => {
		if (pieceId !== selectedPieceId) {
			dispatch(UIActions.selectPiece(pieceId));
			dispatch(closeOverlay());
		} else {
			dispatch(UIActions.clearSelectedPiece());
		}
	};

	return (
		<div className={classes.container}>
			<table className={classes.table}>
				<thead>
					<tr>
						<td className={classes.headerCell} />
						<td className={classes.headerCell}>Piece</td>
						<td className={classes.headerCell}>Damage Dealt</td>
					</tr>
				</thead>
				<tbody>
					{sortedPieces.map(({ piece, stats }) =>
						stats ? (
							<tr
								key={piece.id}
								className={piece.id === selectedPieceId ? classes.selected : ""}
								onClick={() => onClickPiece(piece.id)}
							>
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
							</tr>
						) : (
							<tr
								key={piece.id}
								className={piece.id === selectedPieceId ? classes.selected : ""}
								onClick={() => onClickPiece(piece.id)}
							>
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
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
}
