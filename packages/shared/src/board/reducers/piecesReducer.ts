import { Reducer } from "redux";
import { createTileCoordinates, IndexedPieces } from "@creature-chess/models";
import {
  BoardCommand,
  REMOVE_BOARD_PIECE_COMMAND, INITIALISE_BOARD_COMMAND, ADD_BOARD_PIECE_COMMAND, UPDATE_BOARD_PIECE_COMMAND,
  UPDATE_BOARD_PIECES_COMMAND, MOVE_BOARD_PIECE_COMMAND, REMOVE_BOARD_PIECES_COMMAND
} from "../commands";

type PiecesState = IndexedPieces;

const initialState: PiecesState = {};

const removePieceByIdList = (state: PiecesState, pieceIds: string[]) => {
  const newState = {
    ...state
  };

  for (const pieceId of pieceIds) {
    if (newState[pieceId]) {
      delete newState[pieceId];
    }
  }

  return newState;
};

const pieces: Reducer<PiecesState, BoardCommand> = (state = initialState, command) => {
  switch (command.type) {
    case INITIALISE_BOARD_COMMAND: {
      return { ...command.payload.pieces };
    }
    case UPDATE_BOARD_PIECE_COMMAND: {
      const { piece } = command.payload;

      return {
        ...state,
        [piece.id]: piece
      };
    }
    case UPDATE_BOARD_PIECES_COMMAND: {
      const newState = { ...state };

      for (const piece of command.payload.pieces) {
        newState[piece.id] = piece;
      }

      return newState;
    }
    case REMOVE_BOARD_PIECE_COMMAND:
      return removePieceByIdList(state, [command.payload.pieceId]);
    case REMOVE_BOARD_PIECES_COMMAND:
      return removePieceByIdList(state, command.payload.pieceIds);
    case ADD_BOARD_PIECE_COMMAND: {
      const { piece, x, y } = command.payload;
      return {
        ...state,
        [piece.id]: {
          ...piece,
          position: createTileCoordinates(x, y),
          facingAway: true
        }
      };
    }
    case MOVE_BOARD_PIECE_COMMAND: {
      const { pieceId, from, to } = command.payload;

      const piece = state[pieceId];

      // safety catch
      if (!piece || !piece.position || piece.id !== pieceId || piece.position.x !== from.x || piece.position.y !== from.y) {
        return state;
      }

      return {
        ...state,
        [piece.id]: {
          ...piece,
          position: {
            x: to.x,
            y: to.y
          }
        }
      };
    }
    default:
      return state;
  }
};

export { PiecesState, pieces };
