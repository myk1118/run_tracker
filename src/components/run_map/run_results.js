import React, { Component } from 'react';
import RunHeader from '../nav_folder/run_nav';
import axios from 'axios';
import ResultsChart from './results_chart';
import MyMapComponent from './map';
import apiKey from '../googlemap';
import './run_results.scss';

class RunResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bl: [],
      first_name: null,
      time: 0,
      distance: 0,
      calories: 0,
      pace: 0,
      id: 0,
      date: '',
      totalDistance: 0,
      chartData: {},
      options: {},
      currentLatLng: {
         lat: 0,
         lng: 0
      },
    }
  }

  componentDidMount() {
    this.getChartData();
    this.getUserName();
  }

  async getUserName() {
    const resp = await axios.get('/api/get_current_user.php');
    const {first_name} = resp.data;

    this.setState({
      first_name
    })
  }


  async getChartData() {
    const {id} = this.props.match.params
    const resp = await axios.get(`/api/get_runsession_results.php?id=${id}`);
    const { sessionData, date, distance, coordinates, secondsRan } = resp.data;
    const{ calories, pace, time} = sessionData['0'];
    const miles = sessionData.map(mile => mile.perMile.currentMile);
    const time2 = sessionData.map(minutes => (minutes.perMile.perMileTime/60).toFixed(2));

    this.setState({
      secondsRan,
      time,
      distance,
      calories,
      pace,
      date,
      currentLatLng: {
        ...this.state.currentLatLng,
        lat: coordinates.lat,
        lng: coordinates.lng
      },
      totalDistance: distance,
      chartData: {
        labels: [...miles],
        datasets: [
          {
            label: 'Pace',
            data: [...time2],
            borderColor: 'blue',
            backgroundColor: '#1E90FF',
            borderWidth: 1,
            borderColor: 'white',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000',
          }
        ]
      },
    })
  }

  render() {
    const {date, first_name, currentLatLng} = this.state;
    return(
      <div className="postRunBody">
      <RunHeader />
      <div className="text-center">
        {first_name}, here are your run results from {date.date} at {date.time}
      </div>
      <div className="postRunMap">
          {/* <MyMapComponent
          isMarkerShown
          // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtWT-ZM2l21GJnuT7cjNZYmbQa0flwL6c&v=3.exp&libraries=geometry,drawing,places"
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          currentLocation = {currentLatLng}
          zoom={15}
          /> */}
          <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${currentLatLng.lat},${currentLatLng.lng}&zoom=15&size=640x400&markers=color:red%7C%7C${currentLatLng.lat},${currentLatLng.lng}&key=${apiKey}&`}/>
      </div>
    <div className="progressContainer">
      <div className="graphContainer">
        <div className="graph">
          <ResultsChart
            chartData={this.state.chartData}
            distance={this.state.totalDistance}
            secondsRan={this.state.secondsRan}
          />
        </div>

      </div>
      <div className="row col-6 inline-block">
          <div className="offset-2 pieContainer col-4 col-md-4 col-lg-4">
              <div className="col-6 col-sm-6 col-md-6">
              <div className="progress" data-percentage="100">
                  <span className="progress-left">
                      <span className="progress-bar1"></span>
                  </span>
                  <span className="progress-right">
                  <span className="progress-bar1"></span>
                  </span>
              <div className="text-container">
                  <div className="col-6 progress-value">
                  Distance
                      <div className="col-6 progress-text">{this.state.distance}</div>
                  </div>
              </div>
              </div>
          </div>
          </div>

          <div className="offset-1 pieContainer col-5 col-md-5 col-lg-5">
              <div className="col-6 col-sm-6 col-md-6">
              <div className="progress" data-percentage="100">
                  <span className="progress-left">
                      <span className="progress-bar2"></span>
                  </span>
                  <span className="progress-right">
                  <span className="progress-bar2"></span>
                  </span>
              <div className="text-container">
                  <div className="col-6 progress-value">
                  Time
                      <div className="col-6 progress-text">{this.state.time}</div>
                  </div>
              </div>
              </div>
          </div>
          </div>


          <div className="offset-2 pieContainer col-4 col-md-4 col-lg-4">
              <div className=" col-2 col-sm-3 col-md-3">
                  <div className="progress" data-percentage="100">
                      <span className="progress-left">
                          <span className="progress-bar3"></span>
                      </span>
                      <span className="progress-right">
                          <span className="progress-bar3"></span>
                      </span>
                      <div className="text-container">
                      <div className="col-6 progress-value">
                      Calories
                      <div className="col-6 progress-text">{this.state.calories}</div>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        <div className="offset-1 pieContainer col-5 col-md-5 col-lg-5">
        <div className="col-2 col-sm-3 col-md-3">
          <div className="progress" data-percentage="100">
            <span className="progress-left">
              <span className="progress-bar4"></span>
            </span>
            <span className="progress-right">
              <span className="progress-bar4"></span>
            </span>
            <div className="text-container">
            <div className="col-6 progress-value">
          Pace
          <div className="progress-text">{this.state.pace}</div>
          </div>
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
