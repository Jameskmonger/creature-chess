import { LobbyMemberType } from "../lobby/lobbyMember";

export const sortMembersByPlayerType = (a, b) => {
    if (a.type === LobbyMemberType.BOT && b.type === LobbyMemberType.PLAYER) {
        return 1;
    }
    if (a.type === LobbyMemberType.PLAYER && b.type === LobbyMemberType.BOT) {
        return -1;
    }
    return 0;
};
