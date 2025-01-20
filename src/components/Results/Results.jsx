import { useUIStateStore } from "../../stores/useUIStateStore";
import { useNavigate } from "react-router";

function Results() {
  const { rankings, clearRankings, setDisableNavBar } = useUIStateStore();
  const navigate = useNavigate();

  let rank1Console;
  let rank2Console;
  let rank3Console;

  const returnHome = () => {
    setDisableNavBar(false);
    clearRankings();
    navigate("/");
  };

  const renderRankings = () => {
    console.log(rankings);
    let currentHighestValue = 0;
    for (const [key, value] of rankings) {
      if (value > currentHighestValue) {
        currentHighestValue = value;
        rank1Console = key;
      }
    }

    currentHighestValue = 0;

    for (const [key, value] of rankings) {
      if (value > currentHighestValue && key !== rank1Console) {
        currentHighestValue = value;
        rank2Console = key;
      }
    }

    currentHighestValue = 0;

    for (const [key, value] of rankings) {
      if (
        value > currentHighestValue &&
        key !== rank2Console &&
        key !== rank1Console
      ) {
        currentHighestValue = value;
        rank3Console = key;
      }
    }

    console.log(rank1Console);
    console.log(rank2Console);
    console.log(rank3Console);

    return (
      <>
        <div>
          <h2>1: {rank1Console}</h2>
        </div>
        <div>
          <h2>2: {rank2Console}</h2>
          <h2>3: {rank3Console}</h2>
        </div>
      </>
    );
  };

  return (
    <>
      <h1>Results</h1>
      {renderRankings()}
      <button onClick={returnHome}>Return to Home</button>
    </>
  );
}

export default Results;
