import "./Home.css";

import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to Console War!</h1>
      <div className="start-button">
        <button onClick={() => navigate("/game")}>Start!</button>
      </div>
      <p>
        This website is a fun game to determine your favorite console ever!
        Share your results with your friends!
      </p>
    </div>
  );
}

export default Home;
