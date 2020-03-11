import present = require("present");
import { battleEventChannel, BattleAction } from "@common/match/combat/battleEventChannel";
import { TurnSimulator } from "@common/match/combat/turnSimulator";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { DEFAULT_TURN_COUNT } from "@common/constants";
import { createPiece } from "@common/utils/piece-utils";
import { createTileCoordinates } from "@common/position";
import { EventChannel } from "redux-saga";

const definitionProvider = new DefinitionProvider();
const simulator = new TurnSimulator(definitionProvider);

const pieces = [
  createPiece(definitionProvider, "bot-a", 1, [2, 2], null),
  createPiece(definitionProvider, "bot-a", 1, [3, 3], null),
  createPiece(definitionProvider, "bot-a", 1, [4, 3], null),
  createPiece(definitionProvider, "bot-a", 1, [5, 2], null),
  createPiece(definitionProvider, "bot-b", 1, [2, 5], null),
  createPiece(definitionProvider, "bot-b", 1, [3, 4], null),
  createPiece(definitionProvider, "bot-b", 1, [4, 4], null),
  createPiece(definitionProvider, "bot-b", 1, [4, 4], null)
];

const listenForBattleFinish = (channel: EventChannel<BattleAction>, resolve: (value: number) => void) => {
  channel.take(action => {
    if (action.type === "BATTLE_FINISHED") {
      resolve(action.payload.turns);
    } else {
      listenForBattleFinish(channel, resolve);
    }
  });
};
const waitForBattleFinish = (channel: EventChannel<BattleAction>) => {
  return new Promise<number>(resolve => listenForBattleFinish(channel, resolve));
};

const run = async () => {
  let totalMsTaken = 0;
  let totalTurnsTaken = 0;

  const TARGET_ITERATIONS = 500;

  for (let i = 0; i < TARGET_ITERATIONS; i++) {
    const iterationStartMs = present();

    const channel = battleEventChannel(simulator, 0, pieces, DEFAULT_TURN_COUNT);
    const turnsTaken = await waitForBattleFinish(channel);

    const iterationMsTaken = present() - iterationStartMs;
    totalMsTaken += iterationMsTaken;
    totalTurnsTaken += turnsTaken;
  }

  console.log(`Executed ${TARGET_ITERATIONS} battles in ${totalMsTaken.toFixed(2)}ms`);
  console.log(`Average of ${(totalMsTaken / TARGET_ITERATIONS).toFixed(2)} ms per battle`);
  console.log(`Average of ${(totalMsTaken / totalTurnsTaken).toFixed(4)} ms per turn`);
};

run();
