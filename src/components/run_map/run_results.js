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
      time: 0,
      distance: 0,
      calories: 0,
      pace: 0,
      id: 0,
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

  // getId(){
  //   let {id} = this.state;
  //   if(this.props.match.params){
  //     id = this.props.match.params;
  //     console.log('this.props.match.params', id);
  //   }else{
  //     axios.get(`/api/get_last_runsession_results.php`).then((resp) => {
  //         console.log('getID', resp);
  //         id = resp['sessionData']['id']['id'];
  //     })
  //   }
  //   this.setState({
  //     id
  //   })
  // }

  async getChartData() {
    this.props.match.params
    const {id} = this.props.match.params
    console.log('params: ',id)
    const resp = await axios.get(`/api/get_runsession_results.php?id=${id}`);
    console.log('resp: ', resp)
    const { sessionData } = resp.data;
    const{ calories, distance, pace, time} = sessionData['0'];
    console.log('session data:', sessionData)
    const miles = sessionData.map(mile => mile.perMile.currentMile);
    const time2 = sessionData.map(minutes => minutes.time)

    this.setState({
      time,
      distance,
      calories,
      pace,
      chartData: {
        labels: [0, ...miles],
        datasets: [
          {
            label: 'Time',
            fill: false,
            data: [0, ...time2],
            borderColor: 'blue',
          }
        ]
      },
    })
  }

  render() {
    // console.log('results state: ', this.state);
    console.log('this.props: ', this.props);
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
