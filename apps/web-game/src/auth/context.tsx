import { createContext, useContext } from "react";

import { LocalPlayer } from "./LocalPlayer";

export const LocalPlayerContext = createContext<LocalPlayer | null>(null);
LocalPlayerContext.displayName = "LocalPlayerContext";

export const LocalPlayerContextProvider = LocalPlayerContext.Provider;

export const useLocalPlayer = () => useContext(LocalPlayerContext);
export const useLocalPlayerId = () => useLocalPlayer()?.id || "";
