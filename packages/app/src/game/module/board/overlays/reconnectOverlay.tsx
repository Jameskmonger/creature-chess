import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { ConnectionStatus } from "../../../connection-status";
import { BoardOverlay } from "./boardOverlay";

const ReconnectOverlay: React.FunctionComponent = () => {
    const connectionStatus = useSelector<AppState, ConnectionStatus>(state => state.game.ui.connectionStatus);

    if (
        connectionStatus === ConnectionStatus.NOT_CONNECTED
        || connectionStatus === ConnectionStatus.CONNECTED
    ) {
        return null;
    }

    return (
        <BoardOverlay>
            <div className="reconnect-overlay">
                {
                    connectionStatus === ConnectionStatus.DISCONNECTED
                    && (
                        <>
                            <p className="text">You've been disconnected - but you can get back in!</p>
                            <p className="text">Please refresh the page and press 'Find Game' to rejoin</p>
                        </>
                    )
                }
            </div>
        </BoardOverlay>
    );
};

export { ReconnectOverlay };
