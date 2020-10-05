import * as React from "react";

export const Footer: React.FunctionComponent = () => {
    return (
        <div className="github-link">
            <a href="https://reddit.com/r/creaturechess/">/r/CreatureChess</a>
            {" - "}
            <a href="http://creaturechess.jamesmonger.com/privacy">Privacy Policy</a>
            {" - "}
            <a href="https://github.com/Jameskmonger/creature-chess">Source and Licenses on GitHub</a>
        </div>
    );
};
