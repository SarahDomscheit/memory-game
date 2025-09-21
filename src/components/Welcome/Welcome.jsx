import { useEffect, useState } from "react";
import "./Welcome.css";
import createDeck from "../functions/createDeck";
import PreviewCard from "../PreviewCard/PreviewCard";
import { Spinner } from "react-spinner-toolkit";

// more spinners https://react-spinner-toolkit.vercel.app/

const Welcome = ({ setIsStarted, setCardsComplete, setCardBack, timeSet }) => {
  const [url, setUrl] = useState([]);
  const [amountCards, setAmountCards] = useState(5);
  const [start, setStart] = useState(false);
  const offset = Math.floor(Math.random() * 1290);
  const [loading, setLoading] = useState(false);

  const options = [
    {
      name: "Cats",
      value: "https://api.thecatapi.com/v1/images/search?limit=10",
      logo: "./Logo_cat.png",
    },
    {
      name: "Dogs",
      value: "https://api.thedogapi.com/v1/images/search?limit=10",
      logo: "./Logo_dog.png",
    },
    {
      name: "Harry Potter",
      value: "https://hp-api.onrender.com/api/characters",
      logo: "./Logo_hp.png",
    },
    {
      name: "Dragon Ball",
      value: `https://dragonball-api.com/api/characters?limit=10`,
      logo: "./Logo_db.png",
    },
    {
      name: "Pokémon",
      value: `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,
      logo: "./Logo_po.png",
    },
    {
      name: "German Museum of the Cat",
      value: "tumblr",
      logo: "./Logo_tumblr.png",
    },
  ];

  const [fetchPicUrl, setFetchPicUrl] = useState(options[0].value);

  useEffect(() => {
    async function fetchURL() {
      try {
        setLoading(true);
        if (fetchPicUrl === "tumblr") {
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
            "https://deutsches-museum-des-katers.tumblr.com/"
          )}`;
          const response = await fetch(proxyUrl);
          const data = await response.json();

          const parser = new DOMParser();
          const doc = parser.parseFromString(data.contents, "text/html");

          const imgElements = Array.from(doc.querySelectorAll("img"));
          const imgSrcs = imgElements
            .map((img) => img.src)
            .filter((src) => src && src.startsWith("http"))
            .slice(0, amountCards);

          setUrl(imgSrcs);
          setLoading(false);
          return;
        }

        // Standard-Fetch für APIs

        const response = await fetch(fetchPicUrl);
        const data = await response.json();

        let items = data;

        // Dragon Ball – prüfe auf "items"
        if (data.items) {
          items = data.items;
        }

        // Pokémon – prüfe auf "results"
        if (data.results && fetchPicUrl.includes("pokeapi.co")) {
          const promises = data.results
            .slice(0, amountCards)
            .map(async (poke) => {
              const res = await fetch(poke.url);
              const pokeData = await res.json();

              return (
                pokeData.sprites.other["official-artwork"].front_default ||
                pokeData.sprites.front_default
              );
            });

          const newUrls = await Promise.all(promises);
          setUrl(newUrls);
          setLoading(false);
          return;
        }

        // Alle anderen APIs
        const newUrls = items
          .slice(0, amountCards)
          .map((item) => (item.image ? item.image : item.url));

        setUrl(newUrls);
        setLoading(false);
      } catch (error) {
        console.log("Fehler beim Laden:", error);
        setLoading(false);
      }
    }

    if (start) {
      fetchURL();
    }
  }, [start]);

  useEffect(() => {
    if (url.length > 0) {
      const deck = createDeck(url);
      setCardsComplete(deck);
      //option to set card back
      setCardBack("blue");
      setIsStarted(true);
    }
  }, [url]);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setStart(true);
    }, 1000);
  };

  const handleChange = (e) => {
    setAmountCards(e.target.value);
  };

  useEffect(() => {
    timeSet.current = amountCards * 18;
  }, [amountCards]);

  return (
    <div className="welcome_container">
      <h1>
        Welcome to the <br /> Memory-Game
      </h1>
      <div className="welcome_content">
        <p className="welcome_text">
          Test your memory skills by finding all the matching card pairs! Flip
          two cards at a time – can you remember where they were? Beat the clock
          and complete the game as fast as you can. Good luck and have fun!
          <br />
          <br />
          You can play with one of six themed decks:Cats, Dogs, Harry Potter,
          Dragon Ball, Pokemon or even some art from{" "}
          <a
            className="font-bold"
            href="https://deutsches-museum-des-katers.tumblr.com/"
          >
            German Museum of the Cat
          </a>
          ! – each featuring its own unique card illustrations to challenge your
          memory!
        </p>
        <div className="slidecontainer">
          <label htmlFor="myRange">Amount of cards : {amountCards * 2}</label>
          <input
            type="range"
            min="5"
            max="10"
            value={amountCards}
            className="slider"
            id="myRange"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row flex-wrap justify-center items-start gap-2 my-5">
          {options.map((option, index) => (
            <PreviewCard
              key={index}
              option={option}
              fetchPicUrl={fetchPicUrl}
              setFetchPicUrl={setFetchPicUrl}
            />
          ))}
        </div>
        <button className="start_button" onClick={handleStart}>
          Start Game
        </button>
        {loading && (
          <>
            <Spinner
              className="my-5"
              color="#8DA8E9"
              shape="fading"
              loading
              speed={1}
              size={50}
              transition={true}
            />

            <p className="loading">loading...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
