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
      <div className={`card-inner ${card.isFlipped ? "card-flipped" : ""}`}>
        <div
          className={`${card.isMatched ? "match" : ""} card-front ${back}`}
        ></div>
        <div className="card-front icon" style={{backgroundImage: `url(./memory_icon_6_200_black.png)` }}></div>
        <div
          className={`${card.isMatched ? "match" : ""} card-back ${card.image.includes("dragonball") || card.image.includes("pokemon") ? "special-img" : ""}`}
          style={{ backgroundImage: `url(${card.image})` }}
        ></div>
      </div>{" "}
      {/* <p>{card.id}</p> */}
    </div>
  );
};
export default CardCreater;
