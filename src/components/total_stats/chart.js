import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './total_stats.scss';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
    }
  }

  render() {
    return (
      <div>
        <article className="graph-container">
        <Line
          data={this.props.chartData}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Running Data',
              fontSize: 25
            },
            legend: {
              display: false,
              position: 'right',
            },
            elements: {
              line: {
                tension: 0
              }
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Date'
                },
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Distance (mi)'
                }
              }],
            }
          }}
        />
      </article>
      </div>
    )
  }
}

export default Chart;