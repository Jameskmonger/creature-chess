export interface UserAppMetadata {
    uuid: string;
    nickname?: {
        value: string;
        uppercase: string;
    };
}

export interface UserModel {
    id: string;
    authId: string;
    metadata: UserAppMetadata;
}
