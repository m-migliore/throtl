import React, { Component } from 'react';
import { DRIVERS, CONSTRUCTORS } from '../constants/constants'

class QualRow extends Component {

  componentDidMount() {
    console.log(DRIVERS);
    console.log(CONSTRUCTORS);
    const regex = /\b(Lewis Hamilton|Valtteri Bottas|Sebastian Vettel|Max Verstappen|Romain Grosjean|Charles Leclerc|Kevin Magnussen|Lando Norris|Kimi Räikkönen|Sergio Perez|Nico Hulkenberg|Daniel Ricciardo|Alexander Albon|Antonio Giovinazzi|Daniil Kvyat|Lance Stroll|Pierre Gasly|Carlos Sainz|George Russell|Robert Kubica)\b/
    console.log(this.props.rowData);
  }

  render() {
    return (
      <div>
        <p>{this.props.rowData}</p>
        <span>place</span>
        <span>number</span>
        <span>driver</span>
        <span>constructor</span>
        <span>q1</span>
        <span>q2</span>
        <span>q3</span>
        <span>laps</span>
      </div>
    );
  }

}

export default QualRow;
