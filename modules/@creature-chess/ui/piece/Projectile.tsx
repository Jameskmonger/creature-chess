import * as React from "react";

export const Projectile = ({ className }: { className?: string }) => (
	<svg className={className} height="12" width="12">
		<circle cx="6" cy="6" r="4" stroke="#FAD17D" strokeWidth="2" fill="#F5E687" />
	</svg>
);
