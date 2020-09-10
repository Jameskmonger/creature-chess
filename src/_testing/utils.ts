import { PieceModel } from "@creature-chess/shared/models";
import { createTileCoordinates } from "@creature-chess/shared/models/position";
import { DefinitionProvider } from "@creature-chess/shared/game/definitionProvider";

const definitionProvider = new DefinitionProvider();

export const createMockPiece = (id: string): PieceModel => ({
  id,
  ownerId: "123",
  definitionId: 1,
  definition: definitionProvider.get(1),
  stage: 0,
  position: createTileCoordinates(0, 0),
  facingAway: true,
  currentHealth: 100,
  maxHealth: 100,
  targetPieceId: null
});
