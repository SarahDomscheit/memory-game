import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import GameStart from "./components/GameStart";
import Welcome from "./components/Welcome";

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setisFinished] = useState(false);

  return (
    <>
      <Header />
      {isStarted ? <GameStart /> : <Welcome isStarted={setIsStarted} />}
      <Footer />
    </>
  );
};

export default App;
