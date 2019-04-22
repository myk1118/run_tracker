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
          <div className="col-6  text-center">
              <PieChart options={this.state.options} chartData={this.state.chartData}/>
          </div>
        </div>
        <PersonalBests />
      </div>
    )
  }
}

export default TotalStats;
