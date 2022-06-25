import * as React from "react";

// TODO improve type on this?
export function Text({ children }: { children: string | string[] | ({ toString(): string })[] }) {
	return <span>{children}</span>;
}
