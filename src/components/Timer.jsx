import { useEffect, useState } from "react";

const Timer = ({ setIsFinished, setResult }) => {
  const [time, setTime] = useState(30);
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
    <h2 className="text-center text-xl my-4">
      Zeit: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")} min
    </h2>
  );
};

export default Timer;
