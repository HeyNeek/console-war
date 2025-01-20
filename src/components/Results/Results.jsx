import { useUIStateStore } from "../../stores/useUIStateStore";
import { useNavigate } from "react-router";

import "./Results.css";

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

    //WIP
    const determineClassName = () => {
      if (rank2Console && rank3Console) {
        return "honorable-mentions";
      }

      return "";
    };

    return (
      <>
        <div>
          <h2 className="favorite-console">1: {rank1Console}</h2>
        </div>
        <div className={determineClassName()}>
          {rank2Console ? <h2>2: {rank2Console}</h2> : null}
          {rank3Console ? <h2>3: {rank3Console}</h2> : null}
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
