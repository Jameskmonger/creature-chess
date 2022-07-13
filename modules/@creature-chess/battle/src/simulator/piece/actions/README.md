# Actions

An action represents a single behaviour that a piece should undertake.

It may affect the local piece and/or other pieces on the board.

## Action

An action has a `type` and a `payload`.

For example, the `move` actions contains a payload representing the tile to which the piece should be moved.

```ts
{
	type: "move";
	payload: {
		x: number;
		y: number;
	}
}
```

## Action Handlers

An action handler processes a single `action` onto the board, and returns a new `BoardState<PieceModel>`, affected by the changes.

For example, the `move` action handler:

- returns the `board` unaffected if the piece can't move yet

```ts
if (combatState.canMoveAtTurn > currentTurn) {
	return board;
}
```

- runs the board through a `reducer` to move the piece

```ts
return boardSlice.boardReducer(
	board,
	boardSlice.commands.moveBoardPieceCommand({
		pieceId: piece.id,
		from: piecePosition,
		to: action.payload,
	})
);
```

The new board will then be used to process any remaining actions, before being passed on to the next piece for their turn.
