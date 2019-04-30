import React, { Component } from 'react';
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
      chartData: {},
      totalRunCount: 0,
      monthlyRunCount: 0,
      weeklyRunCount: 0
    }
  }

  componentDidMount() {
    this.getChartData();
    this.getRunCount();
  }

  getRunCount(){
    axios.get('/api/run-count.php').then(resp => {
      console.log('run count resp', resp);
      const {totalCount, monthCount, weekCount} = resp.data;
      this.setState ({
        totalRunCount: totalCount,
        monthlyRunCount: monthCount,
        weeklyRunCount: weekCount
      })
    })
  }

  getChartData() {
    axios.get('/api/get_table_data.php').then(resp => {
      const { tableItems } = resp.data;
      const dates = tableItems.reverse().map(item => item.date);
      const distances = tableItems.map(item => item.distance);

      this.setState({
        chartData: {
          labels: [0,...dates],
          datasets: [
            {
              label: 'miles',
              fill: true,
              data: [0,...distances],
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
        <Chart options={this.state.options} chartData={this.state.chartData} />
        <div className="d-flex chart-container">
          <div className="col-6  text-center">
          <div className="runCount">
          <div>Total Runs: {this.state.totalRunCount}</div>
          <div>Last 30 Days: {this.state.monthlyRunCount}</div>
          <div>Last Week: {this.state.weeklyRunCount}</div></div>

            {/* <PieChart options={this.state.options} chartData={this.state.chartData} /> */}
          </div>
          <div className="offset-2 col-4">
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
