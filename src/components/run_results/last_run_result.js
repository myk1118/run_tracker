import React, { Component, Fragment } from 'react';
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
        id: 0,
        distance: 0,
        calories: 0,
        pace: 0,
        perMile: {},
        chartData: {},
        options: {},
        currentLatLng: {
        lat: 33,
        lng: -117
      },
    }
  }

  async componentDidMount() {
    this.getRunInfo();
    // await this.getPersonalBest();
    await this.getChartData();
  }


  getRunInfo(){
      axios.get('/api/get_last_runsession_results.php').then((resp) => {
          console.log('api resp', resp);
        const {id, distance, calories, pace, time} = resp.data.sessionData['0'];
          this.setState  ({
            id: id,
            distance: distance,
            calories: calories,
            pace: pace,
            time: time
          })
      })
    }

    async getPersonalBest(){

        await axios.get('/api/personalbestquery.php').then((resp)=>{
            let {fastestPace, longestRun, longestTime, mostCalories} = resp.sessionData.data;

            this.setState({
                    bestDistance: longestRun,
                    bestCalories: mostCalories,
                    bestPace: fastestPace,
                    bestTime: longestTime,
            });
        })
    }

  getChartData() {
    const {id} = this.state;
    axios.get(`/api/get_last_runsession_results.php?id=${id}`).then(resp =>{
        const { sessionData } = resp.data;
        const miles = sessionData.map(mile => mile.perMile.currentMile);
        const time = sessionData.map(minutes => minutes.time)
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
    })
  }



  render() {
      console.log('new state', this.state)
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
      <div className="progressContainer col-12 inline-block">
          <div className="graphContainer">
              <div className="graph">
                  <ResultsChart  chartData={this.state.chartData}/>
              </div>

      </div>
      <div className="row col-6 inline-block">
          <div className="pieContainer col-6 col-md-3 col-lg-3">
              <div className="col-2 col-sm-3 col-md-3">
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

          <div className="pieContainer col-6 col-md-3 col-lg-3">
              <div className="col-2 col-sm-3 col-md-3">
              <div className="progress" data-percentage="100">
                  <span className="progress-left">
                      <span className="progress-bar2"></span>
                  </span>
                  <span className="progress-right">
                  <span className="progress-bar2"></span>
                  </span>
              <div className="text-container">
                  <div className="offset-2 col-6 progress-value">
                  Time
                      <div className="col-6 progress-text">{this.state.time}</div>
                  </div>
              </div>
              </div>
          </div>
          </div>


          <div className="pieContainer col-6 col-md-3 col-lg-3">
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

        <div className="pieContainer col-6 col-md-3 col-lg-">
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
