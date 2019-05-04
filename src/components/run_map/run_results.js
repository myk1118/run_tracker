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

  getChartData() {
    const { id } = this.props.match.params
    axios.get(`/api/get_runsession_results.php?id=${id}`).then(resp => {
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
        pace: this.secondsToPaceConverter(secondsRan, distance),
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
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${lng}&key=76e6a71e44ff40759963af6dacacc318&pretty=1`).then(resp => {
      if (resp.data) {
        this.setState({
          city: resp.data.results[0].components.city
        })
      }
    })
  }

  secondsToPaceConverter(time, distance) {

    const paceInSeconds = time/distance;
    const minutes = Math.floor(paceInSeconds / 60);
    const secondsRemaining = (paceInSeconds - minutes * 60).toFixed();
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
          <div className="row">
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
      </div>
    )
  }
}

export default RunResult;
