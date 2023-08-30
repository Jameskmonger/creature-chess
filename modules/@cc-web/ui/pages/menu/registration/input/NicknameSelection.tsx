import React from "react";

import { createUseStyles } from "react-jss";

import { BaseRegistrationInput } from "./BaseRegistrationInput";

const useStyles = createUseStyles({
	nameInput: {
		padding: "0.5rem 1rem",
		marginBottom: "1em",
	},
});

export function NicknameSelection({ nickname, maxLength, onChange, loading }: {
	nickname: string;
	maxLength: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	loading: boolean;
}) {
	const styles = useStyles();

	return (
		<BaseRegistrationInput
			heading="Nickname"
			info="This nickname is permanent and cannot be changed"
		>
			<input
				className={styles.nameInput}
				maxLength={maxLength}
				disabled={loading}
				value={nickname}
				placeholder="Nickname"
				onChange={onChange}
			/>
		</BaseRegistrationInput>
	);
};
