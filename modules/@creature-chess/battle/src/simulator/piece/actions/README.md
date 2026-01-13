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

An action handler processes a single `action` onto the board.
