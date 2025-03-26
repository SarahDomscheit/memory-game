import { useState } from "react";

const Welcome = ({ setIsStarted, setCardsComplete }) => {
  const [url, setUrl] = useState([
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5",
    "https://picsum.photos/200/300?random=6",
    "https://picsum.photos/200/300?random=7",
    "https://picsum.photos/200/300?random=8",
    "https://picsum.photos/200/300?random=9",
    "https://picsum.photos/200/300?random=10",
  ]);

  function createDeck(url) {
    const cards = url.map((url, index) => ({
      id: index,
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

  const handleStart = () => {
    // fetch later
    const deck = createDeck(url);
    setCardsComplete(deck);
    setIsStarted(true);
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
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
};

export default Welcome;
