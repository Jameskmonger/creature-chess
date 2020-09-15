import { AuthState } from "../../store/state";

export const isLoggedIn = (state: { auth: AuthState }): boolean => state.auth.user !== null;
export const isCheckingSession = (state: { auth: AuthState }): boolean => state.auth.checkingSession;
export const getIdToken = (state: { auth: AuthState }): string => state.auth.user.idToken;
