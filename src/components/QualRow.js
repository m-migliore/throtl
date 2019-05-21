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
    const row = this.props.rowData.split(' ')

    return (
      <div>
        <span>{row[0]}</span>
        <span>{row[1]}</span>
        <span>{`${row[2]} ${row[3]}`}</span>
        <span>{row[4]}</span>
        <span>{row[5]}</span>
        <span>{row[6]}</span>
        <span>{row[7]}</span>
        <span>{row[8]}</span>
      </div>
    );
  }

}

export default QualRow;
