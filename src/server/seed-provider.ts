export class SeedProvider {
    private seed: number;

    constructor() {
        this.refreshSeed();
    }

    public refreshSeed() {
        this.seed = Math.floor(Math.random() * 1_000_000_000);
        return this.seed;
    }

    public getSeed() {
        return this.seed;
    }
}
