import { Player } from "../../entities/player/player";
import { Match } from "../../game/match";

export const getMatch = (entity: Player): Match | null => entity.match;

export const getMatches = (players: Player[]): Match[] =>
	players.map((p) => getMatch(p)).filter((m): m is Match => m !== null);
