import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './total_stats.scss';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default props => {
  return (
    <div className="pie-chart-container">
      <article className="graph-container">
        <Bar
          data={props.barChartData}
          options={{
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Runs',
                  fontColor: 'black',
                },
                ticks: {
                  callback: value => {
                    if(value % 1 === 0) {
                      return value;
                    }
                  }
                }
              }]
            },
            tooltips: {
              enabled: false,
              // callbacks: {
              //   label: function (tooltipItem, data) {
              //     if (data.datasets[0].data[tooltipItem.index] === 1) {
              //       return `${data.datasets[0].data[tooltipItem.index]} run`;
              //     } else {
              //       return `${data.datasets[0].data[tooltipItem.index]} runs`;
              //     }
              //   }
              // }
            },
            plugins: {
              datalabels: {
                display: function (context) {
                  return context.dataset.data[context.dataIndex] > 0
                },
                color: 'black',
              }
            },
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: true,
              text: 'Your Runs Breakdown',
              fontSize: 25,
              fontColor: 'black',
              background: 'red'
            },
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                fontColor: 'black',
                // filter: (item, chart) => {
                //   console.log('item', item)
                //   console.log('chart', chart.datasets);
                //   return !item.text.includes('6-8mi')
                // }
              },
            },
          }}
        />
      </article>
    </div>
  )
}
