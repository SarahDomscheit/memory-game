export default function createDeck(url) {
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
