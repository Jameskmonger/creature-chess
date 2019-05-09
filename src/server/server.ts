import io = require("socket.io");
import delay from "delay";
import { Player } from "./players/player";
import { CardDeck } from "./cardDeck";
import { GamePhase, getAllDefinitions, Constants } from "@common";
import { SeedProvider } from "./seed-provider";
import { log } from "./log";
import { PlayerContainer } from "./players/playerContainer";

export class Server {
    private deck = new CardDeck(getAllDefinitions());
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
        while (this.playerContainer.playersAlive()) {
            await this.runPreparingPhase();

            await this.runReadyPhase();

            await this.runPlayingPhase();
        }

        this.playerContainer.updatePlayerLists();
    }

    private async runPreparingPhase() {
        log(`Entering phase ${GamePhase[GamePhase.PREPARING]}`);

        this.playerContainer.startPreparingPhase();

        await delay(Constants.PHASE_LENGTHS[GamePhase.PREPARING] * 1000);
    }

    private async runReadyPhase() {
        log(`Entering phase ${GamePhase[GamePhase.READY]}`);

        this.playerContainer.startReadyPhase();

        await delay(Constants.PHASE_LENGTHS[GamePhase.READY] * 1000);
    }

    private async runPlayingPhase() {
        const newSeed = this.seedProvider.refreshSeed();

        log(`Entering phase ${GamePhase[GamePhase.PLAYING]} (with seed ${newSeed})`);

        await this.playerContainer.startPlayingPhase(newSeed);
    }
}
