import * as React from "react";

interface Props {
  countdownToSeconds: number;
  render?: (secondsRemaining: number) => React.ReactElement;
}

const Countdown: React.FunctionComponent<Props> = ({ countdownToSeconds, render }) => {
  const [secondsRemaining, setSecondsRemaining] = React.useState<number | null>(null);

  const updateSecondsRemaining = () => {
    if (countdownToSeconds === null) {
      return;
    }

    const currentSeconds = Date.now() / 1000;

    setSecondsRemaining(
      Math.ceil(countdownToSeconds - currentSeconds)
    );
  };

  React.useEffect(() => {
    updateSecondsRemaining();

    const intervalId = setInterval(updateSecondsRemaining, 1000);

    return () => clearInterval(intervalId);

  }, [countdownToSeconds]);

  if (secondsRemaining === null) {
    return null;
  }

  const safeSecondsRemaining = secondsRemaining > 1 ? secondsRemaining : 1;

  if (render) {
    return render(safeSecondsRemaining);
  }

  return <span>{safeSecondsRemaining}</span>;
};

export { Countdown };
