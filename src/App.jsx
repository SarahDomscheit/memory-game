import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import GameStart from "./components/GameStart";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setisFinished] = useState(false);
  const [cardsComplete, setCardsComplete] = useState([]);
  console.log(cardsComplete);

  return (
    <>
      <Header />
      {isStarted ? (
        <GameStart cardsComplete={cardsComplete} />
      ) : (
        <Welcome
          setIsStarted={setIsStarted}
          setCardsComplete={setCardsComplete}
        />
      )}
      <Footer />
    </>
  );
};

export default App;
