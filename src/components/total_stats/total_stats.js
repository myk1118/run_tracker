import React, {Component} from 'react';
import Chart from './chart';
import RunHeader from '../nav_folder/run_nav';
import './total_stats.scss';
import PersonalBests from './personal_bests';
import axios from 'axios';

class TotalStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {}
    }
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    //axios call goes here
    axios.get('/api/get_table_data.php').then(resp => {
      const {tableItems} = resp.data;
      const dates = tableItems.reverse().map(item => item.date);
      const distances = tableItems.map(item => item.distance);

      this.setState({
        chartData: {
          labels: [...dates],
          datasets: [
            {
              label: 'miles',
              fill: false,
              data: [...distances],
              borderColor: 'blue',
            }
          ]
        }
      })
    })
  }

  render() {

    return (

      <div className="total-stats">
        <RunHeader />
        <Chart chartData={this.state.chartData}/>
        <div className="d-flex chart-container">
          <div className="col-6 bg-primary text-center">
            <div className="bg-success h-75 mt-3"></div>
          </div>
          <div className="col-6 bg-primary text-center">
            <div className="bg-success h-75 mt-3"></div>
          </div>
        </div>
        <PersonalBests />
      </div>
    )
  }
}

export default TotalStats;
