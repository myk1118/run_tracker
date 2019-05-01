import React, { Component } from 'react';
import Chart from './chart';
import RunHeader from '../nav_folder/run_nav';
import './total_stats.scss';
import PersonalBests from './personal_bests';
import axios from 'axios';
import EventDate from './event_date';

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
          labels: [...dates],
          datasets: [
            {
              label: 'miles',
              fill: true,
              data: [...distances],
              borderColor: 'blue',
            }
          ]
        },
      })
    })
  }

  openModal=()=>{
    console.log('clicked Modal');
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
          <EventDate/>
        </div>
        <PersonalBests />
      </div>
    )
  }
}

export default TotalStats;
