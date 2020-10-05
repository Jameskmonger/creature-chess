import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShopLock } from "@creature-chess/shared/player/actions";
import { AppState } from "../../../store";

const ToggleLockButton: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const shopLocked = useSelector<AppState, boolean>(state => state.playerInfo.shopLocked);

  const onToggleLock = () => dispatch(toggleShopLock());

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
