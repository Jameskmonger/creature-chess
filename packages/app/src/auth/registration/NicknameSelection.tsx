import React from "react";
import { MAX_NAME_LENGTH } from "@creature-chess/models";

const NicknameSelection: React.FunctionComponent<{
	nickname: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	loading: boolean
}> = ({ nickname, onChange, loading }) => {
	return (
		<div className="nickname-selection">
			<div className="nickname">
				<h1 className="section-heading">Nickname</h1>
				<h2 className="nickname-info">Choose a nickname</h2>
				<h2 className="nickname-warning">This nickname is permanent and cannot be changed</h2>
				<input
					value={nickname}
					onChange={onChange}
					maxLength={MAX_NAME_LENGTH}
					placeholder="Nickname"
					className="name-input"
					disabled={loading}
				/>
			</div>
		</div>
	);
};
export { NicknameSelection };
