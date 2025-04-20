// eslint-disable-next-line no-bitwise
export const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;
