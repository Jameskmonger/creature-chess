import * as React from "react";
import { DropToSellProps } from "./dropToSellProps";

const DropToSellUnconnected: React.FunctionComponent<DropToSellProps> = props => {
    const { connectDropTarget } = props;

    return connectDropTarget(
        <div className="drop-to-sell">
            <span className="drop-to-sell-text">Drop piece here to sell</span>
        </div>
    );
};

export {
    DropToSellUnconnected
};
