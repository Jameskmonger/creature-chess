# @cc-plugins/debug-ui

Developer mod. Outlines every declared Region with a dashed border and
labels it with its class name. Hover any tag to see the ctx payload.

The point: when you're authoring a mod and wondering "what region
should I target for X?" - flip this on, point at the thing on screen,
read the class.

## Enable

Add to `creature-chess.dev.json` and reload:

```json
{
  "plugins": [
    …,
    "@cc-plugins/debug-ui"
  ]
}
```

Then `CREATURE_CHESS_MANIFEST=creature-chess.dev.json make reload`.

## What it demonstrates

- Every `Region` is addressable; the host owns the vocabulary; the
  vocabulary is fully enumerable at compile time
  (`keyof RegionContexts`).
- The `wrap` verb composes with anything - the host's children render
  inside the outline; other mods' transforms still apply.
- The mod ships a **compile-time completeness check**: a new class in
  `RegionContexts` that this mod hasn't been updated for is a build
  error, not a runtime omission.
