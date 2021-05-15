import { createAction } from "@reduxjs/toolkit";

export type ReadyUpPlayerAction = ReturnType<typeof readyUpPlayerAction>;
export const readyUpPlayerAction = createAction("readyUpPlayerAction");
