import present = require("present");
import { GamePhase } from "@common";
import { Game, Bot, Player } from "@common/game";
import { DEFAULT_TURN_COUNT } from "./shared/constants";

let benchmarkStart: number;
const GAME_COUNT = 5;
const PLAYER_COUNT = 8;

const results: { rounds: number, winner: string }[] = [];
const storeResult = (rounds: number, winner: Player) => {
    results.push({ rounds, winner: winner.name });

    if (results.length === GAME_COUNT) {
        console.log(`Benchmark complete in ${Math.floor(present() - benchmarkStart)}ms`);

        const resultRounds = results.map(r => r.rounds);
        const average = Math.floor(resultRounds.reduce((acc, cur) => acc + cur, 0) / resultRounds.length);

        console.log(`Average round: ${average}`);
        console.log(`Min round: ${Math.min(...resultRounds)}`);
        console.log(`Max round: ${Math.max(...resultRounds)}`);
    }
};

const games: Game[] = [];

for (let g = 0; g < GAME_COUNT; g++) {
    const game = new Game(
        PLAYER_COUNT,
        {
            [GamePhase.READY]: 0
        },
        DEFAULT_TURN_COUNT,
        0
    );

    game.onFinish(storeResult);
    games[g] = game;
}

for (let g = 0; g < GAME_COUNT; g++) {
    for (let i = 0; i < PLAYER_COUNT; i++) {
        games[g].addPlayer(new Bot(`Bot #${i + 1}`));
    }
}

console.log("Starting benchmark");

benchmarkStart = present();
