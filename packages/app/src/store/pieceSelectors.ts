import { BoardSelectors } from "@creature-chess/board";
import { getUserId } from "../menu/auth/store/selectors";

import { AppState } from "./state";

export const ownedPieceSelector = (state: AppState) => {
    const playerId = getUserId(state);

    return BoardSelectors.getAllPieces(state.board).filter(p => p.ownerId === playerId);
};
