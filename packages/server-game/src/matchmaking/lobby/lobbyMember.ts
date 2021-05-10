import { Socket } from "socket.io";
import { ServerToClient, OutgoingPacketRegistry } from "@creature-chess/networking";
import { PlayerProfile } from "packages/models/lib";

export enum LobbyMemberType {
    BOT,
    PLAYER
}

export type PlayerLobbyMember = {
    type: LobbyMemberType.PLAYER,
    id: string,
    name: string,
    profile: PlayerProfile | null,
    net: {
        socket: Socket,
        outgoing: OutgoingPacketRegistry<
            ServerToClient.Lobby.PacketDefinitions,
            ServerToClient.Lobby.PacketAcknowledgements
        >
    }
};

export type LobbyMember =
    { type: LobbyMemberType.BOT, id: string, name: string, profile: PlayerProfile | null }
    | PlayerLobbyMember;
