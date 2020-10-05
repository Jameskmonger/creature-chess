import { TileStyle } from "@creature-chess/models/src/position";

export const getClassForTileStyle = (style: TileStyle) => {
  switch (style) {
      case TileStyle.JAMES:
          // return "style-james";
      case TileStyle.DEFAULT:
      default:
          return "style-default";
  }
};
