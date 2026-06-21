import * as React from "react";

import classNames from "classnames";

import { Button } from "../components/Button";
import { createUseThemeStyles } from "../styles";

type Props = {
	icon?: React.ReactNode;
	title: string;
	subtitle?: string;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
};

const useStyles = createUseThemeStyles(() => ({
	button: {
		width: "100%",
	},
	content: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: "0.75rem",
	},
	icon: {
		display: "flex",
		alignItems: "center",
		fontSize: "1.5rem",
	},
	text: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		lineHeight: 1.15,
	},
	title: {
		fontSize: "1.5rem",
	},
	subtitle: {
		fontSize: "0.8rem",
		opacity: 0.75,
	},
}));

/** The primary play call-to-action. */
export function MenuPlayButton({
	icon,
	title,
	subtitle,
	onClick,
	disabled,
	className,
}: Props) {
	const classes = useStyles();

	return (
		<Button
			color="primary"
			size="large"
			onClick={onClick}
			disabled={disabled}
			className={classNames(classes.button, className)}
		>
			<span className={classes.content}>
				{icon && <span className={classes.icon}>{icon}</span>}
				<span className={classes.text}>
					<span className={classes.title}>{title}</span>
					{subtitle && <span className={classes.subtitle}>{subtitle}</span>}
				</span>
			</span>
		</Button>
	);
}
