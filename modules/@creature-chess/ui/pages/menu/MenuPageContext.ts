import { createContext, useContext } from "react";

type MenuInfo = {
	findGame: () => void;
	auth: {
		logout: () => void;
	};
};

const MenuPageContext = createContext<MenuInfo>(null as unknown as MenuInfo);
MenuPageContext.displayName = "MenuPageContext";

export const MenuPageContextProvider = MenuPageContext.Provider;

export const useMenuPage = () => {
	const menuPage = useContext(MenuPageContext);

	if (!menuPage) {
		throw new Error("No valid MenuPageContext found for useMenuPage");
	}

	return menuPage;
};
