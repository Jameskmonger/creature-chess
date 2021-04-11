import { Socket } from "socket.io";
import { ServerToClient, OutgoingPacketRegistry } from "@creature-chess/networking";

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
            ServerToClient.Lobby.PacketDefinitions,
            ServerToClient.Lobby.PacketAcknowledgements
        >
    }
};

export type LobbyMember =
    { type: LobbyMemberType.BOT, id: string, name: string }
    | PlayerLobbyMember;
