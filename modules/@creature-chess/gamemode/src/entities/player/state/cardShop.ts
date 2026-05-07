import { Card } from "@creature-chess/models";

import { networkedAction } from "../../../events/networkedAction";

export type CardShopState = {
	cards: (Card | null)[];
	locked: boolean;
};

export const initialCardShopState: CardShopState = {
	cards: [],
	locked: false,
};

export const updateCardsCommand = networkedAction<
	(Card | null)[],
	"cards/updateCardsCommand"
>("cards/updateCardsCommand");

export const updateShopLockCommand = networkedAction<
	boolean,
	"cards/updateShopLockCommand"
>("cards/updateShopLockCommand");
