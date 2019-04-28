import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
// import './total_stats.scss';

export default props => {
  return (
    <div>
      <article className="graph-container">
      <Bar
        data={props.chartData}
        width={100}
        height={100}
        // options={props.options}
        options = {{
          maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Today\'s Run',
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
                  labelString: 'Mile'
                },
              }],
              yAxes: [{
                // ticks: {
                //   callback: label => {
                //     return '$' + label;
                //   }
                // },
                scaleLabel: {
                  display: true,
                  labelString: 'Pace(min/mile)'
                }
              }],
            }
          }}
        />
      </article>
    </div>
  )
}
