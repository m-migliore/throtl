import React, {Component} from 'react';
import ResultRow from './ResultRow'

class RaceResults extends Component {
  componentDidMount() {
    console.log(this.props.results);
  }

  render() {
    const results = this.props.results

    return (<div>
      <ul>
        {results.map(result => <ResultRow key={result.number} resultData={result} />)}
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
