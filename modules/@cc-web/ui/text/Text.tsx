import * as React from "react";

// TODO improve type on this?
export function Text({
	children,
}: {
	children: React.ReactNode;
}) {
	return <span>{children}</span>;
}
