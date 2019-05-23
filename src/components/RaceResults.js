import React, {Component} from 'react';

class RaceResults extends Component {
  componentDidMount() {
    console.log(this.props.results);
  }

  render() {
    const results = this.props.results

    return (<div>
      <ul>
        {results.map(result => <li key={result.number}>{result.number}</li>)}
      </ul>

      <table>
        <tbody>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Contructor</th>
            <th>Points</th>
          </tr>
        </tbody>
      </table>
    </div>);
  }

}

export default RaceResults;
