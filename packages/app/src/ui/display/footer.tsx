import * as React from "react";

declare const APP_VERSION: string;

export const Footer: React.FunctionComponent = () => {
    return (
        <div className="footer">
            <span>v{APP_VERSION}</span>
            {" - "}
            <a href="https://reddit.com/r/creaturechess/">/r/CreatureChess</a>
            {" - "}
            <a href="http://creaturechess.jamesmonger.com/privacy">Privacy Policy</a>
            {" - "}
            <a href="https://github.com/Jameskmonger/creature-chess">Licenses on GitHub</a>
        </div>
    );
};
