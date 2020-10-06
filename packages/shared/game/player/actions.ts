export const PLAYER_FINISH_MATCH = "PLAYER_FINISH_MATCH";
export type PLAYER_FINISH_MATCH = typeof PLAYER_FINISH_MATCH;
export type PlayerFinishMatchAction = ({ type: PLAYER_FINISH_MATCH, payload: { homeScore: number, awayScore: number } });
export const playerFinishMatch = (homeScore: number, awayScore: number): PlayerFinishMatchAction => ({
    type: PLAYER_FINISH_MATCH,
    payload: { homeScore, awayScore }
});
