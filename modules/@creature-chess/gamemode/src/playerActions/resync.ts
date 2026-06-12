import { Player } from "../entities/player/player";

const RESYNC_HANDLERS = {
	money: (p: Player) => p.setMoney(p.money),
	cards: (p: Player) => p.setCards(p.cards),
} as const satisfies Record<string, (player: Player) => void>;

export type ResyncField = keyof typeof RESYNC_HANDLERS;

/** Re-emits the current value of each field to push it to the client. */
export const resyncPlayer = (
	player: Player,
	...fields: ResyncField[]
): void => {
	for (const field of fields) {
		RESYNC_HANDLERS[field](player);
	}
};
