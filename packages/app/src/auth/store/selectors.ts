import { AuthState } from "./state";

type HasAuthState = { auth: AuthState };

export const isLoggedIn = (state: HasAuthState): boolean => state.auth.user !== null;
export const getUserId = (state: HasAuthState): string => state.auth.user.id;
export const isCheckingSession = (state: HasAuthState): boolean => state.auth.checkingSession;
export const getIdToken = (state: HasAuthState): string => state.auth.token;
