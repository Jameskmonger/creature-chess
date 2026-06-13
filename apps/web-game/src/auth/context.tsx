import { createContext, useContext, useSyncExternalStore } from "react";

import { Holder } from "~/utils/Holder";

import { Account } from "./Account";

export const AccountContext = createContext<Account | null>(null);
AccountContext.displayName = "AccountContext";

export const AccountContextProvider = AccountContext.Provider;

export const useAccount = () => useContext(AccountContext);

export const AccountIdHolderContext = createContext<Holder<string> | null>(
	null
);
AccountIdHolderContext.displayName = "AccountIdHolderContext";

export const AccountIdHolderProvider = AccountIdHolderContext.Provider;

const noop = () => () => { /* no op */ };

/**
 * The local player id. Sourced from the AccountIdHolder, which the server
 * confirms on connect (so it matches whichever provider authenticated us -
 * guest, account, ...). Falls back to the auth context's id before connecting.
 */
export const useAccountId = (): string => {
	const holder = useContext(AccountIdHolderContext);
	const account = useAccount();
	useSyncExternalStore(
		holder?.subscribe ?? noop,
		holder ? holder.getSnapshot : () => 0
	);
	return holder?.peek() ?? account?.id ?? "";
};

export const useAccountIdHolder = (): Holder<string> => {
	const holder = useContext(AccountIdHolderContext);
	if (!holder) {
		throw new Error(
			"useAccountIdHolder must be used inside AccountIdHolderProvider"
		);
	}
	return holder;
};
