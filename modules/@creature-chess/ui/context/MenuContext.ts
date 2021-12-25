import { createContext, useContext } from "react";

type MenuInfo = {
	findGame: () => void;
	auth: {
		logout: () => void;
	};
};

const MenuContext = createContext<MenuInfo>(null as unknown as MenuInfo);
MenuContext.displayName = "MenuContext";

export const MenuContextProvider = MenuContext.Provider;

export const useMenuInfo = () => {
	const menuInfo = useContext(MenuContext);

	if (!menuInfo) {
		throw new Error("No valid MenuContext found for useMenuInfo");
	}

	return menuInfo;
};
