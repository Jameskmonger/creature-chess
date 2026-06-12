# Server-mod template

The minimal three-file skeleton for a Creature Chess **server-side** mod.
Start here, search-replace `@your-handle/your-server-mod`, fill in
`src/index.ts`.

```
package.json        - name, exports, build script, peer deps
tsconfig.json       - extends nothing; standalone-buildable
index.ts            - re-export from src
src/index.ts        - the Plugin itself (your onEnable)
```

To build: `yarn build` (tsc). Outputs go to `dist/`.

To use locally: drop the built directory into the deployment's `mods/`
directory and add `@your-handle/your-server-mod` to
`creature-chess.json`. See `docs/AUTHORING_A_PLUGIN.md`.

## Server vs client mods

A **server mod** declares its `package.json` `main` (a Node-importable
entry) and runs inside the `server-game` process. It extends the
gamemode context at boot - defines, creatures, player actions, wire
vocabulary, lifecycle event subscriptions.

A **client mod** ships a browser bundle at `dist/web/index.js` and
extends the React UI through Region operations + Redux reducers. See
`templates/mod/` for that skeleton.

A mod can be both - declare `main` *and* emit `dist/web/index.js` and
the context loads each half on its own side.
