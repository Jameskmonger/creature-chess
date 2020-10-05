import { AuthState } from "../../store/state";

type HasAuthState = { auth: AuthState };

export const isLoggedIn = (state: HasAuthState): boolean => state.auth.token !== null;
export const isCheckingSession = (state: HasAuthState): boolean => state.auth.checkingSession;
export const getIdToken = (state: HasAuthState): string => state.auth.token;
