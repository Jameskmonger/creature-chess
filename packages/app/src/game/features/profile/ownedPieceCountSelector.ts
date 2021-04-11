import { BoardSelectors } from "@creature-chess/board";
import { getUserId } from "../../../menu/auth/store/selectors";

import { AppState } from "../../../store/state";

export const ownedPieceCountSelector = (state: AppState) => {
    const playerId = getUserId(state);

    return BoardSelectors.getAllPieces(state.game.board).filter(p => p.ownerId === playerId).length;
};
