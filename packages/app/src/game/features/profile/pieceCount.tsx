import * as React from "react";
import { useSelector } from "react-redux";
import { getPlayerLevel } from "@creature-chess/shared";
import { AppState } from "../../../store";
import { ownedPieceCountSelector } from "./ownedPieceCountSelector";

const PieceCount: React.FunctionComponent = props => {
  const level = useSelector<AppState, number>(getPlayerLevel);
  const pieceCount = useSelector<AppState, number>(state => ownedPieceCountSelector(state));

  if (pieceCount !== level) {
    return <p className="item pieces warning">{pieceCount} / {level} pieces (board not full!)</p>;
  }

  return <p className="item pieces">{pieceCount} / {level} pieces</p>;
};

export {
  PieceCount
};
