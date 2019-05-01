import React, {Component} from 'react';
import axios from 'axios';

class PersonalBests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longestRun: null,
      lastRunDate: null,
      averagePace: null,
      mostCalories: null,
    }
  }

  componentDidMount() {
    this.getPersonalBests();
  }

  async getPersonalBests() {
    const bests = await axios.get('/api/personalbestquery.php');
    console.log('bests: ', bests)
    const {longestRun, lastRunDate, averagePace, mostCalories} = bests.data;
    console.log('bests: ',bests);
    this.setState({
      longestRun: longestRun,
      lastRunDate: lastRunDate,
      mostCalories: mostCalories,
      averagePace,
    })
  }


  render() {
    const {longestRun, lastRunDate, averagePace, mostCalories} = this.state;
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
                  <td className="best">{longestRun} <span>miles</span></td>
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
                  <td className="best">{averagePace}<span> min per mile</span></td>
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
                  <td className="best">{lastRunDate}</td>
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
                  <td className="best">{mostCalories}<span> calories</span></td>
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
