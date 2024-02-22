import * as React from "react";

import { DndProvider as BaseDndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

export function DndProvider({ children }: { children: React.ReactNode }) {
	return <BaseDndProvider options={HTML5toTouch}>{children}</BaseDndProvider>;
}
