import { OutgoingPacketRegistry, ServerToClientLobbyPacketAcknowledgements, ServerToClientLobbyPacketDefinitions } from "@creature-chess/shared";
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
