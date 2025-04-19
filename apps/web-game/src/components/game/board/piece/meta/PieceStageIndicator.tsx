import * as React from "react";

import { Layout } from "../../../../../components/ui/layout";

interface StageIndicatorProps {
	stage: number;
}

const STAR = `${APP_IMAGE_ROOT}/ui/star.svg`;

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
