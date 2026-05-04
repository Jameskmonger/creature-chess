// Tooling-only entry point. Base-game bots should import `@cc-server/bot`.

export { setupBotLogicInternal } from "./src/botLogic";
export type {
	InternalLifecycleHooks,
	PhaseEndInfo,
} from "./src/preparingPhaseLoop";
