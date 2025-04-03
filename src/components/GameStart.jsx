/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import CardCreater from "./CardCreater/CardCreater";
import "./GameStart.css";
import Timer from "./Timer";

const GameStart = ({
  cardsComplete,
  cardBack,
  setIsFinished,
  setCardsComplete,
  setResult,
  timeSet,
}) => {
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const moveCount = useRef(0);
  function checkFlippedCards(cards) {
    moveCount.current += 1;
    console.log("moveCount", moveCount);
    // console.log("checkFlippedCards", cards);
    if (cards[0].image === cards[1].image) {
      const updatedCards = cardsComplete.map((currentCard) => {
        if (currentCard.id === cards[0].id) {
          currentCard.isMatched = !currentCard.isMatched;
        }
        if (currentCard.id === cards[1].id) {
          currentCard.isMatched = !currentCard.isMatched;
        }

        return currentCard;
      });
      setCardsComplete(updatedCards);
      setCardsFlipped([]);
    } else {
      setTimeout(() => {
        const updatedCards = cardsComplete.map((currentCard) => {
          if (currentCard.id === cards[0].id) {
            currentCard.isFlipped = !currentCard.isFlipped;
          }
          if (currentCard.id === cards[1].id) {
            currentCard.isFlipped = !currentCard.isFlipped;
          }
          return currentCard;
        });
        setCardsComplete(updatedCards);
        setCardsFlipped([]);
      }, 1000); // 1 Sekunde Verzögerung
    }
    console.log("cardscomplete", cardsComplete);
  }
  useEffect(() => {
    if (cardsFlipped.length === 2) {
      checkFlippedCards(cardsFlipped);
    }
  }, [cardsFlipped]);

  useEffect(() => {
    if (cardsComplete.every((card) => card.isMatched)) {
      setIsFinished(true);
      setResult("Gewonnen! 🎉");
    }
  }, [cardsComplete]);

  return (
    <>
      <h1 className="title">Memory-Game</h1>
      <Timer
        setIsFinished={setIsFinished}
        setResult={setResult}
        moveCount={moveCount}
        timeSet={timeSet}
      />

      <div className="flex flex-wrap gap-1  justify-center items-center">
        {cardsComplete.map((card) => (
          <CardCreater
            key={card.id}
            card={card}
            back={cardBack}
            setCardsComplete={setCardsComplete}
            cardsComplete={cardsComplete}
            cardsFlipped={cardsFlipped}
            setCardsFlipped={setCardsFlipped}
          />
        ))}
      </div>
    </>
  );
};

export default GameStart;
