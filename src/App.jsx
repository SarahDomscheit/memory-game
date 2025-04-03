import { useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import GameStart from "./components/GameStart";
import GameFinish from "./components/GameFinish";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState("");
  const [cardsComplete, setCardsComplete] = useState([]);
  const timeSet = useRef(0);
  const [cardBack, setCardBack] = useState(); //option later

  return (
    <>
      <Header />
      {isStarted ? (
        <GameStart
          cardsComplete={cardsComplete}
          cardBack={cardBack}
          setIsFinished={setIsFinished}
          setCardsComplete={setCardsComplete}
          setResult={setResult}
          timeSet={timeSet}
        />
      ) : (
        <Welcome
          setIsStarted={setIsStarted}
          setCardsComplete={setCardsComplete}
          setCardBack={setCardBack}
          timeSet={timeSet}
        />
      )}
      {isFinished && (
        <GameFinish
          result={result}
          setIsStarted={setIsStarted}
          setIsFinished={setIsFinished}
        />
      )}
      <Footer />
    </>
  );
};

export default App;
