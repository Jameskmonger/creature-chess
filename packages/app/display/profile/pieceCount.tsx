import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { ownedPieceSelector } from "@app/store/pieceSelectors";
import { getPlayerLevel } from "@common/player/playerSelectors";

const PieceCount: React.FunctionComponent = props => {
  const level = useSelector<AppState, number>(getPlayerLevel);
  const pieceCount = useSelector<AppState, number>(state => ownedPieceSelector(state).length);

  if (pieceCount !== level) {
    return <p className="pieces warning">{pieceCount} / {level} pieces (board not full!)</p>;
  }

  return <p className="pieces">{pieceCount} / {level} pieces</p>;
};

export {
  PieceCount
};
