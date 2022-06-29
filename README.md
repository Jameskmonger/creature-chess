# Creature Chess

An open-source auto chess game written in TypeScript using React and Node.

## Playing

To try the game, head to [creaturechess.com](https://creaturechess.com), register an account and click "Find Game".

This is just on a tiny server for demo purposes so it might not work all the time - please [get in touch](mailto:jameskmonger@hotmail.co.uk) if you have a better server that we can use :heart:

## Development

### Prerequisites

- Node.js
- Docker w/ docker-compose
- Yarn (`npm i -g yarn && yarn set version berry`)
- A Fauna database with an access key in environment variable `CREATURE_CHESS_FAUNA_KEY`
  - You can use [Fauna Dev](https://docs.fauna.com/fauna/current/integrations/dev.html) for this
- An Auth0 app for the server
  - Set up a [machine to machine app](https://auth0.com/docs/applications/set-up-an-application/register-machine-to-machine-applications)
  - Store the client secret in environment variable `AUTH0_MANAGEMENT_CLIENT_SECRET`
- An Auth0 app for the frontend
  - Set up a [single page app](https://auth0.com/docs/applications/set-up-an-application/register-single-page-app)
  - In Auth0 config for SPA
    - Set `Allowed Callback URLs` = "http://localhost:8080"
    - Set `Allowed Web Origins` = "http://localhost:8080"
  - Modify `packages/gamemode/src/config/config.local.ts` and change `auth0` config to match your two auth0 apps
- **(optional)** A Docker bot with a token in environment variable `DISCORD_BOT_TOKEN`
- **(optional)** A Sentry.io DSN in environment variable `SENTRY_DSN`
- **(optional)** A game server URL in environment variable `GAME_SERVER_URL`
- **(optional)** An info server URL in environment variable `API_INFO_URL`

### Setup

Run `yarn` in the project root.

### Running

```shell
$ yarn dockerup
```

The game is then accessible at `http://localhost:8080`.

In another console, you will need to run the following command to run the User service locally.

```shell
$ yarn dev:user
```

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

- Run `yarn ecr-push`
- Update the ECS task definition
- Update the ECS service to use the new task definition

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

## License

Creature Chess is licensed under the [AGPL v3 License](LICENSE).

All creature sprites are from Tuxemon and are licensed under the [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/).
