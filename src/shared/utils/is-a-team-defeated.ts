import { getTotalHealthByTeam } from "./get-total-health-by-team";
import { BoardState } from "@common/board";

export const isATeamDefeated = (board: BoardState) => {
    const healthByTeam = getTotalHealthByTeam(board);

    return healthByTeam.length !== 2 || healthByTeam.some(x => x.totalHealth === 0);
};
