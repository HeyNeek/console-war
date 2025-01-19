import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useUIStateStore } from "../../stores/useUIStateStore";

import "./Game.css";

function Game() {
  const { inGame, setInGame } = useUIStateStore();

  const [hideStartText, setHideStartText] = useState(false);
  const [consoles, setConsoles] = useState([]);
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(1);
  position1;
  const rankings = new Map();

  const supabaseInfo = {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_KEY,
  };

  const supabase = createClient(supabaseInfo.url, supabaseInfo.key);

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

  const updateRankings = (e) => {
    const imgObjectString = e.target.getAttribute("data-img-object");
    const imgObject = JSON.parse(imgObjectString); // Deserialize the JSON string back to an object

    if (!rankings.has(imgObject.img_name)) {
      rankings.set(imgObject.img_name, 1);
    } else {
      rankings.set(imgObject.img_name, rankings.get(imgObject.img_name) + 1);
    }

    console.log(imgObject);
    console.log(rankings);
  };

  const updatePositionOfIndices = (winningIndex) => {
    console.log("consoleslength: ", consoles.length);
    console.log("consoles: ", consoles);
    console.log(winningIndex);

    if (winningIndex === position1) {
      if (position1 + 1 > consoles.length - 1 - 1) {
        console.log("game over");
        return;
      }

      if (position2 + 1 > consoles.length - 1 - 1) {
        console.log("game over");
        return;
      }

      if (position2 > position1) {
        setPosition2(position2 + 1);
        console.log("position1: ", position1);
        console.log("position2: ", position2);
        return;
      }

      if (position2 < position1) {
        setPosition2(position1 + 1);
        console.log("position1: ", position1);
        console.log("position2: ", position2);
        return;
      }
    } else {
      if (position1 + 1 > consoles.length - 1) {
        console.log("game over");
        return;
      }

      if (position2 + 1 > consoles.length - 1) {
        console.log("game over");
        return;
      }

      if (position1 > position2) {
        setPosition1(position1 + 1);
        console.log("position1: ", position1);
        console.log("position2: ", position2);
        return;
      }

      if (position1 < position2) {
        setPosition1(position2 + 1);
        console.log("position1: ", position1);
        console.log("position2: ", position2);
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
                updateRankings(e);
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
                updateRankings(e);
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

  useEffect(async () => {
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

  return <>{renderGame()}</>;
}

export default Game;
