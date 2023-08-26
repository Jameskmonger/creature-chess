import * as React from "react";

import { DndProvider as BaseDndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";

export const DndProvider: React.FC = ({ children }) => (
	<BaseDndProvider options={HTML5toTouch}>{children}</BaseDndProvider>
);
