import { AppState } from "../../store";

export const getUserId = (state: AppState): string => state.user.user?.id;
