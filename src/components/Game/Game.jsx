import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useUIStateStore } from "../../stores/useUIStateStore";

import "./Game.css";

function Game() {
  const { inGame, setInGame } = useUIStateStore();
  const [hideStartText, setHideStartText] = useState(false);
  const [images, setImages] = useState([]);

  const supabaseInfo = {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_KEY,
  };

  const supabase = createClient(supabaseInfo.url, supabaseInfo.key);

  const renderGame = () => {
    if (hideStartText) {
      return (
        <div className="console-container">
          <div id="console1">
            <img className="console-images" src={images[0].img_url} />
            <p className="console-image-subtitles">{images[0].img_name}</p>
          </div>
          <div className="VS-text">
            <h1>VS.</h1>
          </div>
          <div id="console2">
            <img className="console-images" src={images[1].img_url} />
            <p className="console-image-subtitles">{images[1].img_name}</p>
          </div>
        </div>
      );
    } else {
      return <h1>START!!!</h1>;
    }
  };

  //temp solution to get the stupid ass images, upload images of consoles to bucket
  //then paste the urls in the table under new column called url
  //that way we do NOT have to rely on someone else's url to render the images and it's still in our own DB storage
  useEffect(() => {
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

      console.log(data);
      setImages(data);
    };

    fetchNames();
  }, []);

  return <>{renderGame()}</>;
}

export default Game;
