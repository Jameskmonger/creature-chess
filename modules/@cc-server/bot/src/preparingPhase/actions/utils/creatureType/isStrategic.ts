import { TraitId } from "@creature-chess/models";

export const isStrategicPiece = (
	pieceTraits: TraitId[],
	ownedTraits: TraitId[]
) =>
	// the piece is our only piece of some trait
	pieceTraits.some((t) => ownedTraits.filter((o) => o === t).length === 1);
