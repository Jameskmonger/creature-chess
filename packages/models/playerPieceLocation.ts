export type PlayerPieceLocation =
  { type: "bench", location: { slot: number } }
  | { type: "board", location: { x: number, y: number } };
