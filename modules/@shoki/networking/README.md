# `@shoki/networking`

Strongly-typed emitter/subscriber framework, suitable for isomorphic Socket.io and other applications.

Also contains an `ActionStream` implementation, allowing for the continuous streaming of Redux actions between a client and server, using redux-saga.

## Usage

For the real strengths of using this isomorphically, you will want at least three projects, `client`, `server` and `shared`. Client and server are self-explanatory, shared will contain the code used to tie the two together.

### Shared

First, in the shared package, you will need to define a set of packets and create a protocol.

```ts
import { protocol } from "@shoki/networking";

type PacketSet = {
	moneyUpdate: {
		value: number;
		ack: never;
	};
	messageReceived: {
		value: {
			style: number;
			message: string;
		};
		ack: never;
	};
};

export const { incoming, outgoing } = protocol<PacketSet>();
```

The `incoming` and `outgoing` exports are factories to create "registries" - which will allow for the actual sending/subscribing. The packets above are server->client, so let's go to the client and set up the subscriptions first.

### Subscription

```ts
import { incoming } from "@my-cool-project/shared";
import { Socket } from "socket-io.client";

export const createRegistry = (socket: Socket) =>
	incoming(
		(opcode, handler) => socket.on(opcode, handler),
		(opcode, handler) => socket.off(opcode, handler)
	);
```

It's as simple as that - `createRegistry(socket)` will now create a `@shoki/networking` incoming registry wrapping the socket. You can then subscribe to the registry like so:

```ts
const registry = createRegistry(socket);

registry.on("moneyUpdate", (value) => {
	// value from server
});
```

The type of `value` will be inferred from the `PacketSet`.

**note:** You won't be able to use a string opcode that wasn't provided in the `PacketSet`, so don't worry - it's type safe!

### Emitting

This code goes into the server and will be used to publish messages according to the `PacketSet`.

```ts
import { outgoing } from "@my-cool-project/shared";
import { Socket } from "socket-io";

export const createRegistry = (socket: Socket) =>
	outgoing((opcode, payload, ack) => socket.emit(opcode, payload, ack));
```

Sending packets using this registry is equally easy as subcribing to them.

```ts
const registry = createRegistry(socket);

registry.emit("moneyUpdate", 5);
```

You will be unable to pass a value of the incorrect type here.

**note:** You won't be able to use a string that wasn't provided in the `PacketSet`, so don't worry - it's type safe!

## Acknowledgements

You can choose to give a packet an acknowledgement function. This will allow the receiver to send some data back to the sender.

To do this, you must declare the function type you wish to use for the acknowledgement.

```ts
type PacketSet = {
	moneyUpdate: {
		value: number;
		ack: (message: string) => void;
	};
};
```

Then, on the sender's side, you will have to add a callback function to `send`:

```ts
registry.send("moneyUpdate", 5, (message) => {
	console.log(`Acknowledgment received: '${message}'`);
});
```

And lastly, on the receiver's side, you will have access to this `ack` function to call it with the desired data.

```ts
registry.on("moneyUpdate", (value, ack) => {
	ack(`Thank you for sending me ${value} gold coins`);
});
```

## ActionStream

There is a utility included in this library called `ActionStream`, which allows you to, for a given list of Redux action types:

- subscribe to a store, and send the received actions to a `@shoki/networking` registry
- subscribe to a `@shoki/networking`, and publish the received actions to a store

You will need redux-saga to use this.

An `ActionStream` is simple to configure. You must first define it in your `PacketSet`:

```ts
import { ActionStream } from "@shoki/networking";

export type PacketSet = {
	sendSharedActions: ActionStream.ActionStreamPacket;
};
```

You also need to declare a list of action types to subscribe to.

```ts
export const SharedActionTypesArray = [
	"MONEY_UPDATE",
	"HEALTH_UPDATE",
	"COLOR_UPDATE",
];
```

Then, on the receiver's side, you must call the incoming saga from one of your own sagas:

```ts
import { PacketSet, SharedActionTypesArray } from "@my-cool-project/shared";

import { ActionStream } from "@shoki/networking";

export const myCoolSaga = function* () {
	yield call(
		ActionStream.incomingSaga<PacketSet, "sendSharedActions">(
			registry,
			"sendSharedActions",
			SharedActionTypesArray
		)
	);
};
```

And lastly, on the sender's side, you must do the same thing for the outgoing saga:

```ts
import { PacketSet, SharedActionTypesArray } from "@my-cool-project/shared";

import { ActionStream } from "@shoki/networking";

export const anotherCoolSaga = function* () {
	yield call(
		ActionStream.outgoingSaga<PacketSet, "sendSharedActions">(
			registry,
			"sendSharedActions",
			SharedActionTypesArray
		)
	);
};
```

**Done!** Your actions in the `SharedActionTypesArray` will now be synced between the stores on either side of the registry.
