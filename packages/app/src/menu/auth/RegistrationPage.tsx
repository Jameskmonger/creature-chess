import * as React from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { MAX_NAME_LENGTH, SanitizedUser } from "@creature-chess/models";
import { validateNickname } from "@creature-chess/shared";
import { patchUser } from "./utils/patchUser";
import { userUpdated } from "./store/actions";

const RegistrationPage: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();
    const [nickname, setNickname] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setNickname(event.target.value);
    const onClick = async () => {
        const nicknameError = validateNickname(nickname);

        if (nicknameError) {
            setError(nicknameError);
            return;
        }

        setLoading(true);

        const token = await getAccessTokenSilently();
        const response = await patchUser(token, nickname);

        setLoading(false);

        if (response.status === 400) {
            const { error: responseError } = await response.json();

            setError(responseError);
            return;
        }

        if (response.status === 200) {
            const user: SanitizedUser = await response.json();

            dispatch(userUpdated(user));
            return;
        }

        setError("An unknown error occured");
    };

    return (
        <div className="register">
            <h1 className="register-heading">Registration</h1>

            {error && <p className="register-error">{error}</p>}

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
                <button
                    className="register-button"
                    onClick={onClick}
                    disabled={loading}
                >
                    {!loading && "Register"}
                    {loading && "Loading..."}
                </button>
            </div>
        </div>
    );
};

export { RegistrationPage };
