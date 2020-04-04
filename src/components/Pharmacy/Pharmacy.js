import React from "react";
import { usePandemicContext } from "../../context/PandemicContext";

function Pharmacy() {
  const [state, dispatch] = usePandemicContext();

  return (
      <div className="row">
        <div className="col-sm-4">
          <button
            className="btn btn-success mt-5 mb-5"
            onClick={() => dispatch({ type: "PHARMACY_LEVEL_UP" })}
          >
            Pharmacy Upgrade
          </button>
        </div>
        <div className="col-sm-8">
          <p>Pharmacy Level: {state.pharmacy.level}</p>
          <p>Cures {state.pharmacy.effect} per 15 seconds</p>
          <p>Receive ${state.pharmacy.profit} per cure</p>
        </div>
      </div>
  );
}

export default Pharmacy;
