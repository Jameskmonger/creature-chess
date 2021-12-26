import * as React from "react";
import { Layout } from "../../src/layout";

interface StageIndicatorProps {
	stage: number;
}

const PieceStageIndicator: React.FunctionComponent<StageIndicatorProps> = ({ stage }) => {
	const stars: React.ReactNode[] = [];

	if (stage === 0) {
		return null;
	}

	for (let i = 0; i <= stage; i++) {
		stars.push(<img key={i} src="https://creaturechess.com/images/ui/star.svg" />);
	}

	return <Layout grow direction="column" justifyContent="center" noSpacer>{stars}</Layout>;
};

export { PieceStageIndicator };
