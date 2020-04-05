import { Piece } from "@common/models";
import { Reducer } from "redux";
import { BoardAction } from "../actions/boardActions";
import { INITIALISE_BOARD, REMOVE_BOARD_PIECE, ADD_BOARD_PIECE, UPDATE_BOARD_PIECE, UPDATE_BOARD_PIECES, MOVE_BOARD_PIECE, REMOVE_BOARD_PIECES } from "../actions/boardActionTypes";

type PiecePositionsState = {
  [position: string]: string;
};

const initialState: PiecePositionsState = {};

const removePieceByIdList = (state: PiecePositionsState, ids: string[]) => {
  return Object.entries(state).reduce<PiecePositionsState>(
    (acc, [position, pieceId]) => {
      // skip the desired piece
      if (ids.includes(pieceId)) {
        return acc;
      }

      acc[position] = pieceId;
      return acc;
    },
    {}
  );
};

const removePieceById = (state: PiecePositionsState, targetPieceId: string) => removePieceByIdList(state, [targetPieceId]);

const piecePositions: Reducer<PiecePositionsState, BoardAction> = (state = initialState, action) => {
  switch (action.type) {
    case INITIALISE_BOARD:
      return Object.entries(action.payload.pieces)
        .reduce<PiecePositionsState>(
          (acc, [ pieceId, piece ]) => {
            // don't add dead pieces to the position matrix
            // todo should dead pieces be on the board at all? maybe remove them in turnSimulator
            if (piece.currentHealth === 0) {
              return acc;
            }

            acc[`${piece.position.x},${piece.position.y}`] = pieceId;

            return acc;
          },
          {}
        );
    case UPDATE_BOARD_PIECES: {
      const { pieces } = action.payload;

      const newState = removePieceByIdList(state, pieces.map(p => p.id));

      for (const piece of pieces) {
        newState[`${piece.position.x},${piece.position.y}`] = piece.id;
      }

      return newState;
    }
    case UPDATE_BOARD_PIECE: {
      const { piece } = action.payload;

      const filtered = removePieceById(state, piece.id);

      return {
        ...filtered,
        [`${piece.position.x},${piece.position.y}`]: piece.id
      };
    }
    case REMOVE_BOARD_PIECE:
      return removePieceById(state, action.payload.pieceId);
    case REMOVE_BOARD_PIECES:
      return removePieceByIdList(state, action.payload.pieceIds);
    case ADD_BOARD_PIECE: {
      const { x, y, piece } = action.payload;
      return {
        ...state,
        [`${x},${y}`]: piece.id
      };
    }
    case MOVE_BOARD_PIECE: {
      const { pieceId, from, to } = action.payload;
      const fromString = `${from.x},${from.y}`;
      const toString = `${to.x},${to.y}`;

      // safety check
      if (state[fromString] !== pieceId) {
        return state;
      }

      return {
        ...state,
        [fromString]: null,
        [toString]: pieceId
      };
    }
    default:
      return state;
  }
};

export { PiecePositionsState, piecePositions };
