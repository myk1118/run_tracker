import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './total_stats.scss';



export default props => {
  return (
    <div>
      <article className="graph-container">
      <Pie
        data={props.pieChartData}
        options = {{
          maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Distance Comparison',
            fontSize: 25
          },
          legend: {
            display: true,
            position: 'right',
          },
          // elements: {
          //   line: {
          //     tension: 0
          //   }
          // },
        }}
      />
    </article>
    </div>
  )
}
