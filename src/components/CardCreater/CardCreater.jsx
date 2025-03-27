/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./CardCreater.css";

const CardCreater = ({
  card,
  back,
  setCardsComplete,
  cardsComplete,
  setCardsFlipped,
  cardsFlipped,
  
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Synchronisiere den lokalen Zustand mit dem globalen Zustand
    setIsFlipped(card.isFlipped);
  }, [card.isFlipped]);

  const flipCard = () => {
    if (!card.isMatched && !card.isFlipped && cardsFlipped.length < 2) {
      const updatedCards = cardsComplete.map((currentCard) => {
        if (currentCard.id === card.id) {
          return { ...currentCard, isFlipped: true };
        }
        return currentCard;
      });
      setCardsComplete(updatedCards);
      setCardsFlipped([...cardsFlipped, card]);
    }
  };
  console.log(cardsFlipped);

  return (
    <div className="card" onClick={flipCard}>
      <div className={`card-inner ${isFlipped ? "card-flipped" : ""}`}>
        <div className={`card-front ${back}`}></div>
        <div
          className="card-back"
          style={{ backgroundImage: `url(${card.image})` }}
        ></div>
      </div>{" "}
      {/* <p>{card.id}</p> */}
    </div>
  );
};
export default CardCreater;
