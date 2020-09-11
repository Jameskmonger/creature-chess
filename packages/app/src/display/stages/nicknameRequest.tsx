import * as React from "react";
import { useDispatch } from "react-redux";
import { MAX_NAME_LENGTH } from "@creature-chess/models/constants";
import { nicknameChosen } from "../../store/actions/lobbyActions";

const NicknameRequest: React.FunctionComponent<{ message: string }> = ({ message }) => {
    const dispatch = useDispatch();
    const [ nickname, setNickname ] = React.useState<string>("");

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setNickname(event.target.value);
    const onClick = () => dispatch(nicknameChosen(nickname));

    return (
        <div className="menu">
        <div className="join-game">
            <p>{message}</p>

            <h2 className="nickname-warning">This nickname is permanent and cannot be changed</h2>

            <h2 className="nickname-warning">All player accounts have been reset. Please feel free to choose a new name!</h2>

            <input
                value={nickname}
                onChange={onNameChange}
                maxLength={MAX_NAME_LENGTH}
                placeholder="Nickname"
                className="name-input"
            />

            <div className="join-options">
                <div className="option">
                    <button onClick={onClick} className="option-button primary">Choose nickname</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export { NicknameRequest };
