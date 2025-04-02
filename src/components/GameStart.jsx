/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CardCreater from "./CardCreater/CardCreater";
import "./GameStart.css";
import Timer from "./Timer";
import confetti from "canvas-confetti"; // Importiere die Confetti-Bibliothek

const GameStart = ({
  cardsComplete,
  cardBack,
  setIsFinished,
  setCardsComplete,
  setResult,
}) => {
  const [cardsFlipped, setCardsFlipped] = useState([]);
  function checkFlippedCards(cards) {
    console.log("checkFlippedCards", cards);
    if (cards[0].image === cards[1].image) {
      const updatedCards = cardsComplete.map((currentCard) => {
        if (currentCard.id === cards[0].id) {
          // console.log("if match [0]");
          currentCard.isMatched = !currentCard.isMatched;
        }
        if (currentCard.id === cards[1].id) {
          // console.log("if match [1]");
          currentCard.isMatched = !currentCard.isMatched;
        }

        return currentCard;
      });
      setCardsComplete(updatedCards);
      
      setCardsFlipped([]);
      // Karten dürfen nicht mehr gedreht werden
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
      <Timer setIsFinished={setIsFinished} setResult={setResult} />
    
      <div className="flex flex-wrap h-90 justify-center items-center">
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
