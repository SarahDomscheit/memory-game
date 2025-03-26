/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./CardCreater.css";

const CardCreater = ({ card, back, setCardsComplete, cardsComplete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    // [card.isFlipped] = true;
    console.log(card);
  };

  return (
    <div className="card" onClick={flipCard}>
      <div className={`card-inner ${isFlipped ? "card-flipped" : ""}`}>
        <div className={`card-front ${back}`}></div>
        <div
          className="card-back"
          style={{ backgroundImage: `url(${card.image})` }}
        ></div>
      </div>
    </div>
  );
};
export default CardCreater;
