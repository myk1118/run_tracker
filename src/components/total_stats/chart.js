import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './total_stats.scss';

class Chart extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    // const title = labels.length > 1 ? 'Running Data' : 'jfdks'
    return (
      <div className="graph-container">
        <article className="runGraph">
        <Line
          data={this.props.chartData}
          options={{
            maintainAspectRatio: true,
            title: {
              display: true,
              text: 'Running Data',
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
