/**
 * Get an array of numbers for a range
 *
 * @param start The starting value
 * @param stop The ending value
 * @returns An array of numbers from `start` to `stop`
 */
export const range = (start: number, stop: number) =>
	Array.from({ length: stop - start }, (_, i) => i + start);

/**
 * Get the sum of an array of numbers
 *
 * @param arr The array of numbers to sum
 * @returns The sum of the array
 */
export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
