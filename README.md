# Creature Chess

An open-source auto chess game written in TypeScript using React and Node.

## Playing

To try the game, head to [creaturechess.gg](https://creaturechess.gg), register an account and click "Find Game".

This is just on a tiny server for demo purposes so it might not work all the time - please [get in touch](mailto:jameskmonger@hotmail.co.uk) if you have a better server that we can use :heart:

## Development

### Prerequisites

- Node.js
- Docker w/ docker-compose
- Yarn (`npm i -g yarn && yarn set version berry`)
- Auth0 set up (see below)
- **(optional)** A Docker bot with a token in environment variable `DISCORD_BOT_TOKEN`
- **(optional)** A Sentry.io DSN in environment variable `SENTRY_DSN`
- **(optional)** A game server URL in environment variable `GAME_SERVER_URL`
- **(optional)** An info server URL in environment variable `API_INFO_URL`

### Environment variables

Create a `.env` file in the project root to store environment variables.

The contents should be like so:

```
NODE_ENV=development
AUTH0_DOMAIN=
AUTH0_SPA_CLIENT_ID=
AUTH0_MACHINE_TO_MACHINE_CLIENT_ID=
AUTH0_MANAGEMENT_CLIENT_SECRET=
CREATURE_CHESS_APP_URL=http://localhost
GAME_SERVER_URL=http://localhost/game/
API_INFO_URL=http://localhost/api
CREATURE_CHESS_IMAGE_URL=http://localhost/images

POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres?schema=public
```

These will be automatically picked up and used by the build scripts.

### Auth0 Setup

You will need to set up an Auth0 tenant in order to run Creature Chess locally.

See "Environment variables" above for info on how to store them.

- Set up a [machine to machine app](https://auth0.com/docs/applications/set-up-an-application/register-machine-to-machine-applications)

  The app needs the following permissions:

  - `client_credentials` (under Advanced Settings -> OAuth)

  This is used by the backends

  - Store the **client id** in environment variable `AUTH0_MACHINE_TO_MACHINE_CLIENT_ID`
  - Store the **client secret** in environment variable `AUTH0_MANAGEMENT_CLIENT_SECRET`

- Set up a [single page app](https://auth0.com/docs/applications/set-up-an-application/register-single-page-app)

  This is used by the frontend

  There are some steps that you need to take on the Auth0 config for this:

  - Set `Allowed Callback URLs` = "http://localhost"
  - Set `Allowed Web Origins` = "http://localhost"

  Then, set the following environment variables

  - **domain** as `AUTH0_DOMAIN`
  - **client id** as `AUTH0_SPA_CLIENT_ID`

(btw, I am not really happy that we need all this just to test locally, but equally, I don't want to have a "guest mode" locally and not test the auth0 pre-prod. Auth0 sadly doesn't offer a local version. Open to any ideas on it!)

### Setup

Run `yarn` in the project root.

### Initial run

For the first run you need to set up the database and run the migrations.

```shell
yarn dockerup-db
```

then

```shell
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=public yarn workspace @creature-chess/data prisma-migrate reset
```

(note that this `DATA_BASE_URL` is different to the one in the `.env` file - this is because the database is running in a docker container, so the host is `localhost` instead of `postgres`)

### Running

```shell
$ yarn dockerup
```

The game is then accessible at `http://localhost`.

### Dev toolkit

```shell
$ yarn dev-tools
```

## Publishing

- Update the root package.json version
- Run the following commands (substitute your version number):

  ```
  git add package.json && git commit -m "v0.4.22" && git push origin head && git tag -a v0.4.22 -m "v0.4.22" && git push origin v0.4.22
  ```

## Apps

End-clients. Servers and UIs

- [**web**](./apps/web/README.md) - React app for the game
- [**server-game**](./apps/server-game/README.md) - websocket gameserver

## Modules

Reusable logic

### UI

- \@creature-chess/**ui** - reusable components

### Server/Client bindings

- \@creature-chess/**models** - type library for all shared/domain-centered models
- \@creature-chess/**networking** - packet definitions etc shared between app and server

### Gamemode

- \@creature-chess/**gamemode** - the gamemode
- \@creature-chess/**battle** - battle logic

### Utilities

- \@creature-chess/**auth-server** - shared code for auth0 on the server
- \@creature-chess/**data** - database access

### Shoki

- \@shoki/**board**
- \@shoki/**board-react**
- \@shoki/**engine**
- \@shoki/**networking**

## Publishing

- Update `package.json` version
- Make a commit with the message as version number (e.g. "v0.0.1")
- Make a new tag "v0.0.1"
- Push

## Creature images

When you run `yarn dockerup`, the creature images will be hosted at `http://localhost/images`.

You can set the `CREATURE_CHESS_IMAGE_URL` environment variable to change this, for instance to use a CDN.

## License

Creature Chess is licensed under the [AGPL v3 License](LICENSE).

All creature sprites are from Tuxemon and are licensed under the [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/).
