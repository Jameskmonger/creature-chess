# `@shoki/board`

A stateful representation of a board, allowing for the addition and removal of pieces, as well as moving pieces around the board.

Contains a Redux reducer and associated commands.

## Usage

```ts
import { BoardState, createBoardSlice } from "@shoki/board";

type Piece = { id: string, name: string }

const { boardReducer, commands } = createBoardSlice<Piece>("board", { width: 8, height: 8 });

const piece: Piece = { id: "123", name: "bob" };

const state: BoardState<Piece> = boardReducer(null, commands.addBoardPieceCommand({ x: 3, y: 0, piece }));
```
