import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GameEvents, StreakType } from "@creature-chess/models";

export type Announcement = { id: number; playerId: string } & (
	| {
			kind: "upgrade";
			definitionId: number;
			/** Star level reached, 1-indexed. */
			stage: number;
	  }
	| { kind: "levelUp"; level: number }
	| { kind: "streak"; streakType: StreakType; streakAmount: number }
	| { kind: "eliminated" }
);

type AnnouncementsState = {
	items: Announcement[];
	nextId: number;
};

// Bound the queue so a flurry of upgrades can't grow it without limit.
const MAX_ANNOUNCEMENTS = 20;

// The gamemode emits level-up/streak events for every level and every streak
// change, these decide which are worth surfacing as a banner announcement.
// Level 2 is reached almost instantly every game, so it's not announced.
const ANNOUNCE_LEVEL = (level: number) => level !== 2;
const ANNOUNCE_STREAK = (amount: number) => [3, 5, 10].includes(amount);

const initialState: AnnouncementsState = { items: [], nextId: 0 };

const slice = createSlice({
	name: "announcements",
	initialState,
	reducers: {
		// Drop an announcement once it has finished scrolling past.
		dismissAnnouncement: (state, { payload: id }: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id !== id);
		},
	},
	extraReducers: (builder) => {
		const push = (state: AnnouncementsState, announcement: Announcement) => {
			state.items.push(announcement);
			state.nextId += 1;
			if (state.items.length > MAX_ANNOUNCEMENTS) {
				state.items.splice(0, state.items.length - MAX_ANNOUNCEMENTS);
			}
		};

		builder
			.addMatcher(
				GameEvents.pieceUpgradedEvent.match,
				(state, { payload: { playerId, definitionId, stage } }) => {
					push(state, {
						id: state.nextId,
						kind: "upgrade",
						playerId,
						definitionId,
						stage,
					});
				}
			)
			.addMatcher(
				GameEvents.playerLevelUpEvent.match,
				(state, { payload: { playerId, level } }) => {
					if (!ANNOUNCE_LEVEL(level)) {
						return;
					}
					push(state, { id: state.nextId, kind: "levelUp", playerId, level });
				}
			)
			.addMatcher(
				GameEvents.playerStreakEvent.match,
				(state, { payload: { playerId, streakType, streakAmount } }) => {
					if (!ANNOUNCE_STREAK(streakAmount)) {
						return;
					}
					push(state, {
						id: state.nextId,
						kind: "streak",
						playerId,
						streakType,
						streakAmount,
					});
				}
			)
			.addMatcher(
				GameEvents.playerEliminatedEvent.match,
				(state, { payload: { playerId } }) => {
					push(state, { id: state.nextId, kind: "eliminated", playerId });
				}
			);
	},
});

export const announcementsReducer = slice.reducer;
export const { dismissAnnouncement } = slice.actions;
