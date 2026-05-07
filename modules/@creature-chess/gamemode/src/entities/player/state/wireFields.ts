import { Player } from "../player";
import { updateCardsCommand, updateShopLockCommand } from "./cardShop";
import { playerInfoCommands } from "./playerInfo/reducer";
import { setSpectatingIdCommand } from "./spectating";

type CommandCreator<P> = {
	(payload: P): { type: string; payload: P };
	toString(): string;
};

type WireFieldEntry = {
	type: string;
	command: CommandCreator<unknown>;
	snapshot?: (player: Player) => unknown;
};

const wireField = <P>(
	command: CommandCreator<P>,
	snapshot?: (player: Player) => P
): WireFieldEntry => ({
	type: command.toString(),
	command: command as CommandCreator<unknown>,
	snapshot: snapshot as ((player: Player) => unknown) | undefined,
});

/**
 * A list of events which are sent to clients via playerInfoUpdates.
 */
const PLAYER_WIRE_FIELDS: readonly WireFieldEntry[] = [
	wireField(setSpectatingIdCommand),
	wireField(updateCardsCommand, (p) => p.cards),
	wireField(updateShopLockCommand, (p) => p.shopLocked),
	wireField(playerInfoCommands.playerMatchRewardsEvent),
	wireField(playerInfoCommands.updateMoneyCommand, (p) => p.money),
	wireField(playerInfoCommands.updateLevelCommand, (p) => ({
		level: p.level,
		xp: p.xp,
	})),
	wireField(playerInfoCommands.updateHealthCommand, (p) => p.health),
	wireField(playerInfoCommands.updateOpponentCommand, (p) => ({
		id: p.opponentId,
		isClone: p.opponentIsClone,
	})),
	wireField(playerInfoCommands.updateReadyCommand),
];

export const PlayerInfoUpdateCommandActionTypesArray: string[] =
	PLAYER_WIRE_FIELDS.map((f) => f.type);

export const buildPlayerSnapshot = (
	player: Player
): { type: string; payload: unknown }[] =>
	PLAYER_WIRE_FIELDS.flatMap((f) =>
		f.snapshot ? [f.command(f.snapshot(player))] : []
	);
