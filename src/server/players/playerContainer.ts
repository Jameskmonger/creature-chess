import io = require("socket.io");
import delay from "delay";
import { Connection } from "./connection";
import { ClientToServerPacketOpcodes, MovePiecePacket } from "../../shared/packet-opcodes";
import { log } from "../log";
import { GamePhase, Constants } from "../../shared";
import { Player } from "./player";
import { createBenchPokemon } from "../../shared/pokemon-piece";
import { CardDeck } from "../cardDeck";

const randomFromArray = <T>(array: T[]) => {
    return array[Math.floor(Math.random() * array.length)];
};

export class PlayerContainer {
    public inWaitingPhase: boolean = true;
    private GAME_SIZE: number;
    private deck: CardDeck;
    private players: Player[];

    private onLobbyFullListeners: (() => void)[];

    constructor(gameSize: number, deck: CardDeck) {
        this.GAME_SIZE = gameSize;
        this.players = [];

        this.onLobbyFullListeners = [];
    }

    public receiveConnection = (socket: io.Socket) => {
        log("Connection received");

        const connection = new Connection(socket);

        connection.onReceivePacket(ClientToServerPacketOpcodes.JOIN_GAME, this.onJoinGame(connection));
    }

    public onLobbyFull(fn: () => void) {
        this.onLobbyFullListeners.push(fn);
    }

    public updatePlayerLists() {
        this.players.forEach(p => p.sendPlayerListUpdate(this.players));
    }

    public startPreparingPhase() {
        this.updatePlayerLists();

        this.players.forEach(p => {
            if (p.isAlive() === false) {
                this.cleanUpPlayer(p);

                return;
            }

            this.rerollPlayerCards(p);

            p.sendPreparingPhaseUpdate();
        });
    }

    public startReadyPhase() {
        this.players.forEach(p => {
            if (p.isAlive() === false) {
                return;
            }

            const others = this.players.filter(other => other.isAlive() && other.id !== p.id);
            const opponent = randomFromArray(others);

            p.sendReadyPhaseUpdate(opponent);
        });
    }

    public async startPlayingPhase(seed: number) {
        const promises = this.players.filter(p => p.isAlive()).map(p => p.sendPlayingPhaseUpdate(seed));

        const [_, results] = await Promise.all([
            delay(Constants.PHASE_LENGTHS[GamePhase.PLAYING] * 1000),
            Promise.all(promises)
        ]);

        results.forEach(r => {
            const win = r.home.length > r.away.length;
            const money = r.player.getMoney();

            log(`- Awarded a ${win ? "win" : "loss"} to ${r.player.name}`);

            r.player.setMoney(money + (win ? 6 : 3));
        });
    }

    private onJoinGame(connection: Connection) {
        return (name: string) => {
            if (!name
                || this.inWaitingPhase === false
                || this.players.length === this.GAME_SIZE) {
                // can't join game
                // todo: don't just hang the connection here, disconnect properly
                return;
            }

            log(`${name} has joined the game`);

            const player = new Player(connection, name);
            player.setMoney(3);

            connection.onReceivePacket(ClientToServerPacketOpcodes.PURCHASE_CARD, (cardIndex: number) => {
                log(`[${player.name}] PURCHASE_CARD (${cardIndex})`);

                this.onPlayerPurchaseCard(player, cardIndex);
            });

            connection.onReceivePacket(ClientToServerPacketOpcodes.REROLL_CARDS, () => {
                log(`[${player.name}] REROLL_CARDS`);

                this.onPlayerRerollCards(player);
            });

            connection.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, (packet: MovePiecePacket) => {
                log(`[${player.name}] MOVE_PIECE_TO_BENCH`);

                player.movePieceToBench(packet);
            });

            connection.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, (packet: MovePiecePacket) => {
                log(`[${player.name}] MOVE_PIECE_TO_BOARD`);

                player.movePieceToBoard(packet);
            });

            this.players.push(player);

            this.updatePlayerLists();

            player.sendJoinedGame();

            this.emitLobbyFullIfRequired();
        };
    }

    private cleanUpPlayer(p: Player) {
        if (p.hasBeenCleanedUp()) {
            return;
        }

        log(`${p.name} has died`);

        p.sendDeathUpdate();
        this.addPlayerCardsToDeck(p, true);
        this.addPlayerBoardToDeck(p);
        p.setCleanedUp(true);
    }

    private emitLobbyFullIfRequired() {
        if (this.players.length === this.GAME_SIZE) {
            this.onLobbyFullListeners.forEach(fn => fn());
        }
    }

    private onPlayerPurchaseCard(player: Player, cardIndex: number) {
        const slot = player.getFirstEmptyBenchSlot();
        const card = player.getCardAtIndex(cardIndex);
        const money = player.getMoney();

        if (slot === null) {
            log(`${player.name} attempted to buy a card but has no empty slot`);
            return;
        }

        if (!card) {
            log(`${player.name} attempted to buy card at index ${cardIndex} but that card was ${card}`);
            return;
        }

        if (money < card.cost) {
            log(`${player.name} attempted to buy card costing $${card.cost} but only had $${money}`);
            return;
        }

        player.setMoney(money - card.cost);
        player.deleteCard(cardIndex);

        const piece = createBenchPokemon(player.id, card.id, slot);

        player.addBenchPiece(piece);
    }

    private onPlayerRerollCards(player: Player) {
        const money = player.getMoney();

        // not enough money
        if (money < Constants.REROLL_COST) {
            log(`${player.name} attempted to reroll costing $${Constants.REROLL_COST} but only had $${money}`);
            return;
        }

        this.rerollPlayerCards(player);

        player.setMoney(money - Constants.REROLL_COST);
    }

    private rerollPlayerCards(player: Player) {
        this.addPlayerCardsToDeck(player, false);

        const newCards = this.deck.take(5);
        player.setCards(newCards);
    }

    private addPlayerCardsToDeck(player: Player, updatePlayer: boolean) {
        const playerCards = player.getCards();
        player.setCards([], updatePlayer);

        this.deck.add(playerCards);
        this.deck.shuffle();
    }

    private addPlayerBoardToDeck(player: Player) {
        const board = player.getBoard();
        const bench = player.getBench();

        player.setBoard([]);
        player.setBench([]);

        board.forEach(p => this.deck.addPiece(p));
        bench.forEach(p => this.deck.addPiece(p));

        this.deck.shuffle();
    }
}
