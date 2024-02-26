# `@tools/bot-analysis`

1. Check `src/cluster.ts` and adjust the settings at the top of the file.
2. Run `yarn start-cluster`. This will run on `min(24, cpuCount - 1)` cores.

Data will go into `./data/{start time}/*.csv`. You can run the following command to combine them into a single csv:

```sh
tail n+2 -q ./data/{start time}/*.csv >> ./output.csv
```

## Recommended changes to run faster:

- Change `bot/src/constants` `BOT_ACTION_TIME_MS` to `0`
- Change `bot/src/saga` `delay(..)` to `delay(20)`
- Change `gamemode/src/game/gameLoop/phases/playing` `delay(..)` to `delay(20)`
- Change `gamemode/src/game/gameLoop/phases/ready` `delay(..)` to `delay(20)`
- Change `gamemode/src/game/match` `fight` `delay(..)` to `delay(20)`
- Change `models/config` ready phase length to `0`
