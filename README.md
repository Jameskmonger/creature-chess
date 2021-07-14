# Creature Chess

An open-source auto chess game written in TypeScript using React and Node.

## Playing

To try the game, head to [creaturechess.jamesmonger.com](https://creaturechess.jamesmonger.com), register an account and click "Find Game".

This is just on a tiny server for demo purposes so it might not work all the time - please [get in touch](mailto:jameskmonger@hotmail.co.uk) if you have a better server that we can use :heart:

## Development

### Prerequisites

- Node.js
- Docker w/ docker-compose
- A Fauna database with an access key in environment variable `CREATURE_CHESS_FAUNA_KEY`
  - You can use [Fauna Dev](https://docs.fauna.com/fauna/current/integrations/dev.html) for this
- An Auth0 app for the server
  - Set up a [machine to machine app](https://auth0.com/docs/applications/set-up-an-application/register-machine-to-machine-applications)
  - Store the client secret in environment variable `AUTH0_MANAGEMENT_CLIENT_SECRET`
- An Auth0 app for the frontend
  - Set up a [single page app](https://auth0.com/docs/applications/set-up-an-application/register-single-page-app)
  - In Auth0 config for SPA
    - Set `Allowed Callback URLs` = "https://creaturechess.local-dev.com:8090"
    - Set `Allowed Web Origins` = "https://creaturechess.local-dev.com:8090"
  - Modify `packages/gamemode/src/config/config.local.ts` and change `auth0` config to match your two auth0 apps
- **(optional)** A Docker bot with a token in environment variable `DISCORD_BOT_TOKEN`
- **(optional)** A Sentry.io DSN in `SENTRY_DSN`

### Running

```shell
# install and link dependencies
$ npm install && npm run bootstrap

# run the frontend in dev mode
$ npm run dev:app

# run the server (do this in a separate console)
$ docker-compose build && docker-compose up
```

The game is then accessible at `https://creaturechess.local-dev.com:8090`. You might need to add `creaturechess.local-dev.com` to your host file (or remove `host` from `webpack.config.js`)

### Publishing

- Use `npm run release` to create a new release - create a tag and commit, and push to Git
  - This publishes GitHub pages (`app`) and Docker Hub (`server-game`)
- Push to Heroku with `git push -f heroku v0.2.2^{}:master`
  - Replace v0.2.2 with tag from last step
  - This publishes Heroku (`server-info`)
  - You may have to run this in Bash

## Packages

If the package has a README, you can click on its name here for a link.

### Clients
- [**app**](./packages/cc-app/README.md) - React app
- **server-game** - websocket gameserver
- **server-info** - express API server

### Server/Client bindings
- **models** - type library for all shared/domain-centered models
- **networking** - packet definitions etc shared between app and server

### Gamemode
- **board** - Redux reducer and commands for the board
- **gamemode** - the gamemode
- **battle** - battle logic

### Utilities
- **auth-server** - shared code for auth0 on the server
- **data** - database access

## License

Creature Chess is licensed under the [AGPL v3 License](LICENSE).

All creature sprites are from Tuxemon and are licensed under the [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/).
