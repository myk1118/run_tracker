import React, { Component } from 'react';
import RunHeader from '../nav_folder/run_nav';
import axios from 'axios';
import ResultsChart from './results_chart';
import MyMapComponent from './map';
import apiKey from '../googlemap';
import './run_results.scss';
import RunResults from './run_results';

class RunResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      options: {},
      currentLatLng: {
        lat: 33,
        lng: -117
      },
    }
  }

  componentDidMount() {
    this.getChartData();
  }

  async getChartData() {

    const resp = await axios.get('/api/get_runsession_results.php');
    const { sessionData } = resp.data;
    // console.log(sessionData)
    const miles = sessionData.map(mile => mile.currentMile);
    const time = sessionData.map(minutes => minutes.time)
    console.log('miles: ', miles);
    console.log('time: ', time);

    this.setState({
      chartData: {
        labels: [0, ...miles],
        datasets: [
          {
            label: 'Time',
            fill: false,
            data: [0, ...time],
            borderColor: 'blue',
          }
        ]
      },
    })
  }

  render() {
    return (
      <div className="postRunBody">
        <RunHeader />
        <div className="postRunMap">
          <MyMapComponent
            isMarkerShown
            // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtWT-ZM2l21GJnuT7cjNZYmbQa0flwL6c&v=3.exp&libraries=geometry,drawing,places"
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            currentLocation={this.state.currentLatLng}
          />
        </div>
        <div className="postRunStats">
          <svg className="progress-ring col-5 offset-1">
            <circle className="progressCircle"
              stroke="blue"
              strokeWidth="4"
              fill="transparent"
              r="52"
              cx="60"
              cy="60" />
            <text x="45%" y="25%" textAnchor="middle" stroke="rgb(8, 5, 198)" strokeWidth="1px" dy=".3em">Total Time</text>
          </svg>
          <svg className="progress-ring col-5 ">
            <circle className="progressCircle"
              stroke="red"
              strokeWidth="4"
              fill="transparent"
              r="52"
              cx="60"
              cy="60" />
            <text x="45%" y="25%" textAnchor="middle" stroke="rgb(249, 28, 28)" strokeWidth="1px" dy=".3em">Total Distance</text>
          </svg>
          <svg className="progress-ring col-5 offset-1">
            <circle className="progressCircle"
              stroke="purple"
              strokeWidth="4"
              fill="transparent"
              r="52"
              cx="60"
              cy="60" />
            <text x="45%" y="25%" textAnchor="middle" stroke="rgb(146, 28, 249)" strokeWidth="1px" dy=".3em">Avg Pace</text>
          </svg>
          <svg className="progress-ring col-5 ">
            <circle className="progressCircle"
              stroke="orange"
              strokeWidth="4"
              fill="transparent"
              r="52"
              cx="60"
              cy="60" />
            <text x="45%" y="25%" textAnchor="middle" stroke="rgb(249, 124, 28)" strokeWidth="1px" dy=".3em">Calories Burned</text>
          </svg>
          {/* <div className="col-6">Total Time</div>
                <div className="col-6">Avg Pace</div>
                <div className="col-6">Total Calories Burned</div> */}
        </div>
        <div className="graphContainer">
          <div className="graph">
            <ResultsChart chartData={this.state.chartData} />
          </div>
        </div>

      </div>
    )
  }
}

export default RunResult;
