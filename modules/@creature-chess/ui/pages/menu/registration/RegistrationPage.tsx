import * as React from "react";

import { validateNicknameFormat } from "@creature-chess/models";

import { useStyles } from "./RegistrationPage.styles";
import { NicknameSelection } from "./input/NicknameSelection";
import { PictureSelection } from "./input/PictureSelection";

type RegistrationPageProps = {
	updateUser: (nickname: string, image: number) => Promise<{ error?: string }>;
};

export function RegistrationPage({ updateUser }: RegistrationPageProps) {
	const styles = useStyles();
	const [nickname, setNickname] = React.useState<string>("");
	const [currentImage, setCurrentImage] = React.useState(1);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (loading) {
			return;
		}

		setNickname(event.target.value);
	};
	const handleImageChange = (picture: number): void => {
		if (loading) {
			return;
		}

		setCurrentImage(picture);
	};

	const onRegisterClick = async () => {
		const nicknameError = validateNicknameFormat(nickname);

		if (nicknameError) {
			setError(nicknameError);
			return;
		}

		setLoading(true);
		const { error: responseError } = await updateUser(nickname, currentImage);

		if (!responseError) {
			return;
		}

		setLoading(false);
		setError(responseError);
	};

	return (
		<div className={styles.register}>
			<h1>Registration</h1>
			{error && <p className={styles.error}>{error}</p>}
			<NicknameSelection
				nickname={nickname || ""}
				onChange={handleNameChange}
				loading={loading}
			/>
			<PictureSelection
				currentImage={currentImage}
				onChange={handleImageChange}
			/>
			<button
				className={styles.registerButton}
				onClick={onRegisterClick}
				disabled={loading}
			>
				{!loading && "Register"}
				{loading && "Loading..."}
			</button>
		</div>
	);
}
