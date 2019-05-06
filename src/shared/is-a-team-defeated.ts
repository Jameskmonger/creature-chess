import { PokemonPiece } from "./pokemon-piece";
import { getTotalHealthByTeam } from "./get-total-health-by-team";

export const isATeamDefeated = (pieces: PokemonPiece[]) => {
    const healthByTeam = getTotalHealthByTeam(pieces);

    return healthByTeam.length !== 2 || healthByTeam.some(x => x.totalHealth === 0);
};
