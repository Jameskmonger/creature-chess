import { TestFixture, Test, SpyOn, Expect, Setup } from "alsatian";
import * as attackModule from "./attack";
import { simulateTurn } from "./fighting-turn-simulator";
import { getPokemonStats } from "./pokemon-details";
import { Piece } from "./models";

@TestFixture("fighting-turn-simulator")
export class FightingTurnSimulatorTests {

    @Test("if piece can attack, attack is called with attacker, defender and stats for each")
    public attackCalledWithCorrectArgs() {
        const attacker = this.getAttacker();
        const attackerStats = getPokemonStats(attacker.pokemonId);
        const defender = this.getDefender();
        const defenderStats = getPokemonStats(defender.pokemonId);
        const attackSpy = SpyOn(attackModule, "attack");

        simulateTurn([attacker, defender]);

        Expect(attackSpy.calls[0].args[0]).toEqual(attacker);
        Expect(attackSpy.calls[0].args[1]).toEqual(attackerStats);
        Expect(attackSpy.calls[0].args[2]).toEqual(defender);
        Expect(attackSpy.calls[0].args[3]).toEqual(defenderStats);
    }

    @Test("if a piece attacks, the affected pieces returned are those returned by attack()")
    public piecesResultingFromAttackAreReturned() {
        const attacker = this.getAttacker();
        const defender = this.getDefender();
        const updatedAttacker = { ...attacker, currentHealth: 888 };
        const updatedDefender = { ...attacker, currentHealth: 777 };
        SpyOn(attackModule, "attack").andReturn({ attacker: updatedAttacker, defender: updatedDefender });

        const result = simulateTurn([attacker, defender]);

        Expect(result).toEqual([updatedAttacker, updatedDefender]);
    }

    private getAttacker = (): Piece => ({
        id: "43bfaeb0-931d-460b-b0ef-32e209f55821",
        ownerId: "c73363e4-1747-4d9e-9a06-3028fc44b38c",
        pokemonId: 11,
        coolDown: 0,
        currentHealth: 50,
        facingAway: true,
        maxHealth: 100,
        position: { x: 0, y: 1 },
        attacking: null,
        celebrating: null,
        hit: null,
        moving: null
    })

    private getDefender = (): Piece => ({
        id: "c5dad43c-4529-441e-84dc-e00c3db61c99",
        ownerId: "527ef449-9150-44bb-905e-f5ae92fb69aa",
        pokemonId: 12,
        coolDown: 1000,
        currentHealth: 50,
        facingAway: true,
        maxHealth: 100,
        position: { x: 0, y: 1 },
        attacking: null,
        celebrating: null,
        hit: null,
        moving: null
    })
}
