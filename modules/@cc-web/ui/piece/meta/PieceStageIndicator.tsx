import * as React from "react";

import { IMAGE_BASE_URL } from "@cc-web/shared/constants";

import { Layout } from "../../layout";

interface StageIndicatorProps {
	stage: number;
}

const STAR = `${IMAGE_BASE_URL}/ui/star.svg`;

const PieceStageIndicator: React.FunctionComponent<StageIndicatorProps> = ({
	stage,
}) => {
	const stars: React.ReactNode[] = [];

	if (stage === 0) {
		return null;
	}

	for (let i = 0; i <= stage; i++) {
		stars.push(<img key={i} src={STAR} />);
	}

	return (
		<Layout grow direction="column" justifyContent="center" noSpacer>
			{stars}
		</Layout>
	);
};

export { PieceStageIndicator };
