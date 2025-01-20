import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useUIStateStore } from "../../stores/useUIStateStore";
import { useNavigate } from "react-router";

import "./Game.css";

function Game() {
  const { gameOver, setGameOver, setInGame, updateRankings, clearRankings } =
    useUIStateStore();
  const navigate = useNavigate();

  const [hideStartText, setHideStartText] = useState(false);
  const [consoles, setConsoles] = useState([]);
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(1);

  const supabaseInfo = {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_KEY,
  };

  const supabase = createClient(supabaseInfo.url, supabaseInfo.key);

  const exitGame = () => {
    setGameOver(false);
    setInGame(false);
    clearRankings();
    navigate("/");
  };

  const returnShuffledImgObjects = (arr) => {
    // Create a copy of the original array to avoid modifying the original array
    const shuffledArray = arr.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  };

  //I think instead of using a local Map to store the rankings it should be a store variable
  //because everytime the component rerenders it clears the Map values
  const updateRankingsStoreCallback = (e) => {
    if (!gameOver) {
      const imgObjectString = e.target.getAttribute("data-img-object");
      const imgObject = JSON.parse(imgObjectString); // Deserialize the JSON string back to an object

      updateRankings(imgObject);

      console.log(imgObject);
    }
  };

  const updatePositionOfIndices = (winningIndex) => {
    if (winningIndex === position1) {
      if (position1 + 1 > consoles.length - 1) {
        console.log("game over");
        setGameOver(true);
        return;
      }

      if (position2 + 1 > consoles.length - 1) {
        console.log("game over");
        setGameOver(true);
        return;
      }

      if (position2 > position1) {
        setPosition2(position2 + 1);
        return;
      }

      if (position2 < position1) {
        setPosition2(position1 + 1);
        return;
      }
    } else {
      if (position1 + 1 > consoles.length - 1) {
        console.log("game over");
        setGameOver(true);
        return;
      }

      if (position2 + 1 > consoles.length - 1) {
        console.log("game over");
        setGameOver(true);
        return;
      }

      if (position1 > position2) {
        setPosition1(position1 + 1);
        return;
      }

      if (position1 < position2) {
        setPosition1(position2 + 1);
        return;
      }
    }
  };

  const renderGame = () => {
    if (hideStartText) {
      return (
        <div className="console-container">
          <div id="console1">
            <img
              onClick={(e) => {
                updateRankingsStoreCallback(e);
                updatePositionOfIndices(position1);
              }}
              data-img-object={JSON.stringify(consoles[position1])}
              className="console-images"
              src={consoles[position1].img_url}
            />
            <p className="console-image-subtitles">
              {consoles[position1].img_name}
            </p>
          </div>
          <div className="VS-text">
            <h1>VS.</h1>
          </div>
          <div id="console2">
            <img
              onClick={(e) => {
                updateRankingsStoreCallback(e);
                updatePositionOfIndices(position2);
              }}
              data-img-object={JSON.stringify(consoles[position2])}
              className="console-images"
              src={consoles[position2].img_url}
            />
            <p className="console-image-subtitles">
              {consoles[position2].img_name}
            </p>
          </div>
        </div>
      );
    } else {
      return <h1>START!!!</h1>;
    }
  };

  useEffect(() => {
    console.log("this fires off everytime an option is made");
    setInGame(true);

    setTimeout(() => {
      setHideStartText(true);
    }, 1000);

    const fetchNames = async () => {
      const { data, error } = await supabase.from("consoles").select("*");

      if (error) {
        console.error("Error fetching names: ", error);
        return;
      }

      setConsoles(returnShuffledImgObjects(data));
    };

    fetchNames();
  }, []);

  return (
    <>
      {renderGame()}
      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <button onClick={exitGame}>Show Results!</button>
        </div>
      )}
    </>
  );
}

export default Game;
