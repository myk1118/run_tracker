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
      secondsRan: 0,
      pace: 0,
      city: null,
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
    const { first_name } = resp.data;

    this.setState({
      first_name
    })
  }

  // async getChartData() {
  //   const {id} = this.props.match.params
  //   const resp = await axios.get(`/api/get_runsession_results.php?id=${id}`);
  //   console.log('response', resp);
  //   const { sessionData, date, distance, coordinates, secondsRan, minutesSecondsRan } = resp.data;
  //   const{ calories, pace, time} = sessionData['0'];
  //   const miles = sessionData.map(mile => mile.perMile.currentMile);
  //   const time2 = sessionData.map(minutes => (minutes.perMile.perMileTime/60).toFixed(2));
  //
  //   this.setState({
  //     minutesSecondsRan,
  //     secondsRan,
  //     time,
  //     distance,
  //     calories,
  //     pace: this.secondsToPaceConverter(secondsRan),
  //     date,
  //     currentLatLng: {
  //       ...this.state.currentLatLng,
  //       lat: coordinates.lat,
  //       lng: coordinates.lng
  //     },
  //     totalDistance: distance,
  //     chartData: {
  //       labels: [...miles],
  //       datasets: [
  //         {
  //           label: 'Pace',
  //           data: [...time2],
  //           borderColor: 'blue',
  //           backgroundColor: '#1E90FF',
  //           borderWidth: 1,
  //           borderColor: 'white',
  //           hoverBorderWidth: 3,
  //           hoverBorderColor: '#000',
  //         }
  //       ]
  //     },
  //   })
  // }

  getChartData() {
    const { id } = this.props.match.params
    axios.get(`/api/get_runsession_results.php?id=${id}`).then(resp => {
      console.log('response', resp);
      const { sessionData, date, distance, coordinates, secondsRan, minutesSecondsRan } = resp.data;
      const { calories, pace, time } = sessionData['0'];
      const miles = sessionData.map(mile => mile.perMile.currentMile);
      const time2 = sessionData.map(minutes => (minutes.perMile.perMileTime / 60).toFixed(2));
      this.getCityName(coordinates.lat, coordinates.lng)
      this.setState({
        minutesSecondsRan,
        secondsRan,
        time,
        distance,
        calories,
        pace: this.secondsToPaceConverter(secondsRan),
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
    })
  }

  getCityName(lat, lng) {
    console.log(lat, lng)
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${lng}&key=76e6a71e44ff40759963af6dacacc318&pretty=1`).then(resp => {
      if (resp.data) {
        console.log(resp.data.results[0].components.city)
        this.setState({
          city: resp.data.results[0].components.city
        })
      }
      // return cityResponse.data.results[0].components.city;
    })
  }

  secondsToPaceConverter(time) {
    const minutes = Math.floor(time / 60);
    const secondsRemaining = time - minutes * 60
    const seconds = secondsRemaining > 9 ? secondsRemaining : `0${secondsRemaining}`;

    return `${minutes}:${seconds}`
  }

  runDescription = (secondsRan, totalDistance) => {
    const minutes = Math.floor(secondsRan / 60);
    const seconds = secondsRan - minutes * 60;
    const oneOrMoreMinutes = minutes > 1 ? 'minutes' : 'minute';
    const timeRan = secondsRan < 60 ? `${secondsRan} Seconds` : `${minutes} ${oneOrMoreMinutes} and ${seconds} Seconds`;

    return `${totalDistance} Mile Run in ${timeRan}`
  }

  render() {
    const { date, first_name, currentLatLng, distance, city, minutesSecondsRan, calories, pace, totalDistance, secondsRan } = this.state;
    return (
      <div className="postRunBody">
        <RunHeader />
        <div className="container-fluid">
          <div className="postRunMap">
            <div className="row border-bottom">
              <div className="col-12 col-lg-6">
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
                <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${currentLatLng.lat},${currentLatLng.lng}&zoom=14&size=640x200&markers=color:red%7C%7C${currentLatLng.lat},${currentLatLng.lng}&key=${apiKey}&`} />
              </div>
              <div className="col-12 col-lg-6 ">
                <div className="run-message">
                  <p className="first-description text-center">{first_name}, here are your run results from {date.date} at {date.time}</p>
                  <p className="second-description">{this.runDescription(secondsRan, totalDistance)} </p>
                  <p className="location">Location: {city}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="run-message text-center border-top">
          <span className="border-bottom">{first_name}, here are your run results from {date.date} at {date.time}</span>
        </div> */}
          <div className="row">
            {/* <div className="col-lg-6 col-12">
            <ResultsChart
              chartData={this.state.chartData}
              distance={this.state.totalDistance}
              secondsRan={this.state.secondsRan}
            />
          </div> */}
            <div className="col-lg-6 col-12 text-center run-data">
              <div className="row">
                <div className="col-6 ">
                  <p className="run-title">Duration (min:sec)</p>
                  <p>{minutesSecondsRan}</p>
                </div>
                <div className="col-6 ">
                  <p className="run-title">Distance</p>
                  <p>{distance} miles</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <p className="run-title">Avg Pace (min/mile)</p>
                  <p>{pace}</p>
                </div>
                <div className="col-6 ">
                  <p className="run-title">Calories</p>
                  <p>{calories}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <ResultsChart
                chartData={this.state.chartData}
                distance={this.state.totalDistance}
                secondsRan={this.state.secondsRan}
              />
            </div>
          </div>
        </div>
        {/* <div className="row col-6 inline-block">
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
                      <div className="col-6 progress-text">{distance}</div>
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
                  Duration
                      <div className="col-6 progress-text">{minutesSecondsRan}</div>
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
                      <div className="col-6 progress-text">{calories}</div>
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
          <div className="progress-text">{pace}</div>
          </div>
          </div>
          </div>
          </div>
        </div>
      </div> */}
      </div>
    )
  }
}

export default RunResult;
