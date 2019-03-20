import { TestFixture, Test, SpyOn, Expect, Setup } from "alsatian";
import * as attackModule from "./attack";
import { simulateTurn } from "./fighting-turn-simulator";
import { PokemonPiece } from "./pokemon-piece";
import { getPokemonStats } from "./get-pokemon-stats";

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

    private getAttacker = (): PokemonPiece => ({
        id: 1,
        pokemonId: 11,
        coolDown: 0,
        currentHealth: 50,
        facingAway: true,
        friendly: true,
        maxHealth: 100,
        position: [0, 0],
        attacking: null,
        celebrating: null,
        hit: null,
        moving: null
    })

    private getDefender = (): PokemonPiece => ({
        id: 2,
        pokemonId: 12,
        coolDown: 1000,
        currentHealth: 50,
        facingAway: true,
        friendly: false,
        maxHealth: 100,
        position: [0, 1],
        attacking: null,
        celebrating: null,
        hit: null,
        moving: null
    })
}
