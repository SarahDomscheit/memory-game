import { useState } from "react";
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
  // console.log(cardsComplete);
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
        />
      ) : (
        <Welcome
          setIsStarted={setIsStarted}
          setCardsComplete={setCardsComplete}
          setCardBack={setCardBack}
        />
      )}
      {isFinished && <GameFinish result={result} />}
      <Footer />
    </>
  );
};

export default App;
