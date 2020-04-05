import { Piece } from "@common/models";
import { Reducer } from "redux";
import { BenchAction } from "../benchActions";
import { REMOVE_BENCH_PIECE, INITIALISE_BENCH, ADD_BENCH_PIECE, MOVE_BENCH_PIECE, REMOVE_BENCH_PIECES } from "../benchActionTypes";
import { createTileCoordinates } from "@common/models/position";

type PiecesState = Piece[];

const initialState: PiecesState = [null, null, null, null, null, null, null, null];

const removePieces = (state: PiecesState, pieceIds: string[]) => {
  const newState = [];

  for (const piece of state) {
    if (!piece || pieceIds.includes(piece.id)) {
      newState.push(null);
    } else {
      newState.push(piece);
    }
  }

  return newState;
};

const pieces: Reducer<PiecesState, BenchAction> = (state = initialState, action) => {
  switch (action.type) {
    case INITIALISE_BENCH:
      return [...action.payload.state.pieces];
    case ADD_BENCH_PIECE: {
      const { piece, slot } = action.payload;
      const newState = [...state];

      const slotToUse = slot !== null ? slot : newState.findIndex(p => p === null);

      newState[slotToUse] = {
        ...piece,
        position: createTileCoordinates(slotToUse, null)
      };

      return newState;
    }
    case REMOVE_BENCH_PIECE: {
      return removePieces(state, [ action.payload.pieceId ]);
    }
    case REMOVE_BENCH_PIECES: {
      return removePieces(state, action.payload.pieceIds);
    }
    case MOVE_BENCH_PIECE: {
      const { pieceId, from, to } = action.payload;

      const piece = state[from.slot];

      // safety catch
      if (!piece || !piece.position || piece.id !== pieceId || piece.position.x !== from.slot || piece.position.y !== null) {
        return state;
      }

      const newState = [...state];

      newState[from.slot] = null;
      newState[to.slot] = {
        ...piece,
        position: createTileCoordinates(to.slot, null)
      };

      return newState;
    }
    default:
      return state;
  }
};

export { PiecesState, pieces };
