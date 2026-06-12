# Operator-overlay mods

This directory is your deployment's plugin overlay. Drop an **already-
built** plugin package here (one directory per plugin id, e.g.
`@some-author/cool-mod/`) and add its id to `creature-chess.json`.

The expected layout of an installed mod:

```
mods/
  @some-author/
    cool-mod/
      package.json
      dist/
        index.js          # server entry (if isomorphic)
        web/
          index.js        # browser bundle
      images/             # static assets, served at
        front/<id>.png    #   /plugins/<plugin-id>/images/...
        back/<id>.png
```

The directory is bind-mounted at `/mods` inside both the **server-game**
container (the kernel's `require()` finds plugins via `CC_MODS_DIR=/mods`)
and the **manifest-builder** container (its projection reads each
plugin's `package.json` to decide if it ships a browser bundle). nginx
also bind-mounts it at `/mods` to serve bundles via `try_files`,
preferring an overlay mod over a built-in of the same id.

To apply a change to this directory or `creature-chess.json`:

```
make reload
```

That re-runs the manifest projector and restarts the game server. nginx
keeps running and serves the new manifest on the next refresh.

> Today the deployment is this cloned repository; future deployments
> pull pre-built images from a registry. The bind-mount model is the
> same either way - this directory and `creature-chess.json` are
> operator-owned, never baked into an image.

This directory's contents are gitignored (except this README and
`.gitkeep`).
