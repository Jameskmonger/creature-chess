import * as React from "react";

import classNames from "classnames";
import injectSheet from "react-jss";

import { LayoutTheme } from "./theme";

type Props = {
	className?: string;
	children: React.ReactNode | React.ReactNode[];
};

const styles = ({ isVertical }: LayoutTheme) => ({
	half: isVertical ? { height: "50%" } : { width: "50%" },
});

function UnstyledHalf(props: Props & { classes: { half: any } }) {
	return (
		<div className={classNames(props.classes.half, props.className)}>
			{props.children}
		</div>
	);
}

const Half: React.FunctionComponent<Props> = injectSheet(styles)(
	UnstyledHalf
) as React.FunctionComponent<Props>;

export { Half };
