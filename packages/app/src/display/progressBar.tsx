import * as React from "react";

interface ProgressBarProps {
	className: string;
	current: number;
	max: number;

	vertical?: boolean;
	renderContents?: (current: number, max: number) => string | JSX.Element;
}

const getPercentage = (current: number, max: number) => {
	return Math.floor((current / max) * 100) + "%";
};

const ProgressBar: React.SFC<ProgressBarProps> = ({ className, current, max, vertical = false, renderContents }) => {
	const fillStyle = (
		vertical
			? { height: getPercentage(current, max) }
			: { width: getPercentage(current, max) }
	);

	return (
		<div className={className}>
			{/* tslint:disable-next-line:jsx-ban-props */}
			<div className="fill" style={fillStyle} />
			{
				renderContents
				&& <span className="contents">{renderContents(current, max)}</span>
			}
		</div>
	);
};

export {
	ProgressBar
};
