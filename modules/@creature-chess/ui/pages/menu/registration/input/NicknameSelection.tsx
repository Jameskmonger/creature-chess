import React from "react";

import { createUseStyles } from "react-jss";

import { MAX_NAME_LENGTH } from "@creature-chess/models";

import { BaseRegistrationInput } from "./BaseRegistrationInput";

const useStyles = createUseStyles({
	nameInput: {
		padding: "0.5rem 1rem",
		marginBottom: "1em",
	},
});

const NicknameSelection: React.FunctionComponent<{
	nickname: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	loading: boolean;
}> = ({ nickname, onChange, loading }) => {
	const styles = useStyles();

	return (
		<BaseRegistrationInput
			heading="Nickname"
			info="This nickname is permanent and cannot be changed"
		>
			<input
				className={styles.nameInput}
				maxLength={MAX_NAME_LENGTH}
				disabled={loading}
				value={nickname}
				placeholder="Nickname"
				onChange={onChange}
			/>
		</BaseRegistrationInput>
	);
};

export { NicknameSelection };
