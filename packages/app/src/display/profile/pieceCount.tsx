import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { ownedPieceSelector } from "../../store/pieceSelectors";
import { getPlayerLevel } from "@creature-chess/shared/player/playerSelectors";

const PieceCount: React.FunctionComponent = props => {
  const level = useSelector<AppState, number>(getPlayerLevel);
  const pieceCount = useSelector<AppState, number>(state => ownedPieceSelector(state).length);

  if (pieceCount !== level) {
    return <span className="pieces warning">{pieceCount} / {level} pieces (board not full!)</span>;
  }

  return null;
};

export {
  PieceCount
};
