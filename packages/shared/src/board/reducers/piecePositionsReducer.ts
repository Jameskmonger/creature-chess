import { Reducer } from "redux";
import {
  BoardCommand,
  INITIALISE_BOARD_COMMAND, REMOVE_BOARD_PIECE_COMMAND, ADD_BOARD_PIECE_COMMAND, UPDATE_BOARD_PIECE_COMMAND,
  UPDATE_BOARD_PIECES_COMMAND, MOVE_BOARD_PIECE_COMMAND, REMOVE_BOARD_PIECES_COMMAND
} from "../commands";

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

const piecePositions: Reducer<PiecePositionsState, BoardCommand> = (state = initialState, command) => {
  switch (command.type) {
    case INITIALISE_BOARD_COMMAND:
      return Object.entries(command.payload.pieces)
        .reduce<PiecePositionsState>(
          (acc, [pieceId, piece]) => {
            acc[`${piece.position.x},${piece.position.y}`] = pieceId;

            return acc;
          },
          {}
        );
    case UPDATE_BOARD_PIECES_COMMAND: {
      const { pieces } = command.payload;

      const newState = removePieceByIdList(state, pieces.map(p => p.id));

      for (const piece of pieces) {
        newState[`${piece.position.x},${piece.position.y}`] = piece.id;
      }

      return newState;
    }
    case UPDATE_BOARD_PIECE_COMMAND: {
      const { piece } = command.payload;

      const filtered = removePieceById(state, piece.id);

      return {
        ...filtered,
        [`${piece.position.x},${piece.position.y}`]: piece.id
      };
    }
    case REMOVE_BOARD_PIECE_COMMAND:
      return removePieceById(state, command.payload.pieceId);
    case REMOVE_BOARD_PIECES_COMMAND:
      return removePieceByIdList(state, command.payload.pieceIds);
    case ADD_BOARD_PIECE_COMMAND: {
      const { x, y, piece } = command.payload;
      return {
        ...state,
        [`${x},${y}`]: piece.id
      };
    }
    case MOVE_BOARD_PIECE_COMMAND: {
      const { pieceId, from, to } = command.payload;
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
