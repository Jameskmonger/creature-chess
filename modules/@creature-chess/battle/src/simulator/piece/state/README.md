# State

A piece's state represents the behaviour to be undertaken by the piece for a given turn.

A piece's state can't change during a turn, however state handlers can provide a new state for a piece to use on the next turn.

## Structure

A state is a simple structure, with a `type` and some `payload`.

The most simple state of all is:

```ts
{
	type: "wandering";
}
```

which will make pieces wander around the board (and try to find a better state)

States can contain information in their payload, such as the target of an `attacking` state.

```ts
{
	type: "attacking";
	payload: {
		targetId: string;
	}
}
```

This is not used for "stateful" data related to the piece, only to store information related to the piece's current behaviour.

## State Handlers

A state handler processes the piece's current state and returns one or two things:

- the next state for the piece
- **(optional)** a list of actions for the piece to take

For example, the `wandering` handler:

- returns a better state if there is one:

```ts
if (bestState.type !== "wandering") {
    return [bestState];
}
```

- returns the same `wandering` state if the piece isn't ready to move yet:

```ts
if (combatState.canMoveAtTurn > currentTurn) {
	return [state];
}
```

- returns the same `wandering` state if there is nowhere for the piece to move to:

```ts
if (emptyPositions.length === 0) {
	return [state];
}
```

- keeps the piece in `wandering` state but also commands the piece to move to a new position

```ts
const moveAction: MoveAction = {
	type: "move",
	payload: {
		x: emptyPositions[0].x,
		y: emptyPositions[0].y,
	},
};

return [state, [moveAction]];
```

Pieces will be assigned to their new state on the next turn, and any actions will be processed immediately as part of this piece's turn.

To see more about how actions are handled, [read the Actions README.](../actions/README.md)

## Tips

- Be careful with the data stored in the states - they should be a long-running property of the piece's current action.
- Return the same `state` property from state handlers when you want the piece to keep doing something

  We only check with `===` so keeping the same object will help reduce calculations
