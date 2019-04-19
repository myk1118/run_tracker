import React, {Component} from 'react';
import Chart from './chart';
import RunHeader from '../nav_folder/run_nav';
import './total_stats.scss';

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
    this.setState({
      chartData: {
        labels: ['09/04/2018', '09/06/2018', '09/07/2018',
            '09/10/2018', '09/12/2018', '09/14/2018'],
        datasets: [
          {
            label: 'miles',
            fill: false,
            data: [
              1.5,
              2.3,
              4,
              2.5,
              3.5,
              4.2
            ],
            backgroundColor: 'rgba(255,99,132,0.6)',
          }
        ]
      }
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
        <p>Best Time:</p>
        <p>Longest Distance:</p>
        <p>Most Calories Burned:</p>
        <p>Last Run:</p>
      </div>
    )
  }
}

export default TotalStats;
