import * as React from "react";

export interface VictoryOverlayProps {
  winnerName: string;
}

export const VictoryOverlayUnconnected: React.FunctionComponent<VictoryOverlayProps> = ({ winnerName }) => {
  if (!winnerName) {
    return null;
  }

  return (
    <div className="victory">
      <h2 className="game-over">Game Over</h2>
      <p><span className="winner">{winnerName}</span> wins!</p>
    </div>
  );
};
