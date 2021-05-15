# `@shoki/engine`

Game engine using sagas

## Usage

### Entity

An entity is a behavioural object, containing some state (using Redux reducers) and allowing for state-based behaviour (using Redux Sagas).

```typescript
import { entity } from "@shoki/engine";
import { select } from "redux-saga/effects";

type PlayerState = {
	health: number;
};

// a `ReducersMapObject` like you would pass to `combineReducers` - for the internal entity state
const reducers = {
	health: healthReducer
};

const rootSaga = function*() {
	const health = yield select(state => state.health);

	console.log("my health is now ", health);
};

const player = entity<PlayerState>(
	{ reducers, rootSaga },
	{},
	"player-id",
	{}
);

/*
 * run sagas, and query the entity state, from outside
 */
player.runSaga(someOtherSaga);
const h = player.select(state => state.health);
```

The `rootSaga` will run immediately and allow for the creation of rich behaviours. Check out the [Redux Saga](https://redux-saga.js.org/) documentation for more information.

#### Dependencies

You can pass dependencies into your entity, to be used inside the saga, such as a Logger. Dependencies cannot be modified or unset once they are provided to the entity.

```typescript
import { entity, getDependency } from "@shoki/engine";

type PlayerDependencies = {
	logger: Logger
};

const dependencies: PlayerDependencies = {
	logger: winston.createLogger()
};

const rootSaga = function*() {
	const logger = yield getDependency<PlayerDependencies, "logger">("logger");

	logger.info("hello! using a dependency");
};

const player = entity<PlayerState, PlayerDependencies>(
	{ reducers, rootSaga },
	{ logger },
	"player-id",
	{}
);
```

#### Variables

Variables are a set of properties on an entity that can be read/modified any saga on the entity. Use these for non-serializable things that shouldn't go into your internal Redux store.

```typescript
import { entity, getVariable, updateVariables } from "@shoki/engine";

type PlayerVariables = {
	match: Match | null
};

const vars: PlayerVariables = {
	match: null
};

const rootSaga = function*() {
	const match = yield* getVariable<PlayerVariables, Match | null>(v => v.match);

	// match is null

	yield updateVariables<PlayerVariables>({ match: new Match() });

	const anotherMatch = yield* getVariable<PlayerVariables, Match | null>(v => v.match);

	// anotherMatch is new Match()
};

const player = entity<PlayerState, {}, PlayerVariables>(
	{ reducers, rootSaga },
	{ },
	"player-id",
	vars
);
```

### Entity Factory

Used to define the shape of an entity, to allow for the instantiation of multiple entities who all share a `rootSaga` and set of `reducers`.

```typescript
type PlayerState = {
	health: number;
};

type PlayerDependencies = {
	logger: Logger
};

type PlayerVariables = {
	match: Match | null
};

const playerFactory = entityFactory<PlayerState, PlayerDependencies, PlayerVariables>(
	{ reducers, rootSaga }
)

// no need to pass reducers/rootSaga
const player = playerFactory({ logger }, "player-id-123", { match: null });
```

You can also provide a function to `entityFactory`, which takes in the `dependencies` object, and must return `{ reducers, rootSaga }`. This can allow you to use those dependencies in your reducers/saga - such as using reducers from a `@reduxjs/toolkit` slice.

```typescript
type Deps = { healthSlice: Slice<number> }

const playerFactory = entityFactory<PlayerState, Deps, PlayerVariables>(
	({ healthSlice }) => ({
		reducers: {
			health: healthSlice.reducer
		},
		rootSaga
	})
);
```
