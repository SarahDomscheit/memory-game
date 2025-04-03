import { useEffect, useState } from "react";

const Timer = ({ setIsFinished, setResult, moveCount, timeSet }) => {
  const [time, setTime] = useState(timeSet.current);
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
        <div className="flex flex-row items-center">
          <h2>Countdown</h2>
          <div className="digits">
            0{Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}{" "}
          </div>
        </div>
        <div className="flex flex-row items-center ">
          <h2>Turns</h2>
          <div className="digits2">{moveCount.current}</div>
        </div>
      </div>
    </>
  );
};

export default Timer;
