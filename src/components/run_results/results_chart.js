import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

export default props => {
  const {distance, secondsRan} = props;
  const minutes = Math.floor(secondsRan / 60);
  const seconds = secondsRan - minutes * 60;
  const oneOrMoreMinutes = minutes > 1 ? 'minutes' : 'minute';
  const timeRan = secondsRan < 60 ? `${secondsRan} Seconds` : `${minutes} ${oneOrMoreMinutes} and ${seconds} Seconds`;

  return (
    <div className="bar-graph-container">
      <article >
      <Bar
        data={props.chartData}
        width={100}
        height={100}
        // options={props.options}
        options = {{
 //          "animation": {
 //   "duration": 1,
 //   "onComplete": function() {
 //     var chartInstance = this.chart,
 //       ctx = chartInstance.ctx;
 //
 //     ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
 //     ctx.textAlign = 'center';
 //     ctx.textBaseline = 'bottom';
 //
 //     this.data.datasets.forEach(function(dataset, i) {
 //       var meta = chartInstance.controller.getDatasetMeta(i);
 //       meta.data.forEach(function(bar, index) {
 //         var data = dataset.data[index];
 //         ctx.fillText(data, bar._model.x, bar._model.y - 5);
 //       });
 //     });
 //   }
 // },
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                  let date = new Date(null);
                  date.setSeconds(tooltipItem.yLabel*60);
                  return `Pace: ${date.toISOString().slice(14,19)} min/mile`;
                }
            }
          },
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Pace per Mile',
            fontSize: 25
          },
          legend: {
            display: false,
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
