import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { validateNicknameFormat } from "@creature-chess/models";
import { patchUser } from "./utils/patchUser";
import { Auth0User } from "./user";
import { NicknameSelection } from "./registration/NicknameSelection";
import { PictureSelection } from "./registration/PictureSelection";
import { hasNickname } from "./utils/isRegistered";

const RegistrationPage: React.FunctionComponent = () => {

	const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();
	const [nickname, setNickname] = React.useState<string>("");
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);
	const [currentImage, setCurrentImage] = React.useState(1);
	const { user } = useAuth0<Auth0User>();

	React.useEffect(() => {
		if (hasNickname(user)) {
			setNickname(null);
		}
	});

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setNickname(event.target.value);

	const onClick = async () => {
		if (!hasNickname(user)) {
			const nicknameError = validateNicknameFormat(nickname);

			if (nicknameError) {
				setError(nicknameError);
				return;
			}
		}

		setLoading(true);

		const token = await getAccessTokenSilently();
		const response = await patchUser(token, nickname, currentImage);

		setLoading(false);

		if (response.status === 400) {
			const { error: responseError } = await response.json();

			setError(responseError);
			return;
		}

		if (response.status === 200) {
			await getAccessTokenSilently({ ignoreCache: true });
			await getIdTokenClaims();
			return;
		}

		setError("An unknown error occured");
	};

	const handleImageChange = (picture: number): void => {
		setCurrentImage(picture);
	};

	return (
		<div className="register">
			<h1 className="register-heading">Registration</h1>
			{error && <p className="register-error">{error}</p>}
			{
				!hasNickname(user) &&
				<NicknameSelection
					nickname={nickname}
					onChange={onNameChange}
					loading={loading}
				/>
			}
			<PictureSelection
				currentImage={currentImage}
				onChange={handleImageChange}
			/>
			<button
				className="register-button"
				onClick={onClick}
				disabled={loading}
			>
				{!loading && "Register"}
				{loading && "Loading..."}
			</button>
		</div>

	);
};

export { RegistrationPage };
