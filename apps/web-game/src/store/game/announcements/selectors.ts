import { AppState } from "~/store";

import { Announcement } from "./state";

export const selectAnnouncements = (state: AppState): Announcement[] =>
	state.game.announcements.items;
