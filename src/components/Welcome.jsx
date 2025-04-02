import { useEffect, useState } from "react";
import "./Welcome.css";
import createDeck from "./functions/createDeck";
import PreviewCard from "./PreviewCard";

const Welcome = ({ setIsStarted, setCardsComplete, setCardBack }) => {
  const [url, setUrl] = useState([]);
  const [amountCards, setAmountCards] = useState(5);
  const [start, setStart] = useState(false);

  const options = [
    {
      name: "Harry Potter",
      value: "https://hp-api.onrender.com/api/characters",
      logo: "./Logo_hp.png",
    },
    {
      name: "Cats",
      value: "https://api.thecatapi.com/v1/images/search?limit=10",
      logo: "./Logo_cat.png",
    },
    {
      name: "Dogs",
      value: "https://api.thedogapi.com/v1/images/search?limit=10",
      logo: "./Logo_dog.png",
    },
  ];

  const [fetchPicUrl, setFetchPicUrl] = useState(options[0].value);

  useEffect(() => {
    async function fetchURL() {
      try {
        const response = await fetch(fetchPicUrl);
        const data = await response.json();
        const newUrls = data
          .slice(0, amountCards)
          .map((item) => (item.image ? item.image : item.url));
        setUrl(newUrls);
      } catch (error) {
        console.log(error);
      }
    }
    if (start) {
      fetchURL();
    }

    return () => {};
  }, [start]);

  useEffect(() => {
    if (url.length > 0) {
      const deck = createDeck(url);
      setCardsComplete(deck);
      //option to set card back
      setCardBack("blue");
      setIsStarted(true);
    }
  }, [url]);

  const handleStart = () => {
    setStart(true);
  };
  const handleChange = (e) => {
    setAmountCards(e.target.value);
  };

  return (
    <div className="welcome_container">
      <h1>
        Welcome to the <br /> Memory-Game
      </h1>
      <div className="welcome_content">
        <p className="welcome_text">
          Test your memory skills by finding all the matching card pairs! Flip
          two cards at a time – can you remember where they were? Beat the clock
          and complete the game as fast as you can. Good luck and have fun!
          <br />
          <br />
          You can play with one of three themed decks: Harry Potter, Cats, or
          Dogs – each featuring its own unique card illustrations to challenge
          your memory!
        </p>
        <div className="slidecontainer">
          <label htmlFor="myRange">Amount of cards : {amountCards * 2}</label>
          <input
            type="range"
            min="5"
            max="10"
            value={amountCards}
            className="slider"
            id="myRange"
            onChange={handleChange}
          />
          <div className="flex flex-row h-90 justify-center items-center">
            {options.map((option, index) => (
              <PreviewCard
                key={index}
                option={option}
                fetchPicUrl={fetchPicUrl}
                setFetchPicUrl={setFetchPicUrl}
              />
            ))}
          </div>
        </div>
        <button className="start_button" onClick={handleStart}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Welcome;
