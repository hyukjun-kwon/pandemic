import React from "react";
import { usePandemicContext } from "../../context/PandemicContext";

function Laboratory() {
  const [state, dispatch] = usePandemicContext();

  return (
      <div className="row">
        <div className="col-sm-4">
          <button
            className="btn btn-success mt-5 mb-5"
            onClick={() => dispatch({ type: "LABORATORY_LEVEL_UP" })}
          >
            Laboratory Upgrade
          </button>
        </div>
        <div className="col-sm-8">
          <p>Pharmacy Level: {state.laboratory.level}</p>
          <p>Cures {state.laboratory.effect} per 30 seconds</p>
          <p>Receive ${state.laboratory.profit} per cure</p>
        </div>
      </div>
  );
}

export default Laboratory;