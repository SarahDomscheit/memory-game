import ConfettiAnimation from "./ConfettiAnimation";
import "./GameFinish.css"
const GameFinish = ({result, setIsStarted, setIsFinished}) => {

  function Restart(){
    setIsStarted(false)
    setIsFinished(false)
  }

  return <div className="finishedBox"><div>{result}</div>;
  {result==="Gewonnen! 🎉" && <ConfettiAnimation/>}
  <button className="button" onClick={Restart}>
  Zur Übersicht
</button>
  </div>
};

export default GameFinish;
