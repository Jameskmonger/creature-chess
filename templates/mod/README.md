# Mod template

The minimal four-file skeleton for a Creature Chess client mod. Start
here, search-replace `@your-handle/your-mod`, fill in
`src/client/index.ts`.

```
package.json        - name, exports, build scripts, peer deps
tsconfig.json       - extends nothing; standalone-buildable
webpack.config.js   - three lines, calls the shared helper
client.ts           - re-export from src
src/client/index.ts - the ClientPlugin itself (your code)
src/client/web.ts   - bundle entry, calls runtime.register()
```

To build: `yarn build` (server tsc) + `yarn build:web` (browser bundle).
Outputs go to `dist/` and `dist/web/index.js`.

To use locally: drop the **built** directory into the deployment's
`mods/` directory and add `@your-handle/your-mod` to
`creature-chess.json`.
