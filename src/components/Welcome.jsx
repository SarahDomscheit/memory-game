import { useEffect, useState } from "react";
import "./Welcome.css";

const Welcome = ({ setIsStarted, setCardsComplete, setCardBack }) => {
  const [url, setUrl] = useState([]);
  const [amountCards, setAmountCards] = useState(5);
  const [start, setStart] = useState(false);

  function createDeck(url) {
    const cards = url.map((url, index) => ({
      id: `${index}`,
      image: url,
      isFlipped: false,
      isMatched: false,
    }));

    const duplicatedCards = [
      ...cards,
      ...cards.map((card) => ({
        ...card,
        id: card.id + "-dup",
      })),
    ];

    const shuffledDeck = duplicatedCards.sort(() => Math.random() - 0.5);
    return shuffledDeck;
  }
  useEffect(() => {
    async function fetchURL() {
      try {
        const response = await fetch(
          "https://hp-api.onrender.com/api/characters"
        );
        const data = await response.json();
        const newUrls = data.slice(0, amountCards).map((item) => item.image);
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
    <div>
      <h1>Willkommen zum Memory Game</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero error
        eum fugiat amet mollitia, atque, id enim similique aspernatur dolore
        illum dignissimos porro veritatis placeat voluptas voluptates,
        repellendus explicabo. Mollitia.
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
      </div>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
};

export default Welcome;
