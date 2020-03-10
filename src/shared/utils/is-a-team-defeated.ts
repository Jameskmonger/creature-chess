import { getTotalHealthByTeam } from "./get-total-health-by-team";
import { Piece } from "../models";

export const isATeamDefeated = (pieces: Piece[]) => {
    const healthByTeam = getTotalHealthByTeam(pieces);

    return healthByTeam.length !== 2 || healthByTeam.some(x => x.totalHealth === 0);
};
