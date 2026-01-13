import { PackedPosition } from "@creature-chess/board";

export type PlayerPieceLocation = {
	type: "bench" | "board";
	location: PackedPosition;
};
