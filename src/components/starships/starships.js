import React, {Component} from 'react';
import SwService from '../../services/sw-service';
import './starships.css';

export default class Starships extends Component {

    swService = new SwService();

    state = {
        starshipId: 1,
        starship: null
    };
    
    componentDidMount() {
        this.createStarship();
    }

    componentDidUpdate(prevProps) {
        if (this.props.starshipId !== prevProps.starshipId) {
            this.updateStarship();
        }
    }

    createStarship = () => {
        const { starshipId } = this.props;
        if (!starshipId) {
            return;
        }

        this.swService
            .getStarship(starshipId)
            .then((starship) => {
                this.setState({ 
                    starship
                });
        });
    }

    updateStarship = () => {

      const newStarshipId = this.state.starshipId + 1;
      if (!newStarshipId) {
          return;
      }

      this.swService
          .getStarship(newStarshipId)
          .then((starship) => {
              this.setState({ 
                  starshipId: newStarshipId,
                  starship
              });
      });
  }
    
    render() {

        if (!this.state.starship) {
          return(<div></div>);
        }
    
        const { id, name, model,
          crew, passengers } = this.state.starship;
    
        return (
          <div className="starship-details card">
            <img className="starship-image"
              src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
              alt="starship"/>
    
            <div className="card-body">
              <h3>{name}</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span>{model}</span>
                </li>
                <li className="list-group-item">
                  <span>{crew}</span>
                </li>
                <li className="list-group-item">
                  <span>{passengers}</span>
                </li>
              </ul>
              <button type="button" className="btn btn-secondary">Next</button>
            </div>
          </div>
          
        )
      }
    }