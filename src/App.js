import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Game from './components/Game/Game';

import { PandemicProvider } from "./context/PandemicContext";

function App() {
  return (
    <Router>
      <div className="App">
        <PandemicProvider>
          <Route exact path='/' component={Home} />
          <Route exact path='/game' component={Game} />
        </PandemicProvider>
      </div>
    </Router>
  );
}

export default App;
