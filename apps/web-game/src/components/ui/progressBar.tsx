import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

interface Props {
	className?: string;
	fillClassName?: string;
	contentClassName?: string;

	current: number;
	max: number;

	vertical?: boolean;
	renderContents?: (current: number, max: number) => string | JSX.Element;
	children?: React.ReactNode;
}

const getPercentage = (current: number, max: number) =>
	Math.floor((current / max) * 100) + "%";
const getFillStyle = ({
	vertical = false,
	current,
	max,
}: Props): { height: string } | { width: string } =>
	vertical
		? { height: getPercentage(current, max) }
		: { width: getPercentage(current, max) };

const useStyles = createUseStyles({
	container: {
		width: "101%",
		height: "100%",
		position: "relative",
		background: "#636363",
		boxSizing: "border-box",
	},
	fill: (props: Props) => ({
		position: "absolute",
		height: "100%",
		width: "100%",
		boxSizing: "border-box",
		...getFillStyle(props),
	}),
	contents: {
		position: "absolute",
		top: "0",
		right: "0.5em",
		fontWeight: 700,
		lineHeight: "1.75em",
	},
});

const ProgressBar: React.FC<Props> = (props) => {
	const classes = useStyles(props);
	const {
		className,
		fillClassName = "",
		contentClassName = "",
		current,
		max,
		renderContents,
		children,
	} = props;

	return (
		<div className={classNames(classes.container, className)}>
			<div className={classNames(classes.fill, fillClassName)} />
			{renderContents && (
				<span className={classNames(classes.contents, contentClassName)}>
					{renderContents(current, max)}
				</span>
			)}

			{children}
		</div>
	);
};

export { ProgressBar };
