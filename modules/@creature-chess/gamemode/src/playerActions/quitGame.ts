import { createAction } from "@reduxjs/toolkit";

export type QuitGamePlayerAction = ReturnType<typeof quitGamePlayerAction>;
export const quitGamePlayerAction = createAction("quitGamePlayerAction");
