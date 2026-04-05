import { PlayerEntity } from "../../entities";
import { Match } from "../../game/match";
import { PlayerVariables } from "./playerVariables";

export const getMatch = (entity: PlayerEntity): Match | null =>
	entity.getVariable((v: PlayerVariables) => v.match) as Match | null;

export const getMatches = (players: PlayerEntity[]): Match[] =>
	players.map((p) => getMatch(p)).filter((m): m is Match => m !== null);
