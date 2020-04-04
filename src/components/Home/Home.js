import React from "react";
import { Link } from "react-router-dom";
import { usePandemicContext } from "../../context/PandemicContext";

function Home() {
  const [state, dispatch] = usePandemicContext();

  return (
    <div className="container">
      <button
        className="btn btn-success mt-5 mb-5"
        onClick={() => dispatch({ type: "SET_EASY_DIFFICULTY" })}
      >
        EASY
      </button>
      <button
        className="btn btn-success mt-5 mb-5"
        onClick={() => dispatch({ type: "SET_MEDIUM_DIFFICULTY" })}
      >
        MEDIUM
      </button>
      <button
        className="btn btn-success mt-5 mb-5"
        onClick={() => dispatch({ type: "SET_HARD_DIFFICULTY" })}
      >
        HARD
      </button>
      <div>Difficulty: {state.difficulty}</div>
      <div>Infected: {state.status.infected}</div>
      <div>Deaths: {state.status.death}</div>
      <div>Fund: {state.status.fund}</div>
      <div>Spread Rate: {state.rates.spreadRate}</div>

      <Link to="/game">
        <button className="btn btn-success mt-5 mb-5">PLAY</button>
      </Link>
    </div>
  );
}

export default Home;
