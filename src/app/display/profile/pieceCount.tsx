import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { ownedPieceSelector } from "@app/store/pieceSelectors";

const PieceCount: React.FunctionComponent = props => {
  const level = useSelector<AppState, number>(state => state.localPlayer.level);
  const pieceCount = useSelector<AppState, number>(state => ownedPieceSelector(state).length);

  return <p className="pieces">{pieceCount} / {level} pieces</p>;
};

export {
  PieceCount
};
