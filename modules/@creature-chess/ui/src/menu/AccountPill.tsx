import * as React from "react";

import classNames from "classnames";

import { createUseThemeStyles } from "../styles";

type Props = {
	name: string;
	/** Leading avatar (image). Takes precedence over `icon`. */
	avatar?: React.ReactNode;
	/** Leading icon, shown when there is no avatar. */
	icon?: React.ReactNode;
	onClick?: () => void;
	className?: string;
};

const useStyles = createUseThemeStyles((theme) => ({
	pill: {
		display: "inline-flex",
		alignItems: "center",
		gap: "0.4rem",
		padding: "0.2rem 0.6rem",
		borderRadius: "999px",
		background: theme.palette.surface,
		border: `1px solid color-mix(in oklab, ${theme.palette.light.neutral} 12%, transparent)`,
		color: theme.palette.light.neutral,
		fontFamily: theme.typography.primary,
		fontSize: "1rem",
		lineHeight: 1,
		maxWidth: "100%",
		minWidth: 0,
	},
	button: {
		"cursor": "pointer",
		"&:hover": {
			borderColor: `color-mix(in oklab, ${theme.palette.light.neutral} 28%, transparent)`,
		},
	},
	leading: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flex: "none",
	},
	avatar: {
		"width": "1.4rem",
		"height": "1.4rem",
		"borderRadius": "50%",
		"objectFit": "cover",
		"& img": {
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			objectFit: "cover",
			display: "block",
		},
	},
	name: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
}));

export function AccountPill({
	name,
	avatar,
	icon,
	onClick,
	className,
}: Props) {
	const classes = useStyles();
	const interactive = !!onClick;

	const content = (
		<>
			{(avatar || icon) && (
				<span
					className={classNames(classes.leading, { [classes.avatar]: !!avatar })}
				>
					{avatar ?? icon}
				</span>
			)}
			<span className={classes.name}>{name}</span>
		</>
	);

	if (interactive) {
		return (
			<button
				type="button"
				className={classNames(classes.pill, classes.button, className)}
				onClick={onClick}
			>
				{content}
			</button>
		);
	}

	return <span className={classNames(classes.pill, className)}>{content}</span>;
}
