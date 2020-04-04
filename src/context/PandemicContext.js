import React, { createContext, useReducer, useContext } from "react";
import {
  INITIAL_STATE,
  MEDIUM_DIFFICULTY,
  HARD_DIFFICULTY,
  CLICKER_EFFECTS_ARRAY,
  CLICKER_COSTS_ARRAY,
  PHARMACY_EFFECTS_ARRAY,
  PHARMACY_COSTS_ARRAY,
  LABORATORY_EFFECTS_ARRAY,
  LABORATORY_COSTS_ARRAY,
  HOSPITAL_COSTS_ARRAY,
  DRIVE_THRU_COSTS_ARRAY
} from "./constants";

let tickCount = 0;

const PandemicContext = createContext(INITIAL_STATE);
const { Provider } = PandemicContext;

const reducer = (state, action) => {
  switch (action.type) {
  case "SET_EASY_DIFFICULTY":
    return INITIAL_STATE
  case "SET_MEDIUM_DIFFICULTY":
    return MEDIUM_DIFFICULTY;
  case "SET_HARD_DIFFICULTY":
    return HARD_DIFFICULTY;

  // When called, increase the status.infected by rates.spreadRate
  case "TICK":
    tickCount++;
    // Pharmacy will "action" every 5 ticks
    if(!(tickCount%5)) {
      return {
        ...state,
        status: {
          infected: parseInt(state.status.infected * state.rates.spreadRate) - state.pharmacy.effect,
          death: state.status.death,        
          fund: state.status.fund + (state.pharmacy.effect * state.pharmacy.profit)
        }
      }
    }
    else {
      return {
        ...state,
        status: {
          infected: parseInt(state.status.infected * state.rates.spreadRate),
          death: state.status.death,        
          fund: state.status.fund
        }
      }
    };

  // Each "click" reduces status.infected by clicker.effect
  //  & adds to status.fund by (clicker.effect * clicker.profit)
  case "CLICK": 
    return {
      ...state,
      status: {
        infected: state.status.infected - state.clicker.effect,
        death: state.status.death,
        fund: state.status.fund + (state.clicker.effect * state.clicker.profit)
      }
    };
  // When clicker levels, it should increment clicker level,
  //  & update the clicker.effect accordingly
  case "CLICKER_LEVEL_UP":
    // Since array starts at index 0, we can get the next clicker effect,
    // by simply passing current clicker level

    //
    // if( leve is max ) - ADD LATER
    //

    let newClickerEffect = CLICKER_EFFECTS_ARRAY[state.clicker.level];

    return {
      ...state,
      clicker: {
        level: state.clicker.level + 1,
        effect: newClickerEffect,
        profit: state.clicker.profit
      }
    };

  case "PHARMACY_ACTION":
    return {
      ...state,
      status: {
        infected: state.status.infected - state.pharmacy.effect,
        death: state.status.death,
        fund: state.status.fund + (state.pharmacy.effect * state.pharmacy.profit)
      }
    };

  case "PHARMACY_LEVEL_UP":
    let newPharmacyEffect = 10;

    return {
      ...state,
      pharmacy: {
        level: state.pharmacy.level + 1,
        effect: newPharmacyEffect,
        profit: state.pharmacy.profit
      }
    };

  default:
    throw new Error(`Invalid action type: ${action.type}`);
  }
};

const PandemicProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return <Provider value={[state, dispatch]}>
    {props.children}
    </Provider>;
};

const usePandemicContext = () => {
  return useContext(PandemicContext);
};

export { PandemicProvider, usePandemicContext };
