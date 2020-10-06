import { OutgoingPacketRegistry } from "@creature-chess/shared/networking/outgoing-packet-registry";
import { ServerToClientLobbyPacketAcknowledgements, ServerToClientLobbyPacketDefinitions } from "@creature-chess/shared/networking/server-to-client-lobby";
import { Socket } from "socket.io";

export enum LobbyMemberType {
    BOT,
    PLAYER
}

export type PlayerLobbyMember = {
    type: LobbyMemberType.PLAYER,
    id: string,
    name: string,
    net: {
        socket: Socket,
        outgoing: OutgoingPacketRegistry<
            ServerToClientLobbyPacketDefinitions,
            ServerToClientLobbyPacketAcknowledgements
        >
    }
};

export type LobbyMember =
    { type: LobbyMemberType.BOT, id: string, name: string }
    | PlayerLobbyMember;
