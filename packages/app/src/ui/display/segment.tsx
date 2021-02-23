import * as React from "react";

type SegmentProps = {
    open: boolean;
    onHeaderClick: () => void;
    header: string;
    children: React.ReactNode;
};

const Segment: React.FunctionComponent<SegmentProps> = ({ open, onHeaderClick, header, children }) => {
    return (
        <div className={`segment ${open ? "" : "closed"}`}>
            <div className="header" onClick={onHeaderClick}>{header} {open ? "-" : "+"}</div>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export { Segment };
