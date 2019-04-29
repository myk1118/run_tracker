import React, {Component} from 'react';
import axios from 'axios';

class PersonalBests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longestRun: null,
      fastestPace: null,
      lastRunDate: null,
      averagePace: null
    }
  }

  componentDidMount() {
    this.getPersonalBests();
  }

  async getPersonalBests() {
    const bests = await axios.get('/api/personalbestquery.php');
    const {longestRun, fastestpace, lastRunDate, averagePace} = bests.data;
    console.log('bests: ',bests);
    this.setState({
      longestRun: longestRun,
      fastestPace: fastestpace,
      lastRunDate: lastRunDate,
      averagePace
    })
  }


  render() {
    const {longestRun, fastestPace, lastRunDate, averagePace} = this.state;
    return (
      <div className="personal-bests">
      {/* <div className="personal-bests">
        <p><b>Fastest Pace: </b> <u>{fastestPace}</u></p>
        <p><b>Longest Run: </b><u>{longestRun} miles</u></p>
        <p><b>Last Run: </b><u>{lastRunDate}</u></p>
      </div> */}
        <div className="row">
          <div className="col-6">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Longest Run:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{longestRun} <span>miles</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Average Pace:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{averagePace}<span> minutes per mile</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Last Run:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{lastRunDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Calories Burned:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>???<span> calories</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default PersonalBests;
