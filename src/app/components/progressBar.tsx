import * as React from "react";

interface ProgressBarProps {
    className: string;
    current: number;
    max: number;
}

const getPercentage = (current: number, max: number) => {
    return Math.floor((current / max) * 100) + "%";
};

const ProgressBar: React.SFC<ProgressBarProps> = ({ className, current, max }) => (
    <div className={className}>
        {/* tslint:disable-next-line:jsx-ban-props */}
        <div className="fill" style={{ width: getPercentage(current, max) }} />
    </div>
);

export {
    ProgressBar
};
