import React, {Component} from 'react';
import Header from '../header/header';
import People from '../people/people';
import Planets from '../planets/planets';
import Starships from '../starships/starships';
import SwService from '../../services/sw-service';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

export default class App extends Component {

  state = {
    selectedPerson: 1,
    selectedPlanet: 2,
    selectedStarship: 9
  };

  swService = new SwService();

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/">
              <People personId={this.state.selectedPerson}/>
            </Route>
            <Route path="/planets">
              <Planets planetId={this.state.selectedPlanet}/>
            </Route>
            <Route path="/starships">
              <Starships starshipId={this.state.selectedStarship}/>
            </Route>
          </Switch>
        </div>
      </Router>   
    );
  };
}