export enum ServerToClientPacketOpcodes {
    CARDS_UPDATE = "cardsUpdate",
    BOARD_UPDATE = "boardUpdate",
    PLAYER_LIST_UPDATE = "playerListUpdate",
    JOINED_GAME = "joinedGame",
    STATE_UPDATE = "stateUpdate",
    MONEY_UPDATE = "moneyUpdate"
}

export enum ClientToServerPacketOpcodes {
    JOIN_GAME = "joinGame",
    PURCHASE_CARD = "purchaseCard",
    REFRESH_CARDS = "refreshCards"
}
