import * as React from "react";

import { DndProvider as BaseDndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

export const DndProvider: React.FC = ({ children }) => (
	<BaseDndProvider options={HTML5toTouch}>{children}</BaseDndProvider>
);
