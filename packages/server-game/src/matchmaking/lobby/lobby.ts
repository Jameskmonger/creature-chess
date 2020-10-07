import { Socket } from "socket.io";
import { EventEmitter } from "events";
import {
    randomFromArray,
    OutgoingPacketRegistry,
    ServerToClientLobbyPacketAcknowledgements, ServerToClientLobbyPacketDefinitions,
    ServerToClientLobbyPacketOpcodes
} from "@creature-chess/shared";
import { MAX_PLAYERS_IN_GAME, LOBBY_WAIT_TIME as LOBBY_WAIT_TIME_SECONDS } from "@creature-chess/models";
import { IdGenerator } from "../id-generator";
import { LobbyMember, LobbyMemberType, PlayerLobbyMember } from "./lobbyMember";
import { BOT_NAMES } from "./botNames";
import { LobbyPlayer } from "@creature-chess/models";

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

    constructor(idGenerator: IdGenerator) {
        this.id = idGenerator.generateId();

        this.members = [];

        for (let i = 0; i < MAX_PLAYERS_IN_GAME; i++) {
            this.addBot();
        }

        const waitTimeMs = LOBBY_WAIT_TIME_SECONDS * 1000;
        this.gameStartTime = Date.now() + waitTimeMs;
        setTimeout(this.startGame, waitTimeMs);
    }

    public onStartGame(fn: (event: LobbyStartEvent) => void) {
        this.events.on(LobbyEvents.START_GAME, fn);
    }

    public canJoin() {
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
            this.sendMemberJoinEvent(member);
            return;
        }

        console.error("Tried to replace non-connection player");
    }

    public addConnection(socket: Socket, id: string, name: string) {
        if (this.canJoin() === false) {
            throw Error(`Player ${id} tried to join game that was not joinable`);
        }

        const playerChangedIndex = this.createPlayerLobbyMember(socket, id, name);

        const lobbyPlayer = {
            id,
            name,
            isBot: false
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

        this.gameStarted = true;

        const event: LobbyStartEvent = {
            id: this.id,
            members: this.members
        };
        this.events.emit(LobbyEvents.START_GAME, event);
    }

    private addBot() {
        const memberNames = this.members.map(p => p.name);
        const availableNames = BOT_NAMES.filter(n => memberNames.includes(`[BOT] ${n}`) === false);
        const name = randomFromArray(availableNames);

        this.members.push({ type: LobbyMemberType.BOT, id: `bot-${name.substring(0, 1)}`, name: `[BOT] ${name}` });
    }

    private getLobbyPlayers(): LobbyPlayer[] {
        return this.members.map(m => ({
            id: m.id,
            name: m.name,
            isBot: m.type === LobbyMemberType.BOT
        }));
    }

    private createPlayerLobbyMember(socket: Socket, id: string, name: string) {
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
            net: {
                socket,
                outgoing: this.createOutgoingRegistry(socket)
            }
        };

        this.members[index] = member;

        this.sendMemberJoinEvent(member);

        return index;
    }

    private createOutgoingRegistry(socket: Socket) {
        return new OutgoingPacketRegistry<
            ServerToClientLobbyPacketDefinitions,
            ServerToClientLobbyPacketAcknowledgements
        >(
            (opcode, payload, ack) => socket.emit(opcode, payload, ack)
        );
    }

    private sendMemberJoinEvent(member: PlayerLobbyMember) {
        member.net.outgoing.emit(ServerToClientLobbyPacketOpcodes.JOIN_LOBBY, {
            playerId: member.id,
            lobbyId: this.id,
            players: this.getLobbyPlayers(),
            startTimestamp: this.gameStartTime
        });
    }

    private sendMemberLobbyUpdateEvent(member: PlayerLobbyMember, index: number, player: LobbyPlayer) {
        member.net.outgoing.emit(ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE, {
            index, player
        });
    }
}
