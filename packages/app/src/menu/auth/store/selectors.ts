import { AppState } from "../../../store";

export const isLoggedIn = (state: AppState): boolean => state.user !== null;
export const getUserId = (state: AppState): string => state.user.user?.id;
