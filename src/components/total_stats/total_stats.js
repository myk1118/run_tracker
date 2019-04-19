import React, {Component} from 'react';
import LineGraph from './line_graph';
import RunHeader from '../nav_folder/run_nav';
import './total_stats.scss';

class TotalStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div className="total-stats">
        <RunHeader />
        <LineGraph />
        <p>Selectable key to see additional lines in graph</p>
        <div className="d-flex chart-container">
          <div className="col-6 bg-primary text-center">
            <div className="bg-success h-75 mt-3"></div>
          </div>
          <div className="col-6 bg-primary text-center">
            <div className="bg-success h-75 mt-3"></div>
          </div>
        </div>
        <p>Best Time:</p>
        <p>Longest Distance:</p>
        <p>Most Calories Burned:</p>
        <p>Last Run:</p>
      </div>
    )
  }
}

export default TotalStats;
