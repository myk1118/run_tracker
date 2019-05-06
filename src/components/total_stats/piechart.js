import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './total_stats.scss';

export default props => {
  return (
    <div className="pie-chart-container">
      <article className="graph-container">
      <Pie
        data={props.pieChartData}
        options = {{
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Distance Comparison',
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
