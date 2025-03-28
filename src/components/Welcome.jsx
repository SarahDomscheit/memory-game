import { useEffect, useState } from "react";

const Welcome = ({ setIsStarted, setCardsComplete, setCardBack }) => {
  // eslint-disable-next-line no-unused-vars
  const [url, setUrl] = useState([
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png",
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/063.png",
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/092.png",
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png",
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png",
    // "https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png",
  ]);
  const [amountCards, setAmountCards] = useState(5);

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

      const deck = createDeck(url);
      setCardsComplete(deck);
      //option to set card back
      setCardBack("blue");
      setIsStarted(true);
    }
    async function handleStart() {
      await fetchURL();
    }
    return () => {};
  }, [url]);

  return (
    <div>
      <h1>Willkommen zum Memory Game</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero error
        eum fugiat amet mollitia, atque, id enim similique aspernatur dolore
        illum dignissimos porro veritatis placeat voluptas voluptates,
        repellendus explicabo. Mollitia.
      </p>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
};

export default Welcome;
