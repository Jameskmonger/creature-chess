import { Socket } from "socket.io";
import { ServerToClient, OutgoingPacketRegistry } from "@creature-chess/networking";
import { PlayerTitle } from "packages/models/lib";

export enum LobbyMemberType {
    BOT,
    PLAYER
}

export type PlayerLobbyMember = {
    type: LobbyMemberType.PLAYER,
    id: string,
    name: string,
    title: PlayerTitle | null,
    net: {
        socket: Socket,
        outgoing: OutgoingPacketRegistry<
            ServerToClient.Lobby.PacketDefinitions,
            ServerToClient.Lobby.PacketAcknowledgements
        >
    }
};

export type LobbyMember =
    { type: LobbyMemberType.BOT, id: string, name: string, title: PlayerTitle }
    | PlayerLobbyMember;
