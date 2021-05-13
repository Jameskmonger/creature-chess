import * as React from "react";
import { PlayerName } from "../playerName";
import { BattleInfo } from "../battleInfo";

const StatusPlayerListItem: React.FunctionComponent<{ playerId: string, status: string, subtitle?: string }> = ({ playerId, status, subtitle }) => {
	return (
		<div className="player-list-item quit">
			<div className="half">
				<span className="name"><PlayerName playerId={playerId} /></span>
			</div>
			<div className="half">
				<span className="status">{status}</span>
				<BattleInfo playerId={playerId} />
				{subtitle && <span className="subtitle">{subtitle}</span>}
			</div>
		</div>
	);
};

export { StatusPlayerListItem };
