import ConfettiAnimation from "../ConfettiAnimation";
import "./GameFinish.css";
const GameFinish = ({ result, setIsStarted, setIsFinished }) => {
  function Restart() {
    setIsStarted(false);
    setIsFinished(false);
  }

  return (
    <div className="finishedBox">
      <div className="finishCard">
        <div className="text-white text-2xl">{result}</div>
        {result === "Gewonnen! 🎉" && <ConfettiAnimation />}
        <button className="button mt-4 " onClick={Restart}>
          Zur Übersicht
        </button>
      </div>
    </div>
  );
};

export default GameFinish;
