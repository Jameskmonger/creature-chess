import { getDefinitionById, getAllPieces, PlayerState } from "@creature-chess/gamemode";
import { Card, PieceModel } from "@creature-chess/models";

interface CardView {
	source: "shop";
	index: number;

	cost: number;
	amountOwned: number;
	definitionId: number;
}

interface PieceView {
	source: "board";
	id: string;

	cost: number;
	amountOwned: number;
	definitionId: number;
}

type CardPieceView = CardView | PieceView;

const SORT_A_FIRST = -1;
const SORT_A_SECOND = 1;
export const compareCardPieceViews = (a: CardPieceView, b: CardPieceView) => {
	if (a.cost > b.cost) {
		return SORT_A_FIRST;
	}

	if (a.cost < b.cost) {
		return SORT_A_SECOND;
	}

	if (a.amountOwned > b.amountOwned) {
		return SORT_A_FIRST;
	}

	if (a.amountOwned < b.amountOwned) {
		return SORT_A_SECOND;
	}

	return 0;
};

export const getCardViews = (state: PlayerState): CardView[] => {
	const { cards } = state.cardShop;

	const views = cards.filter(c => c !== null).map(getCardViewFactory(state));

	views.sort(compareCardPieceViews);

	return views;
};

export const getPieceViews = (state: PlayerState): PieceView[] => {
	const views = getAllPieces(state).map(getPieceViewFactory(state));

	views.sort(compareCardPieceViews);

	return views;
};

const getPieceCountForDefinition =
	(state: PlayerState, definitionId: number): number => getAllPieces(state).filter(p => p.definitionId === definitionId).length;

const getCardViewFactory = (state: PlayerState) => (card: Card, index: number): CardView => {
	const amountOwned = getPieceCountForDefinition(state, card.definitionId);

	return {
		source: "shop",
		index,
		amountOwned,
		cost: card.cost,
		definitionId: card.definitionId
	};
};

const getPieceViewFactory = (state: PlayerState) => (piece: PieceModel): PieceView => {
	const { cost } = getDefinitionById(piece.definitionId);
	const amountOwned = getPieceCountForDefinition(state, piece.definitionId);

	return {
		source: "board",
		cost,
		amountOwned,
		id: piece.id,
		definitionId: piece.definitionId
	};
};
