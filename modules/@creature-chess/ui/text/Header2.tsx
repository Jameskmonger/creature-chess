import * as React from "react";

export function Header2({
	children,
}: {
	children: string | string[] | { toString(): string }[];
}) {
	return <h2>{children}</h2>;
}
