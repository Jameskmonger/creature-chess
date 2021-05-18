import * as React from "react";
import { Layout } from "../layout";

interface StageIndicatorProps {
	stage: number;
	className?: string;
}

const StageIndicator: React.FunctionComponent<StageIndicatorProps> = ({ stage, className }) => {
	const stars: React.ReactNode[] = [];

	if (stage === 0) {
		return null;
	}

	for (let i = 0; i <= stage; i++) {
		stars.push(<img key={i} src="https://creaturechess.jamesmonger.com/images/ui/star.svg" />);
	}

	return <Layout className={className} direction="column" justifyContent="center" noSpacer>{stars}</Layout>;
};

export { StageIndicator };
