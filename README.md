# Creature Chess

An open-source auto chess game written in TypeScript using React and Node.

## Playing

To try the game, head to [creaturechess.gg](https://creaturechess.gg), register an account and click "Find Game".

## Development

### Prerequisites

- Node.js 22 or 24
- Docker w/ docker-compose
- Yarn (`npm i -g yarn && yarn set version 4.9.1`)

### Environment variables

Copy `.env.example` to `.env` in the root of the repo.

These will be automatically picked up and used by the game.

### Generate Prisma client

If you are aiming to work on the code locally, you must generate the Prisma client so that TypeScript understands the available types.

```shell
make prisma-generate
```

### Running it in Docker

To build and run the project, you can use `make`:

```shell
make
```

If you change the server, you can run `make rebuild` to rebuild and restart the server.

### Documentation

- [Auth0 Setup](docs/auth0.md)
- [Monorepo / Modules](docs/monorepo.md)

## Creature images

When you run `make server`, the creature images will be hosted at `http://localhost/images`.

You can set the `CREATURE_CHESS_IMAGE_URL` environment variable to change this, for instance to use a CDN.

## Metrics

The game server is configured to send metrics via Prometheus.

Metrics are available at `/game/metrics` behind Basic Auth. You **must** configure the `METRICS_USERNAME` and `METRICS_PASSWORD` environment variables in your `.env` file, or metrics will not be available.

You can set a default label by setting the `NODE_APP_INSTANCE` environment variable.

## License

Creature Chess is licensed under the [AGPL v3 License](LICENSE).

All creature sprites are from Tuxemon and are licensed under the [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/).
