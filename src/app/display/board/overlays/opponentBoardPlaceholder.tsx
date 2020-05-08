import * as React from "react";
import { ReadyUpButton } from "./readyUpButton";

export const OpponentBoardPlaceholder: React.FunctionComponent = props => {
  return (
    <div className="opponent-board-placeholder">
      <span className="label">Opponent's Board</span>

      <ReadyUpButton />
    </div>
  );
};
