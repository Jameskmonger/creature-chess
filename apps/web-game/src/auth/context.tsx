import { createContext, useContext } from "react";

import { Holder } from "~/utils/Holder";

import { Account } from "./Account";

export const AccountContext = createContext<Account | null>(null);
AccountContext.displayName = "AccountContext";

export const AccountContextProvider = AccountContext.Provider;

export const useAccount = () => useContext(AccountContext);
export const useAccountId = () => useAccount()?.id || "";

export const AccountIdHolderContext = createContext<Holder<string> | null>(null);
AccountIdHolderContext.displayName = "AccountIdHolderContext";

export const AccountIdHolderProvider = AccountIdHolderContext.Provider;

export const useAccountIdHolder = (): Holder<string> => {
	const holder = useContext(AccountIdHolderContext);
	if (!holder) {
		throw new Error("useAccountIdHolder must be used inside AccountIdHolderProvider");
	}
	return holder;
};
