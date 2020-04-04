import React from "react";
import Pharmacy from "../Pharmacy/Pharmacy";
import Laboratory from "../Laboratory/Laboratory";

function Upgrade() {
  return (
    <div className="upgradeContainer">
      <Pharmacy />
      <Laboratory />
      {/* <Hospital /> */}
      {/* <Drivethru /> */}
    </div>
  );
}

export default Upgrade;
