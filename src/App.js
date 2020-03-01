import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Navigation from './components/Navigation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Customerlist} />
            <Route path="/trainings" component={Traininglist} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>

      <Customerlist />
    </div>
  );
}

export default App;
