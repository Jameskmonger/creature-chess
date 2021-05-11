import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { MAX_NAME_LENGTH, validateNicknameFormat } from "@creature-chess/models";
import { patchUser } from "./utils/patchUser";
import { isRegistered } from "../auth/utils/isRegistered"
import { Auth0User } from "./user";

const RegistrationPage: React.FunctionComponent = () => {
    const availablePictures = [1,4,5,7,8]

    const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();
    const [nickname, setNickname] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [currentImage, setCurrentImage] = React.useState<number>(availablePictures[0])
    const { user } = useAuth0<Auth0User>();

    React.useEffect(()=>{
        if (isRegistered(user)){
            setNickname(null)
        }
    })

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setNickname(event.target.value);
    const onClick = async () => {
        if (!isRegistered(user)){
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

    const handleImageChange = (direction:string): void =>{
        const currentIndex = availablePictures.indexOf(currentImage)
        let newIndex;
        if (direction === "left"){
            newIndex = currentIndex - 1 < 0 ?
                availablePictures.length -1
                :
                currentIndex - 1
        }
        if (direction === "right"){
            newIndex = currentIndex + 1 > availablePictures.length - 1 ?
                0
                :
                currentIndex + 1
        }
        setCurrentImage(availablePictures[newIndex])
    }

    return (
        <div className = "register">
            <h1 className="register-heading">Registration</h1>
            {error && <p className="register-error">{error}</p>}
            <h2 className = "picture-selection-heading">Choose a profile picture - more can be unlocked through achievements!</h2>
            <div style = {{height: 20}}/>
            <div className = "arrow-buttons">
                <button
                    className = "picture-scroll-left"
                    onClick = {()=>handleImageChange("left")}
                    >
                        <i className = "arrow-left"></i>
                </button>
                <button
                    className = "picture-scroll-right"
                    onClick = {()=>handleImageChange("right")}
                    >
                        <i className = "arrow-right"></i>
                </button>
            </div>
            <div style = {{height: 10}}/>

            <img src = {`https://creaturechess.jamesmonger.com/images/front/${currentImage}.png`} alt = "Tuxemon"/>
            {
                !isRegistered(user) &&
                <div className="nickname">

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
            }
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
