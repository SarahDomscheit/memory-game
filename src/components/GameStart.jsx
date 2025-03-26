/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CardCreater from "./CardCreater/CardCreater";
import "./GameStart.css";


const GameStart = ({
  cardsComplete,
  cardBack,
  setIsFinished,
  setCardsComplete,
  setResult,
}) => {
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(()=>{
    let interval = null;

    if (isRunning) {
      interval = setInterval(() =>{
        setTime((prevTime) => prevTime -1);
      }, 1000);
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (cardsComplete.every((card) => card.matched)) {
      setIsRunning(false);
      setIsFinished(true);
      setResult("Gewonnen! 🎉");
    }
  }, [cardsComplete]);
  
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
    <h1 className="title">Memory-Game</h1>
    <h2 className="text-center text-xl my-4">
        Zeit: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")} min
      </h2>

    <div className="flex flex-wrap h-90 justify-center items-center">
      {cardsComplete.map((card) => (
        <CardCreater
          key={card.id}
          card={card}
          back={cardBack}
          setCardsComplete={setCardsComplete}
          cardsComplete={cardsComplete}
        />
      ))}
    </div>
    </>
  );
};

export default GameStart;
