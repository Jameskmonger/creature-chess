import * as React from "react";
import { Constants } from "@common";

interface RerollCardProps {
    buyable: boolean;
    onClick: () => void;
}

const RerollCard: React.FunctionComponent<RerollCardProps> = ({ buyable, onClick }) => (
    <div
        className={`card reroll${buyable ? "" : " not-buyable"}`}
        onClick={buyable ? onClick : undefined}
    >
        Reroll (${Constants.REROLL_COST})
    </div>
);

export {
    RerollCard
};
