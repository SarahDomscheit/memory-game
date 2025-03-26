import CardCreater from "./CardCreater/CardCreater";

const GameStart = ({
  cardsComplete,
  cardBack,
  setIsFinished,
  setCardsComplete,
}) => {
  return (
    <div className="flex justify-center items-center">
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
  );
};

export default GameStart;
