import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './total_stats.scss';



export default props => {
  return (
    <div>
      <article className="graph-container">
      <Pie
        data={props.chartData}
        // options={props.options}
        options = {{
          maintainAspectRatio: false,
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
