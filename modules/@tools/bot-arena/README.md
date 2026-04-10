# @tools/bot-arena

Headless harness for running all-bot creature-chess games and measuring how bot personality values correlate with game outcomes.

## Run a batch of games

```bash
yarn nx start @tools/bot-arena
```

Defaults: 200 games × 8 bots, parallel across `cpus() - 1` workers. Output goes to `data/<runId>-w<n>.csv`.

Override with env vars:

```bash
GAMES=500 WORKERS=23 yarn nx start @tools/bot-arena
```

## Analyse a run

```bash
# Latest run
yarn nx run @tools/bot-arena:correlate

# Specific run by id (the harness prints its run id when it finishes)
yarn nx run @tools/bot-arena:correlate -- --run 1775865133270

# Or by explicit CSV path(s)
yarn nx run @tools/bot-arena:correlate -- modules/@tools/bot-arena/data/1234567890-w0.csv
```

The script prints three views:

1. **Pearson correlation** between each personality trait and `finishPosition` / `finishRound`
2. **Bucketed averages** — average finish position per personality bucket (looks for goldilocks shape)
3. **Pairwise interaction matrices** — 3×3 grids for each pair of traits (looks for clashes / synergies)

Use `--buckets 5` for finer-grained buckets when sample sizes are large.

## Notes

- Each run writes its own `<runId>-w<n>.csv` files; old runs are never deleted. Clean up `data/` manually when you no longer need them.
