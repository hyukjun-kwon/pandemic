import React, { useEffect } from "react";
import { usePandemicContext } from "../../context/PandemicContext";

function Game() {
  const [state, dispatch] = usePandemicContext();

  if(state.status.infected === 0) {
    dispatch({ type: "WIN" });
  }

  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: "SPREAD" }), 3000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="container">
      <div>Infected: {state.status.infected}</div>
      <div>Deaths: {state.status.death}</div>
      <div>Fund: {state.status.fund}</div>


      <button
        className="btn btn-success mt-5 mb-5"
        onClick={() => dispatch({ type: "CLICK" })}
      >
        CLICK
      </button>
      <div>Clicker Level: {state.clicker.level}</div>
      <div># of Cure per click: {state.clicker.effect}</div>
      <div>Fund per cure: {state.clicker.profit}</div>

      <button
        className="btn btn-success mt-5 mb-5"
        onClick={() => dispatch({ type: "CLICKER_LEVEL_UP" })}
      >
        Clicker Upgrade
      </button>
    </div>
  );
}

export default Game;
