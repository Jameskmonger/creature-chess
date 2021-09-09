import React from "react";
import { InputListItem } from "./inputListItem";

type Props = {
	stateFields: {
		label: string;
		value: any;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	}[];
};

const PlayerInfo: React.FunctionComponent<Props> = ({ stateFields }) => (
	<li>
		Player Info:
		<ul>
			{
				stateFields.map(field => (
					<li key={field.label}>
						<InputListItem
							heading={field.label}
							value={field.value}
							onChange={field.onChange}
						/>
					</li>
				))
			}
		</ul>
	</li>
);

export { PlayerInfo };
