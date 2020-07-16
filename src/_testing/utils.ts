import { PieceModel } from "@common/models";
import { createTileCoordinates } from "@common/models/position";

export const createMockPiece = (id: string): PieceModel => ({
  id,
  ownerId: "123",
  definitionId: 1,
  stage: 0,
  position: createTileCoordinates(0, 0),
  facingAway: true,
  currentHealth: 100,
  maxHealth: 100,
  coolDown: 100,
  targetPieceId: null
});
