import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './total_stats.scss';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default props => {
  return (
    <div className="pie-chart-container">
      <article className="graph-container">
      <Pie
        data={props.pieChartData}
        options = {{
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                  console.log('hello')
                  console.log('tooltip: ', tooltipItem);
                  console.log('data: ', data)
                  // let date = new Date(null);
                  // date.setSeconds(tooltipItem.yLabel);
                  return `${data.datasets[0].data[tooltipItem.index]} runs`;
                }
            }
          },
          plugins: {
            datalabels: {
               display: function(context) {
                 return context.dataset.data[context.dataIndex] > 0
               },
               color: 'black',
               font: {
                 weight: 'bold',
               }
            }
          },
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Run Session Comparisons',
            fontSize: 25
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />
    </article>
    </div>
  )
}
