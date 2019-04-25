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
    const {id} = this.props.match.params;
    console.log('params: ',id)
    const resp = await axios.get(`/api/get_runsession_results.php?id=${id}`);
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
    console.log('results: ', this.props.match.params)
    return(
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
        currentLocation = {this.state.currentLatLng}
        />
      </div>
      <div className="graphContainer">
        <div className="graph">
          <ResultsChart  chartData={this.state.chartData}/>
        </div>
      </div>
    <div className="progressContainer">
      <div className="row">
        <div className="pieContainer">
          <div className="offset-2 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="60">
              <span className="progress-left">
                <span className="progress-bar"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar"></span>
              </span>
            <div className="progress-value">
            Distance
              <span>completed</span>
            </div>
            </div>
            </div>
          </div>
          <div className="pieContainer">
          <div className="offset-1 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="60">
              <span className="progress-left">
                <span className="progress-bar"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar"></span>
              </span>
            <div className="progress-value">
            20%
              <span>completed</span>
            </div>
            </div>
            </div>
          </div>
          <div className="pieContainer">
          <div className="offset-2 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="60">
              <span className="progress-left">
                <span className="progress-bar"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar"></span>
              </span>
            <div className="progress-value">
            20%
              <span>completed</span>
            </div>
            </div>
            </div>
          </div>
          <div className="pieContainer">
          <div className="offset-1 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="60">
              <span className="progress-left">
                <span className="progress-bar"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar"></span>
              </span>
            <div className="progress-value">
            20%
              <span>completed</span>
            </div>
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    )
  }
}

export default RunResult;
