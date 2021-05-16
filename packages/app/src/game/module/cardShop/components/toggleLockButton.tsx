import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerActions } from "@creature-chess/gamemode";
import { AppState } from "../../../../store";

const ToggleLockButton: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const shopLocked = useSelector<AppState, boolean>(state => state.game.cardShop.locked);

	const onToggleLock = () => dispatch(PlayerActions.toggleShopLockPlayerAction());

	return (
		<button className="shop-action" onClick={onToggleLock}>
			{
				shopLocked
					? "Unlock"
					: "Lock"
			}
		</button>
	);
};

export { ToggleLockButton };
