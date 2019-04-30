import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
// import './total_stats.scss';

export default props => {
const {distance, secondsRan} = props;
const minutes = Math.floor(secondsRan / 60);
const seconds = secondsRan - minutes * 60;
const oneOrMoreMinutes = minutes > 1 ? 'minutes' : 'minute';
const timeRan = secondsRan < 60 ? `${secondsRan} Seconds` : `${minutes} ${oneOrMoreMinutes} and ${seconds} Seconds`;

  return (
    <div>
      <article className="graph-container">
      <Bar
        data={props.chartData}
        width={100}
        height={100}
        // options={props.options}
        options = {{
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                  let date = new Date(null);
                  date.setSeconds(tooltipItem.yLabel*60);
                  return `Pace: ${date.toISOString().slice(14,19)} min/mile`;
                }
            }
          },
          maintainAspectRatio: true,
          title: {
            display: true,
            // text: 'Today\'s Run',
            text: `${distance} Mile Run in ${timeRan}`,
            fontSize: 25
          },
          legend: {
            display: false,
            // position: 'bottom',
          },
          elements: {
            line: {
              tension: 0
            }
          },

            scales: {
              xAxes: [{
                barPercentage: distance <= 1 ? 0.2 : 1,
                categoryPercentage: 0.8,
                scaleLabel: {
                  display: true,
                  labelString: 'Mile'
                },
              }],
              yAxes: [{
                ticks: {
                  callback: label => {
                    let date = new Date(null);
                    date.setSeconds(label*60); // specify value for SECONDS here
                    return date.toISOString().slice(14,19);
                  },
                  beginAtZero: true
                },
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
