import * as React from "react";

export function Projectile({
	className,
	style,
	onAnimationEnd,
}: {
	className?: string;
	style?: React.CSSProperties;
	onAnimationEnd?: () => void;
}) {
	return (
		<svg
			className={className}
			style={style}
			height="12"
			width="12"
			onAnimationEnd={onAnimationEnd}
		>
			<circle
				cx="6"
				cy="6"
				r="4"
				stroke="#FAD17D"
				strokeWidth="2"
				fill="#F5E687"
			/>
		</svg>
	);
}
