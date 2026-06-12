import { z } from "zod";

import type { PlayerPieceLocation } from "../playerPieceLocation";

import { PackedPosition } from "@creature-chess/board";

import { networkedAction } from "@cc-plugins/api";

import { quickChatPlayerAction, type QuickChatPlayerAction } from "./quickChat";

const buyCardSchema = z.object({
	index: z.number().int().nonnegative(),
});

export const buyCardPlayerAction = networkedAction<
	z.infer<typeof buyCardSchema>
>("buyCardPlayerAction", buyCardSchema);
export type BuyCardPlayerAction = ReturnType<typeof buyCardPlayerAction>;

const voidSchema = z.undefined();

export const buyXpPlayerAction = networkedAction<void>(
	"buyXpPlayerAction",
	voidSchema
);
export type BuyXpPlayerAction = ReturnType<typeof buyXpPlayerAction>;

export const rerollCardsPlayerAction = networkedAction<void>(
	"rerollCardsPlayerAction",
	voidSchema
);
export type RerollCardsPlayerAction = ReturnType<typeof rerollCardsPlayerAction>;

export const toggleShopLockPlayerAction = networkedAction<void>(
	"toggleShopLockPlayerAction",
	voidSchema
);
export type ToggleShopLockPlayerAction = ReturnType<
	typeof toggleShopLockPlayerAction
>;

const sellPieceSchema = z.object({ pieceId: z.string() });

export const sellPiecePlayerAction = networkedAction<
	z.infer<typeof sellPieceSchema>
>("sellPiecePlayerAction", sellPieceSchema);
export type SellPiecePlayerAction = ReturnType<typeof sellPiecePlayerAction>;

export const readyUpPlayerAction = networkedAction<void>(
	"readyUpPlayerAction",
	voidSchema
);
export type ReadyUpPlayerAction = ReturnType<typeof readyUpPlayerAction>;

export const quitGamePlayerAction = networkedAction<void>(
	"quitGamePlayerAction",
	voidSchema
);
export type QuitGamePlayerAction = ReturnType<typeof quitGamePlayerAction>;

const pieceLocationSchema = z.object({
	type: z.enum(["board", "bench"]),
	location: z
		.number()
		.int()
		.nonnegative()
		.transform((n) => n as PackedPosition),
});

const dropPieceSchema = z.object({
	pieceId: z.string(),
	to: pieceLocationSchema,
});

export const dropPiecePlayerAction = networkedAction<{
	pieceId: string;
	to: PlayerPieceLocation;
}>("dropPiecePlayerAction", dropPieceSchema);
export type DropPiecePlayerAction = ReturnType<typeof dropPiecePlayerAction>;

const swapPieceSchema = z.object({
	pieceAId: z.string(),
	pieceBId: z.string(),
});

export const swapPiecePlayerAction = networkedAction<
	z.infer<typeof swapPieceSchema>
>("swapPiecePlayerAction", swapPieceSchema);
export type SwapPiecePlayerAction = ReturnType<typeof swapPiecePlayerAction>;

const spectateSchema = z.object({
	playerId: z.string().nullable(),
});

export const spectatePlayerAction = networkedAction<
	z.infer<typeof spectateSchema>
>("spectatePlayerAction", spectateSchema);
export type SpectatePlayerAction = ReturnType<typeof spectatePlayerAction>;

export const playerActionCreators = [
	buyCardPlayerAction,
	buyXpPlayerAction,
	rerollCardsPlayerAction,
	toggleShopLockPlayerAction,
	sellPiecePlayerAction,
	readyUpPlayerAction,
	quitGamePlayerAction,
	dropPiecePlayerAction,
	swapPiecePlayerAction,
	spectatePlayerAction,
	quickChatPlayerAction,
] as const;

export const PlayerActionTypesArray: readonly string[] =
	playerActionCreators.map((c) => c.type);

export type PlayerAction =
	| BuyCardPlayerAction
	| BuyXpPlayerAction
	| RerollCardsPlayerAction
	| ToggleShopLockPlayerAction
	| SellPiecePlayerAction
	| ReadyUpPlayerAction
	| QuitGamePlayerAction
	| DropPiecePlayerAction
	| SwapPiecePlayerAction
	| SpectatePlayerAction
	| QuickChatPlayerAction;
