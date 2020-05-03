import { PieceModel } from "@common/models";
import { Reducer } from "redux";
import { BoardAction } from "../actions/boardActions";
import { REMOVE_BOARD_PIECE, INITIALISE_BOARD, ADD_BOARD_PIECE, UPDATE_BOARD_PIECE, UPDATE_BOARD_PIECES, MOVE_BOARD_PIECE, REMOVE_BOARD_PIECES } from "../actions/boardActionTypes";
import { createTileCoordinates } from "@common/models/position";

type PiecesState = {
  [pieceId: string]: PieceModel;
};

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

const pieces: Reducer<PiecesState, BoardAction> = (state = initialState, action) => {
  switch (action.type) {
    case INITIALISE_BOARD: {
      return { ...action.payload.pieces };
    }
    case UPDATE_BOARD_PIECE: {
      const { piece } = action.payload;

      return {
        ...state,
        [piece.id]: piece
      };
    }
    case UPDATE_BOARD_PIECES: {
      const newState = { ...state };

      for (const piece of action.payload.pieces) {
        newState[piece.id] = piece;
      }

      return newState;
    }
    case REMOVE_BOARD_PIECE:
      return removePieceByIdList(state, [action.payload.pieceId]);
    case REMOVE_BOARD_PIECES:
      return removePieceByIdList(state, action.payload.pieceIds);
    case ADD_BOARD_PIECE: {
      const { piece, x, y } = action.payload;
      return {
        ...state,
        [piece.id]: {
          ...piece,
          position: createTileCoordinates(x, y),
          facingAway: true
        }
      };
    }
    case MOVE_BOARD_PIECE: {
      const { pieceId, from, to } = action.payload;

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
