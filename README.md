# Creature Chess

An open-source auto chess game written in TypeScript using React and Node.

# Playing

To try the game, head to [creaturechess.jamesmonger.com](http://creaturechess.jamesmonger.com). If you want to see what the game is about, and play against some bots, enter "Player Count" as 8, "Bot Count" as 7 and click "Create Game".

This is just on a tiny server for demo purposes so it might not work all the time - please [get in touch](mailto:jameskmonger@hotmail.co.uk) if you have a better server that we can use :heart:

## Getting into a game

To join a random public game, press "Find Game".

If you want to join a specific lobby (e.g. one your friends are in), enter the ID (e.g. `bf90b4`) and click "Join Game".

You can create a private lobby by clicking "Create Private Lobby".

## How to play - basics

Every round you get some money (this is affected by win/loss streak). Use that money to buy pieces from the shop on the left, and put them on the board.

You can only have X pieces on the board, where X is your level. You gain 1 xp per round, or you can buy more xp for money to level up faster.

When you have 3 of the same piece, they will combine into an upgraded piece. Each piece has 3 levels, so in total you need to buy 9 pieces from the shop to make a top-level creature.

If you lose a match, you lose 3hp for every remaining opponent piece. You lose when your hp reaches 0. The last person alive wins.

---

# Developing

We welcome help in all areas: creating new pieces, adding new features, fixing bugs, balancing combat, improving performance, and anything else you can think of.

## Prerequesites

- You need [Node.js](https://nodejs.org/en/) and npm to run Creature Chess. The Node.js installer will install both of these - Node.js version 10 is recommended.
- Install dependencies with `npm install`.

## Running

When the game is running, you will be able to access it at localhost:8090 in your browser.

To run both the server and the client at the same time (recommended), you can use the command:

```shell
$ npm start
```

### Advanced

If you want to run the server or client individually, you can use these two commands

```shell
# run the server individually
$ npm run start:server

# run the client individually
$ npm run start:client
```

You can also run the server and client in development mode, where changes to the source code will result in the system restarting.

```shell
# run the server in dev mode
$ npm run dev:server

# run the client in dev mode
$ npm run dev:client
```

## Special thanks :heart:

- **[thyde1](https://github.com/thyde1)**: combat and animation
- **[hisuwh](https://github.com/hisuwh)**: drag and drop
- **[OwenPattison](https://github.com/OwenPattison)**: deck of cards, implementing Redux
- **[BaronBeans](https://github.com/BaronBeans)**: bug fixes and server setup

Also special thanks to **[CalumGreen](https://github.com/CalumGreen)**, **[ollymonger](https://github.com/ollymonger)** and Jack for their play testing.

## License

Creature Chess is licensed under the [MIT License](LICENSE).

All creature sprites are from Tuxemon and are licensed under the [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/).
