import { useEffect, useState } from "react";
import "./Welcome.css";
import createDeck from "./functions/createDeck";
import PreviewCard from "./PreviewCard";

const Welcome = ({ setIsStarted, setCardsComplete, setCardBack }) => {
  const [url, setUrl] = useState([]);
  const [amountCards, setAmountCards] = useState(5);
  const [start, setStart] = useState(false);
  

  const options = [
   
    {
      name: "Cats",
      value: "https://api.thecatapi.com/v1/images/search?limit=10",
      logo: "./Logo_cat.png"
    },
    {
      name: "Dogs",
      value: "https://api.thedogapi.com/v1/images/search?limit=10",
      logo: "./Logo_dog.png"
    },
    {
      name: "Harry Potter",
      value: "https://hp-api.onrender.com/api/characters",
      logo: "./Logo_hp.png"
    },
    {
      name: "Dragon Ball",
      value: "https://dragonball-api.com/api/characters?limit=10",
      logo: "./Logo_db.png"
    },
    {
      name: "Pokémon",
      value: "https://pokeapi.co/api/v2/pokemon?limit=10",
      logo: "./Logo_po.png" 
    }
  ];

  const [fetchPicUrl, setFetchPicUrl] = useState(options[0].value);

  useEffect(() => {
    async function fetchURL() {
      try {
        const response = await fetch(fetchPicUrl);
        const data = await response.json();
  
        let items = data;
  
        // Dragon Ball – prüfe auf "items"
        if (data.items) {
          items = data.items;
        }
  
        // Pokémon – prüfe auf "results"
        if (data.results && fetchPicUrl.includes("pokeapi.co")) {
          const promises = data.results.slice(0, amountCards).map(async (poke) => {
            const res = await fetch(poke.url);
            const pokeData = await res.json();
            
            return (
              pokeData.sprites.other["official-artwork"].front_default ||
              pokeData.sprites.front_default
            );
          });
  
          const newUrls = await Promise.all(promises);
          setUrl(newUrls);
          return; 
        }
  
        // Alle anderen APIs
        const newUrls = items
          .slice(0, amountCards)
          .map((item) => item.image ? item.image : item.url);
  
        setUrl(newUrls);
      } catch (error) {
        console.log(error);
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
    setStart(true);
  };
  const handleChange = (e) => {
    setAmountCards(e.target.value);
  };

  return (
    <div className="welcome_container">
      <h1>
        Welcome to the <br /> Memory-Game
      </h1>
      <div className="welcome_content">
        <p className="welcome_text">
        Test your memory skills by finding all the matching card pairs!
Flip two cards at a time – can you remember where they were? Beat the clock and complete the game as fast as you can. Good luck and have fun!
<br/><br/>
You can play with one of three themed decks: Harry Potter, Cats, or Dogs – each featuring its own unique card illustrations to challenge your memory!
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
<div className="flex flex-row h-90 justify-center items-center">
        {options.map((option, index) => ( 
          <PreviewCard key={index} option={option} fetchPicUrl={fetchPicUrl} setFetchPicUrl={setFetchPicUrl}/>
        ) )}
</div>
          {/* <label htmlFor="urlOption"></label>
          <select
            id="urlOption"
            onChange={(e) => setFetchPicUrl(e.target.value)}
          >
            
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select> */}
        </div>
        <button className="start_button" onClick={handleStart}>
          Start Game
        </button>

        {/* <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
Start game
</span>
</button> */}
      </div>
    </div>
  );
};

export default Welcome;
