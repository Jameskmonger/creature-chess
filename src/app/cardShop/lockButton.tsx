import * as React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";

interface LockButtonProps {
  locked: boolean;
  onToggle: () => void;
}

const LockButton: React.FunctionComponent<LockButtonProps> = ({ locked, onToggle }) => {
  return (
    <>
      <span className="item">
        {
          locked
          ? <FaLock onClick={onToggle} />
          : <FaLockOpen onClick={onToggle} />
        }
      </span>
    </>
  );
};

export { LockButton }
