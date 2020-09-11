import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { getPlayerById } from "../../store/playerSelectors";
import { PlayerListPlayer } from "@creature-chess/models";
import { PlayerBattleStatus, PlayerBattle } from "@creature-chess/models/player-list-player";
import { PlayerName } from "./playerName";

interface Props {
    playerId: string;
}

const getBattleText = (battle: PlayerBattle) => {
  if (battle.status === PlayerBattleStatus.IN_PROGRESS) {
    return "Battling";
  }

  if (battle.status === PlayerBattleStatus.FINISHED) {
    return `${battle.homeScore} - ${battle.awayScore}`;
  }

  return "";
};

const getBattleHighlightClass = (battle: PlayerBattle) => {
  if (battle.status === PlayerBattleStatus.FINISHED) {
    const { homeScore, awayScore } = battle;

    if (homeScore > awayScore) {
      return " win";
    }

    return " loss";
  }

  return "";
};

const BattleInfo: React.FunctionComponent<Props> = ({ playerId }) => {
    const player = useSelector<AppState, PlayerListPlayer>(getPlayerById(playerId));

    if (!player || !player.battle) {
        return null;
    }

    const { battle } = player;

    const highlightClass = getBattleHighlightClass(battle);
    const text = getBattleText(battle);

    return (
      <div className="battle-info">
        <span className={`highlight${highlightClass}`}>{text}</span>
        &nbsp;vs&nbsp;
        <span className="highlight opponent-name"><PlayerName playerId={battle.opponentId} /></span>
      </div>
    );
};

export { BattleInfo };
