import { TraitId } from "modules/@creature-chess/models/gamemode/traits";

import { PieceModel } from "@creature-chess/models";

export function isStrategicCard(cardTraits: TraitId[], ownedTraits: TraitId[]) {
	return cardTraits.some((t) => ownedTraits.includes(t) === false);
}

export const isStrategicPiece = (
	pieceTraits: TraitId[],
	ownedTraits: TraitId[]
) =>
	// the piece is our only piece of some trait
	pieceTraits.some((t) => ownedTraits.filter((o) => o === t).length === 1);
