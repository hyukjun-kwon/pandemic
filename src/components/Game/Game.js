import React, { useEffect } from "react";
import { usePandemicContext } from "../../context/PandemicContext";
import Upgrade from "../Upgrade/Upgrade";
import numAbb from "../../utils/numberAbbreviate";

function Game() {
  const [state, dispatch] = usePandemicContext();

  // To access the data on global store: state.pharmacy.profit
  // To fix: dispatch({ type: "PHARMACY_LEVEL_UP" })

  if(state.status.infected === 0) {
    dispatch({ type: "WIN" });
  };

  if(state.status.infected >= 1000000000) {
    dispatch({ type: "LOST" });
  };

  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: "TICK" }), 3000);
    return () => clearTimeout(timer); 
  });


  return (
    <div className="container">
      <div>Infected: {numAbb(state.status.infected)}</div>
      <div>Deaths: {numAbb(state.status.death)}</div>
      <div>Fund: {numAbb(state.status.fund)}</div>


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

      <Upgrade />
    </div>
  );
}

export default Game;
