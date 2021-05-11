import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { MAX_NAME_LENGTH, validateNicknameFormat } from "@creature-chess/models";
import { patchUser } from "./utils/patchUser";
import { isRegistered } from "../auth/utils/isRegistered"
import { Auth0User } from "./user";
import { AVAILABLE_PROFILE_PICTURES } from "@creature-chess/models";


const PictureSelection: React.FunctionComponent<{
    currentImage: number,
    handleImageChange: (picture: number) => void
    }> = ({ currentImage, handleImageChange }) => {

    const creatureNames = Object.values((AVAILABLE_PROFILE_PICTURES))
    const availablePictures = Object.keys((AVAILABLE_PROFILE_PICTURES))
        .map(string => Number(string))

    return (
        <div className = "picture-selection">

            <h1 className = "section-heading">Profile Picture</h1>
            <h2 className="picture-selection-heading">Choose a profile picture - more can be unlocked!</h2>
            <form>
                    {
                        availablePictures.map(picture => {
                            const creatureName = (creatureNames[availablePictures.indexOf(picture)])
                            return (
                                <div className="available-pictures" key = {picture}>
                                    <img
                                        className="picture-selector-element"
                                        src={`https://creaturechess.jamesmonger.com/images/front/${picture}.png`}
                                        alt="tuxemon"
                                    />
                                    <p>{creatureName}</p>
                                    <input
                                        className="picture-selector-element"
                                        type="radio"
                                        value={picture}
                                        checked={currentImage === picture}
                                        onChange={() => handleImageChange(picture)}
                                    />
                                </div>
                            )
                        })
                    }
            </form>
        </div>
    )
}

const NicknameSelection: React.FunctionComponent<{
    nickname: string,
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    loading: boolean
    }> = ({ nickname, onNameChange, loading }) => {

    return (
        <div className="nickname-selection">
            <div className="nickname">
                <h1 className = "section-heading">Nickname</h1>
                <h2 className = "nickname-info">Choose a nickname</h2>
                <h2 className="nickname-warning">This nickname is permanent and cannot be changed</h2>
                <input
                    value={nickname}
                    onChange={onNameChange}
                    maxLength={MAX_NAME_LENGTH}
                    placeholder="Nickname"
                    className="name-input"
                    disabled={loading}
                />
                <div>
                </div>
            </div>
        </div>
    )
}


const RegistrationPage: React.FunctionComponent = () => {

    const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();
    const [nickname, setNickname] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [currentImage, setCurrentImage] = React.useState(1)
    const { user } = useAuth0<Auth0User>();

    React.useEffect(() => {
        if (isRegistered(user)) {
            setNickname(null)
        }
    })

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setNickname(event.target.value);

    const onClick = async () => {
        if (!isRegistered(user)) {
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
        setCurrentImage(picture)
    }

    return (
        <div className="register">
            <h1 className="register-heading">Registration</h1>
            {error && <p className="register-error">{error}</p>}
            {
                !isRegistered(user) &&
                <NicknameSelection
                    nickname={nickname}
                    onNameChange={onNameChange}
                    loading={loading}
                />
            }
            <PictureSelection
                currentImage={currentImage}
                handleImageChange={handleImageChange}
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
