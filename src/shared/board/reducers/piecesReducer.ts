import { Piece } from "@common/models";
import { Reducer } from "redux";
import { BoardAction } from "../actions/boardActions";
import { REMOVE_BOARD_PIECE, INITIALISE_BOARD, ADD_BOARD_PIECE, UPDATE_BOARD_PIECE, UPDATE_BOARD_PIECES, MOVE_BOARD_PIECE } from "../actions/boardActionTypes";
import { createTileCoordinates } from "@common/models/position";

type PiecesState = {
  [pieceId: string]: Piece;
};

const initialState: PiecesState = {};

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
    case REMOVE_BOARD_PIECE: {
      const newState = {
        ...state
      };

      if (newState[action.payload.pieceId]) {
        delete newState[action.payload.pieceId];
      }

      return newState;
    }
    case ADD_BOARD_PIECE: {
      const { piece, x, y } = action.payload;
      return {
        ...state,
        [piece.id]: {
          ...piece,
          position: createTileCoordinates(x, y)
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
