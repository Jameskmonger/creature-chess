import * as React from "react";
import ReactModal from "react-modal";

const BoardOverlay: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReactModal
            isOpen
            className="modal"
            overlayClassName="modal-overlay"
            parentSelector={() => document.querySelector(".chessboard")}
        >
            {children}
        </ReactModal>
    );
};

export { BoardOverlay };
