import { quitGame } from "@creature-chess/shared/player/actions";
import * as React from "react";
import { useDispatch } from "react-redux";

const QuitGameButton: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [areYouSure, setAreYouSure] = React.useState<boolean>(false);

    const onClick = (
        areYouSure
        ? () => {
            dispatch(quitGame());
        }
        : () => {
            setAreYouSure(true);
        }
    );

    if (!areYouSure) {
        return <button onClick={onClick} className="button">Quit Game</button>;
    }

    return <button onClick={onClick} className="button">Click again to quit</button>;
};

export { QuitGameButton };
