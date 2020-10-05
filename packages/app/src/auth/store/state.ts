import { SanitizedUser } from "@creature-chess/models";

export interface AuthState {
    checkingSession: boolean;
    token: string | null;
    tokenExpiry: number | null;
    user: SanitizedUser;
}
