import * as React from "react";

export function Header4({ children }: { children: string | string[] | ({ toString(): string })[] }) {
	return <h4>{children}</h4>;
}
