import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './total_stats.scss';

export default props => {


    const runs = props.runCount > 1 ? `${props.runCount} Runs` : `${props.runCount} Run`;
    return (
      <div className="line-graph-container">
        <article className="runGraph">
        <Line
          data={props.chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
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
