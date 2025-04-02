import { useEffect, useState } from "react";

const Timer = ({ setIsFinished, setResult, moveCount }) => {
  const [time, setTime] = useState(120);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Wenn Timer abläuft
  useEffect(() => {
    if (time <= 0) {
      setIsRunning(false);
      setIsFinished(true);
      setResult("Verloren! Zeit ist abgelaufen.");
    }
  }, [time]);

  return (
    <>
      <div className="timerBox">
        <h2>
          Countdown: {Math.floor(time / 60)}:
          {String(time % 60).padStart(2, "0")} min
        </h2>
        <p>Number of Turns: {moveCount.current}</p>
      </div>
    </>
  );
};

export default Timer;
