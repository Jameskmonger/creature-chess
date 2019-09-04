import io = require("socket.io");
import uuid = require("uuid/v4");
import { log } from "@common/log";
import { ClientToServerPacketOpcodes, JoinLobbyResponse } from "@common/packet-opcodes";
import { Game } from "@common/game/game";
import { Connection } from "./connection";
import { MAX_NAME_LENGTH, MAX_PLAYERS_IN_GAME } from "@common/constants";
import { Lobby } from './lobby';
import { Player } from '@common/game';
import { IdGenerator } from './id-generator';

const NAME_REGEX = /^[a-zA-Z0-9_\ ]*$/;

export class Server {
    private lobbies = new Map<string, Lobby>();
    private lobbyIdGenerator = new IdGenerator();

    public listen(port: number) {
        const server = io.listen(port);

        log("Server listening on port " + port);

        server.on("connection", this.receiveConnection);
    }

    private receiveConnection = (socket: io.Socket) => {
        log("Connection received");

        let inLobby = false;

        const onFindGame = (
            name: string,
            response: (response: JoinLobbyResponse) => void
        ) => {
            if (inLobby) {
                return;
            }
            
            if (name.match(NAME_REGEX) === null) {
                response({
                    error: "Invalid characters in name",
                    response: null
                });
                return;
            }

            const player = new Connection(socket, name);

            let lobby = this.findPublicLobby();

            if (lobby) {
                lobby.addPlayer(player);
            } else {
                lobby = this.createLobby(player, true);
            }

            inLobby = true;

            response({
                error: null,
                response: {
                    playerId: player.id,
                    lobbyId: lobby.id,
                    players: lobby.getPlayers().map(p => ({ id: p.id, name: p.name }))
                }
            });
        }

        const onJoinGame = (
            name: string,
            lobbyId: string,
            response: (response: JoinLobbyResponse) => void
        ) => {
            if (inLobby) {
                return;
            }

            if (name.match(NAME_REGEX) === null) {
                response({
                    error: "Invalid characters in name",
                    response: null
                });
                return;
            }

            const lobby = this.getLobbyForId(lobbyId);

            if (lobby === null) {
                response({
                    error: "Game not found",
                    response: null
                });
                return;
            }

            if (lobby.canJoin() === false) {
                response({
                    error: "Game is not joinable",
                    response: null
                });
                return;
            }

            const player = new Connection(socket, name);

            lobby.addPlayer(player);

            inLobby = true;

            response({
                error: null,
                response: {
                    playerId: player.id,
                    lobbyId: lobby.id,
                    players: lobby.getPlayers().map(p => ({ id: p.id, name: p.name }))
                }
            });
        };

        const onCreateGame = (
            name: string,
            response: (response: JoinLobbyResponse) => void
        ) => {
            if (inLobby) {
                return;
            }

            if (name.match(NAME_REGEX) === null) {
                response({
                    error: "Invalid characters in name",
                    response: null
                });
                return;
            }

            if (name.length > MAX_NAME_LENGTH) {
                response({
                    error: "Name too long",
                    response: null
                });
                return;
            }

            const player = new Connection(socket, name);
            const lobby = this.createLobby(player, false);

            inLobby = true;

            response({
                error: null,
                response: {
                    playerId: player.id,
                    lobbyId: lobby.id,
                    players: lobby.getPlayers().map(p => ({ id: p.id, name: p.name }))
                }
            });
        };

        socket.on(ClientToServerPacketOpcodes.FIND_GAME, onFindGame);
        socket.on(ClientToServerPacketOpcodes.JOIN_GAME, onJoinGame);
        socket.on(ClientToServerPacketOpcodes.CREATE_GAME, onCreateGame);
    }

    private findPublicLobby() {
        for (const lobbyId in this.lobbies) {
            const lobby = this.lobbies.get(lobbyId);

            if (lobby.isPublic === false || lobby.canJoin() === false) {
                continue;
            }

            return lobby;
        }

        return null;
    }

    private createLobby(player: Player, isPublic: boolean) {
        const lobby = new Lobby(this.lobbyIdGenerator, player, isPublic);

        lobby.onStartGame(players => {

            this.lobbies.delete(lobby.id);
        });

        this.lobbies.set(lobby.id, lobby);

        log(`Lobby '${lobby.id}' created`);
        
        return lobby;
    }

    private getLobbyForId(id: string) {
        return this.lobbies.get(id) || null;
    }
}
