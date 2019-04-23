import React, {Component} from 'react';
import Chart from './chart';
import RunHeader from '../nav_folder/run_nav';
import './total_stats.scss';
import PersonalBests from './personal_bests';
import axios from 'axios';
import PieChart from './piechart';

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
        },
      })
    })
  }

  render() {
    return (
      <div className="total-stats">
        <RunHeader />
        <Chart options={this.state.options} chartData={this.state.chartData}/>
        <div className="d-flex chart-container">
          <div className="col-6  text-center">
              <PieChart options={this.state.options} chartData={this.state.chartData}/>
          </div>
          <div className="col-4">
          <div className="col-sm-3 col-md-2">
            <div className="eventProgress" data-percentage="90">
              <span className="eventProgress-left">
                <span className="eventProgress-bar"></span>
              </span>
              <span className="eventProgress-right">
                <span className="eventProgress-bar"></span>
              </span>
            <div className="eventProgress-value">
            Event Date
              {/* <span>completed</span> */}
            </div>
            </div>
            </div>
          </div>
        </div>
        <PersonalBests />
      </div>
    )
  }
}

export default TotalStats;
