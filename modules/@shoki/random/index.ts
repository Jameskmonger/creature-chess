/* eslint-disable no-bitwise */
import { ISAACGenerator } from "isaac-crypto";

/**
 * A function returning a float in [0, 1).
 */
export type Rng = () => number;

/**
 * Expand a single 32-bit seed into an array of 8 32-bit numbers using the SplitMix algorithm.
 *
 * @param seed The initial seed to expand.
 *
 * @returns An array of 8 32-bit numbers derived from the seed, suitable for seeding the ISAAC generator.
 */
const expandSeed = (seed: number): number[] => {
	let s = seed >>> 0;

	const out: number[] = [];

	for (let i = 0; i < 8; i += 1) {
		s = (s + 0x9e3779b9) >>> 0;

		let z = s;

		z = Math.imul(z ^ (z >>> 16), 0x85ebca6b) >>> 0;
		z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35) >>> 0;
		z = (z ^ (z >>> 16)) >>> 0;

		out.push(z);
	}

	return out;
};

/**
 * Create a PRNG function from a given seed.
 *
 * @param seed A number or array of numbers to seed the generator.
 *
 * @returns The seeded PRNG function.
 */
export const createRng = (seed: number | number[]): Rng => {
	const seedArray = typeof seed === "number" ? expandSeed(seed) : seed;
	const gen = new ISAACGenerator(seedArray);

	return () => {
		const raw = gen.getNextResult();

		// Convert the signed 32-bit integer to unsigned and normalize to [0, 1)
		return (raw >>> 0) / 0x100000000;
	};
};

/**
 * Shuffle an array in place using the Fisher–Yates algorithm and a provided RNG.
 *
 * @param arr The array to shuffle.
 * @param rng A random number generator function that returns a float in [0, 1).
 *
 * @returns The shuffled array.
 */
export const shuffleInPlace = <T>(arr: T[], rng: Rng): T[] => {
	for (let i = arr.length - 1; i > 0; i -= 1) {
		const j = Math.floor(rng() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

/**
 * Pick a random element from an array using a provided RNG.
 *
 * @param arr The array to pick from.
 * @param rng A random number generator function that returns a float in [0, 1).
 *
 * @returns A randomly selected element from the array.
 */
export const pickRandom = <T>(arr: readonly T[], rng: Rng): T =>
	arr[Math.floor(rng() * arr.length)];
