import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";

const Announcement: React.FunctionComponent = () => {
    const mainAnnouncement = useSelector<AppState, string>(state => state.game.mainAnnouncement);
    const subAnnouncement = useSelector<AppState, string>(state => state.game.subAnnouncement);

    if (!mainAnnouncement) {
        return null;
    }

    return (
        <div className="announcement">
            {subAnnouncement && <h3 className="sub">{subAnnouncement}</h3>}

            <h2 className="main">{mainAnnouncement}</h2>
        </div>
    );
};

export { Announcement };
