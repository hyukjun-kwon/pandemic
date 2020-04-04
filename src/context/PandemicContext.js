import React, { createContext, useReducer, useContext } from "react";

const INITIAL_STATE = {
  difficulty: "easy",
  status: {
    infected: 5000,
    death: 0,
    fund: 2500
  },
  // spreadRate is how fast infection grows per "tick"
  // deathRate is what fraction of infected people die per "tick"
  rates: {
    spreadRate: 1.05,
    deathRate: 0
  },
  // effect is number of cures per click
  // profit is how much "fund" it generates for each cure
  clicker: {
    level: 1,
    effect: 1,
    profit: 20
  }
}

const MEDIUM_DIFFICULTY = {
  difficulty: "medium",
  status: {
    infected: 25000,
    death: 0,
    fund: 2500
  },
  rates: {
    spreadRate: 1.05,
    deathRate: 0
  },
  clicker: {
    level: 1,
    effect: 1,
    profit: 20
  }
};

const HARD_DIFFICULTY = {
  difficulty: "hard",
  status: {
    infected: 50000,
    death: 0,
    fund: 0
  },
  rates: {
    spreadRate: 1.05,
    deathRate: 0
  },
  clicker: {
    level: 1,
    effect: 1,
    profit: 20
  }
};

// Array of clicker effects
// CLICKER_EFFECTS_ARRAY[ clicker level - 1 ] = clicker effect
//  ex) for level 5 clicker, CLICKER_EFFECTS_ARRAY[ 5 - 1 ] = 10 is the
//      number of cures per click.
const CLICKER_EFFECTS_ARRAY = [
  1, 2, 3, 4, 10,                         // 1~5 levels
  12, 14, 16, 18, 40,                     // 6~10 levels
  45, 50, 55, 60, 100,                    // 11~15 levels
  110, 120, 130, 140, 250,                // 16~20 levels
  250, 300, 350, 400, 1000,               // 21~25 levels
  1100, 1200, 1300, 1400, 3000,           // 26~30 levels
  3300, 3600, 3900, 4200, 10000,          // 31-35 levels
  11000, 12000, 13000, 14000, 50000,      // 36~40 levles
  54000, 58000, 62000, 66000, 100000,     // 41~45 levels
  110000, 120000, 130000, 140000, 300000, // 46~50 levles
  330000, 360000, 390000, 420000, 800000 // 51~55(max) levels
];

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
  case "SPREAD":
    return {
      ...state,
      status: {
        infected: parseInt(state.status.infected * state.rates.spreadRate),
        death: state.status.death,        
        fund: state.status.fund
      }
    }
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
    }
  // When clicker levels, it should increment clicker level,
  //  & update the clicker.effect accordingly
  case "CLICKER_LEVEL_UP":
    // Since array starts at index 0, we can get the next clicker effect,
    // by simply passing current clicker level
    let newClickerEffect = CLICKER_EFFECTS_ARRAY[state.clicker.level];

    return {
      ...state,
      clicker: {
        level: state.clicker.level + 1,
        effect: newClickerEffect,
        profit: state.clicker.profit
      }
    }

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
