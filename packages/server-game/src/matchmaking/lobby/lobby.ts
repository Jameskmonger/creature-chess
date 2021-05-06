// tslint:disable: no-console
import { Socket } from "socket.io";
import { EventEmitter } from "events";
import shuffle = require("lodash.shuffle");
import { LOBBY_WAIT_TIME as LOBBY_WAIT_TIME_SECONDS, LobbyPlayer,  PlayerTitle } from "@creature-chess/models";
import { ServerToClient, OutgoingPacketRegistry } from "@creature-chess/networking";

import { IdGenerator } from "../id-generator";
import { LobbyMember, LobbyMemberType, PlayerLobbyMember } from "./lobbyMember";

enum LobbyEvents {
    START_GAME = "START_GAME"
}

export type LobbyStartEvent = {
    id: string;
    members: LobbyMember[];
};

export class Lobby {
    public readonly id: string;
    public readonly gameStartTime: number = null;

    private members: LobbyMember[];

    private events = new EventEmitter();
    private gameStarted: boolean = false;

    constructor(idGenerator: IdGenerator, bots: { id: string, name: string }[]) {
        this.id = idGenerator.generateId();

        this.members = [];

        this.addBots(bots);

        const waitTimeMs = LOBBY_WAIT_TIME_SECONDS * 1000;
        this.gameStartTime = Date.now() + waitTimeMs;
        setTimeout(this.startGame, waitTimeMs);
    }

    public onStartGame(fn: (event: LobbyStartEvent) => void) {
        this.events.on(LobbyEvents.START_GAME, fn);
    }

    public canJoin() {
        if (this.getFreeSlotCount() === 0) {
            console.log("no free slots");
            console.log(this.members);
        }

        return this.gameStarted === false && this.getFreeSlotCount() > 0;
    }

    public reconnect(id: string, socket: Socket) {
        const matchingMemberIndex = this.members.findIndex(p => p.id === id);

        if (matchingMemberIndex) {
            console.error("No matching player");
            return;
        }

        const member = this.members[matchingMemberIndex];

        if (member.type === LobbyMemberType.PLAYER) {
            member.net.socket.disconnect();
            member.net = {
                socket,
                outgoing: this.createOutgoingRegistry(socket)
            };
            this.sendMemberJoinEvent(socket, member);
            return;
        }

        console.error("Tried to replace non-connection player");
    }

    public addConnection(socket: Socket, id: string, name: string, title: PlayerTitle) {
        if (this.canJoin() === false) {
            throw Error(`Player ${id} tried to join game ${this.id} that was not joinable`);
        }

        const playerChangedIndex = this.createPlayerLobbyMember(socket, id, name, title);

        const lobbyPlayer: LobbyPlayer = {
            id,
            name,
            isBot: false,
            title
        };

        for (const other of this.members) {
            if (other.id === id || other.type !== LobbyMemberType.PLAYER) {
                continue;
            }

            this.sendMemberLobbyUpdateEvent(other, playerChangedIndex, lobbyPlayer);
        }

        if (this.getFreeSlotCount() === 0) {
            this.startGame();
        }
    }

    public getMemberById(id: string) {
        return this.members.find(m => m.type === LobbyMemberType.PLAYER && m.id === id);
    }

    public getFreeSlotCount() {
        return this.members.filter(m => m.type === LobbyMemberType.BOT).length;
    }

    private startGame = () => {
        if (this.gameStarted) {
            throw Error("Tried to start already-started game");
        }

        this.members.filter(m => m.type === LobbyMemberType.PLAYER)
            .forEach((player: PlayerLobbyMember) => {
                player.net.outgoing.emit(ServerToClient.Lobby.PacketOpcodes.LOBBY_GAME_STARTED, { empty: true });
            });

        this.gameStarted = true;

        const event: LobbyStartEvent = {
            id: this.id,
            members: this.members
        };
        this.events.emit(LobbyEvents.START_GAME, event);
    }

    private addBots(bots: { id: string, name: string }[]) {
        const shuffledBots: { id: string, name: string, title: PlayerTitle | null }[] = shuffle(bots);

        for (const { id, name, title } of shuffledBots) {
            this.members.push({ type: LobbyMemberType.BOT, id, name: `[BOT] ${name}`, title });
        }
    }

    private getLobbyPlayers(): LobbyPlayer[] {
        return this.members.map(m => ({
            id: m.id,
            name: m.name,
            isBot: m.type === LobbyMemberType.BOT,
            title: m.title
        }));
    }

    private createPlayerLobbyMember(socket: Socket, id: string, name: string, title: PlayerTitle) {
        let index = null;

        for (let i = 0; i < this.members.length; i++) {
            // skip real players
            if (this.members[i].type === LobbyMemberType.PLAYER) {
                continue;
            }

            index = i;
            break;
        }

        const member: PlayerLobbyMember = {
            type: LobbyMemberType.PLAYER,
            id,
            name,
            title,
            net: {
                socket,
                outgoing: this.createOutgoingRegistry(socket)
            }
        };

        this.members[index] = member;

        this.sendMemberJoinEvent(socket, member);

        return index;
    }

    private createOutgoingRegistry(socket: Socket) {
        return new OutgoingPacketRegistry<
            ServerToClient.Lobby.PacketDefinitions,
            ServerToClient.Lobby.PacketAcknowledgements
        >(
            (opcode, payload, ack) => socket.emit(opcode, payload, ack)
        );
    }

    private sendMemberJoinEvent(socket: Socket, member: PlayerLobbyMember) {
        // todo use a registry for this
        socket.emit(ServerToClient.Menu.PacketOpcodes.LOBBY_CONNECTED, {
            lobbyId: this.id,
            players: this.getLobbyPlayers(),
            startTimestamp: this.gameStartTime
        });
    }

    private sendMemberLobbyUpdateEvent(member: PlayerLobbyMember, index: number, player: LobbyPlayer) {
        member.net.outgoing.emit(ServerToClient.Lobby.PacketOpcodes.LOBBY_PLAYER_UPDATE, {
            index, player
        });
    }
}
