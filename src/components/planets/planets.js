import React, {Component} from 'react';
import SwService from '../../services/sw-service';
import './planets.css';

export default class Planets extends Component {

    swService = new SwService();

    state = {
        planetId: 1,
        planet: null
    };
    
    componentDidMount() {
        this.createPlanet();
    }

    componentDidUpdate(prevProps) {
        if (this.props.planetId !== prevProps.planetId) {
            this.updateplanet();
        }
    }

    createPlanet = () => {
        const { planetId } = this.props;
        if (!planetId) {
            return;
        }

        this.swService
            .getPlanet(planetId)
            .then((planet) => {
                this.setState({ 
                    planet
                });
        });
    }

    updatePlanet = () => {

      const newPlanetId = this.state.planetId + 1;
      if (!newPlanetId) {
          return;
      }

      this.swService
          .getPlanet(newPlanetId)
          .then((planet) => {
              this.setState({ 
                  planetId: newPlanetId,
                  planet
              });
      });
  }
    
    render() {

        if (!this.state.planet) {
          return(<div></div>);
        }
    
        const { id, name, population,
            rotationPeriod, diameter } = this.state.planet;
    
        return (
          <div className="planet-details card">
            <img className="planet-image"
              src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
              alt="planet"/>
    
            <div className="card-body">
              <h3>{name}</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span>{population}</span>
                </li>
                <li className="list-group-item">
                  <span>{rotationPeriod}</span>
                </li>
                <li className="list-group-item">
                  <span>{diameter}</span>
                </li>
              </ul>
              <button onClick={this.updatePlanet} type="button" className="btn btn-info">Next</button>
            </div>
          </div>
          
        )
      }
    }