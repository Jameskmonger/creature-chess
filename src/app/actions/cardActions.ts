import { PokemonCard } from "@common";
import { CARDS_UPDATED } from "../actiontypes/cardActionTypes";
import { sendPacket } from "./networkActions";
import { ClientToServerPacketOpcodes } from "../../shared/packet-opcodes";

export type CardAction = ({ type: CARDS_UPDATED, payload: PokemonCard[] });

export const cardsUpdated = (payload: PokemonCard[]) => ({
    type: CARDS_UPDATED,
    payload
});

export const refreshCards = () => sendPacket(ClientToServerPacketOpcodes.REFRESH_CARDS);

export const purchaseCard = (index: number) => sendPacket(ClientToServerPacketOpcodes.PURCHASE_CARD, index);
