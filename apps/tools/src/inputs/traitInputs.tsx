import React from "react";

import { InputListItem } from "./components/inputListItem";

type Props = {
	traitFields: {
		value: any;
		label: string;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	}[];
};

const TraitInputs: React.FunctionComponent<Props> = ({ traitFields }) => (
	<section className="trait-inputs">
		<div className="trait-inputs-header">
			<h1>Traits</h1>
		</div>
		<ul>
			{traitFields.map((field) => (
				<li key={field.label}>
					<InputListItem
						heading={field.label}
						value={field.value}
						onChange={field.onChange}
					/>
				</li>
			))}
		</ul>
	</section>
);

export { TraitInputs };
