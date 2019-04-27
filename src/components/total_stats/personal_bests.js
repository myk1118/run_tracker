import React, {Component} from 'react';
import axios from 'axios';

class PersonalBests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longestRun: null,
      fastestPace: null,
      lastRunDate: null,
    }
  }

  componentDidMount() {
    this.getPersonalBests();
  }

  async getPersonalBests() {
    const bests = await axios.get('/api/personalbestquery.php');
    const {longestRun, fastestpace, lastRunDate} = bests.data;
    console.log('bests: ',bests);
    this.setState({
      longestRun: longestRun,
      fastestPace: fastestpace,
      lastRunDate: lastRunDate,
    })
  }


  render() {
    const {longestRun, fastestPace, lastRunDate} = this.state;
    return (
      <div className="personal-bests">
        <p><b>Fastest Pace: </b> <u>{fastestPace}</u></p>
        <p><b>Longest Run: </b><u>{longestRun}</u></p>
        {/* <p>Most Calories Burned:</p> */}
        <p><b>Last Run: </b><u>{lastRunDate}</u></p>
      </div>
    )
  }
}

export default PersonalBests;
