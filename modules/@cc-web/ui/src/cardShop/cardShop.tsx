import React from "react";

import { Card as CardModel } from "@creature-chess/models";

import { CardShop as CardShop2D } from "./2d/cardShop";
import { CardShop as CardShop3D } from "./3d/cardShop";

const CARD_SHOP_TYPE: "2d" | "3d" = "2d";

type Props = {
	cards: (CardModel | null)[];
	ownedDefinitionIds: number[];
	money: number;
	isLocked?: boolean;
	onReroll?: () => void;
	onToggleLock?: () => void;
	onBuy?: (index: number) => void;
};

export function CardShop(props: Props) {
	if (CARD_SHOP_TYPE === "2d") {
		return <CardShop2D {...props} />;
	}

	if (CARD_SHOP_TYPE === "3d") {
		return <CardShop3D {...props} />;
	}

	return null;
}
