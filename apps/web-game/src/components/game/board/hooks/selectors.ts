import { useGameSession } from "~/game/sessionContext";

export function useGameAnimationEventStore() {
	const { battle } = useGameSession();

	return battle.animationEventStore;
}
