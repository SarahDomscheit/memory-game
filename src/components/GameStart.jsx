/* eslint-disable no-unused-vars */
import CardCreater from "./CardCreater/CardCreater";
import "./GameStart.css";

const GameStart = ({
  cardsComplete,
  cardBack,
  setIsFinished,
  setCardsComplete,
}) => {
  return (
    <>
    <h1 className="title">Memory-Game</h1>
    <div className="flex flex-wrap h-90 justify-center items-center">
      {cardsComplete.map((card) => (
        <CardCreater
          key={card.id}
          card={card}
          back={cardBack}
          setCardsComplete={setCardsComplete}
          cardsComplete={cardsComplete}
        />
      ))}
    </div>
    </>
  );
};

export default GameStart;
