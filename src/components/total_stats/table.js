import React, { Component } from 'react';
import RunHeader from '../nav_folder/run_nav';
import axios from 'axios';
import './total_stats.scss';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    }
  }

  componentDidMount() {
    this.getActivityLogData();
  }

  getActivityLogData() {
    axios.get('/api/get_table_data.php').then(resp => {
      const { tableItems } = resp.data;

      const stats = tableItems.map(item => {
        return (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.distance}</td>
            <td>{item.time}</td>
          </tr>
        )
      })
      this.setState({
        stats: [...stats]
      })
    })
  }

  render() {
    return (
      <div className="tableContainer">
        <RunHeader />
        <div className="float-right text-primary pt-3 pb-3">Total | Month | Week</div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Distance (mi)</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.stats}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Chart;
