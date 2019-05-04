import React, { Component } from 'react';
import Chart from './chart';
import RunHeader from '../nav_folder/run_nav';
import './total_stats.scss';
import PersonalBests from './personal_bests';
import axios from 'axios';
import EventDate from './event_date';
import PieChart from './piechart';
import EventModal from './modal/modal';

class TotalStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      pieChartData: {},
      runCount: 0,
    }
  }

  componentDidMount() {
    this.getChartData();
  }


  getChartData() {
    axios.get('/api/get_table_data.php').then(resp => {
      const { tableItems } = resp.data;
      const dates = tableItems.reverse().map(item => item.date);
      const distances = tableItems.map(item => item.distance);
      const dataArray = [0,0,0,0,0];

      tableItems.forEach(run => {
        const {distance} = run
        if(distance > 8) {
          dataArray[4]++;
        } else if(distance > 6 ) {
          dataArray[3]++;
        } else if(distance > 4) {
          dataArray[2]++;
        } else if(distance > 2) {
          dataArray[1]++;
        } else {
          dataArray[0]++;
        }
      })

      this.setState({
        runCount: tableItems.length,
        pieChartData: {
             labels: ['Less than 2 mi', '2-4mi', '3-6mi', '6-8mi', '8 or more mi'],
          datasets: [
            {
              label: 'miles',
              fill: true,
              data: [...dataArray],
              borderColor: 'blue',
              backgroundColor: ['#e4cc31', '#8a1181', '#cce787', 'dodgerblue', '#36122e'],
            }
          ]
        },
        chartData: {
          labels: [...dates],
          datasets: [
            {
              label: 'miles',
              data: [...distances],
              borderColor: 'blue',
            }
          ]
        },
      })
    })
  }


  render() {
    const {totalRunCount, monthlyRunCount, weeklyRunCount, chartData, options, pieChartData, runCount} = this.state;
    return (
      <div className="total-stats">
        <RunHeader />
        <div className="container-fluid">
        <div className="first-row row">
          <div className="col-lg-6 col-12">
            <Chart options={options} chartData={chartData} runCount={runCount}/>
          </div>
          <div className="col-12 col-lg-6">
            <PersonalBests />
          </div>
        </div>
        <div className="second-row row">
          <div className="col-lg-6 col-12 text-center">
            <PieChart pieChartData={pieChartData} />
          </div>
          <div className="col-lg-6 col-12 text-center">
            <EventDate/>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default TotalStats;
