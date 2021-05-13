export const FIND_GAME = "FIND_GAME";
export type FIND_GAME = typeof FIND_GAME;

export type FindGameAction = { type: FIND_GAME, payload: { serverIP: string } };
export const findGameAction = (serverIP: string): FindGameAction => ({
	type: FIND_GAME,
	payload: { serverIP }
});
