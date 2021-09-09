import React from "react";

type Props = {
	heading: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const InputListItem: React.FunctionComponent<Props> = ({ heading, value, onChange }) => (
	<>
		<li>
			<h1>{heading}</h1>
		</li>
		<li className="state-input">
			<input
				type="text"
				value={value}
				id={heading}
				onChange={onChange}
			/>
		</li>
	</>
);

export { InputListItem };
