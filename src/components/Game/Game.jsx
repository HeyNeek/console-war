import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

function Game() {
  const [hideStartText, setHideStartText] = useState(false);
  const [images, setImages] = useState([]);

  const supabaseInfo = {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_KEY,
  };

  const supabase = createClient(supabaseInfo.url, supabaseInfo.key);

  const renderGame = () => {
    if (hideStartText) {
      return <h1>Placeholder</h1>;
    } else {
      return <h1>START!!!</h1>;
    }
  };

  //temp solution to get the stupid ass images, upload images of consoles to bucket
  //then paste the urls in the table under new column called url
  //that way we do NOT have to rely on someone else's url to render the images and it's still in our own DB storage
  useEffect(() => {
    setTimeout(() => {
      setHideStartText(true);
    }, 1500);

    const fetchImages = async () => {
      const { data, error } = await supabase.storage
        .from("console_images")
        .list("", { limit: 100 });

      if (error) {
        console.error("Error fetching images", error);
        return;
      }

      console.log("data: ", data);

      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    };

    const fetchNames = async () => {
      const { data, error } = await supabase.from("consoles").select("*");

      if (error) {
        console.error("Error fetching names: ", error);
        return;
      }

      console.log(data);
    };

    fetchImages();
    fetchNames();
  }, []);

  return <>{renderGame()}</>;
}

export default Game;

// const imageUrls = data
//   .map((file) => {
//     const { publicURL, error: urlError } = supabase.storage
//       .from("console_images")
//       .getPublicUrl(file.name);

//     if (urlError) {
//       console.error("Error getting public URL:", urlError);
//       return null;
//     }

//     return publicURL;
//   })
//   .filter((url) => url !== null); // Filter out any null URLs

// console.log(imageUrls);
// setImages(imageUrls);
