import io = require("socket.io");
import delay from "delay";
import { Player } from "./players/player";
import { CardDeck } from "./cardDeck";
import { GamePhase, getAllDefinitions, Constants } from "../shared";
import { SeedProvider } from "./seed-provider";
import { log } from "./log";
import { PlayerContainer } from "./players/playerContainer";

export class Server {
    private deck = new CardDeck(getAllDefinitions());
    private players: Player[] = [];
    private phase = GamePhase.WAITING;
    private seedProvider = new SeedProvider();
    private playerContainer: PlayerContainer;
    private GAME_SIZE: number;

    constructor(gameSize: number) {
        this.GAME_SIZE = gameSize;
    }

    public listen(port: number) {
        const server = io.listen(port);

        log("Server listening on port " + port);

        this.playerContainer = new PlayerContainer(this.GAME_SIZE, this.deck);

        this.playerContainer.onLobbyFull(this.startGame);

        server.on("connection", this.playerContainer.receiveConnection);
    }

    private startGame = async () => {
        while (this.players.filter(p => p.isAlive()).length > 1) {
            this.startPreparingPhase();

            await delay(Constants.PHASE_LENGTHS[GamePhase.PREPARING] * 1000);

            this.startReadyPhase();

            await delay(Constants.PHASE_LENGTHS[GamePhase.READY] * 1000);

            await this.startPlayingPhase();
        }

        this.playerContainer.updatePlayerLists();
    }

    private startPreparingPhase() {
        log(`Entering phase ${GamePhase.PREPARING}`);

        this.phase = GamePhase.PREPARING;
        this.playerContainer.inWaitingPhase = false;

        this.playerContainer.startPreparingPhase();
    }

    private startReadyPhase() {
        log(`Entering phase ${GamePhase.READY}`);

        this.phase = GamePhase.READY;

        this.playerContainer.startReadyPhase();
    }

    private async startPlayingPhase() {
        this.phase = GamePhase.PLAYING;

        const newSeed = this.seedProvider.refreshSeed();

        log(`Entering phase ${GamePhase.PLAYING} (with seed ${newSeed})`);

        await this.playerContainer.startPlayingPhase(newSeed);

        log("Playing phase complete");
    }
}
