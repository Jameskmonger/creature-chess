import React, { useState } from "react";

const useField = (label: string, initialValue: any) => {
	const [value, setValue] = useState<typeof initialValue>(initialValue);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return {
		label,
		value,
		onChange
	};
};

export { useField };
