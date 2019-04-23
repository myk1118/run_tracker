import React, {Component} from 'react';
import MapNav from '../nav_folder/map_nav';
import axios from 'axios';
import '../total_stats/total_stats.scss';

class RunStats extends Component {
  state = {
    mileStats: []
  }

  componentDidMount() {
    this.getMileData();
  }

  getMileData(){
    axios.get('/api/getpermile.php').then(resp =>{
      console.log('this is the resp:', resp);
      const {mileTime} = resp.data;
      const mileStats = mileTime.map(item => {
        return (
          <tr key={item.id}>
            <td>{item.mile}</td>
            <td>{item.time}</td>
          </tr>
        )
    })
    this.setState({
      mileStats: [...mileStats]
    })
  })
}

render(){
    return(
    <div className="tableContainer">
      <MapNav />
      <div className="float-right text-primary pt-3 pb-3">Total | Month | Week </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="w-25">Mile</th>
            <th className="w-25">Time</th>
            {/* <th className="w-25">Heart Rate</th>
            <th className="w-25">Calories Burned</th> */}
          </tr>
        </thead>
        <tbody>
          {this.state.mileStats}
        </tbody>
      </table>
    </div>
    )
  }
}

export default RunStats;

