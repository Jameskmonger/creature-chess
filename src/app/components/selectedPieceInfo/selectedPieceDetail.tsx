import * as React from "react";

interface Props {
    label: string;
    value: string | number;
}

const SelectedPieceDetail: React.FunctionComponent<Props> = (props) => (
    <div>
        <label>{props.label}: </label>{props.value}
    </div>
);

export { SelectedPieceDetail };
