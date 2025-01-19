import { useEffect, useState } from "react";

function Game() {
  const [hideStartText, setHideStartText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideStartText(true);
    }, 1500);
  });

  return <>{hideStartText ? <h1>Placeholder </h1> : <h1>GAME START!!!</h1>}</>;
}

export default Game;
