# Creature Chess

An open-source auto chess game written in TypeScript using React and Node.

## Playing

To try the game, head to [creaturechess.gg](https://creaturechess.gg), register an account and click "Find Game".

## Development

### Prerequisites

- Node.js
- Docker w/ docker-compose
- Yarn (`npm i -g yarn && yarn set version 3.4.1`)
- Auth0 set up (see below)

### Environment variables

Copy `.env.example` to `.env` in the root of the repo.

These will be automatically picked up and used by the game.

### Setup

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

## License

Creature Chess is licensed under the [AGPL v3 License](LICENSE).

All creature sprites are from Tuxemon and are licensed under the [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/).
