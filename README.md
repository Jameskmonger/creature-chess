# Creature Chess

An open-source auto chess game written in TypeScript using React and Node.

## Playing

To try the game, head to [creaturechess.gg](https://creaturechess.gg), register an account and click "Find Game".

## Development

### Prerequisites

- Node.js
- Docker w/ docker-compose
- Yarn (`npm i -g yarn && yarn set version berry`)
- Auth0 set up (see below)

### Environment variables

Copy `.env.example` to `.env` in the root of the repo.

These will be automatically picked up and used by the game.

### Auth0 Setup (optional)

You can optionally configure Auth0 to manage users and authentication.

You will need to set up an Auth0 tenant and store some environment variables.

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

### Setup

To build and run the project, you can use `make`:

```shell
make
```

If you change the server, you can run `make rebuild` to rebuild and restart the server.

### Dev toolkit

```shell
$ yarn dev-tools
```

## Creature images

When you run `make server`, the creature images will be hosted at `http://localhost/images`.

You can set the `CREATURE_CHESS_IMAGE_URL` environment variable to change this, for instance to use a CDN.

## License

Creature Chess is licensed under the [AGPL v3 License](LICENSE).

All creature sprites are from Tuxemon and are licensed under the [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/).
