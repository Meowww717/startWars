import React, {Component} from 'react';
import SwService from '../../services/sw-service';
import './people.css';

export default class People extends Component {

    swService = new SwService();

    state = {
        personId: 1,
        person: null
    };
    
    componentDidMount() {
        this.createPerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    createPerson = () => {
        const { personId } = this.props;
        if (!personId) {
            return;
        }

        this.swService
            .getPerson(personId)
            .then((person) => {
                this.setState({ 
                    person
                });
        });
    }

    updatePerson = () => {

      const newPersonId = this.state.personId + 1;
      if (!newPersonId) {
          return;
      }

      this.swService
          .getPerson(newPersonId)
          .then((person) => {
              this.setState({ 
                  personId: newPersonId,
                  person
              });
      });
  }
    
    render() {

        if (!this.state.person) {
          return(<div></div>);
        }
    
        const { id, name, gender,
                  birthYear, eyeColor } = this.state.person;
    
        return (
          <div className="person-details card">
            <img className="person-image"
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt="character"/>
    
            <div className="card-body">
              <h3>{name}</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span>{gender}</span>
                </li>
                <li className="list-group-item">
                  <span>{birthYear}</span>
                </li>
                <li className="list-group-item">
                  <span>{eyeColor}</span>
                </li>
              </ul>
              <button onClick={this.updatePerson} type="button" className="btn btn-info">Next</button>
            </div>
          </div>
          
        )
      }
    }