import { getTotalHealthByTeam } from "./get-total-health-by-team";
import { PieceModel } from "../models";

export const isATeamDefeated = (pieces: PieceModel[]) => {
    const healthByTeam = getTotalHealthByTeam(pieces);

    return healthByTeam.length !== 2 || healthByTeam.some(x => x.totalHealth === 0);
};
