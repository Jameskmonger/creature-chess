export { type Player, playersActions, playersReducer } from "./state";
export { setupPlayersSyncListeners } from "./sync";
export {
	type LocalPlayer,
	useGamePlayer,
	useLocalPlayer,
	useOpponentPlayer,
	usePlayerRank,
} from "./hooks";
