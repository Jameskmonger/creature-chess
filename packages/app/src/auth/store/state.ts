export interface AuthState {
    checkingSession: boolean;
    token: string | null;
    tokenExpiry: number | null;
}
