import { createContext, useContext } from "react";

export type RegistrationPageInfo = {
	updateUser: (nickname: string, image: number) => Promise<{ error?: string }>;
};

const RegistrationPageContext = createContext<RegistrationPageInfo>(null as unknown as RegistrationPageInfo);
RegistrationPageContext.displayName = "MenuPageContext";

export const RegistrationPageContextProvider = RegistrationPageContext.Provider;

export const useRegistrationPage = () => {
	const registrationPage = useContext(RegistrationPageContext);

	if (!registrationPage) {
		throw new Error("No valid RegistrationPageContext found for useRegistrationPage");
	}

	return registrationPage;
};
