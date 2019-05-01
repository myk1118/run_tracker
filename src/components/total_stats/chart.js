import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './total_stats.scss';

class Chart extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    // const title = labels.length > 1 ? 'Running Data' : 'jfdks'
    const runs = this.props.runCount > 1 ? `${this.props.runCount} Runs` : `${this.props.runCount} Run`;
    return (
      <div className="graph-container">
        <article className="runGraph">
        <Line
          data={this.props.chartData}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: `Distances Tracked For Your Last ${runs}`,
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'bottom',
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
                  labelString: 'Date',
                },
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Distance (mi)',
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
