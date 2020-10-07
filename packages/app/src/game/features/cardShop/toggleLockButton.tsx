import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerActions } from "@creature-chess/shared";
import { AppState } from "../../../store";

const ToggleLockButton: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const shopLocked = useSelector<AppState, boolean>(state => state.playerInfo.shopLocked);

  const onToggleLock = () => dispatch(PlayerActions.toggleShopLock());

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
