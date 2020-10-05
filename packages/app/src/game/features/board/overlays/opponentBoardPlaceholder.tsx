import * as React from "react";
import { ReadyUpButton } from "./readyUpButton";
import { SelectedCreature } from "./selectedCreature";

export const OpponentBoardPlaceholder: React.FunctionComponent = props => {
  return (
    <div className="opponent-board-placeholder">
      <div className="o-group stretch">
        <SelectedCreature />
      </div>
      <div className="o-group">
        <ReadyUpButton />
      </div>
    </div>
  );
};
