# `@creature-chess/networking`

Networking definitions for Creature Chess, defined using `@shoki/networking` protocols.

## Usage

You can import one of the given protocols from the package and then register incoming/outgoing registries as you wish.

```ts
import { Socket } from "socket-io.client";

import { GameServerToClient } from "@creature-chess/networking";

const createIncomingRegistry = (socket: Socket) =>
	GameServerToClient.incoming(
		(opcode, handler) => socket.on(opcode, handler),
		(opcode, handler) => socket.off(opcode, handler)
	);
```

You can also access the underlying `PacketSet` with `GameServerToClient.PacketSet` (replace `GameServerToClient` with your desired protocol)

## Protocols

### `LobbyServerToClient`

Used on the lobby screen for server->client communications.

### `ClientToServer`

Used in the game for client->server communications.

### `GameServerToClient`

Used in the game for server->client communications.
