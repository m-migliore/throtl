import React, { Component } from 'react';

class RaceResults extends Component {

  render() {
    const results = this.props.results

    return (
      <ul>
        {results.map(result => <li key={result.number}>{result.number}</li>)}
      </ul>
    );
  }

}


export default RaceResults;
