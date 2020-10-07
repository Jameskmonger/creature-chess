import { Reducer } from "redux";
import { PieceModel, createTileCoordinates } from "@creature-chess/models";
import { BenchCommand, REMOVE_BENCH_PIECE_COMMAND, INITIALISE_BENCH_COMMAND, ADD_BENCH_PIECE_COMMAND, MOVE_BENCH_PIECE_COMMAND, REMOVE_BENCH_PIECES_COMMAND } from "../commands";

type PiecesState = PieceModel[];

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

const pieces: Reducer<PiecesState, BenchCommand> = (state = initialState, command) => {
  switch (command.type) {
    case INITIALISE_BENCH_COMMAND:
      return [...command.payload.state.pieces];
    case ADD_BENCH_PIECE_COMMAND: {
      const { piece, slot } = command.payload;
      const newState = [...state];

      const slotToUse = slot !== null ? slot : newState.findIndex(p => p === null);

      newState[slotToUse] = {
        ...piece,
        position: createTileCoordinates(slotToUse, null),
        facingAway: false
      };

      return newState;
    }
    case REMOVE_BENCH_PIECE_COMMAND: {
      return removePieces(state, [ command.payload.pieceId ]);
    }
    case REMOVE_BENCH_PIECES_COMMAND: {
      return removePieces(state, command.payload.pieceIds);
    }
    case MOVE_BENCH_PIECE_COMMAND: {
      const { pieceId, from, to } = command.payload;

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
