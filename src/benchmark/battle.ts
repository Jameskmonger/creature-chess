// tslint:disable:no-console

import present = require("present");
import { battleEventChannel, BattleAction } from "@creature-chess/shared/match/combat/battleEventChannel";
import { TurnSimulator } from "@creature-chess/shared/match/combat/turnSimulator";
import { DefinitionProvider } from "@creature-chess/shared/game/definitionProvider";
import { DEFAULT_TURN_COUNT } from "@creature-chess/shared/models/constants";
import { EventChannel } from "redux-saga";
import { BoardState, boardReducer } from "@creature-chess/shared/board";
import { createPiece } from "@creature-chess/shared/utils/piece-utils";
import { addBoardPiece } from "@creature-chess/shared/board/actions/boardActions";
import { PieceModel } from "@creature-chess/shared/models";
import { IndexedPieces } from "@creature-chess/shared/models/piece";

const definitionProvider = new DefinitionProvider();
const simulator = new TurnSimulator();

const createBoard = (pieces: PieceModel[]): BoardState => {
  let board: BoardState = {
    pieces: {},
    piecePositions: {},
    locked: true
  };

  pieces.forEach(piece => {
    board = boardReducer(board, addBoardPiece(piece, piece.position.x, piece.position.y));
  });

  return board;
};

const listenForBattleFinish = (
  channel: EventChannel<BattleAction>,
  resolve: (res: { pieces: IndexedPieces, turnsTaken: number }) => void,
  pieces?: IndexedPieces
) => {
  channel.take(action => {
    if (action.type === "BATTLE_FINISHED") {
      resolve({ turnsTaken: action.payload.turns, pieces });
    } else {
      if (action.type === "INITIALISE_BOARD") {
        listenForBattleFinish(channel, resolve, action.payload.pieces);
      } else {
        listenForBattleFinish(channel, resolve, pieces);
      }
    }
  });
};

const waitForBattleFinish = (channel: EventChannel<BattleAction>) => {
  return new Promise<{ pieces: IndexedPieces, turnsTaken: number }>(resolve => listenForBattleFinish(channel, resolve));
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min) ) + min;

export const runDefinitions = async (a: number, aAttributes: { stage: number }, b: number, bAttributes: { stage: number }, iterations: number) => {
  const winCounts: { [id: string]: number } = {};

  for (let i = 0; i < iterations; i++) {
    const board = createBoard([
      createPiece(definitionProvider, "bot-a", a, [randomInt(0, 6), randomInt(0, 2)], null, aAttributes.stage),
      createPiece(definitionProvider, "bot-b", b, [randomInt(0, 6), randomInt(3, 5)], null, bAttributes.stage),
    ]);

    const channel = battleEventChannel(simulator, 0, board, DEFAULT_TURN_COUNT, 100);
    const { pieces } = await waitForBattleFinish(channel);

    const winnerId = [...new Set(Object.values(pieces).map(p => p.ownerId))][0];

    winCounts[winnerId] = winCounts[winnerId] ? winCounts[winnerId] + 1 : 1;
  }

  const aWins = winCounts["bot-a"] || 0;
  const bWins = winCounts["bot-b"] || 0;

  return {
    aWins,
    bWins
  };
};

export const run = async () => {
  // todo these need tying into GRID_SIZE
  const pieces = [
    createPiece(definitionProvider, "bot-a", 1, [0, 0], null),
    createPiece(definitionProvider, "bot-a", 1, [1, 0], null),
    createPiece(definitionProvider, "bot-a", 1, [2, 1], null),
    createPiece(definitionProvider, "bot-a", 1, [3, 1], null),
    createPiece(definitionProvider, "bot-b", 1, [4, 4], null),
    createPiece(definitionProvider, "bot-b", 1, [5, 4], null),
    createPiece(definitionProvider, "bot-b", 1, [5, 5], null),
    createPiece(definitionProvider, "bot-b", 1, [6, 5], null)
  ];

  const board = createBoard(pieces);

  let totalMsTaken = 0;
  let totalTurnsTaken = 0;

  const TARGET_ITERATIONS = 500;

  for (let i = 0; i < TARGET_ITERATIONS; i++) {
    const iterationStartMs = present();

    const channel = battleEventChannel(simulator, 0, board, DEFAULT_TURN_COUNT, 100);
    const { turnsTaken } = await waitForBattleFinish(channel);

    const iterationMsTaken = present() - iterationStartMs;
    totalMsTaken += iterationMsTaken;
    totalTurnsTaken += turnsTaken;
  }

  console.log(`Executed ${TARGET_ITERATIONS} battles in ${totalMsTaken.toFixed(2)}ms`);
  console.log(`Average of ${(totalMsTaken / TARGET_ITERATIONS).toFixed(2)} ms per battle`);
  console.log(`Average of ${(totalMsTaken / totalTurnsTaken).toFixed(4)} ms per turn`);
};
