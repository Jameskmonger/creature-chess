# Creature Chess

An open-source auto chess game written in TypeScript using React and Node.

# Playing

To try the game, head to [creaturechess.jamesmonger.com](http://creaturechess.jamesmonger.com), register an account and click "Find Game".

This is just on a tiny server for demo purposes so it might not work all the time - please [get in touch](mailto:jameskmonger@hotmail.co.uk) if you have a better server that we can use :heart:

# Developing

We welcome help in all areas: creating new pieces, adding new features, fixing bugs, balancing combat, improving performance, and anything else you can think of.

## Prerequisites

- Node.js
- Docker w/ docker-compose
- A Fauna database with an access key in environment variable `CREATURE_CHESS_FAUNA_KEY`
- An Auth0 app with a management client secret in environment variable `AUTH0_MANAGEMENT_CLIENT_SECRET`

## Installation

```shell
$ npm install && npm run bootstrap
```

## Running

- Run the app with `npm run dev:app`
- Run the servers with `docker-compose build && docker-compose up`

When the game is running, you will be able to access it at localhost:8090 in your browser.

## Publishing

- Use `npm run version` to create a new version - create a tag and commit, and push to Git
  - This publishes GitHub pages (`app`) and Docker Hub (`server-game`)
- Push to Heroku with `git push -f heroku v0.2.2^{}:master`
  - Replace v0.2.2 with tag from last step
  - This publishes Heroku (`server-info`)
  - You may have to run this in Bash

## Special thanks :heart:

Special thanks to **[thyde1](https://github.com/thyde1)**, **[hisuwh](https://github.com/hisuwh)**, **[OwenPattison](https://github.com/OwenPattison)**, **[BaronBeans](https://github.com/BaronBeans)**, **[CalumGreen](https://github.com/CalumGreen)**, **[ollymonger](https://github.com/ollymonger)** and Jack

## License

Creature Chess is licensed under the [AGPL v3 License](LICENSE).

All creature sprites are from Tuxemon and are licensed under the [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/).
