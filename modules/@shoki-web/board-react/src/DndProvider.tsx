import * as React from "react";

import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider as BaseDndProvider } from "react-dnd-multi-backend";

export function DndProvider({ children }: { children: React.ReactNode }) {
	return <BaseDndProvider options={HTML5toTouch}>{children}</BaseDndProvider>;
}
